import { STORAGE_KEY_PREFIX } from "./config";
import { getModule } from "./assets";
import { template } from "./template";
import { loadPdfAsText } from "./pdf";

export async function streamTextGeneration({
  userPrompt = "",
  systemPrompt,
  context,
  files,
  config,
  run,
}) {
  const { mistral, openai, streamText } = await getModule("modelfusion");
  const modelProviders = {
    mistral,
    openai,
  };

  const provider = config.provider;
  const providerConfig = config.providers[provider];
  // eslint-disable-next-line no-undef
  const apiKey = __PLAYGROUND__
    ? sessionStorage.getItem(`${STORAGE_KEY_PREFIX}apiKey`)
    : providerConfig.apiKey;

  const facade = modelProviders[provider];
  const api = facade.Api({ apiKey });

  const images = files.filter((file) => file.type.startsWith("image/"));
  const pdfs = files.filter((file) => file.type === "application/pdf");

  let userPromptWithContext = template(userPrompt, context);

  // Extract PDF pages as text
  if (pdfs.length > 0) {
    const pdfTexts = await Promise.all(pdfs.map(loadPdfAsText));
    const pdfContext = `Additional context from the following PDF documents has been processed and made available to you. Include the information from these documents as applicable.\n\n${pdfTexts
      .map((value, index) => `PDF document ${index + 1}: ${value}`)
      .join("\n\n")}`;

    userPromptWithContext += `\n\n${pdfContext}`;
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log(userPromptWithContext);
  }

  if (provider === "openai" && images.length > 0) {
    const serializedImages = await Promise.all(
      images.map(async (blob) => {
        const arrayBuffer = await blob.arrayBuffer();
        return {
          data: new Uint8Array(arrayBuffer),
          mimeType: blob.type,
        };
      }),
    );

    const model = facade
      .ChatTextGenerator({
        api,
        model: config.providers.openai.model.vision,
        temperature: config.temperature,
        ...(config.maxGenerationTokens
          ? { maxGenerationTokens: config.maxGenerationTokens }
          : {}),
      })
      .withInstructionPrompt();

    return await streamText({
      model,
      prompt: {
        system: systemPrompt,
        instruction: [
          { type: "text", text: userPromptWithContext },
          ...serializedImages.map((image) => ({
            type: "image",
            image: image.data,
            mimeType: image.mimeType,
          })),
        ],
      },
      run,
    });
  }

  const model = facade
    .ChatTextGenerator({
      api,
      model:
        provider === "openai"
          ? providerConfig.model.default
          : providerConfig.model,
      temperature: config.temperature,
      ...(config.maxGenerationTokens
        ? { maxGenerationTokens: config.maxGenerationTokens }
        : {}),
    })
    .withInstructionPrompt();

  return await streamText({
    model,
    prompt: {
      system: systemPrompt,
      instruction: userPromptWithContext,
    },
    run,
  });
}
