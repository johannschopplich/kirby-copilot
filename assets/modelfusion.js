var HZ = Object.defineProperty;
var JZ = (l, I, G) => I in l ? HZ(l, I, { enumerable: !0, configurable: !0, writable: !0, value: G }) : l[I] = G;
var a = (l, I, G) => (JZ(l, typeof I != "symbol" ? I + "" : I, G), G);
let EI = (l = 21) => crypto.getRandomValues(new Uint8Array(l)).reduce((I, G) => (G &= 63, G < 36 ? I += G.toString(36) : G < 62 ? I += (G - 26).toString(36).toUpperCase() : G > 62 ? I += "-" : I += "_", I), "");
function Jc(l, I, G, c) {
  c != null && c.errorMessages && G && (l.errorMessage = {
    ...l.errorMessage,
    [I]: G
  });
}
function E(l, I, G, c, b) {
  l[I] = G, Jc(l, I, c, b);
}
const _G = {
  name: void 0,
  $refStrategy: "root",
  basePath: ["#"],
  effectStrategy: "input",
  pipeStrategy: "all",
  dateStrategy: "string",
  mapStrategy: "entries",
  definitionPath: "definitions",
  target: "jsonSchema7",
  strictUnions: !1,
  definitions: {},
  errorMessages: !1,
  markdownDescription: !1,
  patternStrategy: "escape",
  emailStrategy: "format:email"
}, uZ = (l) => typeof l == "string" ? {
  ..._G,
  name: l
} : {
  ..._G,
  ...l
};
var y;
(function(l) {
  l.assertEqual = (b) => b;
  function I(b) {
  }
  l.assertIs = I;
  function G(b) {
    throw new Error();
  }
  l.assertNever = G, l.arrayToEnum = (b) => {
    const Z = {};
    for (const d of b)
      Z[d] = d;
    return Z;
  }, l.getValidEnumValues = (b) => {
    const Z = l.objectKeys(b).filter((V) => typeof b[b[V]] != "number"), d = {};
    for (const V of Z)
      d[V] = b[V];
    return l.objectValues(d);
  }, l.objectValues = (b) => l.objectKeys(b).map(function(Z) {
    return b[Z];
  }), l.objectKeys = typeof Object.keys == "function" ? (b) => Object.keys(b) : (b) => {
    const Z = [];
    for (const d in b)
      Object.prototype.hasOwnProperty.call(b, d) && Z.push(d);
    return Z;
  }, l.find = (b, Z) => {
    for (const d of b)
      if (Z(d))
        return d;
  }, l.isInteger = typeof Number.isInteger == "function" ? (b) => Number.isInteger(b) : (b) => typeof b == "number" && isFinite(b) && Math.floor(b) === b;
  function c(b, Z = " | ") {
    return b.map((d) => typeof d == "string" ? `'${d}'` : d).join(Z);
  }
  l.joinValues = c, l.jsonStringifyReplacer = (b, Z) => typeof Z == "bigint" ? Z.toString() : Z;
})(y || (y = {}));
var WG;
(function(l) {
  l.mergeShapes = (I, G) => ({
    ...I,
    ...G
    // second overwrites first
  });
})(WG || (WG = {}));
const e = y.arrayToEnum([
  "string",
  "nan",
  "number",
  "integer",
  "float",
  "boolean",
  "date",
  "bigint",
  "symbol",
  "function",
  "undefined",
  "null",
  "array",
  "object",
  "unknown",
  "promise",
  "void",
  "never",
  "map",
  "set"
]), NI = (l) => {
  switch (typeof l) {
    case "undefined":
      return e.undefined;
    case "string":
      return e.string;
    case "number":
      return isNaN(l) ? e.nan : e.number;
    case "boolean":
      return e.boolean;
    case "function":
      return e.function;
    case "bigint":
      return e.bigint;
    case "symbol":
      return e.symbol;
    case "object":
      return Array.isArray(l) ? e.array : l === null ? e.null : l.then && typeof l.then == "function" && l.catch && typeof l.catch == "function" ? e.promise : typeof Map < "u" && l instanceof Map ? e.map : typeof Set < "u" && l instanceof Set ? e.set : typeof Date < "u" && l instanceof Date ? e.date : e.object;
    default:
      return e.unknown;
  }
}, n = y.arrayToEnum([
  "invalid_type",
  "invalid_literal",
  "custom",
  "invalid_union",
  "invalid_union_discriminator",
  "invalid_enum_value",
  "unrecognized_keys",
  "invalid_arguments",
  "invalid_return_type",
  "invalid_date",
  "invalid_string",
  "too_small",
  "too_big",
  "invalid_intersection_types",
  "not_multiple_of",
  "not_finite"
]), vZ = (l) => JSON.stringify(l, null, 2).replace(/"([^"]+)":/g, "$1:");
class f extends Error {
  constructor(I) {
    super(), this.issues = [], this.addIssue = (c) => {
      this.issues = [...this.issues, c];
    }, this.addIssues = (c = []) => {
      this.issues = [...this.issues, ...c];
    };
    const G = new.target.prototype;
    Object.setPrototypeOf ? Object.setPrototypeOf(this, G) : this.__proto__ = G, this.name = "ZodError", this.issues = I;
  }
  get errors() {
    return this.issues;
  }
  format(I) {
    const G = I || function(Z) {
      return Z.message;
    }, c = { _errors: [] }, b = (Z) => {
      for (const d of Z.issues)
        if (d.code === "invalid_union")
          d.unionErrors.map(b);
        else if (d.code === "invalid_return_type")
          b(d.returnTypeError);
        else if (d.code === "invalid_arguments")
          b(d.argumentsError);
        else if (d.path.length === 0)
          c._errors.push(G(d));
        else {
          let V = c, m = 0;
          for (; m < d.path.length; ) {
            const X = d.path[m];
            m === d.path.length - 1 ? (V[X] = V[X] || { _errors: [] }, V[X]._errors.push(G(d))) : V[X] = V[X] || { _errors: [] }, V = V[X], m++;
          }
        }
    };
    return b(this), c;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, y.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(I = (G) => G.message) {
    const G = {}, c = [];
    for (const b of this.issues)
      b.path.length > 0 ? (G[b.path[0]] = G[b.path[0]] || [], G[b.path[0]].push(I(b))) : c.push(I(b));
    return { formErrors: c, fieldErrors: G };
  }
  get formErrors() {
    return this.flatten();
  }
}
f.create = (l) => new f(l);
const SI = (l, I) => {
  let G;
  switch (l.code) {
    case n.invalid_type:
      l.received === e.undefined ? G = "Required" : G = `Expected ${l.expected}, received ${l.received}`;
      break;
    case n.invalid_literal:
      G = `Invalid literal value, expected ${JSON.stringify(l.expected, y.jsonStringifyReplacer)}`;
      break;
    case n.unrecognized_keys:
      G = `Unrecognized key(s) in object: ${y.joinValues(l.keys, ", ")}`;
      break;
    case n.invalid_union:
      G = "Invalid input";
      break;
    case n.invalid_union_discriminator:
      G = `Invalid discriminator value. Expected ${y.joinValues(l.options)}`;
      break;
    case n.invalid_enum_value:
      G = `Invalid enum value. Expected ${y.joinValues(l.options)}, received '${l.received}'`;
      break;
    case n.invalid_arguments:
      G = "Invalid function arguments";
      break;
    case n.invalid_return_type:
      G = "Invalid function return type";
      break;
    case n.invalid_date:
      G = "Invalid date";
      break;
    case n.invalid_string:
      typeof l.validation == "object" ? "includes" in l.validation ? (G = `Invalid input: must include "${l.validation.includes}"`, typeof l.validation.position == "number" && (G = `${G} at one or more positions greater than or equal to ${l.validation.position}`)) : "startsWith" in l.validation ? G = `Invalid input: must start with "${l.validation.startsWith}"` : "endsWith" in l.validation ? G = `Invalid input: must end with "${l.validation.endsWith}"` : y.assertNever(l.validation) : l.validation !== "regex" ? G = `Invalid ${l.validation}` : G = "Invalid";
      break;
    case n.too_small:
      l.type === "array" ? G = `Array must contain ${l.exact ? "exactly" : l.inclusive ? "at least" : "more than"} ${l.minimum} element(s)` : l.type === "string" ? G = `String must contain ${l.exact ? "exactly" : l.inclusive ? "at least" : "over"} ${l.minimum} character(s)` : l.type === "number" ? G = `Number must be ${l.exact ? "exactly equal to " : l.inclusive ? "greater than or equal to " : "greater than "}${l.minimum}` : l.type === "date" ? G = `Date must be ${l.exact ? "exactly equal to " : l.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(l.minimum))}` : G = "Invalid input";
      break;
    case n.too_big:
      l.type === "array" ? G = `Array must contain ${l.exact ? "exactly" : l.inclusive ? "at most" : "less than"} ${l.maximum} element(s)` : l.type === "string" ? G = `String must contain ${l.exact ? "exactly" : l.inclusive ? "at most" : "under"} ${l.maximum} character(s)` : l.type === "number" ? G = `Number must be ${l.exact ? "exactly" : l.inclusive ? "less than or equal to" : "less than"} ${l.maximum}` : l.type === "bigint" ? G = `BigInt must be ${l.exact ? "exactly" : l.inclusive ? "less than or equal to" : "less than"} ${l.maximum}` : l.type === "date" ? G = `Date must be ${l.exact ? "exactly" : l.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(l.maximum))}` : G = "Invalid input";
      break;
    case n.custom:
      G = "Invalid input";
      break;
    case n.invalid_intersection_types:
      G = "Intersection results could not be merged";
      break;
    case n.not_multiple_of:
      G = `Number must be a multiple of ${l.multipleOf}`;
      break;
    case n.not_finite:
      G = "Number must be finite";
      break;
    default:
      G = I.defaultError, y.assertNever(l);
  }
  return { message: G };
};
let uc = SI;
function yZ(l) {
  uc = l;
}
function pl() {
  return uc;
}
const Ql = (l) => {
  const { data: I, path: G, errorMaps: c, issueData: b } = l, Z = [...G, ...b.path || []], d = {
    ...b,
    path: Z
  };
  let V = "";
  const m = c.filter((X) => !!X).slice().reverse();
  for (const X of m)
    V = X(d, { data: I, defaultError: V }).message;
  return {
    ...b,
    path: Z,
    message: b.message || V
  };
}, wZ = [];
function h(l, I) {
  const G = Ql({
    issueData: I,
    data: l.data,
    path: l.path,
    errorMaps: [
      l.common.contextualErrorMap,
      l.schemaErrorMap,
      pl(),
      SI
      // then global default map
    ].filter((c) => !!c)
  });
  l.common.issues.push(G);
}
class C {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(I, G) {
    const c = [];
    for (const b of G) {
      if (b.status === "aborted")
        return Q;
      b.status === "dirty" && I.dirty(), c.push(b.value);
    }
    return { status: I.value, value: c };
  }
  static async mergeObjectAsync(I, G) {
    const c = [];
    for (const b of G)
      c.push({
        key: await b.key,
        value: await b.value
      });
    return C.mergeObjectSync(I, c);
  }
  static mergeObjectSync(I, G) {
    const c = {};
    for (const b of G) {
      const { key: Z, value: d } = b;
      if (Z.status === "aborted" || d.status === "aborted")
        return Q;
      Z.status === "dirty" && I.dirty(), d.status === "dirty" && I.dirty(), Z.value !== "__proto__" && (typeof d.value < "u" || b.alwaysSet) && (c[Z.value] = d.value);
    }
    return { status: I.value, value: c };
  }
}
const Q = Object.freeze({
  status: "aborted"
}), vc = (l) => ({ status: "dirty", value: l }), M = (l) => ({ status: "valid", value: l }), VG = (l) => l.status === "aborted", mG = (l) => l.status === "dirty", PI = (l) => l.status === "valid", Hl = (l) => typeof Promise < "u" && l instanceof Promise;
var Y;
(function(l) {
  l.errToObj = (I) => typeof I == "string" ? { message: I } : I || {}, l.toString = (I) => typeof I == "string" ? I : I == null ? void 0 : I.message;
})(Y || (Y = {}));
class II {
  constructor(I, G, c, b) {
    this._cachedPath = [], this.parent = I, this.data = G, this._path = c, this._key = b;
  }
  get path() {
    return this._cachedPath.length || (this._key instanceof Array ? this._cachedPath.push(...this._path, ...this._key) : this._cachedPath.push(...this._path, this._key)), this._cachedPath;
  }
}
const $G = (l, I) => {
  if (PI(I))
    return { success: !0, data: I.value };
  if (!l.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error)
        return this._error;
      const G = new f(l.common.issues);
      return this._error = G, this._error;
    }
  };
};
function J(l) {
  if (!l)
    return {};
  const { errorMap: I, invalid_type_error: G, required_error: c, description: b } = l;
  if (I && (G || c))
    throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
  return I ? { errorMap: I, description: b } : { errorMap: (d, V) => d.code !== "invalid_type" ? { message: V.defaultError } : typeof V.data > "u" ? { message: c ?? V.defaultError } : { message: G ?? V.defaultError }, description: b };
}
class u {
  constructor(I) {
    this.spa = this.safeParseAsync, this._def = I, this.parse = this.parse.bind(this), this.safeParse = this.safeParse.bind(this), this.parseAsync = this.parseAsync.bind(this), this.safeParseAsync = this.safeParseAsync.bind(this), this.spa = this.spa.bind(this), this.refine = this.refine.bind(this), this.refinement = this.refinement.bind(this), this.superRefine = this.superRefine.bind(this), this.optional = this.optional.bind(this), this.nullable = this.nullable.bind(this), this.nullish = this.nullish.bind(this), this.array = this.array.bind(this), this.promise = this.promise.bind(this), this.or = this.or.bind(this), this.and = this.and.bind(this), this.transform = this.transform.bind(this), this.brand = this.brand.bind(this), this.default = this.default.bind(this), this.catch = this.catch.bind(this), this.describe = this.describe.bind(this), this.pipe = this.pipe.bind(this), this.readonly = this.readonly.bind(this), this.isNullable = this.isNullable.bind(this), this.isOptional = this.isOptional.bind(this);
  }
  get description() {
    return this._def.description;
  }
  _getType(I) {
    return NI(I.data);
  }
  _getOrReturnCtx(I, G) {
    return G || {
      common: I.parent.common,
      data: I.data,
      parsedType: NI(I.data),
      schemaErrorMap: this._def.errorMap,
      path: I.path,
      parent: I.parent
    };
  }
  _processInputParams(I) {
    return {
      status: new C(),
      ctx: {
        common: I.parent.common,
        data: I.data,
        parsedType: NI(I.data),
        schemaErrorMap: this._def.errorMap,
        path: I.path,
        parent: I.parent
      }
    };
  }
  _parseSync(I) {
    const G = this._parse(I);
    if (Hl(G))
      throw new Error("Synchronous parse encountered promise.");
    return G;
  }
  _parseAsync(I) {
    const G = this._parse(I);
    return Promise.resolve(G);
  }
  parse(I, G) {
    const c = this.safeParse(I, G);
    if (c.success)
      return c.data;
    throw c.error;
  }
  safeParse(I, G) {
    var c;
    const b = {
      common: {
        issues: [],
        async: (c = G == null ? void 0 : G.async) !== null && c !== void 0 ? c : !1,
        contextualErrorMap: G == null ? void 0 : G.errorMap
      },
      path: (G == null ? void 0 : G.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: I,
      parsedType: NI(I)
    }, Z = this._parseSync({ data: I, path: b.path, parent: b });
    return $G(b, Z);
  }
  async parseAsync(I, G) {
    const c = await this.safeParseAsync(I, G);
    if (c.success)
      return c.data;
    throw c.error;
  }
  async safeParseAsync(I, G) {
    const c = {
      common: {
        issues: [],
        contextualErrorMap: G == null ? void 0 : G.errorMap,
        async: !0
      },
      path: (G == null ? void 0 : G.path) || [],
      schemaErrorMap: this._def.errorMap,
      parent: null,
      data: I,
      parsedType: NI(I)
    }, b = this._parse({ data: I, path: c.path, parent: c }), Z = await (Hl(b) ? b : Promise.resolve(b));
    return $G(c, Z);
  }
  refine(I, G) {
    const c = (b) => typeof G == "string" || typeof G > "u" ? { message: G } : typeof G == "function" ? G(b) : G;
    return this._refinement((b, Z) => {
      const d = I(b), V = () => Z.addIssue({
        code: n.custom,
        ...c(b)
      });
      return typeof Promise < "u" && d instanceof Promise ? d.then((m) => m ? !0 : (V(), !1)) : d ? !0 : (V(), !1);
    });
  }
  refinement(I, G) {
    return this._refinement((c, b) => I(c) ? !0 : (b.addIssue(typeof G == "function" ? G(c, b) : G), !1));
  }
  _refinement(I) {
    return new D({
      schema: this,
      typeName: R.ZodEffects,
      effect: { type: "refinement", refinement: I }
    });
  }
  superRefine(I) {
    return this._refinement(I);
  }
  optional() {
    return dI.create(this, this._def);
  }
  nullable() {
    return wI.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return O.create(this, this._def);
  }
  promise() {
    return CI.create(this, this._def);
  }
  or(I) {
    return qI.create([this, I], this._def);
  }
  and(I) {
    return _I.create(this, I, this._def);
  }
  transform(I) {
    return new D({
      ...J(this._def),
      schema: this,
      typeName: R.ZodEffects,
      effect: { type: "transform", transform: I }
    });
  }
  default(I) {
    const G = typeof I == "function" ? I : () => I;
    return new cl({
      ...J(this._def),
      innerType: this,
      defaultValue: G,
      typeName: R.ZodDefault
    });
  }
  brand() {
    return new wc({
      typeName: R.ZodBranded,
      type: this,
      ...J(this._def)
    });
  }
  catch(I) {
    const G = typeof I == "function" ? I : () => I;
    return new yl({
      ...J(this._def),
      innerType: this,
      catchValue: G,
      typeName: R.ZodCatch
    });
  }
  describe(I) {
    const G = this.constructor;
    return new G({
      ...this._def,
      description: I
    });
  }
  pipe(I) {
    return ml.create(this, I);
  }
  readonly() {
    return El.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const EZ = /^c[^\s-]{8,}$/i, oZ = /^[a-z][a-z0-9]*$/, gZ = /^[0-9A-HJKMNP-TV-Z]{26}$/, LZ = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i, AZ = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i, rZ = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let $l;
const iZ = /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/, UZ = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/, kZ = (l) => l.precision ? l.offset ? new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${l.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`) : new RegExp(`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${l.precision}}Z$`) : l.precision === 0 ? l.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$") : l.offset ? new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$") : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function xZ(l, I) {
  return !!((I === "v4" || !I) && iZ.test(l) || (I === "v6" || !I) && UZ.test(l));
}
class P extends u {
  _parse(I) {
    if (this._def.coerce && (I.data = String(I.data)), this._getType(I) !== e.string) {
      const Z = this._getOrReturnCtx(I);
      return h(
        Z,
        {
          code: n.invalid_type,
          expected: e.string,
          received: Z.parsedType
        }
        //
      ), Q;
    }
    const c = new C();
    let b;
    for (const Z of this._def.checks)
      if (Z.kind === "min")
        I.data.length < Z.value && (b = this._getOrReturnCtx(I, b), h(b, {
          code: n.too_small,
          minimum: Z.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: Z.message
        }), c.dirty());
      else if (Z.kind === "max")
        I.data.length > Z.value && (b = this._getOrReturnCtx(I, b), h(b, {
          code: n.too_big,
          maximum: Z.value,
          type: "string",
          inclusive: !0,
          exact: !1,
          message: Z.message
        }), c.dirty());
      else if (Z.kind === "length") {
        const d = I.data.length > Z.value, V = I.data.length < Z.value;
        (d || V) && (b = this._getOrReturnCtx(I, b), d ? h(b, {
          code: n.too_big,
          maximum: Z.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: Z.message
        }) : V && h(b, {
          code: n.too_small,
          minimum: Z.value,
          type: "string",
          inclusive: !0,
          exact: !0,
          message: Z.message
        }), c.dirty());
      } else if (Z.kind === "email")
        AZ.test(I.data) || (b = this._getOrReturnCtx(I, b), h(b, {
          validation: "email",
          code: n.invalid_string,
          message: Z.message
        }), c.dirty());
      else if (Z.kind === "emoji")
        $l || ($l = new RegExp(rZ, "u")), $l.test(I.data) || (b = this._getOrReturnCtx(I, b), h(b, {
          validation: "emoji",
          code: n.invalid_string,
          message: Z.message
        }), c.dirty());
      else if (Z.kind === "uuid")
        LZ.test(I.data) || (b = this._getOrReturnCtx(I, b), h(b, {
          validation: "uuid",
          code: n.invalid_string,
          message: Z.message
        }), c.dirty());
      else if (Z.kind === "cuid")
        EZ.test(I.data) || (b = this._getOrReturnCtx(I, b), h(b, {
          validation: "cuid",
          code: n.invalid_string,
          message: Z.message
        }), c.dirty());
      else if (Z.kind === "cuid2")
        oZ.test(I.data) || (b = this._getOrReturnCtx(I, b), h(b, {
          validation: "cuid2",
          code: n.invalid_string,
          message: Z.message
        }), c.dirty());
      else if (Z.kind === "ulid")
        gZ.test(I.data) || (b = this._getOrReturnCtx(I, b), h(b, {
          validation: "ulid",
          code: n.invalid_string,
          message: Z.message
        }), c.dirty());
      else if (Z.kind === "url")
        try {
          new URL(I.data);
        } catch {
          b = this._getOrReturnCtx(I, b), h(b, {
            validation: "url",
            code: n.invalid_string,
            message: Z.message
          }), c.dirty();
        }
      else
        Z.kind === "regex" ? (Z.regex.lastIndex = 0, Z.regex.test(I.data) || (b = this._getOrReturnCtx(I, b), h(b, {
          validation: "regex",
          code: n.invalid_string,
          message: Z.message
        }), c.dirty())) : Z.kind === "trim" ? I.data = I.data.trim() : Z.kind === "includes" ? I.data.includes(Z.value, Z.position) || (b = this._getOrReturnCtx(I, b), h(b, {
          code: n.invalid_string,
          validation: { includes: Z.value, position: Z.position },
          message: Z.message
        }), c.dirty()) : Z.kind === "toLowerCase" ? I.data = I.data.toLowerCase() : Z.kind === "toUpperCase" ? I.data = I.data.toUpperCase() : Z.kind === "startsWith" ? I.data.startsWith(Z.value) || (b = this._getOrReturnCtx(I, b), h(b, {
          code: n.invalid_string,
          validation: { startsWith: Z.value },
          message: Z.message
        }), c.dirty()) : Z.kind === "endsWith" ? I.data.endsWith(Z.value) || (b = this._getOrReturnCtx(I, b), h(b, {
          code: n.invalid_string,
          validation: { endsWith: Z.value },
          message: Z.message
        }), c.dirty()) : Z.kind === "datetime" ? kZ(Z).test(I.data) || (b = this._getOrReturnCtx(I, b), h(b, {
          code: n.invalid_string,
          validation: "datetime",
          message: Z.message
        }), c.dirty()) : Z.kind === "ip" ? xZ(I.data, Z.version) || (b = this._getOrReturnCtx(I, b), h(b, {
          validation: "ip",
          code: n.invalid_string,
          message: Z.message
        }), c.dirty()) : y.assertNever(Z);
    return { status: c.value, value: I.data };
  }
  _regex(I, G, c) {
    return this.refinement((b) => I.test(b), {
      validation: G,
      code: n.invalid_string,
      ...Y.errToObj(c)
    });
  }
  _addCheck(I) {
    return new P({
      ...this._def,
      checks: [...this._def.checks, I]
    });
  }
  email(I) {
    return this._addCheck({ kind: "email", ...Y.errToObj(I) });
  }
  url(I) {
    return this._addCheck({ kind: "url", ...Y.errToObj(I) });
  }
  emoji(I) {
    return this._addCheck({ kind: "emoji", ...Y.errToObj(I) });
  }
  uuid(I) {
    return this._addCheck({ kind: "uuid", ...Y.errToObj(I) });
  }
  cuid(I) {
    return this._addCheck({ kind: "cuid", ...Y.errToObj(I) });
  }
  cuid2(I) {
    return this._addCheck({ kind: "cuid2", ...Y.errToObj(I) });
  }
  ulid(I) {
    return this._addCheck({ kind: "ulid", ...Y.errToObj(I) });
  }
  ip(I) {
    return this._addCheck({ kind: "ip", ...Y.errToObj(I) });
  }
  datetime(I) {
    var G;
    return typeof I == "string" ? this._addCheck({
      kind: "datetime",
      precision: null,
      offset: !1,
      message: I
    }) : this._addCheck({
      kind: "datetime",
      precision: typeof (I == null ? void 0 : I.precision) > "u" ? null : I == null ? void 0 : I.precision,
      offset: (G = I == null ? void 0 : I.offset) !== null && G !== void 0 ? G : !1,
      ...Y.errToObj(I == null ? void 0 : I.message)
    });
  }
  regex(I, G) {
    return this._addCheck({
      kind: "regex",
      regex: I,
      ...Y.errToObj(G)
    });
  }
  includes(I, G) {
    return this._addCheck({
      kind: "includes",
      value: I,
      position: G == null ? void 0 : G.position,
      ...Y.errToObj(G == null ? void 0 : G.message)
    });
  }
  startsWith(I, G) {
    return this._addCheck({
      kind: "startsWith",
      value: I,
      ...Y.errToObj(G)
    });
  }
  endsWith(I, G) {
    return this._addCheck({
      kind: "endsWith",
      value: I,
      ...Y.errToObj(G)
    });
  }
  min(I, G) {
    return this._addCheck({
      kind: "min",
      value: I,
      ...Y.errToObj(G)
    });
  }
  max(I, G) {
    return this._addCheck({
      kind: "max",
      value: I,
      ...Y.errToObj(G)
    });
  }
  length(I, G) {
    return this._addCheck({
      kind: "length",
      value: I,
      ...Y.errToObj(G)
    });
  }
  /**
   * @deprecated Use z.string().min(1) instead.
   * @see {@link ZodString.min}
   */
  nonempty(I) {
    return this.min(1, Y.errToObj(I));
  }
  trim() {
    return new P({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }]
    });
  }
  toLowerCase() {
    return new P({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }]
    });
  }
  toUpperCase() {
    return new P({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }]
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((I) => I.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((I) => I.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((I) => I.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((I) => I.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((I) => I.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((I) => I.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((I) => I.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((I) => I.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((I) => I.kind === "ip");
  }
  get minLength() {
    let I = null;
    for (const G of this._def.checks)
      G.kind === "min" && (I === null || G.value > I) && (I = G.value);
    return I;
  }
  get maxLength() {
    let I = null;
    for (const G of this._def.checks)
      G.kind === "max" && (I === null || G.value < I) && (I = G.value);
    return I;
  }
}
P.create = (l) => {
  var I;
  return new P({
    checks: [],
    typeName: R.ZodString,
    coerce: (I = l == null ? void 0 : l.coerce) !== null && I !== void 0 ? I : !1,
    ...J(l)
  });
};
function zZ(l, I) {
  const G = (l.toString().split(".")[1] || "").length, c = (I.toString().split(".")[1] || "").length, b = G > c ? G : c, Z = parseInt(l.toFixed(b).replace(".", "")), d = parseInt(I.toFixed(b).replace(".", ""));
  return Z % d / Math.pow(10, b);
}
class RI extends u {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte, this.step = this.multipleOf;
  }
  _parse(I) {
    if (this._def.coerce && (I.data = Number(I.data)), this._getType(I) !== e.number) {
      const Z = this._getOrReturnCtx(I);
      return h(Z, {
        code: n.invalid_type,
        expected: e.number,
        received: Z.parsedType
      }), Q;
    }
    let c;
    const b = new C();
    for (const Z of this._def.checks)
      Z.kind === "int" ? y.isInteger(I.data) || (c = this._getOrReturnCtx(I, c), h(c, {
        code: n.invalid_type,
        expected: "integer",
        received: "float",
        message: Z.message
      }), b.dirty()) : Z.kind === "min" ? (Z.inclusive ? I.data < Z.value : I.data <= Z.value) && (c = this._getOrReturnCtx(I, c), h(c, {
        code: n.too_small,
        minimum: Z.value,
        type: "number",
        inclusive: Z.inclusive,
        exact: !1,
        message: Z.message
      }), b.dirty()) : Z.kind === "max" ? (Z.inclusive ? I.data > Z.value : I.data >= Z.value) && (c = this._getOrReturnCtx(I, c), h(c, {
        code: n.too_big,
        maximum: Z.value,
        type: "number",
        inclusive: Z.inclusive,
        exact: !1,
        message: Z.message
      }), b.dirty()) : Z.kind === "multipleOf" ? zZ(I.data, Z.value) !== 0 && (c = this._getOrReturnCtx(I, c), h(c, {
        code: n.not_multiple_of,
        multipleOf: Z.value,
        message: Z.message
      }), b.dirty()) : Z.kind === "finite" ? Number.isFinite(I.data) || (c = this._getOrReturnCtx(I, c), h(c, {
        code: n.not_finite,
        message: Z.message
      }), b.dirty()) : y.assertNever(Z);
    return { status: b.value, value: I.data };
  }
  gte(I, G) {
    return this.setLimit("min", I, !0, Y.toString(G));
  }
  gt(I, G) {
    return this.setLimit("min", I, !1, Y.toString(G));
  }
  lte(I, G) {
    return this.setLimit("max", I, !0, Y.toString(G));
  }
  lt(I, G) {
    return this.setLimit("max", I, !1, Y.toString(G));
  }
  setLimit(I, G, c, b) {
    return new RI({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: I,
          value: G,
          inclusive: c,
          message: Y.toString(b)
        }
      ]
    });
  }
  _addCheck(I) {
    return new RI({
      ...this._def,
      checks: [...this._def.checks, I]
    });
  }
  int(I) {
    return this._addCheck({
      kind: "int",
      message: Y.toString(I)
    });
  }
  positive(I) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: Y.toString(I)
    });
  }
  negative(I) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: Y.toString(I)
    });
  }
  nonpositive(I) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: Y.toString(I)
    });
  }
  nonnegative(I) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: Y.toString(I)
    });
  }
  multipleOf(I, G) {
    return this._addCheck({
      kind: "multipleOf",
      value: I,
      message: Y.toString(G)
    });
  }
  finite(I) {
    return this._addCheck({
      kind: "finite",
      message: Y.toString(I)
    });
  }
  safe(I) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: Y.toString(I)
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: Y.toString(I)
    });
  }
  get minValue() {
    let I = null;
    for (const G of this._def.checks)
      G.kind === "min" && (I === null || G.value > I) && (I = G.value);
    return I;
  }
  get maxValue() {
    let I = null;
    for (const G of this._def.checks)
      G.kind === "max" && (I === null || G.value < I) && (I = G.value);
    return I;
  }
  get isInt() {
    return !!this._def.checks.find((I) => I.kind === "int" || I.kind === "multipleOf" && y.isInteger(I.value));
  }
  get isFinite() {
    let I = null, G = null;
    for (const c of this._def.checks) {
      if (c.kind === "finite" || c.kind === "int" || c.kind === "multipleOf")
        return !0;
      c.kind === "min" ? (G === null || c.value > G) && (G = c.value) : c.kind === "max" && (I === null || c.value < I) && (I = c.value);
    }
    return Number.isFinite(G) && Number.isFinite(I);
  }
}
RI.create = (l) => new RI({
  checks: [],
  typeName: R.ZodNumber,
  coerce: (l == null ? void 0 : l.coerce) || !1,
  ...J(l)
});
class nI extends u {
  constructor() {
    super(...arguments), this.min = this.gte, this.max = this.lte;
  }
  _parse(I) {
    if (this._def.coerce && (I.data = BigInt(I.data)), this._getType(I) !== e.bigint) {
      const Z = this._getOrReturnCtx(I);
      return h(Z, {
        code: n.invalid_type,
        expected: e.bigint,
        received: Z.parsedType
      }), Q;
    }
    let c;
    const b = new C();
    for (const Z of this._def.checks)
      Z.kind === "min" ? (Z.inclusive ? I.data < Z.value : I.data <= Z.value) && (c = this._getOrReturnCtx(I, c), h(c, {
        code: n.too_small,
        type: "bigint",
        minimum: Z.value,
        inclusive: Z.inclusive,
        message: Z.message
      }), b.dirty()) : Z.kind === "max" ? (Z.inclusive ? I.data > Z.value : I.data >= Z.value) && (c = this._getOrReturnCtx(I, c), h(c, {
        code: n.too_big,
        type: "bigint",
        maximum: Z.value,
        inclusive: Z.inclusive,
        message: Z.message
      }), b.dirty()) : Z.kind === "multipleOf" ? I.data % Z.value !== BigInt(0) && (c = this._getOrReturnCtx(I, c), h(c, {
        code: n.not_multiple_of,
        multipleOf: Z.value,
        message: Z.message
      }), b.dirty()) : y.assertNever(Z);
    return { status: b.value, value: I.data };
  }
  gte(I, G) {
    return this.setLimit("min", I, !0, Y.toString(G));
  }
  gt(I, G) {
    return this.setLimit("min", I, !1, Y.toString(G));
  }
  lte(I, G) {
    return this.setLimit("max", I, !0, Y.toString(G));
  }
  lt(I, G) {
    return this.setLimit("max", I, !1, Y.toString(G));
  }
  setLimit(I, G, c, b) {
    return new nI({
      ...this._def,
      checks: [
        ...this._def.checks,
        {
          kind: I,
          value: G,
          inclusive: c,
          message: Y.toString(b)
        }
      ]
    });
  }
  _addCheck(I) {
    return new nI({
      ...this._def,
      checks: [...this._def.checks, I]
    });
  }
  positive(I) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: Y.toString(I)
    });
  }
  negative(I) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: Y.toString(I)
    });
  }
  nonpositive(I) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: Y.toString(I)
    });
  }
  nonnegative(I) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: Y.toString(I)
    });
  }
  multipleOf(I, G) {
    return this._addCheck({
      kind: "multipleOf",
      value: I,
      message: Y.toString(G)
    });
  }
  get minValue() {
    let I = null;
    for (const G of this._def.checks)
      G.kind === "min" && (I === null || G.value > I) && (I = G.value);
    return I;
  }
  get maxValue() {
    let I = null;
    for (const G of this._def.checks)
      G.kind === "max" && (I === null || G.value < I) && (I = G.value);
    return I;
  }
}
nI.create = (l) => {
  var I;
  return new nI({
    checks: [],
    typeName: R.ZodBigInt,
    coerce: (I = l == null ? void 0 : l.coerce) !== null && I !== void 0 ? I : !1,
    ...J(l)
  });
};
class fI extends u {
  _parse(I) {
    if (this._def.coerce && (I.data = !!I.data), this._getType(I) !== e.boolean) {
      const c = this._getOrReturnCtx(I);
      return h(c, {
        code: n.invalid_type,
        expected: e.boolean,
        received: c.parsedType
      }), Q;
    }
    return M(I.data);
  }
}
fI.create = (l) => new fI({
  typeName: R.ZodBoolean,
  coerce: (l == null ? void 0 : l.coerce) || !1,
  ...J(l)
});
class vI extends u {
  _parse(I) {
    if (this._def.coerce && (I.data = new Date(I.data)), this._getType(I) !== e.date) {
      const Z = this._getOrReturnCtx(I);
      return h(Z, {
        code: n.invalid_type,
        expected: e.date,
        received: Z.parsedType
      }), Q;
    }
    if (isNaN(I.data.getTime())) {
      const Z = this._getOrReturnCtx(I);
      return h(Z, {
        code: n.invalid_date
      }), Q;
    }
    const c = new C();
    let b;
    for (const Z of this._def.checks)
      Z.kind === "min" ? I.data.getTime() < Z.value && (b = this._getOrReturnCtx(I, b), h(b, {
        code: n.too_small,
        message: Z.message,
        inclusive: !0,
        exact: !1,
        minimum: Z.value,
        type: "date"
      }), c.dirty()) : Z.kind === "max" ? I.data.getTime() > Z.value && (b = this._getOrReturnCtx(I, b), h(b, {
        code: n.too_big,
        message: Z.message,
        inclusive: !0,
        exact: !1,
        maximum: Z.value,
        type: "date"
      }), c.dirty()) : y.assertNever(Z);
    return {
      status: c.value,
      value: new Date(I.data.getTime())
    };
  }
  _addCheck(I) {
    return new vI({
      ...this._def,
      checks: [...this._def.checks, I]
    });
  }
  min(I, G) {
    return this._addCheck({
      kind: "min",
      value: I.getTime(),
      message: Y.toString(G)
    });
  }
  max(I, G) {
    return this._addCheck({
      kind: "max",
      value: I.getTime(),
      message: Y.toString(G)
    });
  }
  get minDate() {
    let I = null;
    for (const G of this._def.checks)
      G.kind === "min" && (I === null || G.value > I) && (I = G.value);
    return I != null ? new Date(I) : null;
  }
  get maxDate() {
    let I = null;
    for (const G of this._def.checks)
      G.kind === "max" && (I === null || G.value < I) && (I = G.value);
    return I != null ? new Date(I) : null;
  }
}
vI.create = (l) => new vI({
  checks: [],
  coerce: (l == null ? void 0 : l.coerce) || !1,
  typeName: R.ZodDate,
  ...J(l)
});
class Jl extends u {
  _parse(I) {
    if (this._getType(I) !== e.symbol) {
      const c = this._getOrReturnCtx(I);
      return h(c, {
        code: n.invalid_type,
        expected: e.symbol,
        received: c.parsedType
      }), Q;
    }
    return M(I.data);
  }
}
Jl.create = (l) => new Jl({
  typeName: R.ZodSymbol,
  ...J(l)
});
class OI extends u {
  _parse(I) {
    if (this._getType(I) !== e.undefined) {
      const c = this._getOrReturnCtx(I);
      return h(c, {
        code: n.invalid_type,
        expected: e.undefined,
        received: c.parsedType
      }), Q;
    }
    return M(I.data);
  }
}
OI.create = (l) => new OI({
  typeName: R.ZodUndefined,
  ...J(l)
});
class DI extends u {
  _parse(I) {
    if (this._getType(I) !== e.null) {
      const c = this._getOrReturnCtx(I);
      return h(c, {
        code: n.invalid_type,
        expected: e.null,
        received: c.parsedType
      }), Q;
    }
    return M(I.data);
  }
}
DI.create = (l) => new DI({
  typeName: R.ZodNull,
  ...J(l)
});
class BI extends u {
  constructor() {
    super(...arguments), this._any = !0;
  }
  _parse(I) {
    return M(I.data);
  }
}
BI.create = (l) => new BI({
  typeName: R.ZodAny,
  ...J(l)
});
class sI extends u {
  constructor() {
    super(...arguments), this._unknown = !0;
  }
  _parse(I) {
    return M(I.data);
  }
}
sI.create = (l) => new sI({
  typeName: R.ZodUnknown,
  ...J(l)
});
class WI extends u {
  _parse(I) {
    const G = this._getOrReturnCtx(I);
    return h(G, {
      code: n.invalid_type,
      expected: e.never,
      received: G.parsedType
    }), Q;
  }
}
WI.create = (l) => new WI({
  typeName: R.ZodNever,
  ...J(l)
});
class ul extends u {
  _parse(I) {
    if (this._getType(I) !== e.undefined) {
      const c = this._getOrReturnCtx(I);
      return h(c, {
        code: n.invalid_type,
        expected: e.void,
        received: c.parsedType
      }), Q;
    }
    return M(I.data);
  }
}
ul.create = (l) => new ul({
  typeName: R.ZodVoid,
  ...J(l)
});
class O extends u {
  _parse(I) {
    const { ctx: G, status: c } = this._processInputParams(I), b = this._def;
    if (G.parsedType !== e.array)
      return h(G, {
        code: n.invalid_type,
        expected: e.array,
        received: G.parsedType
      }), Q;
    if (b.exactLength !== null) {
      const d = G.data.length > b.exactLength.value, V = G.data.length < b.exactLength.value;
      (d || V) && (h(G, {
        code: d ? n.too_big : n.too_small,
        minimum: V ? b.exactLength.value : void 0,
        maximum: d ? b.exactLength.value : void 0,
        type: "array",
        inclusive: !0,
        exact: !0,
        message: b.exactLength.message
      }), c.dirty());
    }
    if (b.minLength !== null && G.data.length < b.minLength.value && (h(G, {
      code: n.too_small,
      minimum: b.minLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: b.minLength.message
    }), c.dirty()), b.maxLength !== null && G.data.length > b.maxLength.value && (h(G, {
      code: n.too_big,
      maximum: b.maxLength.value,
      type: "array",
      inclusive: !0,
      exact: !1,
      message: b.maxLength.message
    }), c.dirty()), G.common.async)
      return Promise.all([...G.data].map((d, V) => b.type._parseAsync(new II(G, d, G.path, V)))).then((d) => C.mergeArray(c, d));
    const Z = [...G.data].map((d, V) => b.type._parseSync(new II(G, d, G.path, V)));
    return C.mergeArray(c, Z);
  }
  get element() {
    return this._def.type;
  }
  min(I, G) {
    return new O({
      ...this._def,
      minLength: { value: I, message: Y.toString(G) }
    });
  }
  max(I, G) {
    return new O({
      ...this._def,
      maxLength: { value: I, message: Y.toString(G) }
    });
  }
  length(I, G) {
    return new O({
      ...this._def,
      exactLength: { value: I, message: Y.toString(G) }
    });
  }
  nonempty(I) {
    return this.min(1, I);
  }
}
O.create = (l, I) => new O({
  type: l,
  minLength: null,
  maxLength: null,
  exactLength: null,
  typeName: R.ZodArray,
  ...J(I)
});
function AI(l) {
  if (l instanceof i) {
    const I = {};
    for (const G in l.shape) {
      const c = l.shape[G];
      I[G] = dI.create(AI(c));
    }
    return new i({
      ...l._def,
      shape: () => I
    });
  } else
    return l instanceof O ? new O({
      ...l._def,
      type: AI(l.element)
    }) : l instanceof dI ? dI.create(AI(l.unwrap())) : l instanceof wI ? wI.create(AI(l.unwrap())) : l instanceof lI ? lI.create(l.items.map((I) => AI(I))) : l;
}
class i extends u {
  constructor() {
    super(...arguments), this._cached = null, this.nonstrict = this.passthrough, this.augment = this.extend;
  }
  _getCached() {
    if (this._cached !== null)
      return this._cached;
    const I = this._def.shape(), G = y.objectKeys(I);
    return this._cached = { shape: I, keys: G };
  }
  _parse(I) {
    if (this._getType(I) !== e.object) {
      const X = this._getOrReturnCtx(I);
      return h(X, {
        code: n.invalid_type,
        expected: e.object,
        received: X.parsedType
      }), Q;
    }
    const { status: c, ctx: b } = this._processInputParams(I), { shape: Z, keys: d } = this._getCached(), V = [];
    if (!(this._def.catchall instanceof WI && this._def.unknownKeys === "strip"))
      for (const X in b.data)
        d.includes(X) || V.push(X);
    const m = [];
    for (const X of d) {
      const N = Z[X], t = b.data[X];
      m.push({
        key: { status: "valid", value: X },
        value: N._parse(new II(b, t, b.path, X)),
        alwaysSet: X in b.data
      });
    }
    if (this._def.catchall instanceof WI) {
      const X = this._def.unknownKeys;
      if (X === "passthrough")
        for (const N of V)
          m.push({
            key: { status: "valid", value: N },
            value: { status: "valid", value: b.data[N] }
          });
      else if (X === "strict")
        V.length > 0 && (h(b, {
          code: n.unrecognized_keys,
          keys: V
        }), c.dirty());
      else if (X !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const X = this._def.catchall;
      for (const N of V) {
        const t = b.data[N];
        m.push({
          key: { status: "valid", value: N },
          value: X._parse(
            new II(b, t, b.path, N)
            //, ctx.child(key), value, getParsedType(value)
          ),
          alwaysSet: N in b.data
        });
      }
    }
    return b.common.async ? Promise.resolve().then(async () => {
      const X = [];
      for (const N of m) {
        const t = await N.key;
        X.push({
          key: t,
          value: await N.value,
          alwaysSet: N.alwaysSet
        });
      }
      return X;
    }).then((X) => C.mergeObjectSync(c, X)) : C.mergeObjectSync(c, m);
  }
  get shape() {
    return this._def.shape();
  }
  strict(I) {
    return Y.errToObj, new i({
      ...this._def,
      unknownKeys: "strict",
      ...I !== void 0 ? {
        errorMap: (G, c) => {
          var b, Z, d, V;
          const m = (d = (Z = (b = this._def).errorMap) === null || Z === void 0 ? void 0 : Z.call(b, G, c).message) !== null && d !== void 0 ? d : c.defaultError;
          return G.code === "unrecognized_keys" ? {
            message: (V = Y.errToObj(I).message) !== null && V !== void 0 ? V : m
          } : {
            message: m
          };
        }
      } : {}
    });
  }
  strip() {
    return new i({
      ...this._def,
      unknownKeys: "strip"
    });
  }
  passthrough() {
    return new i({
      ...this._def,
      unknownKeys: "passthrough"
    });
  }
  // const AugmentFactory =
  //   <Def extends ZodObjectDef>(def: Def) =>
  //   <Augmentation extends ZodRawShape>(
  //     augmentation: Augmentation
  //   ): ZodObject<
  //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
  //     Def["unknownKeys"],
  //     Def["catchall"]
  //   > => {
  //     return new ZodObject({
  //       ...def,
  //       shape: () => ({
  //         ...def.shape(),
  //         ...augmentation,
  //       }),
  //     }) as any;
  //   };
  extend(I) {
    return new i({
      ...this._def,
      shape: () => ({
        ...this._def.shape(),
        ...I
      })
    });
  }
  /**
   * Prior to zod@1.0.12 there was a bug in the
   * inferred type of merged objects. Please
   * upgrade if you are experiencing issues.
   */
  merge(I) {
    return new i({
      unknownKeys: I._def.unknownKeys,
      catchall: I._def.catchall,
      shape: () => ({
        ...this._def.shape(),
        ...I._def.shape()
      }),
      typeName: R.ZodObject
    });
  }
  // merge<
  //   Incoming extends AnyZodObject,
  //   Augmentation extends Incoming["shape"],
  //   NewOutput extends {
  //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
  //       ? Augmentation[k]["_output"]
  //       : k extends keyof Output
  //       ? Output[k]
  //       : never;
  //   },
  //   NewInput extends {
  //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
  //       ? Augmentation[k]["_input"]
  //       : k extends keyof Input
  //       ? Input[k]
  //       : never;
  //   }
  // >(
  //   merging: Incoming
  // ): ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"],
  //   NewOutput,
  //   NewInput
  // > {
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  setKey(I, G) {
    return this.augment({ [I]: G });
  }
  // merge<Incoming extends AnyZodObject>(
  //   merging: Incoming
  // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
  // ZodObject<
  //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
  //   Incoming["_def"]["unknownKeys"],
  //   Incoming["_def"]["catchall"]
  // > {
  //   // const mergedShape = objectUtil.mergeShapes(
  //   //   this._def.shape(),
  //   //   merging._def.shape()
  //   // );
  //   const merged: any = new ZodObject({
  //     unknownKeys: merging._def.unknownKeys,
  //     catchall: merging._def.catchall,
  //     shape: () =>
  //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
  //     typeName: ZodFirstPartyTypeKind.ZodObject,
  //   }) as any;
  //   return merged;
  // }
  catchall(I) {
    return new i({
      ...this._def,
      catchall: I
    });
  }
  pick(I) {
    const G = {};
    return y.objectKeys(I).forEach((c) => {
      I[c] && this.shape[c] && (G[c] = this.shape[c]);
    }), new i({
      ...this._def,
      shape: () => G
    });
  }
  omit(I) {
    const G = {};
    return y.objectKeys(this.shape).forEach((c) => {
      I[c] || (G[c] = this.shape[c]);
    }), new i({
      ...this._def,
      shape: () => G
    });
  }
  /**
   * @deprecated
   */
  deepPartial() {
    return AI(this);
  }
  partial(I) {
    const G = {};
    return y.objectKeys(this.shape).forEach((c) => {
      const b = this.shape[c];
      I && !I[c] ? G[c] = b : G[c] = b.optional();
    }), new i({
      ...this._def,
      shape: () => G
    });
  }
  required(I) {
    const G = {};
    return y.objectKeys(this.shape).forEach((c) => {
      if (I && !I[c])
        G[c] = this.shape[c];
      else {
        let Z = this.shape[c];
        for (; Z instanceof dI; )
          Z = Z._def.innerType;
        G[c] = Z;
      }
    }), new i({
      ...this._def,
      shape: () => G
    });
  }
  keyof() {
    return yc(y.objectKeys(this.shape));
  }
}
i.create = (l, I) => new i({
  shape: () => l,
  unknownKeys: "strip",
  catchall: WI.create(),
  typeName: R.ZodObject,
  ...J(I)
});
i.strictCreate = (l, I) => new i({
  shape: () => l,
  unknownKeys: "strict",
  catchall: WI.create(),
  typeName: R.ZodObject,
  ...J(I)
});
i.lazycreate = (l, I) => new i({
  shape: l,
  unknownKeys: "strip",
  catchall: WI.create(),
  typeName: R.ZodObject,
  ...J(I)
});
class qI extends u {
  _parse(I) {
    const { ctx: G } = this._processInputParams(I), c = this._def.options;
    function b(Z) {
      for (const V of Z)
        if (V.result.status === "valid")
          return V.result;
      for (const V of Z)
        if (V.result.status === "dirty")
          return G.common.issues.push(...V.ctx.common.issues), V.result;
      const d = Z.map((V) => new f(V.ctx.common.issues));
      return h(G, {
        code: n.invalid_union,
        unionErrors: d
      }), Q;
    }
    if (G.common.async)
      return Promise.all(c.map(async (Z) => {
        const d = {
          ...G,
          common: {
            ...G.common,
            issues: []
          },
          parent: null
        };
        return {
          result: await Z._parseAsync({
            data: G.data,
            path: G.path,
            parent: d
          }),
          ctx: d
        };
      })).then(b);
    {
      let Z;
      const d = [];
      for (const m of c) {
        const X = {
          ...G,
          common: {
            ...G.common,
            issues: []
          },
          parent: null
        }, N = m._parseSync({
          data: G.data,
          path: G.path,
          parent: X
        });
        if (N.status === "valid")
          return N;
        N.status === "dirty" && !Z && (Z = { result: N, ctx: X }), X.common.issues.length && d.push(X.common.issues);
      }
      if (Z)
        return G.common.issues.push(...Z.ctx.common.issues), Z.result;
      const V = d.map((m) => new f(m));
      return h(G, {
        code: n.invalid_union,
        unionErrors: V
      }), Q;
    }
  }
  get options() {
    return this._def.options;
  }
}
qI.create = (l, I) => new qI({
  options: l,
  typeName: R.ZodUnion,
  ...J(I)
});
const hl = (l) => l instanceof Il ? hl(l.schema) : l instanceof D ? hl(l.innerType()) : l instanceof ll ? [l.value] : l instanceof tI ? l.options : l instanceof Gl ? Object.keys(l.enum) : l instanceof cl ? hl(l._def.innerType) : l instanceof OI ? [void 0] : l instanceof DI ? [null] : null;
class xl extends u {
  _parse(I) {
    const { ctx: G } = this._processInputParams(I);
    if (G.parsedType !== e.object)
      return h(G, {
        code: n.invalid_type,
        expected: e.object,
        received: G.parsedType
      }), Q;
    const c = this.discriminator, b = G.data[c], Z = this.optionsMap.get(b);
    return Z ? G.common.async ? Z._parseAsync({
      data: G.data,
      path: G.path,
      parent: G
    }) : Z._parseSync({
      data: G.data,
      path: G.path,
      parent: G
    }) : (h(G, {
      code: n.invalid_union_discriminator,
      options: Array.from(this.optionsMap.keys()),
      path: [c]
    }), Q);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  /**
   * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
   * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
   * have a different value for each object in the union.
   * @param discriminator the name of the discriminator property
   * @param types an array of object schemas
   * @param params
   */
  static create(I, G, c) {
    const b = /* @__PURE__ */ new Map();
    for (const Z of G) {
      const d = hl(Z.shape[I]);
      if (!d)
        throw new Error(`A discriminator value for key \`${I}\` could not be extracted from all schema options`);
      for (const V of d) {
        if (b.has(V))
          throw new Error(`Discriminator property ${String(I)} has duplicate value ${String(V)}`);
        b.set(V, Z);
      }
    }
    return new xl({
      typeName: R.ZodDiscriminatedUnion,
      discriminator: I,
      options: G,
      optionsMap: b,
      ...J(c)
    });
  }
}
function XG(l, I) {
  const G = NI(l), c = NI(I);
  if (l === I)
    return { valid: !0, data: l };
  if (G === e.object && c === e.object) {
    const b = y.objectKeys(I), Z = y.objectKeys(l).filter((V) => b.indexOf(V) !== -1), d = { ...l, ...I };
    for (const V of Z) {
      const m = XG(l[V], I[V]);
      if (!m.valid)
        return { valid: !1 };
      d[V] = m.data;
    }
    return { valid: !0, data: d };
  } else if (G === e.array && c === e.array) {
    if (l.length !== I.length)
      return { valid: !1 };
    const b = [];
    for (let Z = 0; Z < l.length; Z++) {
      const d = l[Z], V = I[Z], m = XG(d, V);
      if (!m.valid)
        return { valid: !1 };
      b.push(m.data);
    }
    return { valid: !0, data: b };
  } else
    return G === e.date && c === e.date && +l == +I ? { valid: !0, data: l } : { valid: !1 };
}
class _I extends u {
  _parse(I) {
    const { status: G, ctx: c } = this._processInputParams(I), b = (Z, d) => {
      if (VG(Z) || VG(d))
        return Q;
      const V = XG(Z.value, d.value);
      return V.valid ? ((mG(Z) || mG(d)) && G.dirty(), { status: G.value, value: V.data }) : (h(c, {
        code: n.invalid_intersection_types
      }), Q);
    };
    return c.common.async ? Promise.all([
      this._def.left._parseAsync({
        data: c.data,
        path: c.path,
        parent: c
      }),
      this._def.right._parseAsync({
        data: c.data,
        path: c.path,
        parent: c
      })
    ]).then(([Z, d]) => b(Z, d)) : b(this._def.left._parseSync({
      data: c.data,
      path: c.path,
      parent: c
    }), this._def.right._parseSync({
      data: c.data,
      path: c.path,
      parent: c
    }));
  }
}
_I.create = (l, I, G) => new _I({
  left: l,
  right: I,
  typeName: R.ZodIntersection,
  ...J(G)
});
class lI extends u {
  _parse(I) {
    const { status: G, ctx: c } = this._processInputParams(I);
    if (c.parsedType !== e.array)
      return h(c, {
        code: n.invalid_type,
        expected: e.array,
        received: c.parsedType
      }), Q;
    if (c.data.length < this._def.items.length)
      return h(c, {
        code: n.too_small,
        minimum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array"
      }), Q;
    !this._def.rest && c.data.length > this._def.items.length && (h(c, {
      code: n.too_big,
      maximum: this._def.items.length,
      inclusive: !0,
      exact: !1,
      type: "array"
    }), G.dirty());
    const Z = [...c.data].map((d, V) => {
      const m = this._def.items[V] || this._def.rest;
      return m ? m._parse(new II(c, d, c.path, V)) : null;
    }).filter((d) => !!d);
    return c.common.async ? Promise.all(Z).then((d) => C.mergeArray(G, d)) : C.mergeArray(G, Z);
  }
  get items() {
    return this._def.items;
  }
  rest(I) {
    return new lI({
      ...this._def,
      rest: I
    });
  }
}
lI.create = (l, I) => {
  if (!Array.isArray(l))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new lI({
    items: l,
    typeName: R.ZodTuple,
    rest: null,
    ...J(I)
  });
};
class $I extends u {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(I) {
    const { status: G, ctx: c } = this._processInputParams(I);
    if (c.parsedType !== e.object)
      return h(c, {
        code: n.invalid_type,
        expected: e.object,
        received: c.parsedType
      }), Q;
    const b = [], Z = this._def.keyType, d = this._def.valueType;
    for (const V in c.data)
      b.push({
        key: Z._parse(new II(c, V, c.path, V)),
        value: d._parse(new II(c, c.data[V], c.path, V))
      });
    return c.common.async ? C.mergeObjectAsync(G, b) : C.mergeObjectSync(G, b);
  }
  get element() {
    return this._def.valueType;
  }
  static create(I, G, c) {
    return G instanceof u ? new $I({
      keyType: I,
      valueType: G,
      typeName: R.ZodRecord,
      ...J(c)
    }) : new $I({
      keyType: P.create(),
      valueType: I,
      typeName: R.ZodRecord,
      ...J(G)
    });
  }
}
class vl extends u {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(I) {
    const { status: G, ctx: c } = this._processInputParams(I);
    if (c.parsedType !== e.map)
      return h(c, {
        code: n.invalid_type,
        expected: e.map,
        received: c.parsedType
      }), Q;
    const b = this._def.keyType, Z = this._def.valueType, d = [...c.data.entries()].map(([V, m], X) => ({
      key: b._parse(new II(c, V, c.path, [X, "key"])),
      value: Z._parse(new II(c, m, c.path, [X, "value"]))
    }));
    if (c.common.async) {
      const V = /* @__PURE__ */ new Map();
      return Promise.resolve().then(async () => {
        for (const m of d) {
          const X = await m.key, N = await m.value;
          if (X.status === "aborted" || N.status === "aborted")
            return Q;
          (X.status === "dirty" || N.status === "dirty") && G.dirty(), V.set(X.value, N.value);
        }
        return { status: G.value, value: V };
      });
    } else {
      const V = /* @__PURE__ */ new Map();
      for (const m of d) {
        const X = m.key, N = m.value;
        if (X.status === "aborted" || N.status === "aborted")
          return Q;
        (X.status === "dirty" || N.status === "dirty") && G.dirty(), V.set(X.value, N.value);
      }
      return { status: G.value, value: V };
    }
  }
}
vl.create = (l, I, G) => new vl({
  valueType: I,
  keyType: l,
  typeName: R.ZodMap,
  ...J(G)
});
class yI extends u {
  _parse(I) {
    const { status: G, ctx: c } = this._processInputParams(I);
    if (c.parsedType !== e.set)
      return h(c, {
        code: n.invalid_type,
        expected: e.set,
        received: c.parsedType
      }), Q;
    const b = this._def;
    b.minSize !== null && c.data.size < b.minSize.value && (h(c, {
      code: n.too_small,
      minimum: b.minSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: b.minSize.message
    }), G.dirty()), b.maxSize !== null && c.data.size > b.maxSize.value && (h(c, {
      code: n.too_big,
      maximum: b.maxSize.value,
      type: "set",
      inclusive: !0,
      exact: !1,
      message: b.maxSize.message
    }), G.dirty());
    const Z = this._def.valueType;
    function d(m) {
      const X = /* @__PURE__ */ new Set();
      for (const N of m) {
        if (N.status === "aborted")
          return Q;
        N.status === "dirty" && G.dirty(), X.add(N.value);
      }
      return { status: G.value, value: X };
    }
    const V = [...c.data.values()].map((m, X) => Z._parse(new II(c, m, c.path, X)));
    return c.common.async ? Promise.all(V).then((m) => d(m)) : d(V);
  }
  min(I, G) {
    return new yI({
      ...this._def,
      minSize: { value: I, message: Y.toString(G) }
    });
  }
  max(I, G) {
    return new yI({
      ...this._def,
      maxSize: { value: I, message: Y.toString(G) }
    });
  }
  size(I, G) {
    return this.min(I, G).max(I, G);
  }
  nonempty(I) {
    return this.min(1, I);
  }
}
yI.create = (l, I) => new yI({
  valueType: l,
  minSize: null,
  maxSize: null,
  typeName: R.ZodSet,
  ...J(I)
});
class iI extends u {
  constructor() {
    super(...arguments), this.validate = this.implement;
  }
  _parse(I) {
    const { ctx: G } = this._processInputParams(I);
    if (G.parsedType !== e.function)
      return h(G, {
        code: n.invalid_type,
        expected: e.function,
        received: G.parsedType
      }), Q;
    function c(V, m) {
      return Ql({
        data: V,
        path: G.path,
        errorMaps: [
          G.common.contextualErrorMap,
          G.schemaErrorMap,
          pl(),
          SI
        ].filter((X) => !!X),
        issueData: {
          code: n.invalid_arguments,
          argumentsError: m
        }
      });
    }
    function b(V, m) {
      return Ql({
        data: V,
        path: G.path,
        errorMaps: [
          G.common.contextualErrorMap,
          G.schemaErrorMap,
          pl(),
          SI
        ].filter((X) => !!X),
        issueData: {
          code: n.invalid_return_type,
          returnTypeError: m
        }
      });
    }
    const Z = { errorMap: G.common.contextualErrorMap }, d = G.data;
    if (this._def.returns instanceof CI) {
      const V = this;
      return M(async function(...m) {
        const X = new f([]), N = await V._def.args.parseAsync(m, Z).catch((F) => {
          throw X.addIssue(c(m, F)), X;
        }), t = await Reflect.apply(d, this, N);
        return await V._def.returns._def.type.parseAsync(t, Z).catch((F) => {
          throw X.addIssue(b(t, F)), X;
        });
      });
    } else {
      const V = this;
      return M(function(...m) {
        const X = V._def.args.safeParse(m, Z);
        if (!X.success)
          throw new f([c(m, X.error)]);
        const N = Reflect.apply(d, this, X.data), t = V._def.returns.safeParse(N, Z);
        if (!t.success)
          throw new f([b(N, t.error)]);
        return t.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...I) {
    return new iI({
      ...this._def,
      args: lI.create(I).rest(sI.create())
    });
  }
  returns(I) {
    return new iI({
      ...this._def,
      returns: I
    });
  }
  implement(I) {
    return this.parse(I);
  }
  strictImplement(I) {
    return this.parse(I);
  }
  static create(I, G, c) {
    return new iI({
      args: I || lI.create([]).rest(sI.create()),
      returns: G || sI.create(),
      typeName: R.ZodFunction,
      ...J(c)
    });
  }
}
class Il extends u {
  get schema() {
    return this._def.getter();
  }
  _parse(I) {
    const { ctx: G } = this._processInputParams(I);
    return this._def.getter()._parse({ data: G.data, path: G.path, parent: G });
  }
}
Il.create = (l, I) => new Il({
  getter: l,
  typeName: R.ZodLazy,
  ...J(I)
});
class ll extends u {
  _parse(I) {
    if (I.data !== this._def.value) {
      const G = this._getOrReturnCtx(I);
      return h(G, {
        received: G.data,
        code: n.invalid_literal,
        expected: this._def.value
      }), Q;
    }
    return { status: "valid", value: I.data };
  }
  get value() {
    return this._def.value;
  }
}
ll.create = (l, I) => new ll({
  value: l,
  typeName: R.ZodLiteral,
  ...J(I)
});
function yc(l, I) {
  return new tI({
    values: l,
    typeName: R.ZodEnum,
    ...J(I)
  });
}
class tI extends u {
  _parse(I) {
    if (typeof I.data != "string") {
      const G = this._getOrReturnCtx(I), c = this._def.values;
      return h(G, {
        expected: y.joinValues(c),
        received: G.parsedType,
        code: n.invalid_type
      }), Q;
    }
    if (this._def.values.indexOf(I.data) === -1) {
      const G = this._getOrReturnCtx(I), c = this._def.values;
      return h(G, {
        received: G.data,
        code: n.invalid_enum_value,
        options: c
      }), Q;
    }
    return M(I.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const I = {};
    for (const G of this._def.values)
      I[G] = G;
    return I;
  }
  get Values() {
    const I = {};
    for (const G of this._def.values)
      I[G] = G;
    return I;
  }
  get Enum() {
    const I = {};
    for (const G of this._def.values)
      I[G] = G;
    return I;
  }
  extract(I) {
    return tI.create(I);
  }
  exclude(I) {
    return tI.create(this.options.filter((G) => !I.includes(G)));
  }
}
tI.create = yc;
class Gl extends u {
  _parse(I) {
    const G = y.getValidEnumValues(this._def.values), c = this._getOrReturnCtx(I);
    if (c.parsedType !== e.string && c.parsedType !== e.number) {
      const b = y.objectValues(G);
      return h(c, {
        expected: y.joinValues(b),
        received: c.parsedType,
        code: n.invalid_type
      }), Q;
    }
    if (G.indexOf(I.data) === -1) {
      const b = y.objectValues(G);
      return h(c, {
        received: c.data,
        code: n.invalid_enum_value,
        options: b
      }), Q;
    }
    return M(I.data);
  }
  get enum() {
    return this._def.values;
  }
}
Gl.create = (l, I) => new Gl({
  values: l,
  typeName: R.ZodNativeEnum,
  ...J(I)
});
class CI extends u {
  unwrap() {
    return this._def.type;
  }
  _parse(I) {
    const { ctx: G } = this._processInputParams(I);
    if (G.parsedType !== e.promise && G.common.async === !1)
      return h(G, {
        code: n.invalid_type,
        expected: e.promise,
        received: G.parsedType
      }), Q;
    const c = G.parsedType === e.promise ? G.data : Promise.resolve(G.data);
    return M(c.then((b) => this._def.type.parseAsync(b, {
      path: G.path,
      errorMap: G.common.contextualErrorMap
    })));
  }
}
CI.create = (l, I) => new CI({
  type: l,
  typeName: R.ZodPromise,
  ...J(I)
});
class D extends u {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === R.ZodEffects ? this._def.schema.sourceType() : this._def.schema;
  }
  _parse(I) {
    const { status: G, ctx: c } = this._processInputParams(I), b = this._def.effect || null, Z = {
      addIssue: (d) => {
        h(c, d), d.fatal ? G.abort() : G.dirty();
      },
      get path() {
        return c.path;
      }
    };
    if (Z.addIssue = Z.addIssue.bind(Z), b.type === "preprocess") {
      const d = b.transform(c.data, Z);
      return c.common.issues.length ? {
        status: "dirty",
        value: c.data
      } : c.common.async ? Promise.resolve(d).then((V) => this._def.schema._parseAsync({
        data: V,
        path: c.path,
        parent: c
      })) : this._def.schema._parseSync({
        data: d,
        path: c.path,
        parent: c
      });
    }
    if (b.type === "refinement") {
      const d = (V) => {
        const m = b.refinement(V, Z);
        if (c.common.async)
          return Promise.resolve(m);
        if (m instanceof Promise)
          throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
        return V;
      };
      if (c.common.async === !1) {
        const V = this._def.schema._parseSync({
          data: c.data,
          path: c.path,
          parent: c
        });
        return V.status === "aborted" ? Q : (V.status === "dirty" && G.dirty(), d(V.value), { status: G.value, value: V.value });
      } else
        return this._def.schema._parseAsync({ data: c.data, path: c.path, parent: c }).then((V) => V.status === "aborted" ? Q : (V.status === "dirty" && G.dirty(), d(V.value).then(() => ({ status: G.value, value: V.value }))));
    }
    if (b.type === "transform")
      if (c.common.async === !1) {
        const d = this._def.schema._parseSync({
          data: c.data,
          path: c.path,
          parent: c
        });
        if (!PI(d))
          return d;
        const V = b.transform(d.value, Z);
        if (V instanceof Promise)
          throw new Error("Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.");
        return { status: G.value, value: V };
      } else
        return this._def.schema._parseAsync({ data: c.data, path: c.path, parent: c }).then((d) => PI(d) ? Promise.resolve(b.transform(d.value, Z)).then((V) => ({ status: G.value, value: V })) : d);
    y.assertNever(b);
  }
}
D.create = (l, I, G) => new D({
  schema: l,
  typeName: R.ZodEffects,
  effect: I,
  ...J(G)
});
D.createWithPreprocess = (l, I, G) => new D({
  schema: I,
  effect: { type: "preprocess", transform: l },
  typeName: R.ZodEffects,
  ...J(G)
});
class dI extends u {
  _parse(I) {
    return this._getType(I) === e.undefined ? M(void 0) : this._def.innerType._parse(I);
  }
  unwrap() {
    return this._def.innerType;
  }
}
dI.create = (l, I) => new dI({
  innerType: l,
  typeName: R.ZodOptional,
  ...J(I)
});
class wI extends u {
  _parse(I) {
    return this._getType(I) === e.null ? M(null) : this._def.innerType._parse(I);
  }
  unwrap() {
    return this._def.innerType;
  }
}
wI.create = (l, I) => new wI({
  innerType: l,
  typeName: R.ZodNullable,
  ...J(I)
});
class cl extends u {
  _parse(I) {
    const { ctx: G } = this._processInputParams(I);
    let c = G.data;
    return G.parsedType === e.undefined && (c = this._def.defaultValue()), this._def.innerType._parse({
      data: c,
      path: G.path,
      parent: G
    });
  }
  removeDefault() {
    return this._def.innerType;
  }
}
cl.create = (l, I) => new cl({
  innerType: l,
  typeName: R.ZodDefault,
  defaultValue: typeof I.default == "function" ? I.default : () => I.default,
  ...J(I)
});
class yl extends u {
  _parse(I) {
    const { ctx: G } = this._processInputParams(I), c = {
      ...G,
      common: {
        ...G.common,
        issues: []
      }
    }, b = this._def.innerType._parse({
      data: c.data,
      path: c.path,
      parent: {
        ...c
      }
    });
    return Hl(b) ? b.then((Z) => ({
      status: "valid",
      value: Z.status === "valid" ? Z.value : this._def.catchValue({
        get error() {
          return new f(c.common.issues);
        },
        input: c.data
      })
    })) : {
      status: "valid",
      value: b.status === "valid" ? b.value : this._def.catchValue({
        get error() {
          return new f(c.common.issues);
        },
        input: c.data
      })
    };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
yl.create = (l, I) => new yl({
  innerType: l,
  typeName: R.ZodCatch,
  catchValue: typeof I.catch == "function" ? I.catch : () => I.catch,
  ...J(I)
});
class wl extends u {
  _parse(I) {
    if (this._getType(I) !== e.nan) {
      const c = this._getOrReturnCtx(I);
      return h(c, {
        code: n.invalid_type,
        expected: e.nan,
        received: c.parsedType
      }), Q;
    }
    return { status: "valid", value: I.data };
  }
}
wl.create = (l) => new wl({
  typeName: R.ZodNaN,
  ...J(l)
});
const BZ = Symbol("zod_brand");
class wc extends u {
  _parse(I) {
    const { ctx: G } = this._processInputParams(I), c = G.data;
    return this._def.type._parse({
      data: c,
      path: G.path,
      parent: G
    });
  }
  unwrap() {
    return this._def.type;
  }
}
class ml extends u {
  _parse(I) {
    const { status: G, ctx: c } = this._processInputParams(I);
    if (c.common.async)
      return (async () => {
        const Z = await this._def.in._parseAsync({
          data: c.data,
          path: c.path,
          parent: c
        });
        return Z.status === "aborted" ? Q : Z.status === "dirty" ? (G.dirty(), vc(Z.value)) : this._def.out._parseAsync({
          data: Z.value,
          path: c.path,
          parent: c
        });
      })();
    {
      const b = this._def.in._parseSync({
        data: c.data,
        path: c.path,
        parent: c
      });
      return b.status === "aborted" ? Q : b.status === "dirty" ? (G.dirty(), {
        status: "dirty",
        value: b.value
      }) : this._def.out._parseSync({
        data: b.value,
        path: c.path,
        parent: c
      });
    }
  }
  static create(I, G) {
    return new ml({
      in: I,
      out: G,
      typeName: R.ZodPipeline
    });
  }
}
class El extends u {
  _parse(I) {
    const G = this._def.innerType._parse(I);
    return PI(G) && (G.value = Object.freeze(G.value)), G;
  }
}
El.create = (l, I) => new El({
  innerType: l,
  typeName: R.ZodReadonly,
  ...J(I)
});
const Ec = (l, I = {}, G) => l ? BI.create().superRefine((c, b) => {
  var Z, d;
  if (!l(c)) {
    const V = typeof I == "function" ? I(c) : typeof I == "string" ? { message: I } : I, m = (d = (Z = V.fatal) !== null && Z !== void 0 ? Z : G) !== null && d !== void 0 ? d : !0, X = typeof V == "string" ? { message: V } : V;
    b.addIssue({ code: "custom", ...X, fatal: m });
  }
}) : BI.create(), CZ = {
  object: i.lazycreate
};
var R;
(function(l) {
  l.ZodString = "ZodString", l.ZodNumber = "ZodNumber", l.ZodNaN = "ZodNaN", l.ZodBigInt = "ZodBigInt", l.ZodBoolean = "ZodBoolean", l.ZodDate = "ZodDate", l.ZodSymbol = "ZodSymbol", l.ZodUndefined = "ZodUndefined", l.ZodNull = "ZodNull", l.ZodAny = "ZodAny", l.ZodUnknown = "ZodUnknown", l.ZodNever = "ZodNever", l.ZodVoid = "ZodVoid", l.ZodArray = "ZodArray", l.ZodObject = "ZodObject", l.ZodUnion = "ZodUnion", l.ZodDiscriminatedUnion = "ZodDiscriminatedUnion", l.ZodIntersection = "ZodIntersection", l.ZodTuple = "ZodTuple", l.ZodRecord = "ZodRecord", l.ZodMap = "ZodMap", l.ZodSet = "ZodSet", l.ZodFunction = "ZodFunction", l.ZodLazy = "ZodLazy", l.ZodLiteral = "ZodLiteral", l.ZodEnum = "ZodEnum", l.ZodEffects = "ZodEffects", l.ZodNativeEnum = "ZodNativeEnum", l.ZodOptional = "ZodOptional", l.ZodNullable = "ZodNullable", l.ZodDefault = "ZodDefault", l.ZodCatch = "ZodCatch", l.ZodPromise = "ZodPromise", l.ZodBranded = "ZodBranded", l.ZodPipeline = "ZodPipeline", l.ZodReadonly = "ZodReadonly";
})(R || (R = {}));
const MZ = (l, I = {
  message: `Input not instance of ${l.name}`
}) => Ec((G) => G instanceof l, I), oc = P.create, gc = RI.create, TZ = wl.create, KZ = nI.create, Lc = fI.create, jZ = vI.create, SZ = Jl.create, PZ = OI.create, fZ = DI.create, OZ = BI.create, DZ = sI.create, qZ = WI.create, _Z = ul.create, $Z = O.create, Id = i.create, ld = i.strictCreate, Gd = qI.create, cd = xl.create, bd = _I.create, Zd = lI.create, dd = $I.create, Wd = vl.create, Vd = yI.create, md = iI.create, Xd = Il.create, ad = ll.create, Nd = tI.create, Rd = Gl.create, nd = CI.create, Ic = D.create, td = dI.create, ed = wI.create, hd = D.createWithPreprocess, Fd = ml.create, Yd = () => oc().optional(), sd = () => gc().optional(), pd = () => Lc().optional(), Qd = {
  string: (l) => P.create({ ...l, coerce: !0 }),
  number: (l) => RI.create({ ...l, coerce: !0 }),
  boolean: (l) => fI.create({
    ...l,
    coerce: !0
  }),
  bigint: (l) => nI.create({ ...l, coerce: !0 }),
  date: (l) => vI.create({ ...l, coerce: !0 })
}, Hd = Q;
var W = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  defaultErrorMap: SI,
  setErrorMap: yZ,
  getErrorMap: pl,
  makeIssue: Ql,
  EMPTY_PATH: wZ,
  addIssueToContext: h,
  ParseStatus: C,
  INVALID: Q,
  DIRTY: vc,
  OK: M,
  isAborted: VG,
  isDirty: mG,
  isValid: PI,
  isAsync: Hl,
  get util() {
    return y;
  },
  get objectUtil() {
    return WG;
  },
  ZodParsedType: e,
  getParsedType: NI,
  ZodType: u,
  ZodString: P,
  ZodNumber: RI,
  ZodBigInt: nI,
  ZodBoolean: fI,
  ZodDate: vI,
  ZodSymbol: Jl,
  ZodUndefined: OI,
  ZodNull: DI,
  ZodAny: BI,
  ZodUnknown: sI,
  ZodNever: WI,
  ZodVoid: ul,
  ZodArray: O,
  ZodObject: i,
  ZodUnion: qI,
  ZodDiscriminatedUnion: xl,
  ZodIntersection: _I,
  ZodTuple: lI,
  ZodRecord: $I,
  ZodMap: vl,
  ZodSet: yI,
  ZodFunction: iI,
  ZodLazy: Il,
  ZodLiteral: ll,
  ZodEnum: tI,
  ZodNativeEnum: Gl,
  ZodPromise: CI,
  ZodEffects: D,
  ZodTransformer: D,
  ZodOptional: dI,
  ZodNullable: wI,
  ZodDefault: cl,
  ZodCatch: yl,
  ZodNaN: wl,
  BRAND: BZ,
  ZodBranded: wc,
  ZodPipeline: ml,
  ZodReadonly: El,
  custom: Ec,
  Schema: u,
  ZodSchema: u,
  late: CZ,
  get ZodFirstPartyTypeKind() {
    return R;
  },
  coerce: Qd,
  any: OZ,
  array: $Z,
  bigint: KZ,
  boolean: Lc,
  date: jZ,
  discriminatedUnion: cd,
  effect: Ic,
  enum: Nd,
  function: md,
  instanceof: MZ,
  intersection: bd,
  lazy: Xd,
  literal: ad,
  map: Wd,
  nan: TZ,
  nativeEnum: Rd,
  never: qZ,
  null: fZ,
  nullable: ed,
  number: gc,
  object: Id,
  oboolean: pd,
  onumber: sd,
  optional: td,
  ostring: Yd,
  pipeline: Fd,
  preprocess: hd,
  promise: nd,
  record: dd,
  set: Vd,
  strictObject: ld,
  string: oc,
  symbol: SZ,
  transformer: Ic,
  tuple: Zd,
  undefined: PZ,
  union: Gd,
  unknown: DZ,
  void: _Z,
  NEVER: Hd,
  ZodIssueCode: n,
  quotelessJson: vZ,
  ZodError: f
});
function Jd() {
  return {};
}
function ud(l, I) {
  var c, b;
  const G = {
    type: "array"
  };
  return ((b = (c = l.type) == null ? void 0 : c._def) == null ? void 0 : b.typeName) !== R.ZodAny && (G.items = w(l.type._def, {
    ...I,
    currentPath: [...I.currentPath, "items"]
  })), l.minLength && E(G, "minItems", l.minLength.value, l.minLength.message, I), l.maxLength && E(G, "maxItems", l.maxLength.value, l.maxLength.message, I), l.exactLength && (E(G, "minItems", l.exactLength.value, l.exactLength.message, I), E(G, "maxItems", l.exactLength.value, l.exactLength.message, I)), G;
}
function vd(l, I) {
  const G = {
    type: "integer",
    format: "int64"
  };
  if (!l.checks)
    return G;
  for (const c of l.checks)
    switch (c.kind) {
      case "min":
        I.target === "jsonSchema7" ? c.inclusive ? E(G, "minimum", c.value, c.message, I) : E(G, "exclusiveMinimum", c.value, c.message, I) : (c.inclusive || (G.exclusiveMinimum = !0), E(G, "minimum", c.value, c.message, I));
        break;
      case "max":
        I.target === "jsonSchema7" ? c.inclusive ? E(G, "maximum", c.value, c.message, I) : E(G, "exclusiveMaximum", c.value, c.message, I) : (c.inclusive || (G.exclusiveMaximum = !0), E(G, "maximum", c.value, c.message, I));
        break;
      case "multipleOf":
        E(G, "multipleOf", c.value, c.message, I);
        break;
    }
  return G;
}
function yd() {
  return {
    type: "boolean"
  };
}
function wd(l, I) {
  return w(l.type._def, I);
}
const Ed = (l, I) => w(l.innerType._def, I);
function od(l, I) {
  return I.dateStrategy == "integer" ? gd(l, I) : {
    type: "string",
    format: "date-time"
  };
}
const gd = (l, I) => {
  const G = {
    type: "integer",
    format: "unix-time"
  };
  for (const c of l.checks)
    switch (c.kind) {
      case "min":
        I.target === "jsonSchema7" && E(
          G,
          "minimum",
          c.value,
          // This is in milliseconds
          c.message,
          I
        );
        break;
      case "max":
        I.target === "jsonSchema7" && E(
          G,
          "maximum",
          c.value,
          // This is in milliseconds
          c.message,
          I
        );
        break;
    }
  return G;
};
function Ld(l, I) {
  return {
    ...w(l.innerType._def, I),
    default: l.defaultValue()
  };
}
function Ad(l, I) {
  return I.effectStrategy === "input" ? w(l.schema._def, I) : {};
}
function rd(l) {
  return {
    type: "string",
    enum: l.values
  };
}
const id = (l) => "type" in l && l.type === "string" ? !1 : "allOf" in l;
function Ud(l, I) {
  const G = [
    w(l.left._def, {
      ...I,
      currentPath: [...I.currentPath, "allOf", "0"]
    }),
    w(l.right._def, {
      ...I,
      currentPath: [...I.currentPath, "allOf", "1"]
    })
  ].filter((Z) => !!Z);
  let c = I.target === "jsonSchema2019-09" ? { unevaluatedProperties: !1 } : void 0;
  const b = [];
  return G.forEach((Z) => {
    if (id(Z))
      b.push(...Z.allOf), Z.unevaluatedProperties === void 0 && (c = void 0);
    else {
      let d = Z;
      if ("additionalProperties" in Z && Z.additionalProperties === !1) {
        const { additionalProperties: V, ...m } = Z;
        d = m;
      } else
        c = void 0;
      b.push(d);
    }
  }), b.length ? {
    allOf: b,
    ...c
  } : void 0;
}
function kd(l, I) {
  const G = typeof l.value;
  return G !== "bigint" && G !== "number" && G !== "boolean" && G !== "string" ? {
    type: Array.isArray(l.value) ? "array" : "object"
  } : I.target === "openApi3" ? {
    type: G === "bigint" ? "integer" : G,
    enum: [l.value]
  } : {
    type: G === "bigint" ? "integer" : G,
    const: l.value
  };
}
const jI = {
  /**
   * `c` was changed to `[cC]` to replicate /i flag
   */
  cuid: "^[cC][^\\s-]{8,}$",
  cuid2: "^[a-z][a-z0-9]*$",
  ulid: "^[0-9A-HJKMNP-TV-Z]{26}$",
  /**
   * `a-z` was added to replicate /i flag
   */
  email: "^(?!\\.)(?!.*\\.\\.)([a-zA-Z0-9_+-\\.]*)[a-zA-Z0-9_+-]@([a-zA-Z0-9][a-zA-Z0-9\\-]*\\.)+[a-zA-Z]{2,}$",
  emoji: "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$",
  /**
   * Unused
   */
  uuid: "^[0-9a-fA-F]{8}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{4}\\b-[0-9a-fA-F]{12}$",
  /**
   * Unused
   */
  ipv4: "^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$",
  /**
   * Unused
   */
  ipv6: "^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$"
};
function Ac(l, I) {
  const G = {
    type: "string"
  };
  function c(b) {
    return I.patternStrategy === "escape" ? xd(b) : b;
  }
  if (l.checks)
    for (const b of l.checks)
      switch (b.kind) {
        case "min":
          E(G, "minLength", typeof G.minLength == "number" ? Math.max(G.minLength, b.value) : b.value, b.message, I);
          break;
        case "max":
          E(G, "maxLength", typeof G.maxLength == "number" ? Math.min(G.maxLength, b.value) : b.value, b.message, I);
          break;
        case "email":
          switch (I.emailStrategy) {
            case "format:email":
              YI(G, "email", b.message, I);
              break;
            case "format:idn-email":
              YI(G, "idn-email", b.message, I);
              break;
            case "pattern:zod":
              ZI(G, jI.email, b.message, I);
              break;
          }
          break;
        case "url":
          YI(G, "uri", b.message, I);
          break;
        case "uuid":
          YI(G, "uuid", b.message, I);
          break;
        case "regex":
          ZI(G, b.regex.source, b.message, I);
          break;
        case "cuid":
          ZI(G, jI.cuid, b.message, I);
          break;
        case "cuid2":
          ZI(G, jI.cuid2, b.message, I);
          break;
        case "startsWith":
          ZI(G, "^" + c(b.value), b.message, I);
          break;
        case "endsWith":
          ZI(G, c(b.value) + "$", b.message, I);
          break;
        case "datetime":
          YI(G, "date-time", b.message, I);
          break;
        case "length":
          E(G, "minLength", typeof G.minLength == "number" ? Math.max(G.minLength, b.value) : b.value, b.message, I), E(G, "maxLength", typeof G.maxLength == "number" ? Math.min(G.maxLength, b.value) : b.value, b.message, I);
          break;
        case "includes": {
          ZI(G, c(b.value), b.message, I);
          break;
        }
        case "ip": {
          b.version !== "v6" && YI(G, "ipv4", b.message, I), b.version !== "v4" && YI(G, "ipv6", b.message, I);
          break;
        }
        case "emoji":
          ZI(G, jI.emoji, b.message, I);
          break;
        case "ulid": {
          ZI(G, jI.ulid, b.message, I);
          break;
        }
      }
  return G;
}
const xd = (l) => Array.from(l).map((I) => /[a-zA-Z0-9]/.test(I) ? I : `\\${I}`).join(""), YI = (l, I, G, c) => {
  var b;
  l.format || (b = l.anyOf) != null && b.some((Z) => Z.format) ? (l.anyOf || (l.anyOf = []), l.format && (l.anyOf.push({
    format: l.format,
    ...l.errorMessage && c.errorMessages && {
      errorMessage: { format: l.errorMessage.format }
    }
  }), delete l.format, l.errorMessage && (delete l.errorMessage.format, Object.keys(l.errorMessage).length === 0 && delete l.errorMessage)), l.anyOf.push({
    format: I,
    ...G && c.errorMessages && { errorMessage: { format: G } }
  })) : E(l, "format", I, G, c);
}, ZI = (l, I, G, c) => {
  var b;
  l.pattern || (b = l.allOf) != null && b.some((Z) => Z.pattern) ? (l.allOf || (l.allOf = []), l.pattern && (l.allOf.push({
    pattern: l.pattern,
    ...l.errorMessage && c.errorMessages && {
      errorMessage: { pattern: l.errorMessage.pattern }
    }
  }), delete l.pattern, l.errorMessage && (delete l.errorMessage.pattern, Object.keys(l.errorMessage).length === 0 && delete l.errorMessage)), l.allOf.push({
    pattern: I,
    ...G && c.errorMessages && { errorMessage: { pattern: G } }
  })) : E(l, "pattern", I, G, c);
};
function rc(l, I) {
  var c, b, Z, d;
  if (I.target === "openApi3" && ((c = l.keyType) == null ? void 0 : c._def.typeName) === R.ZodEnum)
    return {
      type: "object",
      required: l.keyType._def.values,
      properties: l.keyType._def.values.reduce((V, m) => ({
        ...V,
        [m]: w(l.valueType._def, {
          ...I,
          currentPath: [...I.currentPath, "properties", m]
        }) ?? {}
      }), {}),
      additionalProperties: !1
    };
  const G = {
    type: "object",
    additionalProperties: w(l.valueType._def, {
      ...I,
      currentPath: [...I.currentPath, "additionalProperties"]
    }) ?? {}
  };
  if (I.target === "openApi3")
    return G;
  if (((b = l.keyType) == null ? void 0 : b._def.typeName) === R.ZodString && ((Z = l.keyType._def.checks) != null && Z.length)) {
    const V = Object.entries(Ac(l.keyType._def, I)).reduce((m, [X, N]) => X === "type" ? m : { ...m, [X]: N }, {});
    return {
      ...G,
      propertyNames: V
    };
  } else if (((d = l.keyType) == null ? void 0 : d._def.typeName) === R.ZodEnum)
    return {
      ...G,
      propertyNames: {
        enum: l.keyType._def.values
      }
    };
  return G;
}
function zd(l, I) {
  if (I.mapStrategy === "record")
    return rc(l, I);
  const G = w(l.keyType._def, {
    ...I,
    currentPath: [...I.currentPath, "items", "items", "0"]
  }) || {}, c = w(l.valueType._def, {
    ...I,
    currentPath: [...I.currentPath, "items", "items", "1"]
  }) || {};
  return {
    type: "array",
    maxItems: 125,
    items: {
      type: "array",
      items: [G, c],
      minItems: 2,
      maxItems: 2
    }
  };
}
function Bd(l) {
  const I = l.values, c = Object.keys(l.values).filter((Z) => typeof I[I[Z]] != "number").map((Z) => I[Z]), b = Array.from(new Set(c.map((Z) => typeof Z)));
  return {
    type: b.length === 1 ? b[0] === "string" ? "string" : "number" : ["string", "number"],
    enum: c
  };
}
function Cd() {
  return {
    not: {}
  };
}
function Md(l) {
  return l.target === "openApi3" ? {
    enum: ["null"],
    nullable: !0
  } : {
    type: "null"
  };
}
const ol = {
  ZodString: "string",
  ZodNumber: "number",
  ZodBigInt: "integer",
  ZodBoolean: "boolean",
  ZodNull: "null"
};
function Td(l, I) {
  if (I.target === "openApi3")
    return lc(l, I);
  const G = l.options instanceof Map ? Array.from(l.options.values()) : l.options;
  if (G.every((c) => c._def.typeName in ol && (!c._def.checks || !c._def.checks.length))) {
    const c = G.reduce((b, Z) => {
      const d = ol[Z._def.typeName];
      return d && !b.includes(d) ? [...b, d] : b;
    }, []);
    return {
      type: c.length > 1 ? c : c[0]
    };
  } else if (G.every((c) => c._def.typeName === "ZodLiteral" && !c.description)) {
    const c = G.reduce((b, Z) => {
      const d = typeof Z._def.value;
      switch (d) {
        case "string":
        case "number":
        case "boolean":
          return [...b, d];
        case "bigint":
          return [...b, "integer"];
        case "object":
          if (Z._def.value === null)
            return [...b, "null"];
        case "symbol":
        case "undefined":
        case "function":
        default:
          return b;
      }
    }, []);
    if (c.length === G.length) {
      const b = c.filter((Z, d, V) => V.indexOf(Z) === d);
      return {
        type: b.length > 1 ? b : b[0],
        enum: G.reduce((Z, d) => Z.includes(d._def.value) ? Z : [...Z, d._def.value], [])
      };
    }
  } else if (G.every((c) => c._def.typeName === "ZodEnum"))
    return {
      type: "string",
      enum: G.reduce((c, b) => [
        ...c,
        ...b._def.values.filter((Z) => !c.includes(Z))
      ], [])
    };
  return lc(l, I);
}
const lc = (l, I) => {
  const G = (l.options instanceof Map ? Array.from(l.options.values()) : l.options).map((c, b) => w(c._def, {
    ...I,
    currentPath: [...I.currentPath, "anyOf", `${b}`]
  })).filter((c) => !!c && (!I.strictUnions || typeof c == "object" && Object.keys(c).length > 0));
  return G.length ? { anyOf: G } : void 0;
};
function Kd(l, I) {
  if (["ZodString", "ZodNumber", "ZodBigInt", "ZodBoolean", "ZodNull"].includes(l.innerType._def.typeName) && (!l.innerType._def.checks || !l.innerType._def.checks.length))
    return I.target === "openApi3" ? {
      type: ol[l.innerType._def.typeName],
      nullable: !0
    } : {
      type: [
        ol[l.innerType._def.typeName],
        "null"
      ]
    };
  if (I.target === "openApi3") {
    const c = w(l.innerType._def, {
      ...I,
      currentPath: [...I.currentPath]
    });
    return c && { ...c, nullable: !0 };
  }
  const G = w(l.innerType._def, {
    ...I,
    currentPath: [...I.currentPath, "anyOf", "0"]
  });
  return G && { anyOf: [G, { type: "null" }] };
}
function jd(l, I) {
  const G = {
    type: "number"
  };
  if (!l.checks)
    return G;
  for (const c of l.checks)
    switch (c.kind) {
      case "int":
        G.type = "integer", Jc(G, "type", c.message, I);
        break;
      case "min":
        I.target === "jsonSchema7" ? c.inclusive ? E(G, "minimum", c.value, c.message, I) : E(G, "exclusiveMinimum", c.value, c.message, I) : (c.inclusive || (G.exclusiveMinimum = !0), E(G, "minimum", c.value, c.message, I));
        break;
      case "max":
        I.target === "jsonSchema7" ? c.inclusive ? E(G, "maximum", c.value, c.message, I) : E(G, "exclusiveMaximum", c.value, c.message, I) : (c.inclusive || (G.exclusiveMaximum = !0), E(G, "maximum", c.value, c.message, I));
        break;
      case "multipleOf":
        E(G, "multipleOf", c.value, c.message, I);
        break;
    }
  return G;
}
function Sd(l, I) {
  const G = {
    type: "object",
    ...Object.entries(l.shape()).reduce((c, [b, Z]) => {
      if (Z === void 0 || Z._def === void 0)
        return c;
      const d = w(Z._def, {
        ...I,
        currentPath: [...I.currentPath, "properties", b],
        propertyPath: [...I.currentPath, "properties", b]
      });
      return d === void 0 ? c : {
        properties: { ...c.properties, [b]: d },
        required: Z.isOptional() ? c.required : [...c.required, b]
      };
    }, { properties: {}, required: [] }),
    additionalProperties: l.catchall._def.typeName === "ZodNever" ? l.unknownKeys === "passthrough" : w(l.catchall._def, {
      ...I,
      currentPath: [...I.currentPath, "additionalProperties"]
    }) ?? !0
  };
  return G.required.length || delete G.required, G;
}
const Pd = (l, I) => {
  var c;
  if (I.currentPath.toString() === ((c = I.propertyPath) == null ? void 0 : c.toString()))
    return w(l.innerType._def, I);
  const G = w(l.innerType._def, {
    ...I,
    currentPath: [...I.currentPath, "anyOf", "1"]
  });
  return G ? {
    anyOf: [
      {
        not: {}
      },
      G
    ]
  } : {};
}, fd = (l, I) => {
  if (I.pipeStrategy === "input")
    return w(l.in._def, I);
  if (I.pipeStrategy === "output")
    return w(l.out._def, I);
  const G = w(l.in._def, {
    ...I,
    currentPath: [...I.currentPath, "allOf", "0"]
  }), c = w(l.out._def, {
    ...I,
    currentPath: [...I.currentPath, "allOf", G ? "1" : "0"]
  });
  return {
    allOf: [G, c].filter((b) => b !== void 0)
  };
};
function Od(l, I) {
  return w(l.type._def, I);
}
function Dd(l, I) {
  const c = {
    type: "array",
    uniqueItems: !0,
    items: w(l.valueType._def, {
      ...I,
      currentPath: [...I.currentPath, "items"]
    })
  };
  return l.minSize && E(c, "minItems", l.minSize.value, l.minSize.message, I), l.maxSize && E(c, "maxItems", l.maxSize.value, l.maxSize.message, I), c;
}
function qd(l, I) {
  return l.rest ? {
    type: "array",
    minItems: l.items.length,
    items: l.items.map((G, c) => w(G._def, {
      ...I,
      currentPath: [...I.currentPath, "items", `${c}`]
    })).reduce((G, c) => c === void 0 ? G : [...G, c], []),
    additionalItems: w(l.rest._def, {
      ...I,
      currentPath: [...I.currentPath, "additionalItems"]
    })
  } : {
    type: "array",
    minItems: l.items.length,
    maxItems: l.items.length,
    items: l.items.map((G, c) => w(G._def, {
      ...I,
      currentPath: [...I.currentPath, "items", `${c}`]
    })).reduce((G, c) => c === void 0 ? G : [...G, c], [])
  };
}
function _d() {
  return {
    not: {}
  };
}
function $d() {
  return {};
}
const IW = (l, I) => w(l.innerType._def, I);
function w(l, I, G = !1) {
  const c = I.seen.get(l);
  if (c && !G) {
    const d = lW(c, I);
    if (d !== void 0)
      return d;
  }
  const b = { def: l, path: I.currentPath, jsonSchema: void 0 };
  I.seen.set(l, b);
  const Z = cW(l, l.typeName, I);
  return Z && bW(l, I, Z), b.jsonSchema = Z, Z;
}
const lW = (l, I) => {
  switch (I.$refStrategy) {
    case "root":
      return { $ref: l.path.join("/") };
    case "relative":
      return { $ref: GW(I.currentPath, l.path) };
    case "none":
    case "seen":
      return l.path.length < I.currentPath.length && l.path.every((G, c) => I.currentPath[c] === G) ? (console.warn(`Recursive reference detected at ${I.currentPath.join("/")}! Defaulting to any`), {}) : I.$refStrategy === "seen" ? {} : void 0;
  }
}, GW = (l, I) => {
  let G = 0;
  for (; G < l.length && G < I.length && l[G] === I[G]; G++)
    ;
  return [(l.length - G).toString(), ...I.slice(G)].join("/");
}, cW = (l, I, G) => {
  switch (I) {
    case R.ZodString:
      return Ac(l, G);
    case R.ZodNumber:
      return jd(l, G);
    case R.ZodObject:
      return Sd(l, G);
    case R.ZodBigInt:
      return vd(l, G);
    case R.ZodBoolean:
      return yd();
    case R.ZodDate:
      return od(l, G);
    case R.ZodUndefined:
      return _d();
    case R.ZodNull:
      return Md(G);
    case R.ZodArray:
      return ud(l, G);
    case R.ZodUnion:
    case R.ZodDiscriminatedUnion:
      return Td(l, G);
    case R.ZodIntersection:
      return Ud(l, G);
    case R.ZodTuple:
      return qd(l, G);
    case R.ZodRecord:
      return rc(l, G);
    case R.ZodLiteral:
      return kd(l, G);
    case R.ZodEnum:
      return rd(l);
    case R.ZodNativeEnum:
      return Bd(l);
    case R.ZodNullable:
      return Kd(l, G);
    case R.ZodOptional:
      return Pd(l, G);
    case R.ZodMap:
      return zd(l, G);
    case R.ZodSet:
      return Dd(l, G);
    case R.ZodLazy:
      return w(l.getter()._def, G);
    case R.ZodPromise:
      return Od(l, G);
    case R.ZodNaN:
    case R.ZodNever:
      return Cd();
    case R.ZodEffects:
      return Ad(l, G);
    case R.ZodAny:
      return Jd();
    case R.ZodUnknown:
      return $d();
    case R.ZodDefault:
      return Ld(l, G);
    case R.ZodBranded:
      return wd(l, G);
    case R.ZodReadonly:
      return IW(l, G);
    case R.ZodCatch:
      return Ed(l, G);
    case R.ZodPipeline:
      return fd(l, G);
    case R.ZodFunction:
    case R.ZodVoid:
    case R.ZodSymbol:
      return;
    default:
      return /* @__PURE__ */ ((c) => {
      })();
  }
}, bW = (l, I, G) => (l.description && (G.description = l.description, I.markdownDescription && (G.markdownDescription = l.description)), G), ZW = (l) => {
  const I = uZ(l), G = I.name !== void 0 ? [...I.basePath, I.definitionPath, I.name] : I.basePath;
  return {
    ...I,
    currentPath: G,
    propertyPath: void 0,
    seen: new Map(Object.entries(I.definitions).map(([c, b]) => [
      b._def,
      {
        def: b._def,
        path: [...I.basePath, I.definitionPath, c],
        // Resolution of references will be forced even though seen, so it's ok that the schema is undefined here for now.
        jsonSchema: void 0
      }
    ]))
  };
}, dW = (l, I) => {
  const G = ZW(I), c = typeof I == "object" && I.definitions ? Object.entries(I.definitions).reduce((V, [m, X]) => ({
    ...V,
    [m]: w(X._def, {
      ...G,
      currentPath: [...G.basePath, G.definitionPath, m]
    }, !0) ?? {}
  }), {}) : void 0, b = typeof I == "string" ? I : I == null ? void 0 : I.name, Z = w(l._def, b === void 0 ? G : {
    ...G,
    currentPath: [...G.basePath, G.definitionPath, b]
  }, !1) ?? {}, d = b === void 0 ? c ? {
    ...Z,
    [G.definitionPath]: c
  } : Z : {
    $ref: [
      ...G.$refStrategy === "relative" ? [] : G.basePath,
      G.definitionPath,
      b
    ].join("/"),
    [G.definitionPath]: {
      ...c,
      [b]: Z
    }
  };
  return G.target === "jsonSchema7" ? d.$schema = "http://json-schema.org/draft-07/schema#" : G.target === "jsonSchema2019-09" && (d.$schema = "https://json-schema.org/draft/2019-09/schema#"), d;
};
function ic(l) {
  return l && l.__esModule && Object.prototype.hasOwnProperty.call(l, "default") ? l.default : l;
}
var MI = { exports: {} };
const WW = typeof Buffer < "u", Gc = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/, cc = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
function Uc(l, I, G) {
  G == null && I !== null && typeof I == "object" && (G = I, I = void 0), WW && Buffer.isBuffer(l) && (l = l.toString()), l && l.charCodeAt(0) === 65279 && (l = l.slice(1));
  const c = JSON.parse(l, I);
  if (c === null || typeof c != "object")
    return c;
  const b = G && G.protoAction || "error", Z = G && G.constructorAction || "error";
  if (b === "ignore" && Z === "ignore")
    return c;
  if (b !== "ignore" && Z !== "ignore") {
    if (Gc.test(l) === !1 && cc.test(l) === !1)
      return c;
  } else if (b !== "ignore" && Z === "ignore") {
    if (Gc.test(l) === !1)
      return c;
  } else if (cc.test(l) === !1)
    return c;
  return kc(c, { protoAction: b, constructorAction: Z, safe: G && G.safe });
}
function kc(l, { protoAction: I = "error", constructorAction: G = "error", safe: c } = {}) {
  let b = [l];
  for (; b.length; ) {
    const Z = b;
    b = [];
    for (const d of Z) {
      if (I !== "ignore" && Object.prototype.hasOwnProperty.call(d, "__proto__")) {
        if (c === !0)
          return null;
        if (I === "error")
          throw new SyntaxError("Object contains forbidden prototype property");
        delete d.__proto__;
      }
      if (G !== "ignore" && Object.prototype.hasOwnProperty.call(d, "constructor") && Object.prototype.hasOwnProperty.call(d.constructor, "prototype")) {
        if (c === !0)
          return null;
        if (G === "error")
          throw new SyntaxError("Object contains forbidden prototype property");
        delete d.constructor;
      }
      for (const V in d) {
        const m = d[V];
        m && typeof m == "object" && b.push(m);
      }
    }
  }
  return l;
}
function YG(l, I, G) {
  const c = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  try {
    return Uc(l, I, G);
  } finally {
    Error.stackTraceLimit = c;
  }
}
function VW(l, I) {
  const G = Error.stackTraceLimit;
  Error.stackTraceLimit = 0;
  try {
    return Uc(l, I, { safe: !0 });
  } catch {
    return null;
  } finally {
    Error.stackTraceLimit = G;
  }
}
MI.exports = YG;
MI.exports.default = YG;
MI.exports.parse = YG;
MI.exports.safeParse = VW;
MI.exports.scan = kc;
var mW = MI.exports;
const bl = /* @__PURE__ */ ic(mW);
function XW(l) {
  let I, G, c, b, Z, d, V;
  return m(), {
    feed: X,
    reset: m
  };
  function m() {
    I = !0, G = "", c = 0, b = -1, Z = void 0, d = void 0, V = "";
  }
  function X(t) {
    G = G ? G + t : t, I && aW(G) && (G = G.slice(xc.length)), I = !1;
    const p = G.length;
    let F = 0, H = !1;
    for (; F < p; ) {
      H && (G[F] === `
` && ++F, H = !1);
      let v = -1, o = b, T;
      for (let r = c; v < 0 && r < p; ++r)
        T = G[r], T === ":" && o < 0 ? o = r - F : T === "\r" ? (H = !0, v = r - F) : T === `
` && (v = r - F);
      if (v < 0) {
        c = p - F, b = o;
        break;
      } else
        c = 0, b = -1;
      N(G, F, o, v), F += v + 1;
    }
    F === p ? G = "" : F > 0 && (G = G.slice(F));
  }
  function N(t, p, F, H) {
    if (H === 0) {
      V.length > 0 && (l({
        type: "event",
        id: Z,
        event: d || void 0,
        data: V.slice(0, -1)
        // remove trailing newline
      }), V = "", Z = void 0), d = void 0;
      return;
    }
    const v = F < 0, o = t.slice(p, p + (v ? H : F));
    let T = 0;
    v ? T = H : t[p + F + 1] === " " ? T = F + 2 : T = F + 1;
    const r = p + T, aI = H - T, bI = t.slice(r, r + aI).toString();
    if (o === "data")
      V += bI ? "".concat(bI, `
`) : `
`;
    else if (o === "event")
      d = bI;
    else if (o === "id" && !bI.includes("\0"))
      Z = bI;
    else if (o === "retry") {
      const qG = parseInt(bI, 10);
      Number.isNaN(qG) || l({
        type: "reconnect-interval",
        value: qG
      });
    }
  }
}
const xc = [239, 187, 191];
function aW(l) {
  return xc.every((I, G) => l.charCodeAt(G) === I);
}
var NW = Object.defineProperty, RW = (l, I, G) => I in l ? NW(l, I, { enumerable: !0, configurable: !0, writable: !0, value: G }) : l[I] = G, nW = (l, I, G) => (RW(l, typeof I != "symbol" ? I + "" : I, G), G), zl = {};
zl.byteLength = hW;
zl.toByteArray = YW;
zl.fromByteArray = QW;
var $ = [], S = [], tW = typeof Uint8Array < "u" ? Uint8Array : Array, IG = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var LI = 0, eW = IG.length; LI < eW; ++LI)
  $[LI] = IG[LI], S[IG.charCodeAt(LI)] = LI;
S[45] = 62;
S[95] = 63;
function zc(l) {
  var I = l.length;
  if (I % 4 > 0)
    throw new Error("Invalid string. Length must be a multiple of 4");
  var G = l.indexOf("=");
  G === -1 && (G = I);
  var c = G === I ? 0 : 4 - G % 4;
  return [G, c];
}
function hW(l) {
  var I = zc(l), G = I[0], c = I[1];
  return (G + c) * 3 / 4 - c;
}
function FW(l, I, G) {
  return (I + G) * 3 / 4 - G;
}
function YW(l) {
  var I, G = zc(l), c = G[0], b = G[1], Z = new tW(FW(l, c, b)), d = 0, V = b > 0 ? c - 4 : c, m;
  for (m = 0; m < V; m += 4)
    I = S[l.charCodeAt(m)] << 18 | S[l.charCodeAt(m + 1)] << 12 | S[l.charCodeAt(m + 2)] << 6 | S[l.charCodeAt(m + 3)], Z[d++] = I >> 16 & 255, Z[d++] = I >> 8 & 255, Z[d++] = I & 255;
  return b === 2 && (I = S[l.charCodeAt(m)] << 2 | S[l.charCodeAt(m + 1)] >> 4, Z[d++] = I & 255), b === 1 && (I = S[l.charCodeAt(m)] << 10 | S[l.charCodeAt(m + 1)] << 4 | S[l.charCodeAt(m + 2)] >> 2, Z[d++] = I >> 8 & 255, Z[d++] = I & 255), Z;
}
function sW(l) {
  return $[l >> 18 & 63] + $[l >> 12 & 63] + $[l >> 6 & 63] + $[l & 63];
}
function pW(l, I, G) {
  for (var c, b = [], Z = I; Z < G; Z += 3)
    c = (l[Z] << 16 & 16711680) + (l[Z + 1] << 8 & 65280) + (l[Z + 2] & 255), b.push(sW(c));
  return b.join("");
}
function QW(l) {
  for (var I, G = l.length, c = G % 3, b = [], Z = 16383, d = 0, V = G - c; d < V; d += Z)
    b.push(pW(l, d, d + Z > V ? V : d + Z));
  return c === 1 ? (I = l[G - 1], b.push(
    $[I >> 2] + $[I << 4 & 63] + "=="
  )) : c === 2 && (I = (l[G - 2] << 8) + l[G - 1], b.push(
    $[I >> 10] + $[I >> 4 & 63] + $[I << 2 & 63] + "="
  )), b.join("");
}
function HW(l, I) {
  let G = Array.from(
    { length: l.length },
    (c, b) => ({ start: b, end: b + 1 })
  );
  for (; G.length > 1; ) {
    let c = null;
    for (let b = 0; b < G.length - 1; b++) {
      const Z = l.slice(G[b].start, G[b + 1].end), d = I.get(Z.join(","));
      d != null && (c == null || d < c[0]) && (c = [d, b]);
    }
    if (c != null) {
      const b = c[1];
      G[b] = { start: G[b].start, end: G[b + 1].end }, G.splice(b + 1, 1);
    } else
      break;
  }
  return G;
}
function JW(l, I) {
  return l.length === 1 ? [I.get(l.join(","))] : HW(l, I).map((G) => I.get(l.slice(G.start, G.end).join(","))).filter((G) => G != null);
}
function uW(l) {
  return l.replace(/[\\^$*+?.()|[\]{}]/g, "\\$&");
}
var aG = class {
  constructor(l, I) {
    /** @internal */
    a(this, "specialTokens");
    /** @internal */
    a(this, "inverseSpecialTokens");
    /** @internal */
    a(this, "patStr");
    /** @internal */
    a(this, "textEncoder", new TextEncoder());
    /** @internal */
    a(this, "textDecoder", new TextDecoder("utf-8"));
    /** @internal */
    a(this, "rankMap", /* @__PURE__ */ new Map());
    /** @internal */
    a(this, "textMap", /* @__PURE__ */ new Map());
    this.patStr = l.pat_str;
    const G = l.bpe_ranks.split(`
`).filter(Boolean).reduce((c, b) => {
      const [Z, d, ...V] = b.split(" "), m = Number.parseInt(d, 10);
      return V.forEach((X, N) => c[X] = m + N), c;
    }, {});
    for (const [c, b] of Object.entries(G)) {
      const Z = zl.toByteArray(c);
      this.rankMap.set(Z.join(","), b), this.textMap.set(b, Z);
    }
    this.specialTokens = { ...l.special_tokens, ...I }, this.inverseSpecialTokens = Object.entries(this.specialTokens).reduce((c, [b, Z]) => (c[Z] = this.textEncoder.encode(b), c), {});
  }
  encode(l, I = [], G = "all") {
    const c = new RegExp(this.patStr, "ug"), b = aG.specialTokenRegex(
      Object.keys(this.specialTokens)
    ), Z = [], d = new Set(
      I === "all" ? Object.keys(this.specialTokens) : I
    ), V = new Set(
      G === "all" ? Object.keys(this.specialTokens).filter(
        (X) => !d.has(X)
      ) : G
    );
    if (V.size > 0) {
      const X = aG.specialTokenRegex([
        ...V
      ]), N = l.match(X);
      if (N != null)
        throw new Error(
          `The text contains a special token that is not allowed: ${N[0]}`
        );
    }
    let m = 0;
    for (; ; ) {
      let X = null, N = m;
      for (; b.lastIndex = N, X = b.exec(l), !(X == null || d.has(X[0])); )
        N = X.index + 1;
      const t = (X == null ? void 0 : X.index) ?? l.length;
      for (const F of l.substring(m, t).matchAll(c)) {
        const H = this.textEncoder.encode(F[0]), v = this.rankMap.get(H.join(","));
        if (v != null) {
          Z.push(v);
          continue;
        }
        Z.push(...JW(H, this.rankMap));
      }
      if (X == null)
        break;
      let p = this.specialTokens[X[0]];
      Z.push(p), m = X.index + X[0].length;
    }
    return Z;
  }
  decode(l) {
    const I = [];
    let G = 0;
    for (let Z = 0; Z < l.length; ++Z) {
      const d = l[Z], V = this.textMap.get(d) ?? this.inverseSpecialTokens[d];
      V != null && (I.push(V), G += V.length);
    }
    const c = new Uint8Array(G);
    let b = 0;
    for (const Z of I)
      c.set(Z, b), b += Z.length;
    return this.textDecoder.decode(c);
  }
}, Bc = aG;
nW(Bc, "specialTokenRegex", (l) => new RegExp(l.map((I) => uW(I)).join("|"), "g"));
  get: (I, G) => (typeof require < "u" ? require : I)[G]
}) : l)(function(l) {
  if (typeof require < "u")
    return require.apply(this, arguments);
  throw Error('Dynamic require of "' + l + '" is not supported');
}), L = (l, I) => {
  for (var G in I)
    yW(l, G, { get: I[G], enumerable: !0 });
}, Xl = class {
  constructor({
    observers: l,
    errorHandler: I
  }) {
    a(this, "observers");
    a(this, "errorHandler");
    this.observers = l, this.errorHandler = I ?? ((G) => console.error(G));
  }
  notify(l) {
    for (const I of this.observers)
      try {
        I.onFunctionEvent(l);
      } catch (G) {
        this.errorHandler(G);
      }
  }
}, IN = class {
  constructor({
    runId: l = `run-${EI()}`,
    sessionId: I,
    userId: G,
    abortSignal: c,
    observers: b,
    errorHandler: Z
  } = {}) {
    a(this, "runId");
    a(this, "sessionId");
    a(this, "userId");
    a(this, "abortSignal");
    a(this, "errorHandler");
    a(this, "events", []);
    a(this, "functionEventSource");
    a(this, "functionObserver", {
      onFunctionEvent: (l) => {
        this.events.push(l), this.functionEventSource.notify(l);
      }
    });
    this.runId = l, this.sessionId = I, this.userId = G, this.abortSignal = c, this.errorHandler = Z ?? ((d) => console.error(d)), this.functionEventSource = new Xl({
      observers: b ?? [],
      errorHandler: this.errorHandler.bind(this)
    });
  }
  getSuccessfulModelCalls() {
    return this.events.filter(
      (l) => "model" in l && "result" in l && "status" in l.result && l.result.status === "success"
    );
  }
}, wW = {};
L(wW, {
  getFunctionObservers: () => al,
  getLogFormat: () => Nl,
  setFunctionObservers: () => EW,
  setLogFormat: () => oW
});
var Mc = void 0, Tc = [];
function EW(l) {
  Tc = l;
}
function al() {
  return Tc;
}
function oW(l) {
  Mc = l;
}
function Nl() {
  return Mc;
}
var Kc = Symbol("promptFunction");
async function Bl(l) {
  return pG(l) ? await l() : { input: l, prompt: l };
}
function sG(l) {
  return l[Kc] = !0, l;
}
function pG(l) {
  return l[Kc] === !0 && typeof l == "function";
}
var UI = class extends Error {
  constructor(l = "Aborted") {
    super(l);
  }
}, z = class extends Error {
  constructor({
    message: I,
    url: G,
    requestBodyValues: c,
    statusCode: b,
    responseBody: Z,
    cause: d,
    isRetryable: V = b != null && (b === 429 || b >= 500),
    data: m
  }) {
    super(I);
    a(this, "url");
    a(this, "requestBodyValues");
    a(this, "statusCode");
    a(this, "responseBody");
    a(this, "cause");
    a(this, "isRetryable");
    a(this, "data");
    this.name = "ApiCallError", this.url = G, this.requestBodyValues = c, this.statusCode = b, this.responseBody = Z, this.cause = d, this.isRetryable = V, this.data = m;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      url: this.url,
      requestBodyValues: this.requestBodyValues,
      statusCode: this.statusCode,
      responseBody: this.responseBody,
      cause: this.cause,
      isRetryable: this.isRetryable,
      data: this.data
    };
  }
}, gW = {};
L(gW, {
  retryNever: () => jc,
  retryWithExponentialBackoff: () => AW,
  throttleMaxConcurrency: () => iW,
  throttleOff: () => Pc
});
var jc = () => async (l) => l();
async function LW(l) {
  return new Promise((I) => setTimeout(I, l));
}
function _(l) {
  return l == null ? "unknown error" : typeof l == "string" ? l : l instanceof Error ? l.message : JSON.stringify(l);
}
var bc = class extends Error {
  constructor({
    message: I,
    reason: G,
    errors: c
  }) {
    super(I);
    // note: property order determines debugging output
    a(this, "reason");
    a(this, "lastError");
    a(this, "errors");
    this.name = "RetryError", this.reason = G, this.errors = c, this.lastError = c[c.length - 1];
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      reason: this.reason,
      lastError: this.lastError,
      errors: this.errors
    };
  }
}, AW = ({
  maxTries: l = 3,
  initialDelayInMs: I = 2e3,
  backoffFactor: G = 2
} = {}) => async (c) => Sc(c, {
  maxTries: l,
  delayInMs: I,
  backoffFactor: G
});
async function Sc(l, {
  maxTries: I,
  delayInMs: G,
  backoffFactor: c
}, b = []) {
  try {
    return await l();
  } catch (Z) {
    const d = _(Z), V = [...b, Z], m = V.length;
    if (m >= I)
      throw new bc({
        message: `Failed after ${m} tries. Last error: ${d}`,
        reason: "maxTriesExceeded",
        errors: V
      });
    if (Z instanceof Error) {
      if (Z.name === "AbortError")
        throw Z;
      if (Z instanceof z && Z.isRetryable && m < I)
        return await LW(G), Sc(
          l,
          { maxTries: I, delayInMs: c * G, backoffFactor: c },
          V
        );
    }
    throw new bc({
      message: `Failed after ${m} attempt(s) with non-retryable error: '${d}'`,
      reason: "errorNotRetryable",
      errors: V
    });
  }
}
var rW = class {
  constructor({ maxConcurrentCalls: l }) {
    a(this, "maxConcurrentCalls");
    a(this, "activeCallCount");
    a(this, "callQueue");
    this.maxConcurrentCalls = l, this.activeCallCount = 0, this.callQueue = [];
  }
  async run(l) {
    return new Promise((I, G) => {
      const c = async () => {
        if (this.activeCallCount >= this.maxConcurrentCalls)
          return;
        this.activeCallCount++;
        const b = this.callQueue.indexOf(c);
        b !== -1 && this.callQueue.splice(b, 1);
        try {
          I(await l());
        } catch (Z) {
          G(Z);
        } finally {
          this.activeCallCount--, this.callQueue.length > 0 && this.callQueue[0]();
        }
      };
      this.callQueue.push(c), this.activeCallCount < this.maxConcurrentCalls && c();
    });
  }
};
function iW({
  maxConcurrentCalls: l
}) {
  const I = new rW({ maxConcurrentCalls: l });
  return (G) => I.run(G);
}
var Pc = () => (l) => l(), fc = class {
  constructor({
    retry: l,
    throttle: I,
    customCallHeaders: G = () => ({})
  }) {
    a(this, "retry");
    a(this, "throttle");
    a(this, "customCallHeaders");
    this.retry = l, this.throttle = I, this.customCallHeaders = G;
  }
  headers(l) {
    return Object.fromEntries(
      [
        ...Object.entries(this.fixedHeaders(l)),
        ...Object.entries(this.customCallHeaders(l))
      ].filter(
        // remove undefined values:
        (I) => typeof I[1] == "string"
      )
    );
  }
}, Oc = class extends fc {
  constructor({
    baseUrl: I,
    headers: G,
    retry: c,
    throttle: b,
    customCallHeaders: Z
  }) {
    super({ retry: c, throttle: b, customCallHeaders: Z });
    a(this, "baseUrl");
    a(this, "fixedHeadersValue");
    this.baseUrl = typeof I == "string" ? UW(I) : I, this.fixedHeadersValue = G ?? {};
  }
  fixedHeaders() {
    return this.fixedHeadersValue;
  }
  assembleUrl(I) {
    let G = this.baseUrl.path;
    return G.endsWith("/") && (G = G.slice(0, -1)), I.startsWith("/") || (I = `/${I}`), `${this.baseUrl.protocol}://${this.baseUrl.host}:${this.baseUrl.port}${G}${I}`;
  }
}, K = class extends Oc {
  constructor({
    baseUrlDefaults: l,
    baseUrl: I,
    headers: G,
    retry: c,
    throttle: b,
    customCallHeaders: Z
  }) {
    super({
      baseUrl: kW(I, l),
      headers: G,
      retry: c,
      throttle: b,
      customCallHeaders: Z
    });
  }
};
function UW(l) {
  const I = new URL(l);
  return {
    protocol: I.protocol.slice(0, -1),
    // remove trailing colon
    host: I.hostname,
    port: I.port,
    path: I.pathname
  };
}
function kW(l = {}, I) {
  return typeof l == "string" ? l : {
    protocol: l.protocol ?? I.protocol,
    host: l.host ?? I.host,
    port: l.port ?? I.port,
    path: l.path ?? I.path
  };
}
var lN = class {
  constructor() {
    a(this, "cache", /* @__PURE__ */ new Map());
  }
  hashKey(l) {
    return JSON.stringify(l);
  }
  async lookupValue(l) {
    return this.cache.get(this.hashKey(l)) ?? null;
  }
  async storeValue(l, I) {
    this.cache.set(this.hashKey(l), I);
  }
};
function Cl(l) {
  switch (l) {
    case "basic-text":
      return [xW];
    case "detailed-object":
      return [zW];
    case "detailed-json":
      return [BW];
    case "off":
    default:
      return [];
  }
}
var xW = {
  onFunctionEvent(l) {
    const I = `[${l.timestamp.toISOString()}] ${l.callId}${l.functionId != null ? ` (${l.functionId})` : ""} - ${l.functionType} ${l.eventType}`;
    switch (l.eventType) {
      case "started": {
        console.log(I);
        break;
      }
      case "finished": {
        console.log(`${I} in ${l.durationInMs}ms`);
        break;
      }
    }
  }
}, zW = {
  onFunctionEvent(l) {
    var c;
    l.eventType === "finished" && l.result != null && "rawResponse" in l.result && ((c = l.result) == null ? void 0 : c.rawResponse) != null && (l = {
      ...l,
      result: Object.fromEntries(
        Object.entries(l.result).filter(([b]) => b !== "rawResponse")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      )
    });
    function I(b) {
      return b instanceof Date || typeof b == "string" ? b : Array.isArray(b) ? b.map((Z) => I(Z)) : b !== null && typeof b == "object" ? Object.fromEntries(
        Object.entries(b).map(([Z, d]) => d === void 0 ? [Z, void 0] : d instanceof Uint8Array ? [Z, "omitted<Uint8Array>"] : Array.isArray(d) && d.length > 20 && d.every((V) => typeof V == "number") ? [Z, "omitted<Array<number>>"] : [Z, I(d)]).filter(([Z, d]) => d !== void 0)
      ) : b;
    }
    const G = I(l);
    console.log(G);
  }
}, BW = {
  onFunctionEvent(l) {
    var I;
    l.eventType === "finished" && l.result != null && "rawResponse" in l.result && ((I = l.result) == null ? void 0 : I.rawResponse) != null && (l = {
      ...l,
      result: Object.fromEntries(
        Object.entries(l.result).filter(([G]) => G !== "rawResponse")
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      )
    }), l = Object.fromEntries(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(l).filter(([G, c]) => c !== void 0)
    ), console.log(JSON.stringify(l));
  }
};
function Dc() {
  var I, G, c;
  return globalThis.EdgeRuntime ? "vercel-edge" : ((I = globalThis.navigator) == null ? void 0 : I.userAgent) === "Cloudflare-Workers" ? "cloudflare-workers" : ((c = (G = globalThis.process) == null ? void 0 : G.release) == null ? void 0 : c.name) === "node" ? "node" : globalThis.window ? "browser" : null;
}
var pI;
async function qc() {
  if (Dc() === "node" && !pI) {
    let l;
    try {
      l = (await Promise.resolve().then(() => Oa)).AsyncLocalStorage;
    } catch {
      try {
        l = Cc("async_hooks").AsyncLocalStorage;
      } catch {
        throw new Error("Failed to load 'async_hooks' module dynamically.");
      }
    }
    pI = new l();
  }
  return Promise.resolve();
}
async function Ml(l) {
  return await qc(), l ?? (pI == null ? void 0 : pI.getStore());
}
async function GN(l, I) {
  await qc(), pI != null ? await pI.run(l, () => I(l)) : await I(l);
}
function Tl() {
  return globalThis.performance != null ? new CW() : new MW();
}
var CW = class {
  constructor() {
    a(this, "startTime", globalThis.performance.now());
  }
  get startEpochSeconds() {
    return Math.floor(
      (globalThis.performance.timeOrigin + this.startTime) / 1e3
    );
  }
  get startDate() {
    return new Date(this.startEpochSeconds * 1e3);
  }
  get durationInMs() {
    return Math.ceil(globalThis.performance.now() - this.startTime);
  }
}, MW = class {
  constructor() {
    a(this, "startTime", Date.now());
  }
  get startEpochSeconds() {
    return Math.floor(this.startTime / 1e3);
  }
  get startDate() {
    return new Date(this.startTime);
  }
  get durationInMs() {
    return Date.now() - this.startTime;
  }
}, Zl = async (l) => {
  try {
    return { ok: !0, value: await l() };
  } catch (I) {
    return I instanceof Error && I.name === "AbortError" ? { ok: !1, isAborted: !0 } : { ok: !1, error: I };
  }
};
async function Rl({
  options: l,
  input: I,
  functionType: G,
  execute: c,
  inputPropertyName: b = "input",
  outputPropertyName: Z = "value"
}) {
  const d = await Ml(l == null ? void 0 : l.run), V = new Xl({
    observers: [
      ...Cl((l == null ? void 0 : l.logging) ?? Nl()),
      ...al(),
      ...(d == null ? void 0 : d.functionObserver) != null ? [d.functionObserver] : [],
      ...(l == null ? void 0 : l.observers) ?? []
    ],
    errorHandler: d == null ? void 0 : d.errorHandler
  }), m = Tl(), X = {
    functionType: G,
    callId: `call-${EI()}`,
    parentCallId: l == null ? void 0 : l.callId,
    runId: d == null ? void 0 : d.runId,
    sessionId: d == null ? void 0 : d.sessionId,
    userId: d == null ? void 0 : d.userId,
    functionId: l == null ? void 0 : l.functionId,
    [b]: I,
    timestamp: m.startDate,
    startTimestamp: m.startDate
  };
  V.notify({
    eventType: "started",
    ...X
  });
  const N = await Zl(
    () => c({
      functionType: G,
      functionId: l == null ? void 0 : l.functionId,
      callId: X.callId,
      logging: l == null ? void 0 : l.logging,
      observers: l == null ? void 0 : l.observers,
      run: d
    })
  ), t = {
    eventType: "finished",
    ...X,
    finishTimestamp: /* @__PURE__ */ new Date(),
    durationInMs: m.durationInMs
  };
  if (!N.ok)
    throw N.isAborted ? (V.notify({
      ...t,
      eventType: "finished",
      result: {
        status: "abort"
      }
    }), new UI()) : (V.notify({
      ...t,
      eventType: "finished",
      result: {
        status: "error",
        error: N.error
      }
    }), N.error);
  return V.notify({
    ...t,
    eventType: "finished",
    result: {
      status: "success",
      [Z]: N.value
    }
  }), N.value;
}
async function cN(l, I, G) {
  return Rl({
    options: G,
    input: I,
    functionType: "execute-function",
    execute: async (c) => l(I, c)
  });
}
var gl = class extends Error {
  constructor({ text: I, cause: G }) {
    super(
      `JSON parsing failed: Text: ${I}.
Error message: ${_(G)}`
    );
    // note: property order determines debugging output
    a(this, "text");
    a(this, "cause");
    this.name = "JSONParseError", this.cause = G, this.text = I;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      valueText: this.text
    };
  }
}, QI = class extends Error {
  constructor({ value: I, cause: G }) {
    super(
      `Type validation failed: Value: ${JSON.stringify(I)}.
Error message: ${_(G)}`
    );
    a(this, "value");
    a(this, "cause");
    this.name = "TypeValidationError", this.cause = G, this.value = I;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      value: this.value
    };
  }
};
function bN(l) {
  return new TW(l);
}
var TW = class {
  constructor(l) {
    a(this, "_type");
    this.jsonSchema = l;
  }
  validate(l) {
    return { success: !0, value: l };
  }
  getJsonSchema() {
    return this.jsonSchema;
  }
};
function s(l) {
  return new KW(l);
}
var KW = class {
  constructor(l) {
    a(this, "zodSchema");
    /**
     * Use only for typing purposes. The value is always `undefined`.
     */
    a(this, "_type");
    /**
     * Use only for typing purposes. The value is always `undefined`.
     */
    a(this, "_partialType");
    this.zodSchema = l;
  }
  validate(l) {
    const I = this.zodSchema.safeParse(l);
    return I.success ? { success: !0, value: I.data } : { success: !1, error: I.error };
  }
  getJsonSchema() {
    return dW(this.zodSchema);
  }
};
function VI({
  value: l,
  schema: I
}) {
  try {
    const G = I.validate(l);
    if (!G.success)
      throw new QI({
        value: l,
        cause: G.error
      });
    return G.value;
  } catch (G) {
    throw G instanceof QI ? G : new QI({ value: l, cause: G });
  }
}
function jW({
  value: l,
  schema: I
}) {
  try {
    const G = I.validate(l);
    return G.success ? G : {
      success: !1,
      error: new QI({
        value: l,
        cause: G.error
      })
    };
  } catch (G) {
    return {
      success: !1,
      error: G instanceof QI ? G : new QI({ value: l, cause: G })
    };
  }
}
function eI({
  text: l,
  schema: I
}) {
  try {
    const G = bl.parse(l);
    return I == null ? G : VI({ value: G, schema: I });
  } catch (G) {
    throw G instanceof gl || G instanceof QI ? G : new gl({ text: l, cause: G });
  }
}
function TI({
  text: l,
  schema: I
}) {
  try {
    const G = bl.parse(l);
    return I == null ? {
      success: !0,
      value: G
    } : jW({ value: G, schema: I });
  } catch (G) {
    return {
      success: !1,
      error: G instanceof gl ? G : new gl({ text: l, cause: G })
    };
  }
}
function _c(l, I) {
  if (l.length !== I.length)
    throw new Error(
      `Vectors must have the same length (a: ${l.length}, b: ${I.length})`
    );
  return $c(l, I) / (Zc(l) * Zc(I));
}
function $c(l, I) {
  return l.reduce(
    (G, c, b) => G + c * I[b],
    0
  );
}
function Zc(l) {
  return Math.sqrt($c(l, l));
}
async function GI({
  model: l,
  options: I,
  input: G,
  functionType: c,
  generateResponse: b
}) {
  const Z = await Ml(I == null ? void 0 : I.run), d = l.settings, V = new Xl({
    observers: [
      ...Cl((I == null ? void 0 : I.logging) ?? Nl()),
      ...al(),
      ...d.observers ?? [],
      ...(Z == null ? void 0 : Z.functionObserver) != null ? [Z.functionObserver] : [],
      ...(I == null ? void 0 : I.observers) ?? []
    ],
    errorHandler: Z == null ? void 0 : Z.errorHandler
  }), m = Tl(), X = {
    functionType: c,
    callId: `call-${EI()}`,
    parentCallId: I == null ? void 0 : I.callId,
    runId: Z == null ? void 0 : Z.runId,
    sessionId: Z == null ? void 0 : Z.sessionId,
    userId: Z == null ? void 0 : Z.userId,
    functionId: I == null ? void 0 : I.functionId,
    model: l.modelInformation,
    settings: l.settingsForEvent,
    input: G,
    timestamp: m.startDate,
    startTimestamp: m.startDate
  };
  V.notify({
    eventType: "started",
    ...X
  });
  const N = await Zl(
    () => b({
      functionType: c,
      functionId: I == null ? void 0 : I.functionId,
      callId: X.callId,
      logging: I == null ? void 0 : I.logging,
      observers: I == null ? void 0 : I.observers,
      cache: I == null ? void 0 : I.cache,
      run: Z
    })
  ), t = {
    eventType: "finished",
    ...X,
    finishTimestamp: /* @__PURE__ */ new Date(),
    durationInMs: m.durationInMs
  };
  if (!N.ok)
    throw N.isAborted ? (V.notify({
      ...t,
      eventType: "finished",
      result: {
        status: "abort"
      }
    }), new UI()) : (V.notify({
      ...t,
      eventType: "finished",
      result: {
        status: "error",
        error: N.error
      }
    }), N.error);
  const p = N.value.rawResponse, F = N.value.extractedValue, H = N.value.usage;
  return V.notify({
    ...t,
    eventType: "finished",
    result: {
      status: "success",
      usage: H,
      rawResponse: p,
      value: F
    }
  }), {
    value: F,
    rawResponse: p,
    metadata: {
      model: l.modelInformation,
      callId: t.callId,
      runId: t.runId,
      sessionId: t.sessionId,
      userId: t.userId,
      functionId: t.functionId,
      startTimestamp: X.startTimestamp,
      finishTimestamp: t.finishTimestamp,
      durationInMs: t.durationInMs,
      usage: H
    }
  };
}
async function Ib({
  model: l,
  values: I,
  fullResponse: G,
  ...c
}) {
  const b = await GI({
    functionType: "embed",
    input: I,
    model: l,
    options: c,
    generateResponse: async (Z) => {
      const d = l.maxValuesPerCall, V = [];
      if (d == null)
        V.push(I);
      else
        for (let t = 0; t < I.length; t += d)
          V.push(I.slice(t, t + d));
      let m;
      if (l.isParallelizable)
        m = await Promise.all(
          V.map(
            (t) => l.doEmbedValues(t, Z)
          )
        );
      else {
        m = [];
        for (const t of V) {
          const p = await l.doEmbedValues(t, Z);
          m.push(p);
        }
      }
      const X = m.map((t) => t.rawResponse), N = [];
      for (const t of m)
        N.push(...t.embeddings);
      return {
        rawResponse: X,
        extractedValue: N
      };
    }
  });
  return G ? {
    embeddings: b.value,
    rawResponse: b.rawResponse,
    metadata: b.metadata
  } : b.value;
}
async function lb({
  model: l,
  value: I,
  fullResponse: G,
  ...c
}) {
  const b = await GI({
    functionType: "embed",
    input: I,
    model: l,
    options: c,
    generateResponse: async (Z) => {
      const d = await l.doEmbedValues([I], Z);
      return {
        rawResponse: d.rawResponse,
        extractedValue: d.embeddings[0]
      };
    }
  });
  return G ? {
    embedding: b.value,
    rawResponse: b.rawResponse,
    metadata: b.metadata
  } : b.value;
}
var ZN = class Gb {
  constructor(I) {
    a(this, "settings");
    a(this, "modelInformation", {
      provider: "modelfusion",
      modelName: "EmbeddingSimilarityClassifier"
    });
    a(this, "embeddings");
    this.settings = I;
  }
  async getEmbeddings(I) {
    if (this.embeddings != null)
      return this.embeddings;
    const G = [];
    for (const c of this.settings.clusters) {
      const b = await Ib({
        model: this.settings.embeddingModel,
        values: c.values,
        ...I
      });
      for (let Z = 0; Z < b.length; Z++)
        G.push({
          embedding: b[Z],
          clusterValue: c.values[Z],
          clusterName: c.name
        });
    }
    return this.embeddings = G, G;
  }
  async doClassify(I, G) {
    const c = await lb({
      model: this.settings.embeddingModel,
      value: I,
      ...G
    }), b = await this.getEmbeddings(G), Z = [];
    for (const d of b) {
      const V = _c(c, d.embedding);
      V >= this.settings.similarityThreshold && Z.push({
        similarity: V,
        clusterValue: d.clusterValue,
        clusterName: d.clusterName
      });
    }
    return Z.sort((d, V) => V.similarity - d.similarity), {
      class: Z.length > 0 ? Z[0].clusterName : null,
      rawResponse: void 0
    };
  }
  get settingsForEvent() {
    const I = [
      "clusters",
      "embeddingModel",
      "similarityThreshold"
    ];
    return Object.fromEntries(
      Object.entries(this.settings).filter(
        ([G]) => I.includes(G)
      )
    );
  }
  withSettings(I) {
    return new Gb(
      Object.assign({}, this.settings, I)
    );
  }
};
async function dN({
  model: l,
  value: I,
  fullResponse: G,
  ...c
}) {
  const b = await GI({
    functionType: "classify",
    input: I,
    model: l,
    options: c,
    generateResponse: async (Z) => {
      const d = await l.doClassify(I, Z);
      return {
        rawResponse: d.rawResponse,
        extractedValue: d.class
      };
    }
  });
  return G ? {
    class: b.value,
    rawResponse: b.rawResponse,
    metadata: b.metadata
  } : b.value;
}
var QG = class NG {
  constructor({
    model: I,
    promptTemplate: G
  }) {
    a(this, "model");
    a(this, "promptTemplate");
    this.model = I, this.promptTemplate = G;
  }
  get modelInformation() {
    return this.model.modelInformation;
  }
  get settings() {
    return this.model.settings;
  }
  doGenerateImages(I, G) {
    const c = this.promptTemplate.format(I);
    return this.model.doGenerateImages(c, G);
  }
  get settingsForEvent() {
    return this.model.settingsForEvent;
  }
  withPromptTemplate(I) {
    return new NG({ model: this, promptTemplate: I });
  }
  withSettings(I) {
    return new NG({
      model: this.model.withSettings(I),
      promptTemplate: this.promptTemplate
    });
  }
};
function Kl(l) {
  return Uint8Array.from(
    globalThis.atob(PW(l)),
    (I) => I.codePointAt(0)
  );
}
var SW = 65535;
function dc(l) {
  let I;
  if (l.length < SW)
    I = globalThis.btoa(String.fromCodePoint(...l));
  else {
    I = "";
    for (const G of l)
      I += String.fromCodePoint(G);
    I = globalThis.btoa(I);
  }
  return I;
}
function PW(l) {
  return l.replaceAll("-", "+").replaceAll("_", "/");
}
async function WN({
  model: l,
  prompt: I,
  fullResponse: G,
  ...c
}) {
  const b = await GI({
    functionType: "generate-image",
    input: I,
    model: l,
    options: c,
    generateResponse: async (V) => {
      const m = await l.doGenerateImages(I, V);
      return {
        rawResponse: m.rawResponse,
        extractedValue: m.base64Images
      };
    }
  }), Z = b.value, d = Z.map(Kl);
  return G ? {
    image: d[0],
    imageBase64: Z[0],
    images: d,
    imagesBase64: Z,
    rawResponse: b.rawResponse,
    metadata: b.metadata
  } : d[0];
}
async function VN({
  model: l,
  text: I,
  fullResponse: G,
  ...c
}) {
  const b = await GI({
    functionType: "generate-speech",
    input: I,
    model: l,
    options: c,
    generateResponse: async (Z) => {
      const d = await l.doGenerateSpeechStandard(I, Z);
      return {
        rawResponse: d,
        extractedValue: d
      };
    }
  });
  return G ? {
    speech: b.value,
    rawResponse: b.rawResponse,
    metadata: b.metadata
  } : b.value;
}
var oI = class {
  constructor() {
    a(this, "values", Array());
    a(this, "pendingResolvers", []);
    a(this, "closed", !1);
  }
  processPendingResolvers() {
    var l;
    for (; this.pendingResolvers.length > 0; )
      (l = this.pendingResolvers.shift()) == null || l();
  }
  /**
   * Pushes an element onto the queue. If the queue is closed, an error is thrown.
   *
   * @param {T} value - The element to add to the queue.
   * @throws {Error} Throws an error if the queue is closed.
   * @example
   * queue.push(2);
   */
  push(l) {
    if (this.closed)
      throw new Error("Cannot push value to closed queue.");
    this.values.push({ type: "value", value: l }), this.processPendingResolvers();
  }
  error(l) {
    if (this.closed)
      throw new Error("Cannot push error to closed queue.");
    this.values.push({ type: "error", error: l }), this.processPendingResolvers();
  }
  /**
   * Closes the queue, preventing more elements from being pushed onto it.
   *
   * @example
   * queue.close();
   */
  close() {
    this.closed = !0, this.processPendingResolvers();
  }
  /**
   * Creates and returns an async iterator that allows the queue to be consumed.
   * You can create multiple iterators for the same queue.
   *
   * @returns {AsyncIterator<T>} An async iterator for the queue.
   * @example
   * (async () => {
   *   for await (const value of queue) {
   *     console.log(value);
   *   }
   * })();
   */
  [Symbol.asyncIterator]() {
    let l = 0;
    return {
      next: () => new Promise((I, G) => {
        const c = () => {
          if (l < this.values.length) {
            const b = this.values[l++];
            switch (b.type) {
              case "value":
                I({ value: b.value, done: !1 });
                break;
              case "error":
                G(b.error);
                break;
            }
          } else
            this.closed ? I({ value: void 0, done: !0 }) : this.pendingResolvers.push(c);
        };
        c();
      })
    };
  }
};
async function HG({
  model: l,
  options: I,
  input: G,
  functionType: c,
  startStream: b,
  processDelta: Z,
  processFinished: d,
  onDone: V
}) {
  const m = await Ml(I == null ? void 0 : I.run), X = l.settings, N = new Xl({
    observers: [
      ...Cl((I == null ? void 0 : I.logging) ?? Nl()),
      ...al(),
      ...X.observers ?? [],
      ...(m == null ? void 0 : m.functionObserver) != null ? [m.functionObserver] : [],
      ...(I == null ? void 0 : I.observers) ?? []
    ],
    errorHandler: m == null ? void 0 : m.errorHandler
  }), t = Tl(), p = {
    functionType: c,
    callId: `call-${EI()}`,
    parentCallId: I == null ? void 0 : I.callId,
    runId: m == null ? void 0 : m.runId,
    sessionId: m == null ? void 0 : m.sessionId,
    userId: m == null ? void 0 : m.userId,
    functionId: I == null ? void 0 : I.functionId,
    model: l.modelInformation,
    settings: l.settingsForEvent,
    input: G,
    timestamp: t.startDate,
    startTimestamp: t.startDate
  };
  N.notify({
    eventType: "started",
    ...p
  });
  const F = await Zl(async () => {
    const H = await b({
      functionType: c,
      functionId: I == null ? void 0 : I.functionId,
      callId: p.callId,
      logging: I == null ? void 0 : I.logging,
      observers: I == null ? void 0 : I.observers,
      run: m
    }), v = new oI();
    return async function() {
      try {
        const o = await Zl(async () => {
          for await (const r of H) {
            if ((r == null ? void 0 : r.type) === "error") {
              const aI = r.error, bI = {
                eventType: "finished",
                ...p,
                finishTimestamp: /* @__PURE__ */ new Date(),
                durationInMs: t.durationInMs
              };
              throw N.notify(
                aI instanceof UI ? {
                  ...bI,
                  result: { status: "abort" }
                } : {
                  ...bI,
                  result: { status: "error", error: aI }
                }
              ), aI;
            }
            if ((r == null ? void 0 : r.type) === "delta") {
              const aI = Z(r);
              aI !== void 0 && v.push(aI);
            }
          }
          if (d != null) {
            const r = d();
            r !== void 0 && v.push(r);
          }
        });
        if (!o.ok) {
          const r = {
            eventType: "finished",
            ...p,
            finishTimestamp: /* @__PURE__ */ new Date(),
            durationInMs: t.durationInMs
          };
          if (o.isAborted) {
            N.notify({
              ...r,
              eventType: "finished",
              result: {
                status: "abort"
              }
            }), v.error(new UI());
            return;
          }
          N.notify({
            ...r,
            eventType: "finished",
            result: {
              status: "error",
              error: o.error
            }
          }), v.error(o.error);
          return;
        }
        V == null || V();
        const T = {
          eventType: "finished",
          ...p,
          finishTimestamp: /* @__PURE__ */ new Date(),
          durationInMs: t.durationInMs
        };
        N.notify({
          ...T,
          result: {
            status: "success"
          }
        });
      } finally {
        v.close();
      }
    }(), {
      stream: v
    };
  });
  if (!F.ok) {
    const H = {
      eventType: "finished",
      ...p,
      finishTimestamp: /* @__PURE__ */ new Date(),
      durationInMs: t.durationInMs
    };
    throw F.isAborted ? (N.notify({
      ...H,
      eventType: "finished",
      result: {
        status: "abort"
      }
    }), new UI()) : (N.notify({
      ...H,
      eventType: "finished",
      result: {
        status: "error",
        error: F.error
      }
    }), F.error);
  }
  return {
    value: F.value.stream,
    metadata: p
  };
}
async function mN({
  model: l,
  text: I,
  fullResponse: G,
  ...c
}) {
  let b;
  if (typeof I == "string") {
    const d = new oI();
    d.push(I), d.close(), b = d;
  } else
    b = I;
  const Z = await HG({
    functionType: "stream-speech",
    input: I,
    model: l,
    options: c,
    startStream: async (d) => l.doGenerateSpeechStreamDuplex(b, d),
    processDelta: (d) => d.deltaValue
  });
  return G ? {
    speechStream: Z.value,
    metadata: Z.metadata
  } : Z.value;
}
async function JG({
  model: l,
  prompt: I,
  fullResponse: G,
  ...c
}) {
  const b = await Bl(I), Z = await GI({
    functionType: "generate-text",
    input: b,
    model: l,
    options: c,
    generateResponse: async (m) => {
      async function X() {
        if ((m == null ? void 0 : m.cache) == null)
          return {
            ...await l.doGenerateTexts(b.prompt, m),
            cache: void 0
          };
        let F;
        const H = {
          functionType: "generate-text",
          functionId: m == null ? void 0 : m.functionId,
          input: {
            model: l,
            settings: l.settingsForEvent,
            // TODO should include full model information
            prompt: b.prompt
          }
        };
        try {
          const o = await m.cache.lookupValue(H);
          if (o != null)
            return {
              ...l.restoreGeneratedTexts(o),
              cache: { status: "hit" }
            };
        } catch (o) {
          F = [o];
        }
        const v = await l.doGenerateTexts(
          b.prompt,
          m
        );
        try {
          await m.cache.storeValue(H, v.rawResponse);
        } catch (o) {
          F = [...F ?? [], o];
        }
        return {
          ...v,
          cache: { status: "miss", errors: F }
        };
      }
      const N = await X(), p = l.settings.trimWhitespace ?? !0 ? N.textGenerationResults.map((F) => ({
        text: F.text.trim(),
        finishReason: F.finishReason
      })) : N.textGenerationResults;
      return {
        rawResponse: N.rawResponse,
        extractedValue: p,
        usage: N.usage
      };
    }
  }), d = Z.value, V = d[0];
  return G ? {
    text: V.text,
    finishReason: V.finishReason,
    texts: d.map(
      (m) => m.text
    ),
    textGenerationResults: d,
    rawResponse: Z.rawResponse,
    metadata: Z.metadata
  } : V.text;
}
var cb = class extends Error {
  constructor({ valueText: I, cause: G }) {
    super(
      `Object parsing failed. Value: ${I}.
Error message: ${_(G)}`
    );
    a(this, "cause");
    a(this, "valueText");
    this.name = "ObjectParseError", this.cause = G, this.valueText = I;
  }
  toJSON() {
    return {
      name: this.name,
      cause: this.cause,
      message: this.message,
      stack: this.stack,
      valueText: this.valueText
    };
  }
}, bb = class Zb {
  constructor({
    model: I,
    template: G
  }) {
    a(this, "model");
    a(this, "template");
    this.model = I, this.template = G;
  }
  get modelInformation() {
    return this.model.modelInformation;
  }
  get settings() {
    return this.model.settings;
  }
  get settingsForEvent() {
    return this.model.settingsForEvent;
  }
  getModelWithJsonOutput(I) {
    return this.template.withJsonOutput != null ? this.template.withJsonOutput({
      model: this.model,
      schema: I
    }) : this.model;
  }
  async doGenerateObject(I, G, c) {
    const { rawResponse: b, text: Z } = await JG({
      model: this.getModelWithJsonOutput(I),
      prompt: this.template.createPrompt(G, I),
      fullResponse: !0,
      ...c
    });
    try {
      return {
        rawResponse: b,
        value: this.template.extractObject(Z),
        valueText: Z
      };
    } catch (d) {
      throw new cb({
        valueText: Z,
        cause: d
      });
    }
  }
  withSettings(I) {
    return new Zb({
      model: this.model.withSettings(I),
      template: this.template
    });
  }
};
async function fW({
  model: l,
  prompt: I,
  fullResponse: G,
  ...c
}) {
  const b = l.settings.trimWhitespace ?? !0;
  let Z = "", d = !0, V = "", m;
  const X = new Promise((p) => {
    m = p;
  }), N = await Bl(I), t = await HG({
    functionType: "stream-text",
    input: N,
    model: l,
    options: c,
    startStream: async (p) => l.doStreamText(N.prompt, p),
    processDelta: (p) => {
      let F = l.extractTextDelta(p.deltaValue);
      if (!(F == null || F.length === 0)) {
        if (b) {
          F = d ? (
            // remove leading whitespace:
            F.trimStart()
          ) : (
            // restore trailing whitespace from previous chunk:
            V + F
          );
          const H = F.match(/\s+$/);
          V = H ? H[0] : "", F = F.trimEnd();
        }
        return d = !1, Z += F, F;
      }
    },
    onDone: () => {
      m(Z);
    }
  });
  return G ? {
    textStream: t.value,
    textPromise: X,
    metadata: t.metadata
  } : t.value;
}
function OW(l) {
  const I = ["ROOT"];
  let G = -1, c = null;
  function b(m, X, N) {
    switch (m) {
      case '"': {
        G = X, I.pop(), I.push(N), I.push("INSIDE_STRING");
        break;
      }
      case "f":
      case "t":
      case "n": {
        G = X, c = X, I.pop(), I.push(N), I.push("INSIDE_LITERAL");
        break;
      }
      case "-": {
        I.pop(), I.push(N), I.push("INSIDE_NUMBER");
        break;
      }
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9": {
        G = X, I.pop(), I.push(N), I.push("INSIDE_NUMBER");
        break;
      }
      case "{": {
        G = X, I.pop(), I.push(N), I.push("INSIDE_OBJECT_START");
        break;
      }
      case "[": {
        G = X, I.pop(), I.push(N), I.push("INSIDE_ARRAY_START");
        break;
      }
    }
  }
  function Z(m, X) {
    switch (m) {
      case ",": {
        I.pop(), I.push("INSIDE_OBJECT_AFTER_COMMA");
        break;
      }
      case "}": {
        G = X, I.pop();
        break;
      }
    }
  }
  function d(m, X) {
    switch (m) {
      case ",": {
        I.pop(), I.push("INSIDE_ARRAY_AFTER_COMMA");
        break;
      }
      case "]": {
        G = X, I.pop();
        break;
      }
    }
  }
  for (let m = 0; m < l.length; m++) {
    const X = l[m];
    switch (I[I.length - 1]) {
      case "ROOT":
        b(X, m, "FINISH");
        break;
      case "INSIDE_OBJECT_START": {
        switch (X) {
          case '"': {
            I.pop(), I.push("INSIDE_OBJECT_KEY");
            break;
          }
          case "}": {
            I.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_COMMA": {
        switch (X) {
          case '"': {
            I.pop(), I.push("INSIDE_OBJECT_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_KEY": {
        switch (X) {
          case '"': {
            I.pop(), I.push("INSIDE_OBJECT_AFTER_KEY");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_AFTER_KEY": {
        switch (X) {
          case ":": {
            I.pop(), I.push("INSIDE_OBJECT_BEFORE_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_OBJECT_BEFORE_VALUE": {
        b(X, m, "INSIDE_OBJECT_AFTER_VALUE");
        break;
      }
      case "INSIDE_OBJECT_AFTER_VALUE": {
        Z(X, m);
        break;
      }
      case "INSIDE_STRING": {
        switch (X) {
          case '"': {
            I.pop(), G = m;
            break;
          }
          case "\\": {
            I.push("INSIDE_STRING_ESCAPE");
            break;
          }
          default:
            G = m;
        }
        break;
      }
      case "INSIDE_ARRAY_START": {
        switch (X) {
          case "]": {
            G = m, I.pop();
            break;
          }
          default: {
            G = m, b(X, m, "INSIDE_ARRAY_AFTER_VALUE");
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_VALUE": {
        switch (X) {
          case ",": {
            I.pop(), I.push("INSIDE_ARRAY_AFTER_COMMA");
            break;
          }
          case "]": {
            G = m, I.pop();
            break;
          }
          default: {
            G = m;
            break;
          }
        }
        break;
      }
      case "INSIDE_ARRAY_AFTER_COMMA": {
        b(X, m, "INSIDE_ARRAY_AFTER_VALUE");
        break;
      }
      case "INSIDE_STRING_ESCAPE": {
        I.pop(), G = m;
        break;
      }
      case "INSIDE_NUMBER": {
        switch (X) {
          case "0":
          case "1":
          case "2":
          case "3":
          case "4":
          case "5":
          case "6":
          case "7":
          case "8":
          case "9": {
            G = m;
            break;
          }
          case "e":
          case "E":
          case "-":
          case ".":
            break;
          case ",": {
            I.pop(), I[I.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && d(X, m), I[I.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && Z(X, m);
            break;
          }
          case "}": {
            I.pop(), I[I.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" && Z(X, m);
            break;
          }
          case "]": {
            I.pop(), I[I.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && d(X, m);
            break;
          }
          default: {
            I.pop();
            break;
          }
        }
        break;
      }
      case "INSIDE_LITERAL": {
        const t = l.substring(c, m + 1);
        !"false".startsWith(t) && !"true".startsWith(t) && !"null".startsWith(t) ? (I.pop(), I[I.length - 1] === "INSIDE_OBJECT_AFTER_VALUE" ? Z(X, m) : I[I.length - 1] === "INSIDE_ARRAY_AFTER_VALUE" && d(X, m)) : G = m;
        break;
      }
    }
  }
  let V = l.slice(0, G + 1);
  for (let m = I.length - 1; m >= 0; m--)
    switch (I[m]) {
      case "INSIDE_STRING": {
        V += '"';
        break;
      }
      case "INSIDE_OBJECT_KEY":
      case "INSIDE_OBJECT_AFTER_KEY":
      case "INSIDE_OBJECT_AFTER_COMMA":
      case "INSIDE_OBJECT_START":
      case "INSIDE_OBJECT_BEFORE_VALUE":
      case "INSIDE_OBJECT_AFTER_VALUE": {
        V += "}";
        break;
      }
      case "INSIDE_ARRAY_START":
      case "INSIDE_ARRAY_AFTER_COMMA":
      case "INSIDE_ARRAY_AFTER_VALUE": {
        V += "]";
        break;
      }
      case "INSIDE_LITERAL": {
        const N = l.substring(c, l.length);
        "true".startsWith(N) ? V += "true".slice(N.length) : "false".startsWith(N) ? V += "false".slice(N.length) : "null".startsWith(N) && (V += "null".slice(N.length));
      }
    }
  return V;
}
function uG(l) {
  if (l != null)
    try {
      return bl.parse(l);
    } catch {
      try {
        const G = OW(l);
        return bl.parse(G);
      } catch {
      }
    }
}
var q = class db extends bb {
  constructor(I) {
    super(I);
  }
  async doStreamObject(I, G, c) {
    const b = await fW({
      model: this.getModelWithJsonOutput(I),
      prompt: this.template.createPrompt(G, I),
      ...c
    }), Z = new oI();
    return (async () => {
      try {
        for await (const d of b)
          Z.push({ type: "delta", deltaValue: d });
      } catch (d) {
        Z.push({ type: "error", error: d });
      } finally {
        Z.close();
      }
    })(), Z;
  }
  extractObjectTextDelta(I) {
    return I;
  }
  parseAccumulatedObjectText(I) {
    return uG(I);
  }
  withSettings(I) {
    return new db({
      model: this.model.withSettings(I),
      template: this.template
    });
  }
}, XN = class extends Response {
  constructor(l, I) {
    super(DW(l), {
      ...I,
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" }
    });
  }
};
async function* aN({
  response: l
}) {
  let I = "";
  const G = l.body.getReader();
  for (; ; ) {
    const { done: c, value: b } = await G.read();
    if (c)
      break;
    I += new TextDecoder().decode(b), yield { partialObject: uG(I) };
  }
}
function DW(l) {
  const I = new TextEncoder();
  return new ReadableStream({
    async start(G) {
      try {
        for await (const { textDelta: c } of l)
          G.enqueue(I.encode(c));
      } finally {
        G.close();
      }
    }
  });
}
var qW = class extends Error {
  constructor({
    value: I,
    valueText: G,
    cause: c
  }) {
    super(
      `Object validation failed. Value: ${G}.
Error message: ${_(c)}`
    );
    a(this, "cause");
    a(this, "valueText");
    a(this, "value");
    this.name = "ObjectValidationError", this.cause = c, this.value = I, this.valueText = G;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      value: this.value,
      valueText: this.valueText
    };
  }
};
async function _W({
  model: l,
  schema: I,
  prompt: G,
  fullResponse: c,
  ...b
}) {
  const Z = typeof G == "function" && !pG(G) ? G(I) : G, d = await Bl(Z), V = await GI({
    functionType: "generate-object",
    input: {
      schema: I,
      ...d
    },
    model: l,
    options: b,
    generateResponse: async (m) => {
      const X = await l.doGenerateObject(
        I,
        d.prompt,
        m
      ), N = I.validate(X.value);
      if (!N.success)
        throw new qW({
          valueText: X.valueText,
          value: X.value,
          cause: N.error
        });
      const t = N.value;
      return {
        rawResponse: X.rawResponse,
        extractedValue: t,
        usage: X.usage
      };
    }
  });
  return c ? {
    value: V.value,
    rawResponse: V.rawResponse,
    metadata: V.metadata
  } : V.value;
}
var $W = "JSON schema:", IV = `
You MUST answer with a JSON object that matches the JSON schema above.`, NN = {
  custom(l) {
    return { createPrompt: l, extractObject: lG };
  },
  text({
    schemaPrefix: l,
    schemaSuffix: I
  } = {}) {
    return {
      createPrompt: (G, c) => ({
        system: Wc({ schema: c, schemaPrefix: l, schemaSuffix: I }),
        instruction: G
      }),
      extractObject: lG,
      adaptModel: (G) => G.withInstructionPrompt(),
      withJsonOutput: ({ model: G, schema: c }) => G.withJsonOutput(c)
    };
  },
  instruction({
    schemaPrefix: l,
    schemaSuffix: I
  } = {}) {
    return {
      createPrompt: (G, c) => ({
        system: Wc({
          originalSystemPrompt: G.system,
          schema: c,
          schemaPrefix: l,
          schemaSuffix: I
        }),
        instruction: G.instruction
      }),
      extractObject: lG,
      adaptModel: (G) => G.withInstructionPrompt(),
      withJsonOutput: ({ model: G, schema: c }) => G.withJsonOutput(c)
    };
  }
};
function Wc({
  originalSystemPrompt: l,
  schema: I,
  schemaPrefix: G = $W,
  schemaSuffix: c = IV
}) {
  return [
    l,
    l != null ? "" : null,
    G,
    JSON.stringify(I.getJsonSchema()),
    c
  ].filter(Boolean).join(`
`);
}
function lG(l) {
  return eI({ text: l });
}
function RG(l, I) {
  if (l === I)
    return !0;
  if (l == null || I == null)
    return !1;
  if (typeof l != "object" && typeof I != "object")
    return l === I;
  if (l.constructor !== I.constructor)
    return !1;
  if (l instanceof Date && I instanceof Date)
    return l.getTime() === I.getTime();
  if (Array.isArray(l)) {
    if (l.length !== I.length)
      return !1;
    for (let b = 0; b < l.length; b++)
      if (!RG(l[b], I[b]))
        return !1;
    return !0;
  }
  const G = Object.keys(l), c = Object.keys(I);
  if (G.length !== c.length)
    return !1;
  for (const b of G)
    if (!c.includes(b) || !RG(l[b], I[b]))
      return !1;
  return !0;
}
async function RN({
  model: l,
  schema: I,
  prompt: G,
  fullResponse: c,
  ...b
}) {
  const Z = typeof G == "function" && !pG(G) ? G(I) : G, d = await Bl(Z);
  let V = "", m = "", X, N, t;
  const p = new Promise((H, v) => {
    N = H, t = v;
  }), F = await HG({
    functionType: "stream-object",
    input: {
      schema: I,
      ...d
    },
    model: l,
    options: b,
    startStream: async (H) => l.doStreamObject(I, d.prompt, H),
    processDelta(H) {
      const v = l.extractObjectTextDelta(H.deltaValue);
      if (v == null)
        return;
      V += v, m += v;
      const o = l.parseAccumulatedObjectText(V);
      if (!RG(X, o)) {
        X = o;
        const T = m;
        return m = "", {
          partialObject: X,
          partialText: V,
          textDelta: T
        };
      }
    },
    // The last object is processed and returned, even if it was already returned previously.
    // The reason is that the full text delta should be returned (and no characters should be omitted).
    processFinished() {
      return {
        partialObject: X,
        partialText: V,
        textDelta: m
      };
    },
    onDone() {
      const H = I.validate(X);
      H.success ? N(H.value) : t(H.error);
    }
  });
  return c ? {
    objectStream: F.value,
    objectPromise: p,
    metadata: F.metadata
  } : F.value;
}
var lV = class extends Error {
  constructor({
    toolName: I,
    valueText: G,
    cause: c
  }) {
    super(
      `Tool call parsing failed for '${I}'. Value: ${G}.
Error message: ${_(c)}`
    );
    a(this, "toolName");
    a(this, "valueText");
    a(this, "cause");
    this.name = "ToolCallParseError", this.toolName = I, this.cause = c, this.valueText = G;
  }
  toJSON() {
    return {
      name: this.name,
      cause: this.cause,
      message: this.message,
      stack: this.stack,
      toolName: this.toolName,
      valueText: this.valueText
    };
  }
}, vG = class Wb {
  constructor({
    model: I,
    template: G
  }) {
    a(this, "model");
    a(this, "template");
    this.model = I, this.template = G;
  }
  get modelInformation() {
    return this.model.modelInformation;
  }
  get settings() {
    return this.model.settings;
  }
  get settingsForEvent() {
    return this.model.settingsForEvent;
  }
  getModelWithJsonOutput(I) {
    return this.template.withJsonOutput != null ? this.template.withJsonOutput({
      model: this.model,
      schema: I
    }) : this.model;
  }
  async doGenerateToolCall(I, G, c) {
    const { rawResponse: b, text: Z, metadata: d } = await JG({
      model: this.getModelWithJsonOutput(I.parameters),
      prompt: this.template.createPrompt(G, I),
      fullResponse: !0,
      ...c
    });
    try {
      return {
        rawResponse: b,
        toolCall: this.template.extractToolCall(Z, I),
        usage: d == null ? void 0 : d.usage
      };
    } catch (V) {
      throw new lV({
        toolName: I.name,
        valueText: Z,
        cause: V
      });
    }
  }
  withSettings(I) {
    return new Wb({
      model: this.model.withSettings(I),
      template: this.template
    });
  }
}, GV = class extends Error {
  constructor({ valueText: I, cause: G }) {
    super(
      `Tool calls parsing failed. Value: ${I}.
Error message: ${_(G)}`
    );
    a(this, "valueText");
    a(this, "cause");
    this.name = "ToolCallsParseError", this.cause = G, this.valueText = I;
  }
  toJSON() {
    return {
      name: this.name,
      cause: this.cause,
      message: this.message,
      stack: this.stack,
      valueText: this.valueText
    };
  }
}, yG = class Vb {
  constructor({
    model: I,
    template: G
  }) {
    a(this, "model");
    a(this, "template");
    this.model = I, this.template = G;
  }
  get modelInformation() {
    return this.model.modelInformation;
  }
  get settings() {
    return this.model.settings;
  }
  get settingsForEvent() {
    return this.model.settingsForEvent;
  }
  async doGenerateToolCalls(I, G, c) {
    const {
      rawResponse: b,
      text: Z,
      metadata: d
    } = await JG({
      model: this.model,
      prompt: this.template.createPrompt(G, I),
      fullResponse: !0,
      ...c
    });
    try {
      const { text: V, toolCalls: m } = this.template.extractToolCallsAndText(Z);
      return {
        rawResponse: b,
        text: V,
        toolCalls: m,
        usage: d == null ? void 0 : d.usage
      };
    } catch (V) {
      throw new GV({
        valueText: Z,
        cause: V
      });
    }
  }
  withSettings(I) {
    return new Vb({
      model: this.model.withSettings(I),
      template: this.template
    });
  }
}, mb = class nG {
  constructor({
    model: I,
    promptTemplate: G
  }) {
    a(this, "model");
    a(this, "promptTemplate");
    this.model = I, this.promptTemplate = G;
  }
  get modelInformation() {
    return this.model.modelInformation;
  }
  get settings() {
    return this.model.settings;
  }
  get tokenizer() {
    return this.model.tokenizer;
  }
  get contextWindowSize() {
    return this.model.contextWindowSize;
  }
  get countPromptTokens() {
    var G;
    const I = (G = this.model.countPromptTokens) == null ? void 0 : G.bind(
      this.model
    );
    if (I !== void 0)
      return (c) => I(
        this.promptTemplate.format(c)
      );
  }
  doGenerateTexts(I, G) {
    const c = this.promptTemplate.format(I);
    return this.model.doGenerateTexts(c, G);
  }
  restoreGeneratedTexts(I) {
    return this.model.restoreGeneratedTexts(I);
  }
  get settingsForEvent() {
    return this.model.settingsForEvent;
  }
  asToolCallGenerationModel(I) {
    return new vG({
      model: this,
      template: I
    });
  }
  asToolCallsOrTextGenerationModel(I) {
    return new yG({
      model: this,
      template: I
    });
  }
  asObjectGenerationModel(I) {
    return new bb({
      model: this,
      template: I
    });
  }
  withJsonOutput(I) {
    return new nG({
      model: this.model.withJsonOutput(I),
      promptTemplate: this.promptTemplate
    });
  }
  withSettings(I) {
    return new nG({
      model: this.model.withSettings(I),
      promptTemplate: this.promptTemplate
    });
  }
}, hI = class tG extends mb {
  constructor(I) {
    super(I);
  }
  doStreamText(I, G) {
    const c = this.promptTemplate.format(I);
    return this.model.doStreamText(c, G);
  }
  extractTextDelta(I) {
    return this.model.extractTextDelta(I);
  }
  asObjectGenerationModel(I) {
    return new q({
      model: this,
      template: I
    });
  }
  withJsonOutput(I) {
    return new tG({
      model: this.model.withJsonOutput(I),
      promptTemplate: this.promptTemplate
    });
  }
  withSettings(I) {
    return new tG({
      model: this.model.withSettings(I),
      promptTemplate: this.promptTemplate
    });
  }
}, Xb = class ab extends hI {
  constructor(I) {
    super(I);
  }
  doGenerateToolCall(I, G, c) {
    const b = this.promptTemplate.format(G);
    return this.model.doGenerateToolCall(I, b, c);
  }
  doGenerateToolCalls(I, G, c) {
    const b = this.promptTemplate.format(G);
    return this.model.doGenerateToolCalls(I, b, c);
  }
  withSettings(I) {
    return new ab({
      model: this.model.withSettings(I),
      promptTemplate: this.promptTemplate
    });
  }
}, cI = [
  "maxGenerationTokens",
  "stopSequences",
  "numberOfGenerations",
  "trimWhitespace"
], wG = {};
L(wG, {
  chat: () => dV,
  instruction: () => ZV,
  text: () => bV
});
var B = class extends Error {
  constructor(I, G) {
    super(I);
    a(this, "prompt");
    this.name = "InvalidPromptError", this.prompt = G;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      stack: this.stack,
      prompt: this.prompt
    };
  }
};
function g(l, I) {
  if (typeof l != "string")
    throw new B(
      "Only text prompts are are supported by this prompt template.",
      I
    );
  return l;
}
var cV = "Below is an instruction that describes a task, paired with an input that provides further context. Write a response that appropriately completes the request.", Nb = "Below is an instruction that describes a task. Write a response that appropriately completes the request.";
function bV() {
  return {
    stopSequences: [],
    format(l) {
      let I = Nb;
      return I += `

### Instruction:
`, I += l, I += `

### Response:
`, I;
    }
  };
}
function ZV() {
  return {
    stopSequences: [],
    format(l) {
      let I = l.system ?? (l.input != null ? cV : Nb);
      return I += `

### Instruction:
`, l.system != null && (I += `${l.system}
`), I += g(l.instruction, l), l.input != null && (I += `

### Input:
${l.input}`), I += `

### Response:
`, l.responsePrefix != null && (I += `${l.responsePrefix}
`), I;
    }
  };
}
function dV() {
  throw new Error("Chat prompts are not supported by the Alpaca format.");
}
var EG = {};
L(EG, {
  chat: () => XV,
  instruction: () => mV,
  text: () => VV
});
var WV = "<|im_start|>", jl = "<|im_end|>";
function Sl(l) {
  return `${WV}${l}
`;
}
function kI(l, I) {
  return I == null ? "" : `${Sl(l)}${I}${jl}
`;
}
function VV() {
  return {
    stopSequences: [jl],
    format(l) {
      return kI("user", l) + Sl("assistant");
    }
  };
}
function mV() {
  return {
    stopSequences: [jl],
    format(l) {
      const I = g(l.instruction, l);
      return kI("system", l.system) + kI("user", I) + Sl("assistant") + (l.responsePrefix ?? "");
    }
  };
}
function XV() {
  return {
    format(l) {
      let I = l.system != null ? kI("system", l.system) : "";
      for (const { role: G, content: c } of l.messages)
        switch (G) {
          case "user": {
            I += kI("user", g(c, l));
            break;
          }
          case "assistant": {
            I += kI(
              "assistant",
              g(c, l)
            );
            break;
          }
          case "tool":
            throw new B(
              "Tool messages are not supported.",
              l
            );
          default: {
            const b = G;
            throw new Error(`Unsupported role: ${b}`);
          }
        }
      return I += Sl("assistant"), I;
    },
    stopSequences: [jl]
  };
}
var nN = {
  user({ text: l }) {
    return {
      role: "user",
      content: l
    };
  },
  tool({
    toolResults: l
  }) {
    return {
      role: "tool",
      content: aV({ toolResults: l })
    };
  },
  assistant({
    text: l,
    toolResults: I
  }) {
    return {
      role: "assistant",
      content: NV({ text: l, toolResults: I })
    };
  }
};
function aV({
  toolResults: l
}) {
  const I = [];
  for (const { result: G, toolCall: c } of l ?? [])
    I.push({
      type: "tool-response",
      id: c.id,
      response: G
    });
  return I;
}
function NV({
  text: l,
  toolResults: I
}) {
  const G = [];
  l != null && G.push({ type: "text", text: l });
  for (const { toolCall: c } of I ?? [])
    G.push({ type: "tool-call", ...c });
  return G;
}
function tN(l) {
  return (I) => sG(async () => ({
    input: I,
    prompt: await l(I)
  }));
}
function eN(l) {
  return (I) => sG(async () => ({
    input: I,
    prompt: await l(I)
  }));
}
var oG = {};
L(oG, {
  chat: () => tV,
  instruction: () => nV,
  text: () => RV,
  validateLlama2Prompt: () => tb
});
var Ll = "<s>", Al = " </s>", rl = "[INST] ", il = " [/INST] ", Rb = `<<SYS>>
`, nb = `
<</SYS>>

`;
function RV() {
  return {
    stopSequences: [Al],
    format(l) {
      return `${Ll}${rl}${l}${il}`;
    }
  };
}
function nV() {
  return {
    stopSequences: [Al],
    format(l) {
      const I = g(l.instruction, l);
      return `${Ll}${rl}${l.system != null ? `${Rb}${l.system}${nb}` : ""}${I}${il}${l.responsePrefix ?? ""}`;
    }
  };
}
function tV() {
  return {
    format(l) {
      tb(l);
      const I = l.messages[0].content;
      let G = `${Ll}${rl}${l.system != null ? `${Rb}${l.system}${nb}` : ""}${I}${il}`;
      for (let c = 1; c < l.messages.length; c++) {
        const { role: b, content: Z } = l.messages[c];
        switch (b) {
          case "user": {
            const d = g(Z, l);
            G += `${Ll}${rl}${d}${il}`;
            break;
          }
          case "assistant": {
            G += `${g(Z, l)}${Al}`;
            break;
          }
          case "tool":
            throw new B(
              "Tool messages are not supported.",
              l
            );
          default: {
            const d = b;
            throw new Error(`Unsupported role: ${d}`);
          }
        }
      }
      return G;
    },
    stopSequences: [Al]
  };
}
function tb(l) {
  const I = l.messages;
  if (I.length < 1)
    throw new B(
      "ChatPrompt should have at least one message.",
      l
    );
  for (let G = 0; G < I.length; G++) {
    const c = G % 2 === 0 ? "user" : "assistant", b = I[G].role;
    if (b !== c)
      throw new B(
        `Message at index ${G} should have role '${c}', but has role '${b}'.`,
        l
      );
  }
  if (I.length % 2 === 0)
    throw new B(
      "The last message must be a user message.",
      l
    );
}
var gG = {};
L(gG, {
  chat: () => FV,
  instruction: () => hV,
  text: () => eV,
  validateMistralPrompt: () => eb
});
var dl = "<s>", xI = "</s>", HI = "[INST] ", JI = " [/INST] ";
function eV() {
  return {
    stopSequences: [xI],
    format(l) {
      return `${dl}${HI}${l}${JI}`;
    }
  };
}
function hV() {
  return {
    stopSequences: [xI],
    format(l) {
      const I = g(l.instruction, l);
      return l.system != null ? `${dl}${HI}${l.system}${JI}${xI}${HI}${I}${JI}${l.responsePrefix ?? ""}` : `${dl}${HI}${I}${JI}${l.responsePrefix ?? ""}`;
    }
  };
}
function FV() {
  return {
    format(l) {
      eb(l);
      let I = "", G = 0;
      for (l.system != null ? I += `${dl}${HI}${l.system}${JI}${xI}` : (I = `${dl}${HI}${l.messages[0].content}${JI}`, l.messages.length > 1 && (I += `${l.messages[1].content}${xI}`), G = 2); G < l.messages.length; G++) {
        const { role: c, content: b } = l.messages[G];
        switch (c) {
          case "user": {
            const Z = g(b, l);
            I += `${HI}${Z}${JI}`;
            break;
          }
          case "assistant": {
            I += g(b, l);
            break;
          }
          case "tool":
            throw new B(
              "Tool messages are not supported.",
              l
            );
          default: {
            const Z = c;
            throw new Error(`Unsupported role: ${Z}`);
          }
        }
      }
      return I;
    },
    stopSequences: [xI]
  };
}
function eb(l) {
  const I = l.messages;
  if (I.length < 1)
    throw new B(
      "ChatPrompt should have at least one message.",
      l
    );
  for (let G = 0; G < I.length; G++) {
    const c = G % 2 === 0 ? "user" : "assistant", b = I[G].role;
    if (b !== c)
      throw new B(
        `Message at index ${G} should have role '${c}', but has role '${b}'.`,
        l
      );
  }
  if (I.length % 2 === 0)
    throw new B(
      "The last message must be a user message.",
      l
    );
}
var LG = {};
L(LG, {
  chat: () => pV,
  instruction: () => sV,
  text: () => YV
});
var hb = {
  system: "System",
  user: "User",
  assistant: "Assistant"
};
function Pl(l) {
  return `### ${hb[l]}:
`;
}
function zI(l, I) {
  return I == null ? "" : `${Pl(l)}${I}
`;
}
function YV() {
  return {
    stopSequences: [],
    format(l) {
      return zI("user", l) + Pl("assistant");
    }
  };
}
var sV = () => ({
  stopSequences: [],
  format(l) {
    const I = g(l.instruction, l);
    return zI("system", l.system) + zI("user", I) + Pl("assistant") + (l.responsePrefix ?? "");
  }
});
function pV() {
  return {
    format(l) {
      let I = l.system != null ? zI("system", l.system) : "";
      for (const { role: G, content: c } of l.messages)
        switch (G) {
          case "user": {
            const b = g(c, l);
            I += zI("user", b);
            break;
          }
          case "assistant": {
            I += zI(
              "assistant",
              g(c, l)
            );
            break;
          }
          case "tool":
            throw new B(
              "Tool messages are not supported.",
              l
            );
          default: {
            const b = G;
            throw new Error(`Unsupported role: ${b}`);
          }
        }
      return I += Pl("assistant"), I;
    },
    stopSequences: [`
${hb.user}:`]
  };
}
var AG = {};
L(AG, {
  chat: () => JV,
  instruction: () => HV,
  text: () => QV
});
var QV = () => ({
  stopSequences: [],
  format: (l) => `USER: ${l}
ASSISTANT: `
}), HV = () => ({
  stopSequences: [`
USER:`],
  format(l) {
    let I = l.system != null ? `SYSTEM: ${l.system}
` : "";
    return I += `USER: ${g(l.instruction, l)}
`, I += `ASSISTANT: ${l.responsePrefix ?? ""}`, I;
  }
}), JV = () => ({
  format(l) {
    let I = l.system != null ? `SYSTEM: ${l.system}
` : "";
    for (const { role: G, content: c } of l.messages)
      switch (G) {
        case "user": {
          I += `USER: ${g(c, l)}
`;
          break;
        }
        case "assistant": {
          I += `ASSISTANT: ${g(c, l)}
`;
          break;
        }
        case "tool":
          throw new B(
            "Tool messages are not supported.",
            l
          );
        default: {
          const b = G;
          throw new Error(`Unsupported role: ${b}`);
        }
      }
    return I += "ASSISTANT: ", I;
  },
  stopSequences: [`
USER:`]
});
function hN(l) {
  return (I) => sG(async () => ({
    input: I,
    prompt: await l(I)
  }));
}
var rG = {};
L(rG, {
  chat: () => Ol,
  instruction: () => fl,
  text: () => nl
});
var nl = () => ({
  stopSequences: [],
  format: (l) => l
}), fl = () => ({
  stopSequences: [],
  format(l) {
    let I = "";
    return l.system != null && (I += `${l.system}

`), I += `${g(l.instruction, l)}

`, l.responsePrefix != null && (I += l.responsePrefix), I;
  }
}), Ol = ({
  user: l = "user",
  assistant: I = "assistant",
  system: G
} = {}) => ({
  format(c) {
    let b = c.system != null ? `${G != null ? `${G}:` : ""}${c.system}

` : "";
    for (const { role: Z, content: d } of c.messages)
      switch (Z) {
        case "user": {
          b += `${l}:
${g(d, c)}

`;
          break;
        }
        case "assistant": {
          b += `${I}:
${g(
            d,
            c
          )}

`;
          break;
        }
        case "tool":
          throw new B(
            "Tool messages are not supported.",
            c
          );
        default: {
          const V = Z;
          throw new Error(`Unsupported role: ${V}`);
        }
      }
    return b += `${I}:
`, b;
  },
  stopSequences: [`
${l}:`]
}), iG = {};
L(iG, {
  chat: () => yV,
  instruction: () => vV,
  text: () => uV
});
var UG = "A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the user's questions.";
function uV() {
  return {
    stopSequences: [],
    format(l) {
      let I = UG;
      return I += `

USER: `, I += l, I += `

ASSISTANT: `, I;
    }
  };
}
var vV = () => ({
  stopSequences: [`
USER:`],
  format(l) {
    let I = l.system != null ? `${l.system}

` : `${UG}

`;
    return I += `USER: ${g(l.instruction, l)}
`, I += "ASSISTANT: ", I;
  }
});
function yV() {
  return {
    format(l) {
      let I = l.system != null ? `${l.system}

` : `${UG}

`;
      for (const { role: G, content: c } of l.messages)
        switch (G) {
          case "user": {
            const b = g(c, l);
            I += `USER: ${b}
`;
            break;
          }
          case "assistant": {
            I += `ASSISTANT: ${g(c, l)}
`;
            break;
          }
          case "tool":
            throw new B(
              "Tool messages are not supported.",
              l
            );
          default: {
            const b = G;
            throw new Error(`Unsupported role: ${b}`);
          }
        }
      return I += "ASSISTANT: ", I;
    },
    stopSequences: [`
USER:`]
  };
}
async function FN({
  prompt: l,
  model: I,
  tokenLimit: G = I.contextWindowSize - (I.settings.maxGenerationTokens ?? I.contextWindowSize / 4)
}) {
  let c = {
    system: l.system,
    messages: [l.messages[l.messages.length - 1]]
    // last user message
  };
  if (await I.countPromptTokens(c) > G)
    return c;
  const Z = l.messages.slice(0, -1);
  for (let d = Z.length - 1; d >= 0; d -= 2) {
    const V = Z[d], m = Z[d - 1], X = {
      system: l.system,
      messages: [m, V, ...c.messages]
    };
    if (await I.countPromptTokens(X) > G)
      break;
    c = X;
  }
  return c;
}
async function YN({
  model: l,
  audioData: I,
  mimeType: G,
  fullResponse: c,
  ...b
}) {
  const Z = { mimeType: G, audioData: I }, d = await GI({
    functionType: "generate-transcription",
    input: Z,
    model: l,
    options: b,
    generateResponse: async (V) => {
      const m = await l.doTranscribe(Z, V);
      return {
        rawResponse: m.rawResponse,
        extractedValue: m.transcription
      };
    }
  });
  return c ? d : d.value;
}
async function Wl(l, I) {
  return (await l.tokenize(I)).length;
}
var Fb = class extends K {
  constructor(l = {}) {
    super({
      ...l,
      baseUrlDefaults: {
        protocol: "http",
        host: "127.0.0.1",
        port: "7860",
        path: "/sdapi/v1"
      }
    });
  }
};
function Dl(l) {
  return typeof l == "string" ? l : l instanceof ArrayBuffer ? dc(new Uint8Array(l)) : dc(l);
}
function kG(l) {
  if (l instanceof Uint8Array)
    return l;
  if (typeof l == "string")
    return Kl(l);
  if (l instanceof ArrayBuffer)
    return new Uint8Array(l);
  throw new Error(
    `Invalid data content. Expected a string, Uint8Array, ArrayBuffer, or Buffer, but got ${typeof l}.`
  );
}
var FI = ({
  errorSchema: l,
  errorToMessage: I,
  isRetryable: G
}) => async ({ response: c, url: b, requestBodyValues: Z }) => {
  const d = await c.text();
  if (d.trim() === "")
    return new z({
      message: c.statusText,
      url: b,
      requestBodyValues: Z,
      statusCode: c.status,
      responseBody: d,
      isRetryable: G == null ? void 0 : G(c)
    });
  try {
    const V = eI({
      text: d,
      schema: l
    });
    return new z({
      message: I(V),
      url: b,
      requestBodyValues: Z,
      statusCode: c.status,
      responseBody: d,
      data: V,
      isRetryable: G == null ? void 0 : G(c, V)
    });
  } catch {
    return new z({
      message: c.statusText,
      url: b,
      requestBodyValues: Z,
      statusCode: c.status,
      responseBody: d,
      isRetryable: G == null ? void 0 : G(c)
    });
  }
}, Yb = ({
  isRetryable: l
} = {}) => async ({ response: I, url: G, requestBodyValues: c }) => {
  const b = await I.text();
  return new z({
    message: b.trim() !== "" ? b : I.statusText,
    url: G,
    requestBodyValues: c,
    statusCode: I.status,
    responseBody: b,
    isRetryable: l == null ? void 0 : l(I)
  });
}, U = (l) => async ({ response: I, url: G, requestBodyValues: c }) => {
  const b = await I.text(), Z = TI({
    text: b,
    schema: l
  });
  if (!Z.success)
    throw new z({
      message: "Invalid JSON response",
      cause: Z.error,
      statusCode: I.status,
      responseBody: b,
      url: G,
      requestBodyValues: c
    });
  return Z.value;
}, GG = () => async ({ response: l }) => l.text(), sb = () => async ({ response: l, url: I, requestBodyValues: G }) => {
  if (l.headers.get("Content-Type") !== "audio/mpeg")
    throw new z({
      message: "Invalid Content-Type (must be audio/mpeg)",
      statusCode: l.status,
      url: I,
      requestBodyValues: G
    });
  return kG(await l.arrayBuffer());
}, k = async ({
  url: l,
  headers: I,
  body: G,
  failedResponseHandler: c,
  successfulResponseHandler: b,
  abortSignal: Z
}) => ql({
  url: l,
  headers: {
    ...I,
    "Content-Type": "application/json"
  },
  body: {
    content: JSON.stringify(G),
    values: G
  },
  failedResponseHandler: c,
  successfulResponseHandler: b,
  abortSignal: Z
}), ql = async ({
  url: l,
  headers: I = {},
  body: G,
  successfulResponseHandler: c,
  failedResponseHandler: b,
  abortSignal: Z
}) => {
  try {
    const d = await fetch(l, {
      method: "POST",
      headers: I,
      body: G.content,
      signal: Z
    });
    if (!d.ok)
      try {
        throw await b({
          response: d,
          url: l,
          requestBodyValues: G.values
        });
      } catch (V) {
        throw V instanceof Error && (V.name === "AbortError" || V instanceof z) ? V : new z({
          message: "Failed to process error response",
          cause: V,
          statusCode: d.status,
          url: l,
          requestBodyValues: G.values
        });
      }
    try {
      return await c({
        response: d,
        url: l,
        requestBodyValues: G.values
      });
    } catch (V) {
      throw V instanceof Error && (V.name === "AbortError" || V instanceof z) ? V : new z({
        message: "Failed to process successful response",
        cause: V,
        statusCode: d.status,
        url: l,
        requestBodyValues: G.values
      });
    }
  } catch (d) {
    if (d instanceof Error && d.name === "AbortError")
      throw d;
    if (d instanceof TypeError && d.message === "fetch failed") {
      const V = d.cause;
      if (V != null)
        throw new z({
          message: `Cannot connect to API: ${V.message}`,
          cause: V,
          url: l,
          requestBodyValues: G.values,
          isRetryable: !0
        });
    }
    throw d;
  }
}, wV = W.object({
  error: W.string(),
  detail: W.string(),
  body: W.string(),
  errors: W.string()
}), EV = FI({
  errorSchema: s(wV),
  errorToMessage: (l) => l.detail
}), oV = {};
L(oV, {
  Api: () => rV,
  ImageGenerator: () => iV
});
var A = async ({
  retry: l = jc(),
  throttle: I = Pc(),
  call: G
}) => l(async () => I(G)), x = class {
  constructor({ settings: l }) {
    a(this, "settings");
    this.settings = l;
  }
  // implemented as a separate accessor to remove all other properties from the model
  get modelInformation() {
    return {
      provider: this.provider,
      modelName: this.modelName
    };
  }
};
function gV() {
  return {
    format: (l) => ({ prompt: l })
  };
}
var LV = class pb extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "Automatic1111");
  }
  get modelName() {
    return this.settings.model;
  }
  async callAPI(G, c) {
    var d;
    const b = this.settings.api ?? new Fb(), Z = (d = c.run) == null ? void 0 : d.abortSignal;
    return A({
      retry: b.retry,
      throttle: b.throttle,
      call: async () => k({
        url: b.assembleUrl("/txt2img"),
        headers: b.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          prompt: G.prompt,
          negative_prompt: G.negativePrompt,
          seed: this.settings.seed,
          batch_size: this.settings.numberOfGenerations,
          height: this.settings.height,
          width: this.settings.width,
          cfg_scale: this.settings.cfgScale,
          sampler_index: this.settings.sampler,
          steps: this.settings.steps,
          override_settings: {
            sd_model_checkpoint: this.settings.model
          }
        },
        failedResponseHandler: EV,
        successfulResponseHandler: U(
          s(AV)
        ),
        abortSignal: Z
      })
    });
  }
  get settingsForEvent() {
    const G = [
      "height",
      "width",
      "sampler",
      "steps",
      "cfgScale",
      "seed"
    ];
    return Object.fromEntries(
      Object.entries(this.settings).filter(
        ([c]) => G.includes(c)
      )
    );
  }
  async doGenerateImages(G, c) {
    const b = await this.callAPI(G, c);
    return {
      rawResponse: b,
      base64Images: b.images
    };
  }
  withTextPrompt() {
    return this.withPromptTemplate(gV());
  }
  withPromptTemplate(G) {
    return new QG({
      model: this,
      promptTemplate: G
    });
  }
  withSettings(G) {
    return new pb(
      Object.assign({}, this.settings, G)
    );
  }
}, AV = W.object({
  images: W.array(W.string()),
  parameters: W.object({}),
  info: W.string()
});
function rV(l) {
  return new Fb(l);
}
function iV(l) {
  return new LV(l);
}
var Vc = class extends Error {
  constructor({ message: l }) {
    super(l), this.name = "LoadAPIKeyError";
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message
    };
  }
};
function j({
  apiKey: l,
  environmentVariableName: I,
  apiKeyParameterName: G = "apiKey",
  description: c
}) {
  if (l != null)
    return l;
  if (typeof process > "u")
    throw new Vc({
      message: `${c} API key is missing. Pass it using the '${G}' parameter into the API configuration. Environment variables is not supported in this environment.`
    });
  if (l = process.env[I], l == null)
    throw new Vc({
      message: `${c} API key is missing. Pass it using the '${G}' parameter into the API configuration or set it as an environment variable named ${I}.`
    });
  return l;
}
var Vl = class extends K {
  constructor(l = {}) {
    super({
      ...l,
      headers: {
        Authorization: `Bearer ${j({
          apiKey: l.apiKey,
          environmentVariableName: "COHERE_API_KEY",
          description: "Cohere"
        })}`
      },
      baseUrlDefaults: {
        protocol: "https",
        host: "api.cohere.ai",
        port: "443",
        path: "/v1"
      }
    });
  }
}, UV = W.object({
  message: W.string()
}), Ul = FI({
  errorSchema: s(UV),
  errorToMessage: (l) => l.message
}), kV = {};
L(kV, {
  Api: () => PV,
  TextEmbedder: () => OV,
  TextGenerator: () => fV,
  Tokenizer: () => DV
});
var xG = class {
  constructor(l) {
    a(this, "settings");
    this.settings = l;
  }
  async callTokenizeAPI(l, I) {
    var b;
    const G = this.settings.api ?? new Vl(), c = (b = I == null ? void 0 : I.run) == null ? void 0 : b.abortSignal;
    return A({
      retry: G.retry,
      throttle: G.throttle,
      call: async () => k({
        url: G.assembleUrl("/tokenize"),
        headers: G.headers({
          functionType: "tokenize",
          functionId: I == null ? void 0 : I.functionId,
          run: I == null ? void 0 : I.run,
          callId: ""
        }),
        body: {
          model: this.settings.model,
          text: l
        },
        failedResponseHandler: Ul,
        successfulResponseHandler: U(
          s(zV)
        ),
        abortSignal: c
      })
    });
  }
  async callDeTokenizeAPI(l, I) {
    var b;
    const G = this.settings.api ?? new Vl(), c = (b = I == null ? void 0 : I.run) == null ? void 0 : b.abortSignal;
    return A({
      retry: G.retry,
      throttle: G.throttle,
      call: async () => k({
        url: G.assembleUrl("/detokenize"),
        headers: G.headers({
          functionType: "detokenize",
          functionId: I == null ? void 0 : I.functionId,
          run: I == null ? void 0 : I.run,
          callId: ""
        }),
        body: {
          model: this.settings.model,
          tokens: l
        },
        failedResponseHandler: Ul,
        successfulResponseHandler: U(
          s(xV)
        ),
        abortSignal: c
      })
    });
  }
  async tokenize(l) {
    return (await this.tokenizeWithTexts(l)).tokens;
  }
  async tokenizeWithTexts(l) {
    const I = await this.callTokenizeAPI(l);
    return {
      tokens: I.tokens,
      tokenTexts: I.token_strings
    };
  }
  async detokenize(l) {
    return (await this.callDeTokenizeAPI(l)).text;
  }
}, xV = W.object({
  text: W.string(),
  meta: W.object({
    api_version: W.object({
      version: W.string()
    })
  })
}), zV = W.object({
  tokens: W.array(W.number()),
  token_strings: W.array(W.string()),
  meta: W.object({
    api_version: W.object({
      version: W.string()
    })
  })
}), mc = {
  "embed-english-light-v2.0": {
    contextWindowSize: 512,
    dimensions: 1024
  },
  "embed-english-v2.0": {
    contextWindowSize: 512,
    dimensions: 4096
  },
  "embed-multilingual-v2.0": {
    contextWindowSize: 256,
    dimensions: 768
  },
  "embed-english-v3.0": {
    contextWindowSize: 512,
    dimensions: 1024
  },
  "embed-english-light-v3.0": {
    contextWindowSize: 512,
    dimensions: 384
  },
  "embed-multilingual-v3.0": {
    contextWindowSize: 512,
    dimensions: 1024
  },
  "embed-multilingual-light-v3.0": {
    contextWindowSize: 512,
    dimensions: 384
  }
}, BV = class Qb extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "cohere");
    a(this, "maxValuesPerCall", 96);
    a(this, "isParallelizable", !0);
    a(this, "dimensions");
    a(this, "contextWindowSize");
    a(this, "tokenizer");
    this.contextWindowSize = mc[this.modelName].contextWindowSize, this.tokenizer = new xG({
      api: this.settings.api,
      model: this.settings.model
    }), this.dimensions = mc[this.modelName].dimensions;
  }
  get modelName() {
    return this.settings.model;
  }
  async tokenize(G) {
    return this.tokenizer.tokenize(G);
  }
  async tokenizeWithTexts(G) {
    return this.tokenizer.tokenizeWithTexts(G);
  }
  async detokenize(G) {
    return this.tokenizer.detokenize(G);
  }
  async callAPI(G, c) {
    var d;
    if (G.length > this.maxValuesPerCall)
      throw new Error(
        `The Cohere embedding API only supports ${this.maxValuesPerCall} texts per API call.`
      );
    const b = this.settings.api ?? new Vl(), Z = (d = c.run) == null ? void 0 : d.abortSignal;
    return A({
      retry: b.retry,
      throttle: b.throttle,
      call: async () => k({
        url: b.assembleUrl("/embed"),
        headers: b.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          model: this.settings.model,
          texts: G,
          input_type: this.settings.inputType,
          truncate: this.settings.truncate
        },
        failedResponseHandler: Ul,
        successfulResponseHandler: U(
          s(CV)
        ),
        abortSignal: Z
      })
    });
  }
  get settingsForEvent() {
    return {
      truncate: this.settings.truncate
    };
  }
  async doEmbedValues(G, c) {
    const b = await this.callAPI(G, c);
    return {
      rawResponse: b,
      embeddings: b.embeddings
    };
  }
  withSettings(G) {
    return new Qb(
      Object.assign({}, this.settings, G)
    );
  }
}, CV = W.object({
  id: W.string(),
  texts: W.array(W.string()),
  embeddings: W.array(W.array(W.number())),
  meta: W.object({
    api_version: W.object({
      version: W.string()
    })
  })
});
function MV({
  schema: l,
  stream: I,
  process: G,
  onDone: c
}) {
  function b(Z) {
    G(eI({ text: Z, schema: l }));
  }
  return (async () => {
    try {
      const Z = new ReadableStreamDefaultReader(I), d = new TextDecoder("utf-8");
      let V = "";
      for (; ; ) {
        const { value: m, done: X } = await Z.read();
        if (X)
          break;
        V += d.decode(m, { stream: !0 });
        const N = V.split(`
`);
        V = N.pop() ?? "", N.forEach(b);
      }
      V && b(V);
    } finally {
      c == null || c();
    }
  })();
}
async function TV({
  stream: l,
  schema: I
}) {
  const G = new oI();
  return MV({
    stream: l,
    schema: I,
    process(c) {
      G.push({ type: "delta", deltaValue: c });
    },
    onDone() {
      G.close();
    }
  }), G;
}
var zG = (l) => ({ response: I }) => TV({
  stream: I.body,
  schema: l
}), KV = {
  command: {
    contextWindowSize: 4096
  },
  "command-light": {
    contextWindowSize: 4096
  }
}, jV = class Hb extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "cohere");
    a(this, "contextWindowSize");
    a(this, "tokenizer");
    this.contextWindowSize = KV[this.settings.model].contextWindowSize, this.tokenizer = new xG({
      api: this.settings.api,
      model: this.settings.model
    });
  }
  get modelName() {
    return this.settings.model;
  }
  async countPromptTokens(G) {
    return Wl(this.tokenizer, G);
  }
  async callAPI(G, c, b) {
    var m;
    const Z = this.settings.api ?? new Vl(), d = b.responseFormat, V = (m = c.run) == null ? void 0 : m.abortSignal;
    return A({
      retry: Z.retry,
      throttle: Z.throttle,
      call: async () => k({
        url: Z.assembleUrl("/generate"),
        headers: Z.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          stream: d.stream,
          model: this.settings.model,
          prompt: G,
          num_generations: this.settings.numberOfGenerations,
          max_tokens: this.settings.maxGenerationTokens,
          temperature: this.settings.temperature,
          k: this.settings.k,
          p: this.settings.p,
          frequency_penalty: this.settings.frequencyPenalty,
          presence_penalty: this.settings.presencePenalty,
          end_sequences: this.settings.stopSequences,
          stop_sequences: this.settings.cohereStopSequences,
          return_likelihoods: this.settings.returnLikelihoods,
          logit_bias: this.settings.logitBias,
          truncate: this.settings.truncate
        },
        failedResponseHandler: Ul,
        successfulResponseHandler: d.handler,
        abortSignal: V
      })
    });
  }
  get settingsForEvent() {
    const G = [
      ...cI,
      "temperature",
      "k",
      "p",
      "frequencyPenalty",
      "presencePenalty",
      "returnLikelihoods",
      "logitBias",
      "truncate",
      "cohereStopSequences"
    ];
    return Object.fromEntries(
      Object.entries(this.settings).filter(
        ([c]) => G.includes(c)
      )
    );
  }
  async doGenerateTexts(G, c) {
    return this.processTextGenerationResponse(
      await this.callAPI(G, c, {
        responseFormat: Xc.json
      })
    );
  }
  restoreGeneratedTexts(G) {
    return this.processTextGenerationResponse(
      VI({
        value: G,
        schema: s(BG)
      })
    );
  }
  processTextGenerationResponse(G) {
    return {
      rawResponse: G,
      textGenerationResults: G.generations.map((c) => ({
        text: c.text,
        finishReason: this.translateFinishReason(c.finish_reason)
      }))
    };
  }
  translateFinishReason(G) {
    switch (G) {
      case "COMPLETE":
        return "stop";
      case "MAX_TOKENS":
        return "length";
      case "ERROR_TOXIC":
        return "content-filter";
      case "ERROR":
        return "error";
      default:
        return "unknown";
    }
  }
  doStreamText(G, c) {
    return this.callAPI(G, c, {
      responseFormat: Xc.deltaIterable
    });
  }
  extractTextDelta(G) {
    const c = G;
    return c.is_finished === !0 ? "" : c.text;
  }
  withJsonOutput() {
    return this;
  }
  withTextPrompt() {
    return this.withPromptTemplate(nl());
  }
  withInstructionPrompt() {
    return this.withPromptTemplate(fl());
  }
  withChatPrompt(G) {
    return this.withPromptTemplate(Ol(G));
  }
  withPromptTemplate(G) {
    return new hI({
      model: this.withSettings({
        stopSequences: [
          ...this.settings.stopSequences ?? [],
          ...G.stopSequences
        ]
      }),
      promptTemplate: G
    });
  }
  withSettings(G) {
    return new Hb(
      Object.assign({}, this.settings, G)
    );
  }
}, BG = W.object({
  id: W.string(),
  generations: W.array(
    W.object({
      id: W.string(),
      text: W.string(),
      finish_reason: W.string().optional()
    })
  ),
  prompt: W.string(),
  meta: W.object({
    api_version: W.object({
      version: W.string()
    })
  }).optional()
}), SV = W.discriminatedUnion("is_finished", [
  W.object({
    text: W.string(),
    is_finished: W.literal(!1)
  }),
  W.object({
    is_finished: W.literal(!0),
    finish_reason: W.string(),
    response: BG
  })
]), Xc = {
  /**
   * Returns the response as a JSON object.
   */
  json: {
    stream: !1,
    handler: U(
      s(BG)
    )
  },
  /**
   * Returns an async iterable over the full deltas (all choices, including full current state at time of event)
   * of the response stream.
   */
  deltaIterable: {
    stream: !0,
    handler: zG(
      s(SV)
    )
  }
};
function PV(l) {
  return new Vl(l);
}
function fV(l) {
  return new jV(l);
}
function OV(l) {
  return new BV(l);
}
function DV(l) {
  return new xG(l);
}
var eG = class extends K {
  constructor(l = {}) {
    super({
      ...l,
      headers: {
        "xi-api-key": j({
          apiKey: l.apiKey,
          environmentVariableName: "ELEVENLABS_API_KEY",
          description: "ElevenLabs"
        })
      },
      baseUrlDefaults: {
        protocol: "https",
        host: "api.elevenlabs.io",
        port: "443",
        path: "/v1"
      }
    });
  }
  get apiKey() {
    return this.fixedHeadersValue["xi-api-key"];
  }
}, qV = {};
L(qV, {
  Api: () => Gm,
  SpeechGenerator: () => cm
});
async function _V(l) {
  switch (Dc()) {
    case "vercel-edge":
    case "cloudflare-workers":
    case "browser":
      return new WebSocket(l);
    case "node": {
      let I;
      try {
        I = (await Promise.resolve().then(() => _a)).default;
      } catch {
        try {
          I = Cc("ws");
        } catch {
          throw new Error("Failed to load 'ws' module dynamically.");
        }
      }
      return new I(l);
    }
    default:
      throw new Error("Unknown runtime");
  }
}
var ac = "eleven_monolingual_v1", $V = class Jb extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "elevenlabs");
  }
  get modelName() {
    return this.settings.voice;
  }
  async callAPI(G, c) {
    var d;
    const b = this.settings.api ?? new eG(), Z = (d = c == null ? void 0 : c.run) == null ? void 0 : d.abortSignal;
    return A({
      retry: b.retry,
      throttle: b.throttle,
      call: async () => k({
        url: b.assembleUrl(
          `/text-to-speech/${this.settings.voice}${Nc({
            optimize_streaming_latency: this.settings.optimizeStreamingLatency,
            output_format: this.settings.outputFormat
          })}`
        ),
        headers: b.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          text: G,
          model_id: this.settings.model ?? ac,
          voice_settings: Rc(this.settings.voiceSettings)
        },
        failedResponseHandler: Yb(),
        successfulResponseHandler: sb(),
        abortSignal: Z
      })
    });
  }
  get settingsForEvent() {
    return {
      model: this.settings.model,
      voice: this.settings.voice,
      voiceSettings: this.settings.voiceSettings
    };
  }
  doGenerateSpeechStandard(G, c) {
    return this.callAPI(G, c);
  }
  async doGenerateSpeechStreamDuplex(G) {
    const c = new oI(), b = this.settings.model ?? ac, Z = await _V(
      `wss://api.elevenlabs.io/v1/text-to-speech/${this.settings.voice}/stream-input${Nc({
        model_id: b,
        optimize_streaming_latency: this.settings.optimizeStreamingLatency,
        output_format: this.settings.outputFormat
      })}`
    );
    return Z.onopen = async () => {
      const d = this.settings.api ?? new eG();
      Z.send(
        JSON.stringify({
          // The JS WebSocket API does not support authorization headers, so we send the API key in the BOS message.
          // See https://stackoverflow.com/questions/4361173/http-headers-in-websockets-client-api
          xi_api_key: d.apiKey,
          text: " ",
          // first message
          voice_settings: Rc(this.settings.voiceSettings),
          generation_config: lm(this.settings.generationConfig)
        })
      );
      let V = "";
      for await (const m of G) {
        V += m;
        const X = V.lastIndexOf(". ");
        if (X === -1)
          continue;
        const N = V.slice(0, X);
        V = V.slice(X + 1), Z.send(
          JSON.stringify({
            text: N,
            try_trigger_generation: !0
          })
        );
      }
      V.length > 0 && Z.send(
        JSON.stringify({
          text: `${V} `,
          // append space
          try_trigger_generation: !0
        })
      ), Z.send(JSON.stringify({ text: "" }));
    }, Z.onmessage = (d) => {
      const V = TI({
        text: d.data,
        schema: s(Im)
      });
      if (!V.success) {
        c.push({ type: "error", error: V.error });
        return;
      }
      const m = V.value;
      if ("error" in m) {
        c.push({ type: "error", error: m });
        return;
      }
      m.isFinal || c.push({
        type: "delta",
        deltaValue: Kl(m.audio)
      });
    }, Z.onerror = (d) => {
      c.push({ type: "error", error: d });
    }, Z.onclose = () => {
      c.close();
    }, c;
  }
  withSettings(G) {
    return new Jb({
      ...this.settings,
      ...G
    });
  }
}, Im = W.union([
  W.object({
    audio: W.string(),
    isFinal: W.literal(!1).nullable(),
    normalizedAlignment: W.object({
      chars: W.array(W.string()),
      charStartTimesMs: W.array(W.number()),
      charDurationsMs: W.array(W.number())
    }).nullable()
  }),
  W.object({
    isFinal: W.literal(!0)
  }),
  W.object({
    message: W.string(),
    error: W.string(),
    code: W.number()
  })
]);
function Nc(l) {
  let I = "", G = !1;
  for (const [c, b] of Object.entries(l))
    b != null && (G ? I += "&" : (I += "?", G = !0), I += `${c}=${b}`);
  return I;
}
function Rc(l) {
  return l != null ? {
    stability: l.stability,
    similarity_boost: l.similarityBoost,
    style: l.style,
    use_speaker_boost: l.useSpeakerBoost
  } : void 0;
}
function lm(l) {
  return l != null ? { chunk_length_schedule: l.chunkLengthSchedule } : void 0;
}
function Gm(l) {
  return new eG(l);
}
function cm(l) {
  return new $V(l);
}
var CG = class extends K {
  constructor(l = {}) {
    super({
      ...l,
      headers: {
        Authorization: `Bearer ${j({
          apiKey: l.apiKey,
          environmentVariableName: "HUGGINGFACE_API_KEY",
          description: "Hugging Face"
        })}`
      },
      baseUrlDefaults: {
        protocol: "https",
        host: "api-inference.huggingface.co",
        port: "443",
        path: "/models"
      }
    });
  }
}, bm = W.object({
  error: W.array(W.string()).or(W.string())
}), ub = FI({
  errorSchema: s(bm),
  errorToMessage: (l) => typeof l.error == "string" ? l.error : l.error.join(`

`)
}), Zm = {};
L(Zm, {
  Api: () => mm,
  TextEmbedder: () => am,
  TextGenerator: () => Xm
});
var dm = class vb extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "huggingface");
    a(this, "maxValuesPerCall");
    a(this, "isParallelizable", !0);
    a(this, "contextWindowSize");
    a(this, "dimensions");
    a(this, "tokenizer");
    a(this, "countPromptTokens");
    this.maxValuesPerCall = G.maxValuesPerCall ?? 1024, this.dimensions = G.dimensions;
  }
  get modelName() {
    return this.settings.model;
  }
  async callAPI(G, c) {
    var d;
    if (G.length > this.maxValuesPerCall)
      throw new Error(
        `The HuggingFace feature extraction API is configured to only support ${this.maxValuesPerCall} texts per API call.`
      );
    const b = this.settings.api ?? new CG(), Z = (d = c == null ? void 0 : c.run) == null ? void 0 : d.abortSignal;
    return A({
      retry: b.retry,
      throttle: b.throttle,
      call: async () => {
        var V, m;
        return k({
          url: b.assembleUrl(`/${this.settings.model}`),
          headers: b.headers({
            functionType: c.functionType,
            functionId: c.functionId,
            run: c.run,
            callId: c.callId
          }),
          body: {
            inputs: G,
            options: {
              use_cache: ((V = this.settings.options) == null ? void 0 : V.useCache) ?? !0,
              wait_for_model: ((m = this.settings.options) == null ? void 0 : m.waitForModel) ?? !0
            }
          },
          failedResponseHandler: ub,
          successfulResponseHandler: U(
            s(Wm)
          ),
          abortSignal: Z
        });
      }
    });
  }
  get settingsForEvent() {
    return {
      dimensions: this.settings.dimensions,
      options: this.settings.options
    };
  }
  async doEmbedValues(G, c) {
    const b = await this.callAPI(G, c);
    return {
      rawResponse: b,
      embeddings: b
    };
  }
  withSettings(G) {
    return new vb(
      Object.assign({}, this.settings, G)
    );
  }
}, Wm = W.array(W.array(W.number())), Vm = class yb extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "huggingface");
    a(this, "contextWindowSize");
    a(this, "tokenizer");
    a(this, "countPromptTokens");
  }
  get modelName() {
    return this.settings.model;
  }
  async callAPI(G, c) {
    var d;
    const b = this.settings.api ?? new CG(), Z = (d = c == null ? void 0 : c.run) == null ? void 0 : d.abortSignal;
    return A({
      retry: b.retry,
      throttle: b.throttle,
      call: async () => k({
        url: b.assembleUrl(`/${this.settings.model}`),
        headers: b.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          inputs: G,
          top_k: this.settings.topK,
          top_p: this.settings.topP,
          temperature: this.settings.temperature,
          repetition_penalty: this.settings.repetitionPenalty,
          max_new_tokens: this.settings.maxGenerationTokens,
          max_time: this.settings.maxTime,
          num_return_sequences: this.settings.numberOfGenerations,
          do_sample: this.settings.doSample,
          options: {
            use_cache: !0,
            wait_for_model: !0
          }
        },
        failedResponseHandler: ub,
        successfulResponseHandler: U(
          s(nc)
        ),
        abortSignal: Z
      })
    });
  }
  get settingsForEvent() {
    const G = [
      ...cI,
      "topK",
      "topP",
      "temperature",
      "repetitionPenalty",
      "maxTime",
      "doSample"
    ];
    return Object.fromEntries(
      Object.entries(this.settings).filter(
        ([c]) => G.includes(c)
      )
    );
  }
  async doGenerateTexts(G, c) {
    return this.processTextGenerationResponse(
      await this.callAPI(G, c)
    );
  }
  restoreGeneratedTexts(G) {
    return this.processTextGenerationResponse(
      VI({
        value: G,
        schema: s(nc)
      })
    );
  }
  processTextGenerationResponse(G) {
    return {
      rawResponse: G,
      textGenerationResults: G.map((c) => ({
        text: c.generated_text,
        finishReason: "unknown"
      }))
    };
  }
  withJsonOutput() {
    return this;
  }
  withPromptTemplate(G) {
    return new mb({
      model: this,
      // stop tokens are not supported by this model
      promptTemplate: G
    });
  }
  withSettings(G) {
    return new yb(
      Object.assign({}, this.settings, G)
    );
  }
}, nc = W.array(
  W.object({
    generated_text: W.string()
  })
);
function mm(l) {
  return new CG(l);
}
function Xm(l) {
  return new Vm(l);
}
function am(l) {
  return new dm(l);
}
var tl = class extends K {
  constructor(l = {}) {
    super({
      ...l,
      baseUrlDefaults: {
        protocol: "http",
        host: "127.0.0.1",
        port: "8080",
        path: ""
      }
    });
  }
};
async function* Nm(l) {
  const I = l.getReader();
  try {
    for (; ; ) {
      const { done: G, value: c } = await I.read();
      if (G)
        return;
      yield c;
    }
  } finally {
    I.releaseLock();
  }
}
var Rm = class extends TransformStream {
  constructor() {
    let l;
    super({
      start(I) {
        l = XW((G) => {
          G.type === "event" && I.enqueue(G);
        });
      },
      transform(I) {
        l.feed(I);
      }
    });
  }
};
async function wb({
  stream: l
}) {
  const I = l.pipeThrough(new TextDecoderStream()).pipeThrough(new Rm());
  return Nm(I);
}
var nm = W.object({
  error: W.string()
}), MG = FI(
  {
    errorSchema: s(nm),
    errorToMessage: (l) => l.error
  }
), Eb = {};
L(Eb, {
  Alpaca: () => Qm,
  BakLLaVA1: () => um,
  ChatML: () => Ym,
  Llama2: () => sm,
  Mistral: () => Fm,
  NeuralChat: () => pm,
  Synthia: () => Hm,
  Text: () => Lb,
  Vicuna: () => Jm,
  asLlamaCppPromptTemplate: () => Fl,
  asLlamaCppTextPromptTemplateProvider: () => mI
});
var ob = {};
L(ob, {
  chat: () => hm,
  instruction: () => em,
  text: () => tm
});
var gb = "A chat between a curious user and an artificial intelligence assistant. The assistant gives helpful, detailed, and polite answers to the user's questions.";
function tm() {
  const l = nl();
  return {
    stopSequences: [],
    format(I) {
      return { text: l.format(I) };
    }
  };
}
function em() {
  return {
    format(l) {
      let I = "";
      I += `${l.system ?? gb}

`, I += "USER: ";
      const G = {};
      if (typeof l.instruction == "string")
        I += `${l.instruction}
`;
      else {
        let c = 1;
        for (const b of l.instruction) {
          switch (b.type) {
            case "text": {
              I += b.text;
              break;
            }
            case "image": {
              I += `[img-${c}]`, G[c.toString()] = Dl(b.image), c++;
              break;
            }
          }
          I += `${b}
`;
        }
      }
      return I += `
ASSISTANT: `, { text: I, images: G };
    },
    stopSequences: [`
USER:`]
  };
}
function hm() {
  return {
    format(l) {
      let I = "";
      I += `${l.system ?? gb}

`;
      let G = 1;
      const c = {};
      for (const { role: b, content: Z } of l.messages) {
        switch (b) {
          case "user": {
            if (I += "USER: ", typeof Z == "string") {
              I += Z;
              break;
            }
            for (const d of Z)
              switch (d.type) {
                case "text": {
                  I += d.text;
                  break;
                }
                case "image": {
                  I += `[img-${G}]`, c[G.toString()] = Dl(d.image), G++;
                  break;
                }
              }
            break;
          }
          case "assistant": {
            I += `ASSISTANT: ${g(Z, l)}`;
            break;
          }
          case "tool":
            throw new B(
              "Tool messages are not supported.",
              l
            );
          default: {
            const d = b;
            throw new Error(`Unsupported role: ${d}`);
          }
        }
        I += `

`;
      }
      return I += "ASSISTANT: ", { text: I, images: c };
    },
    stopSequences: [`
USER:`]
  };
}
function Fl(l) {
  return {
    format: (I) => ({
      text: l.format(I)
    }),
    stopSequences: l.stopSequences
  };
}
function mI(l) {
  return {
    text: () => Fl(l.text()),
    instruction: () => Fl(l.instruction()),
    chat: () => Fl(l.chat())
  };
}
var Lb = mI(rG), Fm = mI(gG), Ym = mI(EG), sm = mI(oG), pm = mI(LG), Qm = mI(wG), Hm = mI(AG), Jm = mI(iG), um = ob, TG = class {
  constructor(l = new tl()) {
    a(this, "api");
    this.api = l;
  }
  async callTokenizeAPI(l, I) {
    var b;
    const G = this.api, c = (b = I == null ? void 0 : I.run) == null ? void 0 : b.abortSignal;
    return A({
      retry: G.retry,
      throttle: G.throttle,
      call: async () => k({
        url: G.assembleUrl("/tokenize"),
        headers: G.headers({
          functionType: "tokenize",
          functionId: I == null ? void 0 : I.functionId,
          run: I == null ? void 0 : I.run,
          callId: ""
        }),
        body: {
          content: l
        },
        failedResponseHandler: MG,
        successfulResponseHandler: U(
          s(vm)
        ),
        abortSignal: c
      })
    });
  }
  async tokenize(l) {
    return (await this.callTokenizeAPI(l)).tokens;
  }
}, vm = W.object({
  tokens: W.array(W.number())
});
function Ab(l) {
  const I = new wm();
  return I.add("space", ym), Yl(l, void 0, I), I.toGBNF();
}
var ym = '" "?', tc = {
  boolean: '("true" | "false") space',
  number: '("-"? ([0-9] | [1-9] [0-9]*)) ("." [0-9]+)? ([eE] [-+]? [0-9]+)? space',
  integer: '("-"? ([0-9] | [1-9] [0-9]*)) space',
  string: ' "\\"" ( [^"\\\\] | "\\\\" (["\\\\/bfnrt] | "u" [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F]) )* "\\"" space',
  null: '"null" space'
}, wm = class {
  constructor() {
    a(this, "rules", /* @__PURE__ */ new Map());
  }
  add(l, I) {
    const G = this.escapeRuleName(l, I);
    return this.rules.set(G, I), G;
  }
  /**
   * Replace invalid characters in rule name with hyphens.
   * Disambiguate the name if it already exists.
   */
  escapeRuleName(l, I) {
    const G = l.replace(/[^\dA-Za-z-]+/g, "-");
    if (!this.rules.has(G) || this.rules.get(G) === I)
      return G;
    let c = 0;
    for (; this.rules.has(`${G}${c}`); ) {
      if (this.rules.get(`${G}${c}`) === I)
        return `${G}${c}`;
      c++;
    }
    return `${G}${c}`;
  }
  toGBNF() {
    return Array.from(this.rules).map(([l, I]) => `${l} ::= ${I}`).join(`
`);
  }
}, Em = {
  "\r": "\\r",
  "\n": "\\n",
  '"': '\\"'
};
function cG(l) {
  return `"${JSON.stringify(l).replace(
    /[\n\r"]/g,
    (G) => Em[G]
  )}"`;
}
function Yl(l, I, G) {
  const c = l.type, b = I || "root";
  if (l.oneOf || l.anyOf) {
    const Z = (l.oneOf || l.anyOf).map(
      (d, V) => Yl(d, `${I}${I ? "-" : ""}${V}`, G)
    ).join(" | ");
    return G.add(b, Z);
  } else {
    if ("const" in l)
      return G.add(b, cG(l.const));
    if ("enum" in l) {
      const Z = l.enum.map(cG).join(" | ");
      return G.add(b, Z);
    } else if (c === "object" && "properties" in l) {
      const Z = Object.entries(l.properties);
      let d = '"{" space';
      return Z.forEach(([V, m], X) => {
        const N = Yl(
          m,
          `${I ?? ""}${I ? "-" : ""}${V}`,
          G
        );
        X > 0 && (d += ' "," space'), d += ` ${cG(V)} space ":" space ${N}`;
      }), d += ' "}" space', G.add(b, d);
    } else if (c === "array" && "items" in l) {
      const Z = Yl(
        l.items,
        `${I ?? ""}${I ? "-" : ""}item`,
        G
      ), d = `"[" space (${Z} ("," space ${Z})*)? "]" space`;
      return G.add(b, d);
    } else {
      if (!tc[c])
        throw new Error(`Unrecognized schema: ${JSON.stringify(l)}`);
      return G.add(
        b === "root" ? "root" : c,
        tc[c]
      );
    }
  }
}
var om = class rb extends x {
  constructor(G = {}) {
    super({ settings: G });
    a(this, "provider", "llamacpp");
    a(this, "tokenizer");
    this.tokenizer = new TG(this.settings.api);
  }
  get modelName() {
    return null;
  }
  get contextWindowSize() {
    return this.settings.contextWindowSize;
  }
  async callAPI(G, c, b) {
    var m;
    const Z = this.settings.api ?? new tl(), d = b.responseFormat, V = (m = c.run) == null ? void 0 : m.abortSignal;
    return A({
      retry: Z.retry,
      throttle: Z.throttle,
      call: async () => k({
        url: Z.assembleUrl("/completion"),
        headers: Z.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          stream: d.stream,
          prompt: G.text,
          image_data: G.images != null ? Object.entries(G.images).map(([X, N]) => ({
            id: +X,
            data: N
          })) : void 0,
          temperature: this.settings.temperature,
          top_k: this.settings.topK,
          top_p: this.settings.topP,
          min_p: this.settings.minP,
          n_predict: this.settings.maxGenerationTokens,
          n_keep: this.settings.nKeep,
          stop: this.settings.stopSequences,
          tfs_z: this.settings.tfsZ,
          typical_p: this.settings.typicalP,
          repeat_penalty: this.settings.repeatPenalty,
          repeat_last_n: this.settings.repeatLastN,
          penalize_nl: this.settings.penalizeNl,
          presence_penalty: this.settings.presencePenalty,
          frequency_penalty: this.settings.frequencyPenalty,
          penalty_prompt: this.settings.penaltyPrompt,
          mirostat: this.settings.mirostat,
          mirostat_tau: this.settings.mirostatTau,
          mirostat_eta: this.settings.mirostatEta,
          grammar: this.settings.grammar,
          seed: this.settings.seed,
          ignore_eos: this.settings.ignoreEos,
          logit_bias: this.settings.logitBias,
          n_probs: this.settings.nProbs,
          cache_prompt: this.settings.cachePrompt,
          slot_id: this.settings.slotId
        },
        failedResponseHandler: MG,
        successfulResponseHandler: d.handler,
        abortSignal: V
      })
    });
  }
  get settingsForEvent() {
    const G = [
      ...cI,
      "contextWindowSize",
      "temperature",
      "topK",
      "topP",
      "minP",
      "nKeep",
      "tfsZ",
      "typicalP",
      "repeatPenalty",
      "repeatLastN",
      "penalizeNl",
      "presencePenalty",
      "frequencyPenalty",
      "penaltyPrompt",
      "mirostat",
      "mirostatTau",
      "mirostatEta",
      "grammar",
      "seed",
      "ignoreEos",
      "logitBias",
      "nProbs",
      "cachePrompt",
      "slotId"
    ];
    return Object.fromEntries(
      Object.entries(this.settings).filter(
        ([c]) => G.includes(c)
      )
    );
  }
  async countPromptTokens(G) {
    return (await this.tokenizer.tokenize(G.text)).length;
  }
  async doGenerateTexts(G, c) {
    return this.processTextGenerationResponse(
      await this.callAPI(G, c, {
        responseFormat: ec.json
      })
    );
  }
  restoreGeneratedTexts(G) {
    return this.processTextGenerationResponse(
      VI({
        value: G,
        schema: s(KG)
      })
    );
  }
  processTextGenerationResponse(G) {
    return {
      rawResponse: G,
      textGenerationResults: [
        {
          text: G.content,
          finishReason: G.stopped_eos || G.stopped_word ? "stop" : G.stopped_limit ? "length" : "unknown"
        }
      ],
      usage: {
        promptTokens: G.tokens_evaluated,
        completionTokens: G.tokens_predicted,
        totalTokens: G.tokens_evaluated + G.tokens_predicted
      }
    };
  }
  doStreamText(G, c) {
    return this.callAPI(G, c, {
      responseFormat: ec.deltaIterable
    });
  }
  extractTextDelta(G) {
    return G.content;
  }
  asObjectGenerationModel(G) {
    return "adaptModel" in G ? new q({
      model: G.adaptModel(this),
      template: G
    }) : new q({
      model: this,
      template: G
    });
  }
  withJsonOutput(G) {
    if (this.settings.grammar != null)
      return this;
    const c = Ab(G.getJsonSchema());
    return this.withSettings({
      grammar: c
    });
  }
  get promptTemplateProvider() {
    return this.settings.promptTemplate ?? Lb;
  }
  withTextPrompt() {
    return this.withPromptTemplate(this.promptTemplateProvider.text());
  }
  withInstructionPrompt() {
    return this.withPromptTemplate(this.promptTemplateProvider.instruction());
  }
  withChatPrompt() {
    return this.withPromptTemplate(this.promptTemplateProvider.chat());
  }
  /**
   * Maps the prompt for the full Llama.cpp prompt template (incl. image support).
   */
  withPromptTemplate(G) {
    return new hI({
      model: this.withSettings({
        stopSequences: [
          ...this.settings.stopSequences ?? [],
          ...G.stopSequences
        ]
      }),
      promptTemplate: G
    });
  }
  withSettings(G) {
    return new rb(
      Object.assign({}, this.settings, G)
    );
  }
}, KG = W.object({
  content: W.string(),
  stop: W.literal(!0),
  generation_settings: W.object({
    frequency_penalty: W.number(),
    ignore_eos: W.boolean(),
    logit_bias: W.array(W.number()),
    mirostat: W.number(),
    mirostat_eta: W.number(),
    mirostat_tau: W.number(),
    model: W.string(),
    n_ctx: W.number(),
    n_keep: W.number(),
    n_predict: W.number(),
    n_probs: W.number(),
    penalize_nl: W.boolean(),
    presence_penalty: W.number(),
    repeat_last_n: W.number(),
    repeat_penalty: W.number(),
    seed: W.number(),
    stop: W.array(W.string()),
    stream: W.boolean(),
    temperature: W.number().optional(),
    // optional for backwards compatibility
    tfs_z: W.number(),
    top_k: W.number(),
    top_p: W.number(),
    typical_p: W.number()
  }),
  model: W.string(),
  prompt: W.string(),
  stopped_eos: W.boolean(),
  stopped_limit: W.boolean(),
  stopped_word: W.boolean(),
  stopping_word: W.string(),
  timings: W.object({
    predicted_ms: W.number(),
    predicted_n: W.number(),
    predicted_per_second: W.number().nullable(),
    predicted_per_token_ms: W.number().nullable(),
    prompt_ms: W.number().nullable().optional(),
    prompt_n: W.number(),
    prompt_per_second: W.number().nullable(),
    prompt_per_token_ms: W.number().nullable()
  }),
  tokens_cached: W.number(),
  tokens_evaluated: W.number(),
  tokens_predicted: W.number(),
  truncated: W.boolean()
}), gm = W.discriminatedUnion("stop", [
  W.object({
    content: W.string(),
    stop: W.literal(!1)
  }),
  KG
]);
async function Lm(l) {
  const I = new oI();
  return wb({ stream: l }).then(async (G) => {
    try {
      for await (const c of G) {
        const b = c.data, Z = eI({
          text: b,
          schema: s(gm)
        });
        I.push({ type: "delta", deltaValue: Z }), Z.stop && I.close();
      }
    } catch (c) {
      I.push({ type: "error", error: c }), I.close();
    }
  }).catch((G) => {
    I.push({ type: "error", error: G }), I.close();
  }), I;
}
var ec = {
  /**
   * Returns the response as a JSON object.
   */
  json: {
    stream: !1,
    handler: U(
      s(KG)
    )
  },
  /**
   * Returns an async iterable over the full deltas (all choices, including full current state at time of event)
   * of the response stream.
   */
  deltaIterable: {
    stream: !0,
    handler: async ({ response: l }) => Lm(l.body)
  }
}, Am = {};
L(Am, {
  Api: () => zm,
  CompletionTextGenerator: () => Bm,
  TextEmbedder: () => Cm,
  Tokenizer: () => Mm,
  grammar: () => Ub,
  prompt: () => Eb
});
var rm = class ib extends x {
  constructor(G = {}) {
    super({ settings: G });
    a(this, "provider", "llamacpp");
    a(this, "maxValuesPerCall", 1);
    a(this, "contextWindowSize");
    a(this, "tokenizer");
    this.tokenizer = new TG(this.settings.api);
  }
  get modelName() {
    return null;
  }
  get isParallelizable() {
    return this.settings.isParallelizable ?? !1;
  }
  get dimensions() {
    return this.settings.dimensions;
  }
  async tokenize(G) {
    return this.tokenizer.tokenize(G);
  }
  async callAPI(G, c) {
    var d, V, m;
    if (G.length > this.maxValuesPerCall)
      throw new Error(
        `The Llama.cpp embedding API only supports ${this.maxValuesPerCall} texts per API call.`
      );
    const b = this.settings.api ?? new tl(), Z = (d = c.run) == null ? void 0 : d.abortSignal;
    return A({
      retry: (V = this.settings.api) == null ? void 0 : V.retry,
      throttle: (m = this.settings.api) == null ? void 0 : m.throttle,
      call: async () => k({
        url: b.assembleUrl("/embedding"),
        headers: b.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: { content: G[0] },
        failedResponseHandler: MG,
        successfulResponseHandler: U(
          s(im)
        ),
        abortSignal: Z
      })
    });
  }
  get settingsForEvent() {
    return {
      dimensions: this.settings.dimensions
    };
  }
  async doEmbedValues(G, c) {
    const b = await this.callAPI(G, c);
    return {
      rawResponse: b,
      embeddings: [b.embedding]
    };
  }
  withSettings(G) {
    return new ib(
      Object.assign({}, this.settings, G)
    );
  }
}, im = W.object({
  embedding: W.array(W.number())
}), Ub = {};
L(Ub, {
  fromJsonSchema: () => Ab,
  json: () => Um,
  jsonArray: () => km,
  list: () => xm
});
var Um = `
root   ::= object
value  ::= object | array | string | number | ("true" | "false" | "null") ws

object ::=
  "{" ws (
            string ":" ws value
    ("," ws string ":" ws value)*
  )? "}" ws

array  ::=
  "[" ws (
            value
    ("," ws value)*
  )? "]" ws

string ::=
  "\\"" (
    [^"\\\\] |
    "\\\\" (["\\\\/bfnrt] | "u" [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F]) # escapes
  )* "\\"" ws

number ::= ("-"? ([0-9] | [1-9] [0-9]*)) ("." [0-9]+)? ([eE] [-+]? [0-9]+)? ws

# Optional space: by convention, applied in this grammar after literal chars when allowed
ws ::= ([ 	
] ws)?
`, km = `
root   ::= arr
value  ::= object | array | string | number | ("true" | "false" | "null") ws

arr  ::=
  "[
" ws (
            value
    (",
" ws value)*
  )? "]"

object ::=
  "{" ws (
            string ":" ws value
    ("," ws string ":" ws value)*
  )? "}" ws

array  ::=
  "[" ws (
            value
    ("," ws value)*
  )? "]" ws

string ::=
  "\\"" (
    [^"\\\\] |
    "\\\\" (["\\\\/bfnrt] | "u" [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F] [0-9a-fA-F]) # escapes
  )* "\\"" ws

number ::= ("-"? ([0-9] | [1-9] [0-9]*)) ("." [0-9]+)? ([eE] [-+]? [0-9]+)? ws

# Optional space: by convention, applied in this grammar after literal chars when allowed
ws ::= ([ 	
] ws)?
`, xm = `
root ::= item+

# Excludes various line break characters
item ::= "- " [^\r
\v\f\u2028\u2029]+ "
"
`;
function zm(l) {
  return new tl(l);
}
function Bm(l = {}) {
  return new om(l);
}
function Cm(l = {}) {
  return new rm(l);
}
function Mm(l = new tl()) {
  return new TG(l);
}
var kb = class extends K {
  constructor(l = {}) {
    super({
      ...l,
      headers: {
        "X-API-Key": j({
          apiKey: l.apiKey,
          environmentVariableName: "LMNT_API_KEY",
          description: "LMNT"
        })
      },
      baseUrlDefaults: {
        protocol: "https",
        host: "api.lmnt.com",
        port: "443",
        path: "/v1"
      }
    });
  }
}, Tm = {};
L(Tm, {
  Api: () => Sm,
  SpeechGenerator: () => Pm
});
var Km = class xb extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "lmnt");
  }
  get modelName() {
    return this.settings.voice;
  }
  async callAPI(G, c) {
    var d;
    const b = this.settings.api ?? new kb(), Z = (d = c.run) == null ? void 0 : d.abortSignal;
    return A({
      retry: b.retry,
      throttle: b.throttle,
      call: async () => {
        const V = new FormData();
        return V.append("text", G), V.append("voice", this.settings.voice), V.append("format", "mp3"), V.append("return_durations", "true"), this.settings.speed != null && V.append("speed", this.settings.speed.toString()), this.settings.seed != null && V.append("seed", this.settings.seed.toString()), this.settings.length != null && V.append("length", this.settings.length.toString()), ql({
          url: b.assembleUrl("/ai/speech"),
          headers: b.headers({
            functionType: c.functionType,
            functionId: c.functionId,
            run: c.run,
            callId: c.callId
          }),
          body: {
            content: V,
            values: {
              text: G,
              voice: this.settings.voice,
              speed: this.settings.speed,
              seed: this.settings.seed,
              length: this.settings.length
            }
          },
          failedResponseHandler: Yb(),
          successfulResponseHandler: U(
            s(jm)
          ),
          abortSignal: Z
        });
      }
    });
  }
  get settingsForEvent() {
    return {
      voice: this.settings.voice,
      speed: this.settings.speed,
      seed: this.settings.seed,
      length: this.settings.length
    };
  }
  async doGenerateSpeechStandard(G, c) {
    const b = await this.callAPI(G, c);
    return Kl(b.audio);
  }
  withSettings(G) {
    return new xb({
      ...this.settings,
      ...G
    });
  }
}, jm = W.object({
  audio: W.string(),
  durations: W.array(
    W.object({
      duration: W.number(),
      start: W.number(),
      text: W.string()
    })
  ),
  seed: W.number()
});
function Sm(l) {
  return new kb(l);
}
function Pm(l) {
  return new Km(l);
}
var jG = class extends K {
  constructor(l = {}) {
    super({
      ...l,
      headers: {
        Authorization: `Bearer ${j({
          apiKey: l.apiKey,
          environmentVariableName: "MISTRAL_API_KEY",
          description: "Mistral"
        })}`
      },
      baseUrlDefaults: {
        protocol: "https",
        host: "api.mistral.ai",
        port: "443",
        path: "/v1"
      }
    });
  }
};
async function fm({
  stream: l,
  schema: I
}) {
  const G = new oI();
  return wb({ stream: l }).then(async (c) => {
    try {
      for await (const b of c) {
        const Z = b.data;
        if (Z === "[DONE]") {
          G.close();
          return;
        }
        const d = TI({
          text: Z,
          schema: I
        });
        if (!d.success) {
          G.push({
            type: "error",
            error: d.error
          });
          continue;
        }
        const V = d.value;
        G.push({
          type: "delta",
          deltaValue: V
        });
      }
    } catch (b) {
      G.push({ type: "error", error: b }), G.close();
      return;
    }
  }).catch((c) => {
    G.push({ type: "error", error: c }), G.close();
  }), G;
}
var SG = (l) => ({ response: I }) => fm({
  stream: I.body,
  schema: l
});
function Om() {
  return {
    format: (l) => [{ role: "user", content: l }],
    stopSequences: []
  };
}
function Dm() {
  return {
    format(l) {
      const I = [];
      l.system != null && I.push({ role: "system", content: l.system });
      const G = g(l.instruction, l);
      return I.push({ role: "user", content: G }), I;
    },
    stopSequences: []
  };
}
function qm() {
  return {
    format(l) {
      const I = [];
      l.system != null && I.push({ role: "system", content: l.system });
      for (const { role: G, content: c } of l.messages)
        switch (G) {
          case "user": {
            const b = g(c, l);
            I.push({ role: "user", content: b });
            break;
          }
          case "assistant": {
            I.push({
              role: "assistant",
              content: g(c, l)
            });
            break;
          }
          case "tool":
            throw new B(
              "Tool messages are not supported.",
              l
            );
          default: {
            const b = G;
            throw new Error(`Unsupported role: ${b}`);
          }
        }
      return I;
    },
    stopSequences: []
  };
}
var _m = W.object({
  object: W.literal("error"),
  message: W.string(),
  type: W.string(),
  param: W.string().nullable(),
  code: W.string()
}), zb = FI({
  errorSchema: s(_m),
  errorToMessage: (l) => l.message
}), $m = class Bb extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "mistral");
    a(this, "contextWindowSize");
    a(this, "tokenizer");
    a(this, "countPromptTokens");
  }
  get modelName() {
    return this.settings.model;
  }
  async callAPI(G, c, b) {
    var X;
    const Z = this.settings.api ?? new jG(), d = (X = c.run) == null ? void 0 : X.abortSignal, V = b.responseFormat.stream, m = b.responseFormat.handler;
    return A({
      retry: Z.retry,
      throttle: Z.throttle,
      call: async () => k({
        url: Z.assembleUrl("/chat/completions"),
        headers: Z.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          stream: V,
          messages: G,
          model: this.settings.model,
          temperature: this.settings.temperature,
          top_p: this.settings.topP,
          max_tokens: this.settings.maxGenerationTokens,
          safe_mode: this.settings.safeMode,
          random_seed: this.settings.randomSeed
        },
        failedResponseHandler: zb,
        successfulResponseHandler: m,
        abortSignal: d
      })
    });
  }
  get settingsForEvent() {
    const G = [
      ...cI,
      "temperature",
      "topP",
      "safeMode",
      "randomSeed"
    ];
    return Object.fromEntries(
      Object.entries(this.settings).filter(
        ([c]) => G.includes(c)
      )
    );
  }
  async doGenerateTexts(G, c) {
    return this.processTextGenerationResponse(
      await this.callAPI(G, c, {
        responseFormat: hc.json
      })
    );
  }
  restoreGeneratedTexts(G) {
    return this.processTextGenerationResponse(
      VI({
        value: G,
        schema: s(Cb)
      })
    );
  }
  processTextGenerationResponse(G) {
    return {
      rawResponse: G,
      textGenerationResults: G.choices.map((c) => ({
        text: c.message.content,
        finishReason: this.translateFinishReason(c.finish_reason)
      }))
    };
  }
  translateFinishReason(G) {
    switch (G) {
      case "stop":
        return "stop";
      case "length":
      case "model_length":
        return "length";
      default:
        return "unknown";
    }
  }
  doStreamText(G, c) {
    return this.callAPI(G, c, {
      responseFormat: hc.textDeltaIterable
    });
  }
  extractTextDelta(G) {
    return G.choices[0].delta.content ?? void 0;
  }
  withTextPrompt() {
    return this.withPromptTemplate(Om());
  }
  withInstructionPrompt() {
    return this.withPromptTemplate(Dm());
  }
  withChatPrompt() {
    return this.withPromptTemplate(qm());
  }
  withJsonOutput() {
    return this;
  }
  withPromptTemplate(G) {
    return new hI({
      model: this,
      // stop tokens are not supported by this model
      promptTemplate: G
    });
  }
  withSettings(G) {
    return new Bb(
      Object.assign({}, this.settings, G)
    );
  }
}, Cb = W.object({
  id: W.string(),
  object: W.string(),
  created: W.number(),
  model: W.string(),
  choices: W.array(
    W.object({
      index: W.number(),
      message: W.object({
        role: W.enum(["user", "assistant"]),
        content: W.string()
      }),
      finish_reason: W.enum(["stop", "length", "model_length"])
    })
  ),
  usage: W.object({
    prompt_tokens: W.number(),
    completion_tokens: W.number(),
    total_tokens: W.number()
  })
}), IX = W.object({
  id: W.string(),
  object: W.string().optional(),
  created: W.number().optional(),
  model: W.string(),
  choices: W.array(
    W.object({
      index: W.number(),
      delta: W.object({
        role: W.enum(["assistant", "user"]).optional().nullable(),
        content: W.string().nullable().optional()
      }),
      finish_reason: W.enum(["stop", "length", "model_length"]).nullable().optional()
    })
  )
}), hc = {
  /**
   * Returns the response as a JSON object.
   */
  json: {
    stream: !1,
    handler: U(s(Cb))
  },
  /**
   * Returns an async iterable over the text deltas (only the tex different of the first choice).
   */
  textDeltaIterable: {
    stream: !0,
    handler: SG(
      s(IX)
    )
  }
}, lX = {};
L(lX, {
  Api: () => bX,
  ChatTextGenerator: () => ZX,
  TextEmbedder: () => dX
});
var GX = class Mb extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "mistral");
    a(this, "maxValuesPerCall", 32);
    /**
     * Parallel calls are technically possible, but I have been hitting rate limits and disabled
     * them for now.
     */
    a(this, "isParallelizable", !1);
    a(this, "dimensions", 1024);
  }
  get modelName() {
    return this.settings.model;
  }
  async callAPI(G, c) {
    var m, X, N;
    if (G.length > this.maxValuesPerCall)
      throw new Error(
        `The Mistral embedding API only supports ${this.maxValuesPerCall} texts per API call.`
      );
    const b = this.settings.api ?? new jG(), Z = (m = c.run) == null ? void 0 : m.abortSignal, d = this.settings.model, V = this.settings.encodingFormat ?? "float";
    return A({
      retry: (X = this.settings.api) == null ? void 0 : X.retry,
      throttle: (N = this.settings.api) == null ? void 0 : N.throttle,
      call: async () => k({
        url: b.assembleUrl("/embeddings"),
        headers: b.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          model: d,
          input: G,
          encoding_format: V
        },
        failedResponseHandler: zb,
        successfulResponseHandler: U(
          s(cX)
        ),
        abortSignal: Z
      })
    });
  }
  get settingsForEvent() {
    return {
      encodingFormat: this.settings.encodingFormat
    };
  }
  async doEmbedValues(G, c) {
    const b = await this.callAPI(G, c);
    return {
      rawResponse: b,
      embeddings: b.data.map((Z) => Z.embedding)
    };
  }
  withSettings(G) {
    return new Mb(
      Object.assign({}, this.settings, G)
    );
  }
}, cX = W.object({
  id: W.string(),
  object: W.string(),
  data: W.array(
    W.object({
      object: W.string(),
      embedding: W.array(W.number()),
      index: W.number()
    })
  ),
  model: W.string(),
  usage: W.object({
    prompt_tokens: W.number(),
    total_tokens: W.number()
  })
});
function bX(l) {
  return new jG(l);
}
function ZX(l) {
  return new $m(l);
}
function dX(l) {
  return new GX(l);
}
var _l = class extends K {
  constructor(l = {}) {
    super({
      ...l,
      baseUrlDefaults: {
        protocol: "http",
        host: "127.0.0.1",
        port: "11434",
        path: ""
      }
    });
  }
};
function WX() {
  return {
    format: (l) => [{ role: "user", content: l }],
    stopSequences: []
  };
}
function VX() {
  return {
    format(l) {
      const I = [];
      return l.system != null && I.push({
        role: "system",
        content: l.system
      }), I.push({
        role: "user",
        ...Tb(l.instruction)
      }), I;
    },
    stopSequences: []
  };
}
function mX() {
  return {
    format(l) {
      const I = [];
      l.system != null && I.push({ role: "system", content: l.system });
      for (const { role: G, content: c } of l.messages)
        switch (G) {
          case "user": {
            I.push({
              role: "user",
              ...Tb(c)
            });
            break;
          }
          case "assistant": {
            I.push({
              role: "assistant",
              content: g(c, l)
            });
            break;
          }
          case "tool":
            throw new B(
              "Tool messages are not supported.",
              l
            );
          default: {
            const b = G;
            throw new Error(`Unsupported role: ${b}`);
          }
        }
      return I;
    },
    stopSequences: []
  };
}
function Tb(l) {
  if (typeof l == "string")
    return { content: l, images: void 0 };
  const I = [];
  let G = "";
  for (const c of l)
    c.type === "text" ? G += c.text : I.push(Dl(c.image));
  return { content: G, images: I };
}
var XX = W.object({
  error: W.string()
}), PG = FI({
  errorSchema: s(XX),
  errorToMessage: (l) => l.error
}), aX = class Kb extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "ollama");
    a(this, "tokenizer");
    a(this, "countPromptTokens");
    a(this, "contextWindowSize");
  }
  get modelName() {
    return this.settings.model;
  }
  async callAPI(G, c, b) {
    var m;
    const { responseFormat: Z } = b, d = this.settings.api ?? new _l(), V = (m = c.run) == null ? void 0 : m.abortSignal;
    return A({
      retry: d.retry,
      throttle: d.throttle,
      call: async () => k({
        url: d.assembleUrl("/api/chat"),
        headers: d.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          stream: Z.stream,
          model: this.settings.model,
          messages: G,
          format: this.settings.format,
          options: {
            mirostat: this.settings.mirostat,
            mirostat_eta: this.settings.mirostatEta,
            mirostat_tau: this.settings.mirostatTau,
            num_gpu: this.settings.numGpu,
            num_gqa: this.settings.numGqa,
            num_predict: this.settings.maxGenerationTokens,
            num_threads: this.settings.numThreads,
            repeat_last_n: this.settings.repeatLastN,
            repeat_penalty: this.settings.repeatPenalty,
            seed: this.settings.seed,
            stop: this.settings.stopSequences,
            temperature: this.settings.temperature,
            tfs_z: this.settings.tfsZ,
            top_k: this.settings.topK,
            top_p: this.settings.topP
          },
          template: this.settings.template
        },
        failedResponseHandler: PG,
        successfulResponseHandler: Z.handler,
        abortSignal: V
      })
    });
  }
  get settingsForEvent() {
    const G = [
      ...cI,
      "temperature",
      "mirostat",
      "mirostatEta",
      "mirostatTau",
      "numGqa",
      "numGpu",
      "numThreads",
      "repeatLastN",
      "repeatPenalty",
      "seed",
      "tfsZ",
      "topK",
      "topP",
      "template",
      "format"
    ];
    return Object.fromEntries(
      Object.entries(this.settings).filter(
        ([c]) => G.includes(c)
      )
    );
  }
  async doGenerateTexts(G, c) {
    return this.processTextGenerationResponse(
      await this.callAPI(G, c, {
        responseFormat: Fc.json
      })
    );
  }
  restoreGeneratedTexts(G) {
    return this.processTextGenerationResponse(
      VI({
        value: G,
        schema: s(jb)
      })
    );
  }
  processTextGenerationResponse(G) {
    return {
      rawResponse: G,
      textGenerationResults: [
        {
          text: G.message.content,
          finishReason: "unknown"
        }
      ]
    };
  }
  doStreamText(G, c) {
    return this.callAPI(G, c, {
      responseFormat: Fc.deltaIterable
    });
  }
  extractTextDelta(G) {
    const c = G;
    return c.done === !0 ? void 0 : c.message.content;
  }
  asToolCallGenerationModel(G) {
    return new vG({
      model: this,
      template: G
    });
  }
  asToolCallsOrTextGenerationModel(G) {
    return new yG({
      model: this,
      template: G
    });
  }
  asObjectGenerationModel(G) {
    return "adaptModel" in G ? new q({
      model: G.adaptModel(this),
      template: G
    }) : new q({
      model: this,
      template: G
    });
  }
  withTextPrompt() {
    return this.withPromptTemplate(WX());
  }
  withInstructionPrompt() {
    return this.withPromptTemplate(VX());
  }
  withChatPrompt() {
    return this.withPromptTemplate(mX());
  }
  withPromptTemplate(G) {
    return new hI({
      model: this.withSettings({
        stopSequences: [
          ...this.settings.stopSequences ?? [],
          ...G.stopSequences
        ]
      }),
      promptTemplate: G
    });
  }
  withJsonOutput() {
    return this.withSettings({ format: "json" });
  }
  withSettings(G) {
    return new Kb(
      Object.assign({}, this.settings, G)
    );
  }
}, jb = W.object({
  model: W.string(),
  created_at: W.string(),
  done: W.literal(!0),
  message: W.object({
    role: W.string(),
    content: W.string()
  }),
  total_duration: W.number(),
  load_duration: W.number().optional(),
  prompt_eval_count: W.number().optional(),
  prompt_eval_duration: W.number().optional(),
  eval_count: W.number(),
  eval_duration: W.number()
}), NX = W.discriminatedUnion("done", [
  W.object({
    done: W.literal(!1),
    model: W.string(),
    created_at: W.string(),
    message: W.object({
      role: W.string(),
      content: W.string()
    })
  }),
  W.object({
    done: W.literal(!0),
    model: W.string(),
    created_at: W.string(),
    total_duration: W.number(),
    load_duration: W.number().optional(),
    prompt_eval_count: W.number().optional(),
    prompt_eval_duration: W.number().optional(),
    eval_count: W.number(),
    eval_duration: W.number()
  })
]), Fc = {
  /**
   * Returns the response as a JSON object.
   */
  json: {
    stream: !1,
    handler: async ({ response: l, url: I, requestBodyValues: G }) => {
      const c = await l.text(), b = TI({
        text: c,
        schema: s(
          W.union([
            jb,
            W.object({
              done: W.literal(!1),
              model: W.string(),
              created_at: W.string()
            })
          ])
        )
      });
      if (!b.success)
        throw new z({
          message: "Invalid JSON response",
          cause: b.error,
          statusCode: l.status,
          responseBody: c,
          url: I,
          requestBodyValues: G
        });
      if (b.value.done === !1)
        throw new z({
          message: "Incomplete Ollama response received",
          statusCode: l.status,
          responseBody: c,
          url: I,
          requestBodyValues: G,
          isRetryable: !0
        });
      return b.value;
    }
  },
  /**
   * Returns an async iterable over the full deltas (all choices, including full current state at time of event)
   * of the response stream.
   */
  deltaIterable: {
    stream: !0,
    handler: zG(
      s(NX)
    )
  }
}, Sb = {};
L(Sb, {
  Alpaca: () => hX,
  ChatML: () => nX,
  Llama2: () => tX,
  Mistral: () => RX,
  NeuralChat: () => eX,
  Synthia: () => FX,
  Text: () => Pb,
  Vicuna: () => YX,
  asOllamaCompletionPromptTemplate: () => sl,
  asOllamaCompletionTextPromptTemplateProvider: () => XI
});
function sl(l) {
  return {
    format: (I) => ({
      prompt: l.format(I)
    }),
    stopSequences: l.stopSequences
  };
}
function XI(l) {
  return {
    text: () => sl(l.text()),
    instruction: () => sl(l.instruction()),
    chat: () => sl(l.chat())
  };
}
var Pb = XI(rG), RX = XI(gG), nX = XI(EG), tX = XI(oG), eX = XI(LG), hX = XI(wG), FX = XI(AG), YX = XI(iG), sX = class fb extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "ollama");
    a(this, "tokenizer");
    a(this, "countPromptTokens");
  }
  get modelName() {
    return this.settings.model;
  }
  get contextWindowSize() {
    return this.settings.contextWindowSize;
  }
  async callAPI(G, c, b) {
    var m;
    const { responseFormat: Z } = b, d = this.settings.api ?? new _l(), V = (m = c.run) == null ? void 0 : m.abortSignal;
    return A({
      retry: d.retry,
      throttle: d.throttle,
      call: async () => k({
        url: d.assembleUrl("/api/generate"),
        headers: d.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          stream: Z.stream,
          model: this.settings.model,
          prompt: G.prompt,
          images: G.images,
          format: this.settings.format,
          options: {
            mirostat: this.settings.mirostat,
            mirostat_eta: this.settings.mirostatEta,
            mirostat_tau: this.settings.mirostatTau,
            num_ctx: this.settings.contextWindowSize,
            num_gpu: this.settings.numGpu,
            num_gqa: this.settings.numGqa,
            num_predict: this.settings.maxGenerationTokens,
            num_threads: this.settings.numThreads,
            repeat_last_n: this.settings.repeatLastN,
            repeat_penalty: this.settings.repeatPenalty,
            seed: this.settings.seed,
            stop: this.settings.stopSequences,
            temperature: this.settings.temperature,
            tfs_z: this.settings.tfsZ,
            top_k: this.settings.topK,
            top_p: this.settings.topP
          },
          system: this.settings.system,
          template: this.settings.template,
          context: this.settings.context,
          raw: this.settings.raw
        },
        failedResponseHandler: PG,
        successfulResponseHandler: Z.handler,
        abortSignal: V
      })
    });
  }
  get settingsForEvent() {
    const G = [
      ...cI,
      "contextWindowSize",
      "temperature",
      "mirostat",
      "mirostatEta",
      "mirostatTau",
      "numGqa",
      "numGpu",
      "numThreads",
      "repeatLastN",
      "repeatPenalty",
      "seed",
      "tfsZ",
      "topK",
      "topP",
      "system",
      "template",
      "context",
      "format",
      "raw"
    ];
    return Object.fromEntries(
      Object.entries(this.settings).filter(
        ([c]) => G.includes(c)
      )
    );
  }
  async doGenerateTexts(G, c) {
    return this.processTextGenerationResponse(
      await this.callAPI(G, c, {
        responseFormat: Yc.json
      })
    );
  }
  restoreGeneratedTexts(G) {
    return this.processTextGenerationResponse(
      VI({
        value: G,
        schema: s(Ob)
      })
    );
  }
  processTextGenerationResponse(G) {
    return {
      rawResponse: G,
      textGenerationResults: [
        {
          text: G.response,
          finishReason: "unknown"
        }
      ]
    };
  }
  doStreamText(G, c) {
    return this.callAPI(G, c, {
      ...c,
      responseFormat: Yc.deltaIterable
    });
  }
  extractTextDelta(G) {
    const c = G;
    return c.done === !0 ? void 0 : c.response;
  }
  asObjectGenerationModel(G) {
    return "adaptModel" in G ? new q({
      model: G.adaptModel(this),
      template: G
    }) : new q({
      model: this,
      template: G
    });
  }
  asToolCallGenerationModel(G) {
    return new vG({
      model: this,
      template: G
    });
  }
  asToolCallsOrTextGenerationModel(G) {
    return new yG({
      model: this,
      template: G
    });
  }
  get promptTemplateProvider() {
    return this.settings.promptTemplate ?? Pb;
  }
  withJsonOutput() {
    return this.withSettings({ format: "json" });
  }
  withTextPrompt() {
    return this.withPromptTemplate(this.promptTemplateProvider.text());
  }
  withInstructionPrompt() {
    return this.withPromptTemplate(this.promptTemplateProvider.instruction());
  }
  withChatPrompt() {
    return this.withPromptTemplate(this.promptTemplateProvider.chat());
  }
  withPromptTemplate(G) {
    return new hI({
      model: this.withSettings({
        stopSequences: [
          ...this.settings.stopSequences ?? [],
          ...G.stopSequences
        ]
      }),
      promptTemplate: G
    });
  }
  withSettings(G) {
    return new fb(
      Object.assign({}, this.settings, G)
    );
  }
}, Ob = W.object({
  done: W.literal(!0),
  model: W.string(),
  created_at: W.string(),
  response: W.string(),
  total_duration: W.number(),
  load_duration: W.number().optional(),
  prompt_eval_count: W.number().optional(),
  prompt_eval_duration: W.number().optional(),
  eval_count: W.number(),
  eval_duration: W.number(),
  context: W.array(W.number()).optional()
}), pX = W.discriminatedUnion("done", [
  W.object({
    done: W.literal(!1),
    model: W.string(),
    created_at: W.string(),
    response: W.string()
  }),
  W.object({
    done: W.literal(!0),
    model: W.string(),
    created_at: W.string(),
    total_duration: W.number(),
    load_duration: W.number().optional(),
    sample_count: W.number().optional(),
    sample_duration: W.number().optional(),
    prompt_eval_count: W.number().optional(),
    prompt_eval_duration: W.number().optional(),
    eval_count: W.number(),
    eval_duration: W.number(),
    context: W.array(W.number()).optional()
  })
]), Yc = {
  /**
   * Returns the response as a JSON object.
   */
  json: {
    stream: !1,
    handler: async ({ response: l, url: I, requestBodyValues: G }) => {
      const c = await l.text(), b = TI({
        text: c,
        schema: s(
          W.union([
            Ob,
            W.object({
              done: W.literal(!1),
              model: W.string(),
              created_at: W.string(),
              response: W.string()
            })
          ])
        )
      });
      if (!b.success)
        throw new z({
          message: "Invalid JSON response",
          cause: b.error,
          statusCode: l.status,
          responseBody: c,
          url: I,
          requestBodyValues: G
        });
      if (b.value.done === !1)
        throw new z({
          message: "Incomplete Ollama response received",
          statusCode: l.status,
          responseBody: c,
          url: I,
          requestBodyValues: G,
          isRetryable: !0
        });
      return b.value;
    }
  },
  /**
   * Returns an async iterable over the full deltas (all choices, including full current state at time of event)
   * of the response stream.
   */
  deltaIterable: {
    stream: !0,
    handler: zG(
      s(pX)
    )
  }
}, QX = {};
L(QX, {
  Api: () => uX,
  ChatTextGenerator: () => yX,
  CompletionTextGenerator: () => vX,
  TextEmbedder: () => wX,
  prompt: () => Sb
});
var HX = class Db extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "ollama");
    a(this, "maxValuesPerCall", 1);
  }
  get modelName() {
    return null;
  }
  get isParallelizable() {
    return this.settings.isParallelizable ?? !1;
  }
  get dimensions() {
    return this.settings.dimensions;
  }
  async callAPI(G, c) {
    var d;
    if (G.length > this.maxValuesPerCall)
      throw new Error(
        `The Ollama embedding API only supports ${this.maxValuesPerCall} texts per API call.`
      );
    const b = this.settings.api ?? new _l(), Z = (d = c.run) == null ? void 0 : d.abortSignal;
    return A({
      retry: b.retry,
      throttle: b.throttle,
      call: async () => k({
        url: b.assembleUrl("/api/embeddings"),
        headers: b.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          model: this.settings.model,
          prompt: G[0]
        },
        failedResponseHandler: PG,
        successfulResponseHandler: U(
          s(JX)
        ),
        abortSignal: Z
      })
    });
  }
  get settingsForEvent() {
    return {
      dimensions: this.settings.dimensions
    };
  }
  async doEmbedValues(G, c) {
    const b = await this.callAPI(G, c);
    return {
      rawResponse: b,
      embeddings: [b.embedding]
    };
  }
  withSettings(G) {
    return new Db(
      Object.assign({}, this.settings, G)
    );
  }
}, JX = W.object({
  embedding: W.array(W.number())
});
function uX(l) {
  return new _l(l);
}
function vX(l) {
  return new sX(l);
}
function yX(l) {
  return new aX(l);
}
function wX(l) {
  return new HX(l);
}
var gI = class extends K {
  constructor(l = {}) {
    super({
      ...l,
      headers: {
        Authorization: `Bearer ${j({
          apiKey: l.apiKey,
          environmentVariableName: "OPENAI_API_KEY",
          description: "OpenAI"
        })}`
      },
      baseUrlDefaults: {
        protocol: "https",
        host: "api.openai.com",
        port: "443",
        path: "/v1"
      }
    });
  }
}, EX = W.object({
  error: W.object({
    message: W.string(),
    type: W.string(),
    param: W.any().nullable(),
    code: W.string().nullable()
  })
}), KI = FI({
  errorSchema: s(EX),
  errorToMessage: (l) => l.error.message,
  isRetryable: (l, I) => l.status >= 500 || l.status === 429 && // insufficient_quota is also reported as a 429, but it's not retryable:
  (I == null ? void 0 : I.error.type) !== "insufficient_quota"
}), qb = class extends x {
  constructor(l) {
    super({ settings: l });
  }
  async callAPI(l, I, G) {
    var F, H, v, o;
    const c = this.settings.api ?? new gI(), b = G.responseFormat, Z = (F = I.run) == null ? void 0 : F.abortSignal, d = this.settings.isUserIdForwardingEnabled ? (H = I.run) == null ? void 0 : H.userId : void 0, V = this.settings.responseFormat, m = G.functions ?? this.settings.functions, X = G.functionCall ?? this.settings.functionCall, N = G.tools ?? this.settings.tools, t = G.toolChoice ?? this.settings.toolChoice;
    let { stopSequences: p } = this.settings;
    return A({
      retry: (v = this.settings.api) == null ? void 0 : v.retry,
      throttle: (o = this.settings.api) == null ? void 0 : o.throttle,
      call: async () => (p != null && Array.isArray(p) && p.length === 0 && (p = void 0), k({
        url: c.assembleUrl("/chat/completions"),
        headers: c.headers({
          functionType: I.functionType,
          functionId: I.functionId,
          run: I.run,
          callId: I.callId
        }),
        body: {
          stream: b.stream,
          model: this.settings.model,
          messages: l,
          functions: m,
          function_call: X,
          tools: N,
          tool_choice: t,
          temperature: this.settings.temperature,
          top_p: this.settings.topP,
          n: this.settings.numberOfGenerations,
          stop: p,
          max_tokens: this.settings.maxGenerationTokens,
          presence_penalty: this.settings.presencePenalty,
          frequency_penalty: this.settings.frequencyPenalty,
          logit_bias: this.settings.logitBias,
          seed: this.settings.seed,
          response_format: V,
          user: d
        },
        failedResponseHandler: KI,
        successfulResponseHandler: b.handler,
        abortSignal: Z
      }))
    });
  }
  async doGenerateTexts(l, I) {
    return this.processTextGenerationResponse(
      await this.callAPI(l, I, {
        responseFormat: rI.json
      })
    );
  }
  restoreGeneratedTexts(l) {
    return this.processTextGenerationResponse(
      VI({
        value: l,
        schema: s(_b)
      })
    );
  }
  processTextGenerationResponse(l) {
    return {
      rawResponse: l,
      textGenerationResults: l.choices.map((I) => ({
        text: I.message.content ?? "",
        finishReason: this.translateFinishReason(I.finish_reason)
      })),
      usage: this.extractUsage(l)
    };
  }
  translateFinishReason(l) {
    switch (l) {
      case "stop":
        return "stop";
      case "length":
        return "length";
      case "content_filter":
        return "content-filter";
      case "function_call":
      case "tool_calls":
        return "tool-calls";
      default:
        return "unknown";
    }
  }
  doStreamText(l, I) {
    return this.callAPI(l, I, {
      responseFormat: rI.deltaIterable
    });
  }
  extractTextDelta(l) {
    const I = l;
    if (I.object !== "chat.completion.chunk" && I.object !== "chat.completion")
      return;
    const c = I.choices[0];
    if (!(c.index > 0))
      return c.delta.content ?? void 0;
  }
  async doGenerateToolCall(l, I, G) {
    var Z;
    const c = await this.callAPI(I, G, {
      responseFormat: rI.json,
      toolChoice: {
        type: "function",
        function: { name: l.name }
      },
      tools: [
        {
          type: "function",
          function: {
            name: l.name,
            description: l.description,
            parameters: l.parameters.getJsonSchema()
          }
        }
      ]
    }), b = (Z = c.choices[0]) == null ? void 0 : Z.message.tool_calls;
    return {
      rawResponse: c,
      toolCall: b == null || b.length === 0 ? null : {
        id: b[0].id,
        args: eI({ text: b[0].function.arguments })
      },
      usage: this.extractUsage(c)
    };
  }
  async doGenerateToolCalls(l, I, G) {
    var Z, d;
    const c = await this.callAPI(I, G, {
      responseFormat: rI.json,
      toolChoice: "auto",
      tools: l.map((V) => ({
        type: "function",
        function: {
          name: V.name,
          description: V.description,
          parameters: V.parameters.getJsonSchema()
        }
      }))
    }), b = (Z = c.choices[0]) == null ? void 0 : Z.message;
    return {
      rawResponse: c,
      text: b.content ?? null,
      toolCalls: ((d = b.tool_calls) == null ? void 0 : d.map((V) => ({
        id: V.id,
        name: V.function.name,
        args: eI({ text: V.function.arguments })
      }))) ?? null,
      usage: this.extractUsage(c)
    };
  }
  extractUsage(l) {
    return {
      promptTokens: l.usage.prompt_tokens,
      completionTokens: l.usage.completion_tokens,
      totalTokens: l.usage.total_tokens
    };
  }
}, _b = W.object({
  id: W.string(),
  choices: W.array(
    W.object({
      message: W.object({
        role: W.literal("assistant"),
        content: W.string().nullable(),
        function_call: W.object({
          name: W.string(),
          arguments: W.string()
        }).optional(),
        tool_calls: W.array(
          W.object({
            id: W.string(),
            type: W.literal("function"),
            function: W.object({
              name: W.string(),
              arguments: W.string()
            })
          })
        ).optional()
      }),
      index: W.number().optional(),
      // optional for OpenAI compatible models
      logprobs: W.nullable(W.any()),
      finish_reason: W.enum([
        "stop",
        "length",
        "tool_calls",
        "content_filter",
        "function_call"
      ]).optional().nullable()
    })
  ),
  created: W.number(),
  model: W.string(),
  system_fingerprint: W.string().optional().nullable(),
  object: W.literal("chat.completion"),
  usage: W.object({
    prompt_tokens: W.number(),
    completion_tokens: W.number(),
    total_tokens: W.number()
  })
}), oX = W.object({
  object: W.string(),
  // generalized for openai compatible providers, z.literal("chat.completion.chunk")
  id: W.string(),
  choices: W.array(
    W.object({
      delta: W.object({
        role: W.enum(["assistant", "user"]).optional(),
        content: W.string().nullable().optional(),
        function_call: W.object({
          name: W.string().optional(),
          arguments: W.string().optional()
        }).optional(),
        tool_calls: W.array(
          W.object({
            id: W.string(),
            type: W.literal("function"),
            function: W.object({
              name: W.string(),
              arguments: W.string()
            })
          })
        ).optional()
      }),
      finish_reason: W.enum([
        "stop",
        "length",
        "tool_calls",
        "content_filter",
        "function_call"
      ]).nullable().optional(),
      index: W.number()
    })
  ),
  created: W.number(),
  model: W.string().optional(),
  // optional for OpenAI compatible models
  system_fingerprint: W.string().optional().nullable()
}), rI = {
  /**
   * Returns the response as a JSON object.
   */
  json: {
    stream: !1,
    handler: U(s(_b))
  },
  /**
   * Returns an async iterable over the text deltas (only the tex different of the first choice).
   */
  deltaIterable: {
    stream: !0,
    handler: SG(s(oX))
  }
}, $b = class extends x {
  constructor(l) {
    super({ settings: l });
  }
  async callAPI(l, I, G) {
    var m, X;
    const c = this.settings.api ?? new gI(), b = this.settings.isUserIdForwardingEnabled ? (m = I.run) == null ? void 0 : m.userId : void 0, Z = (X = I.run) == null ? void 0 : X.abortSignal, d = G.responseFormat, V = this.settings.stopSequences != null && Array.isArray(this.settings.stopSequences) && this.settings.stopSequences.length === 0 ? void 0 : this.settings.stopSequences;
    return A({
      retry: c.retry,
      throttle: c.throttle,
      call: async () => k({
        url: c.assembleUrl("/completions"),
        headers: c.headers({
          functionType: I.functionType,
          functionId: I.functionId,
          run: I.run,
          callId: I.callId
        }),
        body: {
          stream: d.stream,
          model: this.settings.model,
          prompt: l,
          suffix: this.settings.suffix,
          max_tokens: this.settings.maxGenerationTokens,
          temperature: this.settings.temperature,
          top_p: this.settings.topP,
          n: this.settings.numberOfGenerations,
          logprobs: this.settings.logprobs,
          echo: this.settings.echo,
          stop: V,
          seed: this.settings.seed,
          presence_penalty: this.settings.presencePenalty,
          frequency_penalty: this.settings.frequencyPenalty,
          best_of: this.settings.bestOf,
          logit_bias: this.settings.logitBias,
          user: b
        },
        failedResponseHandler: KI,
        successfulResponseHandler: d.handler,
        abortSignal: Z
      })
    });
  }
  async doGenerateTexts(l, I) {
    return this.processTextGenerationResponse(
      await this.callAPI(l, I, {
        responseFormat: sc.json
      })
    );
  }
  restoreGeneratedTexts(l) {
    return this.processTextGenerationResponse(
      VI({
        value: l,
        schema: s(IZ)
      })
    );
  }
  processTextGenerationResponse(l) {
    return {
      rawResponse: l,
      textGenerationResults: l.choices.map((I) => ({
        finishReason: this.translateFinishReason(I.finish_reason),
        text: I.text
      })),
      usage: {
        promptTokens: l.usage.prompt_tokens,
        completionTokens: l.usage.completion_tokens,
        totalTokens: l.usage.total_tokens
      }
    };
  }
  translateFinishReason(l) {
    switch (l) {
      case "stop":
        return "stop";
      case "length":
        return "length";
      case "content_filter":
        return "content-filter";
      default:
        return "unknown";
    }
  }
  doStreamText(l, I) {
    return this.callAPI(l, I, {
      responseFormat: sc.deltaIterable
    });
  }
  extractTextDelta(l) {
    const I = l;
    if (!(I.choices[0].index > 0))
      return I.choices[0].text;
  }
  withJsonOutput() {
    return this;
  }
}, IZ = W.object({
  id: W.string(),
  choices: W.array(
    W.object({
      finish_reason: W.enum(["stop", "length", "content_filter"]).optional().nullable(),
      index: W.number(),
      logprobs: W.nullable(W.any()),
      text: W.string()
    })
  ),
  created: W.number(),
  model: W.string(),
  system_fingerprint: W.string().optional(),
  object: W.literal("text_completion"),
  usage: W.object({
    prompt_tokens: W.number(),
    completion_tokens: W.number(),
    total_tokens: W.number()
  })
}), gX = W.object({
  choices: W.array(
    W.object({
      text: W.string(),
      finish_reason: W.enum(["stop", "length", "content_filter"]).optional().nullable(),
      index: W.number()
    })
  ),
  created: W.number(),
  id: W.string(),
  model: W.string(),
  system_fingerprint: W.string().optional(),
  object: W.literal("text_completion")
}), sc = {
  /**
   * Returns the response as a JSON object.
   */
  json: {
    stream: !1,
    handler: U(
      s(IZ)
    )
  },
  /**
   * Returns an async iterable over the full deltas (all choices, including full current state at time of event)
   * of the response stream.
   */
  deltaIterable: {
    stream: !0,
    handler: SG(
      s(gX)
    )
  }
}, lZ = class extends x {
  constructor(I) {
    super({ settings: I });
    a(this, "isParallelizable", !0);
  }
  get maxValuesPerCall() {
    return this.settings.maxValuesPerCall ?? 2048;
  }
  async callAPI(I, G) {
    var Z;
    const c = this.settings.api ?? new gI(), b = (Z = G.run) == null ? void 0 : Z.abortSignal;
    return A({
      retry: c.retry,
      throttle: c.throttle,
      call: async () => {
        var d;
        return k({
          url: c.assembleUrl("/embeddings"),
          headers: c.headers({
            functionType: G.functionType,
            functionId: G.functionId,
            run: G.run,
            callId: G.callId
          }),
          body: {
            model: this.modelName,
            input: I,
            dimensions: this.settings.dimensions,
            user: this.settings.isUserIdForwardingEnabled ? (d = G.run) == null ? void 0 : d.userId : void 0
          },
          failedResponseHandler: KI,
          successfulResponseHandler: U(
            s(LX)
          ),
          abortSignal: b
        });
      }
    });
  }
  async doEmbedValues(I, G) {
    if (I.length > this.maxValuesPerCall)
      throw new Error(
        `The OpenAI embedding API only supports ${this.maxValuesPerCall} texts per API call.`
      );
    const c = await this.callAPI(I, G);
    return {
      rawResponse: c,
      embeddings: c.data.map((b) => b.embedding)
    };
  }
}, LX = W.object({
  object: W.literal("list"),
  data: W.array(
    W.object({
      object: W.literal("embedding"),
      embedding: W.array(W.number()),
      index: W.number()
    })
  ),
  model: W.string(),
  usage: W.object({
    prompt_tokens: W.number(),
    total_tokens: W.number()
  }).optional()
  // for openai-compatible models
}), AX = class extends fc {
  constructor({
    resourceName: I,
    deploymentId: G,
    apiVersion: c,
    apiKey: b,
    retry: Z,
    throttle: d
  }) {
    super({ retry: Z, throttle: d });
    a(this, "resourceName");
    a(this, "deploymentId");
    a(this, "apiVersion");
    a(this, "fixedHeaderValue");
    this.resourceName = I, this.deploymentId = G, this.apiVersion = c, this.fixedHeaderValue = {
      "api-key": j({
        apiKey: b,
        environmentVariableName: "AZURE_OPENAI_API_KEY",
        description: "Azure OpenAI"
      })
    };
  }
  assembleUrl(I) {
    return `https://${this.resourceName}.openai.azure.com/openai/deployments/${this.deploymentId}${I}?api-version=${this.apiVersion}`;
  }
  fixedHeaders() {
    return this.fixedHeaderValue;
  }
}, uI = {
  /**
   * Creates a system chat message.
   */
  system(l) {
    return { role: "system", content: l };
  },
  /**
   * Creates a user chat message. The message can be a string or a multi-modal input.
   */
  user(l, I) {
    return {
      role: "user",
      content: typeof l == "string" ? l : l.map((G) => {
        switch (G.type) {
          case "text":
            return { type: "text", text: G.text };
          case "image":
            return {
              type: "image_url",
              image_url: `data:${G.mimeType ?? "image/jpeg"};base64,${Dl(G.image)}`
            };
        }
      }),
      name: I == null ? void 0 : I.name
    };
  },
  /**
   * Creates an assistant chat message.
   * The assistant message can optionally contain tool calls
   * or a function call (function calls are deprecated).
   */
  assistant(l, I) {
    var G;
    return {
      role: "assistant",
      content: l,
      function_call: (I == null ? void 0 : I.functionCall) == null ? void 0 : {
        name: I.functionCall.name,
        arguments: I.functionCall.arguments
      },
      tool_calls: ((G = I == null ? void 0 : I.toolCalls) == null ? void 0 : G.map((c) => ({
        id: c.id,
        type: "function",
        function: {
          name: c.name,
          arguments: JSON.stringify(c.args)
        }
      }))) ?? void 0
    };
  },
  /**
   * Creates a function result chat message for tool call results.
   *
   * @deprecated OpenAI functions are deprecated in favor of tools.
   */
  fn({
    fnName: l,
    content: I
  }) {
    return { role: "function", name: l, content: JSON.stringify(I) };
  },
  /**
   * Creates a tool result chat message with the result of a tool call.
   */
  tool({
    toolCallId: l,
    content: I
  }) {
    return {
      role: "tool",
      tool_call_id: l,
      content: JSON.stringify(I)
    };
  }
};
function rX() {
  return { format: (l) => l, stopSequences: [] };
}
function fG() {
  return {
    format: (l) => [uI.user(l)],
    stopSequences: []
  };
}
function OG() {
  return {
    format(l) {
      const I = [];
      return l.system != null && I.push(uI.system(l.system)), I.push(uI.user(l.instruction)), I;
    },
    stopSequences: []
  };
}
function DG() {
  return {
    format(l) {
      const I = [];
      l.system != null && I.push(uI.system(l.system));
      for (const { role: G, content: c } of l.messages)
        switch (G) {
          case "user": {
            I.push(uI.user(c));
            break;
          }
          case "assistant": {
            if (typeof c == "string")
              I.push(uI.assistant(c));
            else {
              let b = "";
              const Z = [];
              for (const d of c)
                switch (d.type) {
                  case "text": {
                    b += d.text;
                    break;
                  }
                  case "tool-call": {
                    Z.push({
                      id: d.id,
                      type: "function",
                      function: {
                        name: d.name,
                        arguments: JSON.stringify(d.args)
                      }
                    });
                    break;
                  }
                  default: {
                    const V = d;
                    throw new Error(`Unsupported part: ${V}`);
                  }
                }
              I.push({
                role: "assistant",
                content: b,
                tool_calls: Z
              });
            }
            break;
          }
          case "tool": {
            for (const b of c)
              I.push({
                role: "tool",
                tool_call_id: b.id,
                content: JSON.stringify(b.response)
              });
            break;
          }
          default: {
            const b = G;
            throw new Error(`Unsupported role: ${b}`);
          }
        }
      return I;
    },
    stopSequences: []
  };
}
var iX = class hG {
  constructor({
    model: I,
    fnName: G,
    fnDescription: c,
    promptTemplate: b
  }) {
    a(this, "model");
    a(this, "fnName");
    a(this, "fnDescription");
    a(this, "promptTemplate");
    this.model = I, this.fnName = G, this.fnDescription = c, this.promptTemplate = b;
  }
  get modelInformation() {
    return this.model.modelInformation;
  }
  get settings() {
    return {
      ...this.model.settings,
      fnName: this.fnName,
      fnDescription: this.fnDescription
    };
  }
  get settingsForEvent() {
    return {
      ...this.model.settingsForEvent,
      fnName: this.fnName,
      fnDescription: this.fnDescription
    };
  }
  /**
   * Returns this model with a text prompt template.
   */
  withTextPrompt() {
    return this.withPromptTemplate(fG());
  }
  /**
   * Returns this model with an instruction prompt template.
   */
  withInstructionPrompt() {
    return this.withPromptTemplate(OG());
  }
  /**
   * Returns this model with a chat prompt template.
   */
  withChatPrompt() {
    return this.withPromptTemplate(DG());
  }
  withPromptTemplate(I) {
    return new hG({
      model: this.model,
      fnName: this.fnName,
      fnDescription: this.fnDescription,
      promptTemplate: I
    });
  }
  withSettings(I) {
    return new hG({
      model: this.model.withSettings(I),
      fnName: this.fnName,
      fnDescription: this.fnDescription,
      promptTemplate: this.promptTemplate
    });
  }
  /**
   * JSON generation uses the OpenAI GPT function calling API.
   * It provides a single function specification and instructs the model to provide parameters for calling the function.
   * The result is returned as parsed JSON.
   *
   * @see https://platform.openai.com/docs/guides/gpt/function-calling
   */
  async doGenerateObject(I, G, c) {
    const b = this.promptTemplate.format(G), Z = await this.model.withSettings({
      stopSequences: [
        ...this.settings.stopSequences ?? [],
        ...this.promptTemplate.stopSequences
      ]
    }).callAPI(b, c, {
      responseFormat: rI.json,
      functionCall: { name: this.fnName },
      functions: [
        {
          name: this.fnName,
          description: this.fnDescription,
          parameters: I.getJsonSchema()
        }
      ]
    }), d = Z.choices[0].message.function_call.arguments;
    try {
      return {
        rawResponse: Z,
        valueText: d,
        value: bl.parse(d),
        usage: this.model.extractUsage(Z)
      };
    } catch (V) {
      throw new cb({
        valueText: d,
        cause: V
      });
    }
  }
  async doStreamObject(I, G, c) {
    const b = this.promptTemplate.format(G);
    return this.model.callAPI(b, c, {
      responseFormat: rI.deltaIterable,
      functionCall: { name: this.fnName },
      functions: [
        {
          name: this.fnName,
          description: this.fnDescription,
          parameters: I.getJsonSchema()
        }
      ]
    });
  }
  extractObjectTextDelta(I) {
    var Z;
    const G = I;
    if (G.object !== "chat.completion.chunk")
      return;
    const b = G.choices[0];
    if (!(b.index > 0))
      return (Z = b.delta.function_call) == null ? void 0 : Z.arguments;
  }
  parseAccumulatedObjectText(I) {
    return uG(I);
  }
}, el = class {
  /**
   * Get a TikToken tokenizer for a specific model or encoding.
   */
  constructor(l) {
    a(this, "tiktoken");
    this.tiktoken = new Bc(UX(l.model));
  }
  async tokenize(l) {
    return this.tiktoken.encode(l);
  }
  async tokenizeWithTexts(l) {
    const I = this.tiktoken.encode(l);
    return {
      tokens: I,
      tokenTexts: I.map((G) => this.tiktoken.decode([G]))
    };
  }
  async detokenize(l) {
    return this.tiktoken.decode(l);
  }
};
function UX(l) {
  switch (l) {
    case "gpt-3.5-turbo":
    case "gpt-3.5-turbo-0301":
    case "gpt-3.5-turbo-0613":
    case "gpt-3.5-turbo-1106":
    case "gpt-3.5-turbo-0125":
    case "gpt-3.5-turbo-16k":
    case "gpt-3.5-turbo-16k-0613":
    case "gpt-3.5-turbo-instruct":
    case "gpt-4":
    case "gpt-4-0314":
    case "gpt-4-0613":
    case "gpt-4-turbo-preview":
    case "gpt-4-1106-preview":
    case "gpt-4-0125-preview":
    case "gpt-4-vision-preview":
    case "gpt-4-32k":
    case "gpt-4-32k-0314":
    case "gpt-4-32k-0613":
    case "text-embedding-3-small":
    case "text-embedding-3-large":
    case "text-embedding-ada-002":
      return vW;
    default:
      throw new Error(`Unknown model: ${l}`);
  }
}
var kX = 2, bG = 5;
async function xX({
  message: l,
  model: I
}) {
  const G = new el({
    model: GZ(I).baseModel
  });
  if (l.content == null)
    return bG;
  if (typeof l.content == "string")
    return bG + await Wl(G, l.content);
  let c = bG;
  for (const b of l.content)
    b.type === "text" && (c += await Wl(G, b.text));
  return c;
}
async function zX({
  messages: l,
  model: I
}) {
  let G = kX;
  for (const c of l)
    G += await xX({ message: c, model: I });
  return G;
}
var ZG = {
  "gpt-4": 8192,
  "gpt-4-0314": 8192,
  "gpt-4-0613": 8192,
  "gpt-4-turbo-preview": 128e3,
  "gpt-4-1106-preview": 128e3,
  "gpt-4-0125-preview": 128e3,
  "gpt-4-vision-preview": 128e3,
  "gpt-4-32k": 32768,
  "gpt-4-32k-0314": 32768,
  "gpt-4-32k-0613": 32768,
  "gpt-3.5-turbo": 4096,
  "gpt-3.5-turbo-0125": 16385,
  "gpt-3.5-turbo-1106": 16385,
  "gpt-3.5-turbo-0301": 4096,
  "gpt-3.5-turbo-0613": 4096,
  "gpt-3.5-turbo-16k": 16384,
  "gpt-3.5-turbo-16k-0613": 16384
};
function GZ(l) {
  if (l in ZG) {
    const d = ZG[l];
    return {
      baseModel: l,
      isFineTuned: !1,
      contextWindowSize: d
    };
  }
  const [I, G, c, b, Z] = l.split(":");
  if (["gpt-3.5-turbo", "gpt-3.5-turbo-0613", "gpt-4-0613"].includes(G)) {
    const d = ZG[G];
    return {
      baseModel: G,
      isFineTuned: !0,
      contextWindowSize: d
    };
  }
  throw new Error(`Unknown OpenAI chat base model ${G}.`);
}
var BX = class cZ extends qb {
  constructor(G) {
    super(G);
    a(this, "provider", "openai");
    a(this, "contextWindowSize");
    a(this, "tokenizer");
    const c = GZ(this.settings.model);
    this.tokenizer = new el({
      model: c.baseModel
    }), this.contextWindowSize = c.contextWindowSize;
  }
  get modelName() {
    return this.settings.model;
  }
  /**
   * Counts the prompt tokens required for the messages. This includes the message base tokens
   * and the prompt base tokens.
   */
  countPromptTokens(G) {
    return zX({
      messages: G,
      model: this.modelName
    });
  }
  get settingsForEvent() {
    const G = [
      ...cI,
      "functions",
      "functionCall",
      "temperature",
      "topP",
      "presencePenalty",
      "frequencyPenalty",
      "logitBias",
      "seed",
      "responseFormat"
    ];
    return Object.fromEntries(
      Object.entries(this.settings).filter(
        ([c]) => G.includes(c)
      )
    );
  }
  asFunctionCallObjectGenerationModel({
    fnName: G,
    fnDescription: c
  }) {
    return new iX({
      model: this,
      fnName: G,
      fnDescription: c,
      promptTemplate: rX()
    });
  }
  asObjectGenerationModel(G) {
    return "adaptModel" in G ? new q({
      model: G.adaptModel(this),
      template: G
    }) : new q({
      model: this,
      template: G
    });
  }
  withTextPrompt() {
    return this.withPromptTemplate(fG());
  }
  withInstructionPrompt() {
    return this.withPromptTemplate(OG());
  }
  withChatPrompt() {
    return this.withPromptTemplate(DG());
  }
  withPromptTemplate(G) {
    return new Xb({
      model: this.withSettings({
        stopSequences: [
          ...this.settings.stopSequences ?? [],
          ...G.stopSequences
        ]
      }),
      promptTemplate: G
    });
  }
  withJsonOutput() {
    return this.withSettings({ responseFormat: { type: "json_object" } });
  }
  withSettings(G) {
    return new cZ(
      Object.assign({}, this.settings, G)
    );
  }
}, CX = {
  "gpt-3.5-turbo-instruct": {
    contextWindowSize: 4097
  }
};
function MX(l) {
  return CX[l];
}
var TX = class bZ extends $b {
  constructor(G) {
    super(G);
    a(this, "provider", "openai");
    a(this, "contextWindowSize");
    a(this, "tokenizer");
    const c = MX(
      this.settings.model
    );
    this.tokenizer = new el({
      model: this.settings.model
    }), this.contextWindowSize = c.contextWindowSize;
  }
  get modelName() {
    return this.settings.model;
  }
  async countPromptTokens(G) {
    return Wl(this.tokenizer, G);
  }
  get settingsForEvent() {
    const G = [
      ...cI,
      "suffix",
      "temperature",
      "topP",
      "logprobs",
      "echo",
      "presencePenalty",
      "frequencyPenalty",
      "bestOf",
      "logitBias",
      "seed"
    ];
    return Object.fromEntries(
      Object.entries(this.settings).filter(
        ([c]) => G.includes(c)
      )
    );
  }
  withTextPrompt() {
    return this.withPromptTemplate(nl());
  }
  withInstructionPrompt() {
    return this.withPromptTemplate(fl());
  }
  withChatPrompt(G) {
    return this.withPromptTemplate(Ol(G));
  }
  withPromptTemplate(G) {
    return new hI({
      model: this.withSettings({
        stopSequences: [
          ...this.settings.stopSequences ?? [],
          ...G.stopSequences
        ]
      }),
      promptTemplate: G
    });
  }
  withSettings(G) {
    return new bZ(
      Object.assign({}, this.settings, G)
    );
  }
}, KX = {};
L(KX, {
  Api: () => la,
  AzureApi: () => Ga,
  ChatMessage: () => uI,
  ChatTextGenerator: () => ba,
  CompletionTextGenerator: () => ca,
  ImageGenerator: () => Va,
  SpeechGenerator: () => da,
  TextEmbedder: () => Za,
  Tokenizer: () => ma,
  Transcriber: () => Wa
});
var jX = class ZZ extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "openai");
  }
  get modelName() {
    return this.settings.model;
  }
  async callAPI(G, c, b) {
    var X, N;
    const Z = this.settings.api ?? new gI(), d = (X = c.run) == null ? void 0 : X.abortSignal, V = (N = c.run) == null ? void 0 : N.userId, m = b.responseFormat;
    return A({
      retry: Z.retry,
      throttle: Z.throttle,
      call: async () => k({
        url: Z.assembleUrl("/images/generations"),
        headers: Z.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          prompt: G,
          n: this.settings.numberOfGenerations,
          size: this.settings.size,
          response_format: m.type,
          user: this.settings.isUserIdForwardingEnabled ? V : void 0
        },
        failedResponseHandler: KI,
        successfulResponseHandler: m.handler,
        abortSignal: d
      })
    });
  }
  get settingsForEvent() {
    const G = [
      "numberOfGenerations",
      "size",
      "quality",
      "style"
    ];
    return Object.fromEntries(
      Object.entries(this.settings).filter(
        ([c]) => G.includes(c)
      )
    );
  }
  async doGenerateImages(G, c) {
    const b = await this.callAPI(G, c, {
      responseFormat: fX.base64Json
    });
    return {
      rawResponse: b,
      base64Images: b.data.map((Z) => Z.b64_json)
    };
  }
  withPromptTemplate(G) {
    return new QG({
      model: this,
      promptTemplate: G
    });
  }
  withSettings(G) {
    return new ZZ(
      Object.assign({}, this.settings, G)
    );
  }
}, SX = W.object({
  created: W.number(),
  data: W.array(
    W.object({
      url: W.string()
    })
  )
}), PX = W.object({
  created: W.number(),
  data: W.array(
    W.object({
      b64_json: W.string()
    })
  )
}), fX = {
  url: {
    type: "url",
    handler: U(
      s(SX)
    )
  },
  base64Json: {
    type: "b64_json",
    handler: U(
      s(PX)
    )
  }
}, OX = class dZ extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "openai");
  }
  get voice() {
    return this.settings.voice;
  }
  get modelName() {
    return this.settings.model;
  }
  async callAPI(G, c) {
    var d;
    const b = this.settings.api ?? new gI(), Z = (d = c.run) == null ? void 0 : d.abortSignal;
    return A({
      retry: b.retry,
      throttle: b.throttle,
      call: async () => k({
        url: b.assembleUrl("/audio/speech"),
        headers: b.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          input: G,
          voice: this.settings.voice,
          speed: this.settings.speed,
          model: this.settings.model,
          response_format: this.settings.responseFormat
        },
        failedResponseHandler: KI,
        successfulResponseHandler: sb(),
        abortSignal: Z
      })
    });
  }
  get settingsForEvent() {
    return {
      voice: this.settings.voice,
      speed: this.settings.speed,
      model: this.settings.model,
      responseFormat: this.settings.responseFormat
    };
  }
  doGenerateSpeechStandard(G, c) {
    return this.callAPI(G, c);
  }
  withSettings(G) {
    return new dZ({
      ...this.settings,
      ...G
    });
  }
}, pc = {
  "text-embedding-3-small": {
    contextWindowSize: 8192,
    dimensions: 1536
  },
  "text-embedding-3-large": {
    contextWindowSize: 8192,
    dimensions: 3072
  },
  "text-embedding-ada-002": {
    contextWindowSize: 8192,
    dimensions: 1536
  }
}, sN = W.object({
  object: W.literal("list"),
  data: W.array(
    W.object({
      object: W.literal("embedding"),
      embedding: W.array(W.number()),
      index: W.number()
    })
  ),
  model: W.string(),
  usage: W.object({
    prompt_tokens: W.number(),
    total_tokens: W.number()
  }).optional()
  // for openai-compatible models
}), DX = class WZ extends lZ {
  constructor(G) {
    super(G);
    a(this, "provider", "openai");
    a(this, "dimensions");
    a(this, "tokenizer");
    a(this, "contextWindowSize");
    this.tokenizer = new el({ model: this.modelName }), this.contextWindowSize = pc[this.modelName].contextWindowSize, this.dimensions = this.settings.dimensions ?? pc[this.modelName].dimensions;
  }
  get modelName() {
    return this.settings.model;
  }
  async countTokens(G) {
    return Wl(this.tokenizer, G);
  }
  get settingsForEvent() {
    return {};
  }
  withSettings(G) {
    return new WZ(
      Object.assign({}, this.settings, G)
    );
  }
};
function VZ(l) {
  switch (l.split(";")[0].toLowerCase()) {
    case "audio/webm":
      return "webm";
    case "audio/mp3":
      return "mp3";
    case "audio/wav":
      return "wav";
    case "audio/mp4":
      return "mp4";
    case "audio/mpeg":
    case "audio/mpga":
      return "mpeg";
    case "audio/ogg":
    case "audio/oga":
      return "ogg";
    case "audio/flac":
      return "flac";
    case "audio/m4a":
      return "m4a";
    default:
      throw new Error(`Unsupported audio format: ${l}`);
  }
}
var qX = class mZ extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "openai");
  }
  get modelName() {
    return this.settings.model;
  }
  async doTranscribe({
    audioData: G,
    mimeType: c
  }, b) {
    const Z = await this.callAPI(
      {
        fileExtension: VZ(c),
        audioData: kG(G)
      },
      b,
      { responseFormat: Ia.verboseJson }
    );
    return {
      rawResponse: Z,
      transcription: Z.text
    };
  }
  async callAPI(G, c, b) {
    var V;
    const Z = this.settings.api ?? new gI(), d = (V = c == null ? void 0 : c.run) == null ? void 0 : V.abortSignal;
    return A({
      retry: Z.retry,
      throttle: Z.throttle,
      call: async () => {
        const m = `audio.${G.fileExtension}`, X = new FormData();
        return X.append("file", new Blob([G.audioData]), m), X.append("model", this.settings.model), this.settings.prompt != null && X.append("prompt", this.settings.prompt), b.responseFormat != null && X.append("response_format", b.responseFormat.type), this.settings.temperature != null && X.append("temperature", this.settings.temperature.toString()), this.settings.language != null && X.append("language", this.settings.language), ql({
          url: Z.assembleUrl("/audio/transcriptions"),
          headers: Z.headers({
            functionType: c.functionType,
            functionId: c.functionId,
            run: c.run,
            callId: c.callId
          }),
          body: {
            content: X,
            values: {
              model: this.settings.model,
              prompt: this.settings.prompt,
              response_format: b.responseFormat,
              temperature: this.settings.temperature,
              language: this.settings.language
            }
          },
          failedResponseHandler: KI,
          successfulResponseHandler: b.responseFormat.handler,
          abortSignal: d
        });
      }
    });
  }
  get settingsForEvent() {
    return {
      language: this.settings.language,
      temperature: this.settings.temperature
    };
  }
  withSettings(G) {
    return new mZ(
      Object.assign({}, this.settings, G)
    );
  }
}, _X = W.object({
  text: W.string()
}), $X = W.object({
  task: W.literal("transcribe"),
  language: W.string(),
  duration: W.number(),
  segments: W.array(
    W.object({
      id: W.number(),
      seek: W.number(),
      start: W.number(),
      end: W.number(),
      text: W.string(),
      tokens: W.array(W.number()),
      temperature: W.number(),
      avg_logprob: W.number(),
      compression_ratio: W.number(),
      no_speech_prob: W.number(),
      transient: W.boolean().optional()
    })
  ),
  text: W.string()
}), Ia = {
  json: {
    type: "json",
    handler: U(
      s(_X)
    )
  },
  verboseJson: {
    type: "verbose_json",
    handler: U(
      s($X)
    )
  },
  text: {
    type: "text",
    handler: GG()
  },
  srt: {
    type: "srt",
    handler: GG()
  },
  vtt: {
    type: "vtt",
    handler: GG()
  }
};
function la(l) {
  return new gI(l);
}
function Ga(l) {
  return new AX(l);
}
function ca(l) {
  return new TX(l);
}
function ba(l) {
  return new BX(l);
}
function Za(l) {
  return new DX(l);
}
function da(l) {
  return new OX(l);
}
function Wa(l) {
  return new qX(l);
}
function Va(l) {
  return new jX(l);
}
function ma(l) {
  return new el(l);
}
var Xa = class extends K {
  constructor(I = {}) {
    super({
      ...I,
      headers: {
        Authorization: `Bearer ${j({
          apiKey: I.apiKey,
          environmentVariableName: "FIREWORKS_API_KEY",
          description: "Fireworks AI"
        })}`
      },
      baseUrlDefaults: {
        protocol: "https",
        host: "api.fireworks.ai",
        port: "443",
        path: "/inference/v1"
      }
    });
    a(this, "provider", "openaicompatible-fireworksai");
  }
}, aa = class XZ extends qb {
  constructor(G) {
    super(G);
    a(this, "contextWindowSize");
    a(this, "tokenizer");
    a(this, "countPromptTokens");
  }
  get provider() {
    return this.settings.provider ?? this.settings.api.provider ?? "openaicompatible";
  }
  get modelName() {
    return this.settings.model;
  }
  get settingsForEvent() {
    const G = [
      ...cI,
      "functions",
      "functionCall",
      "temperature",
      "topP",
      "presencePenalty",
      "frequencyPenalty",
      "logitBias",
      "seed",
      "responseFormat"
    ];
    return Object.fromEntries(
      Object.entries(this.settings).filter(
        ([c]) => G.includes(c)
      )
    );
  }
  asObjectGenerationModel(G) {
    return "adaptModel" in G ? new q({
      model: G.adaptModel(this),
      template: G
    }) : new q({
      model: this,
      template: G
    });
  }
  withTextPrompt() {
    return this.withPromptTemplate(fG());
  }
  withInstructionPrompt() {
    return this.withPromptTemplate(OG());
  }
  withChatPrompt() {
    return this.withPromptTemplate(DG());
  }
  withPromptTemplate(G) {
    return new Xb({
      model: this.withSettings({
        stopSequences: [
          ...this.settings.stopSequences ?? [],
          ...G.stopSequences
        ]
      }),
      promptTemplate: G
    });
  }
  withJsonOutput() {
    return this.withSettings({ responseFormat: { type: "json_object" } });
  }
  withSettings(G) {
    return new XZ(
      Object.assign({}, this.settings, G)
    );
  }
}, Na = class aZ extends $b {
  constructor(G) {
    super(G);
    a(this, "contextWindowSize");
    a(this, "tokenizer");
    a(this, "countPromptTokens");
  }
  get provider() {
    return this.settings.provider ?? this.settings.api.provider ?? "openaicompatible";
  }
  get modelName() {
    return this.settings.model;
  }
  get settingsForEvent() {
    const G = [
      ...cI,
      "suffix",
      "temperature",
      "topP",
      "logprobs",
      "echo",
      "presencePenalty",
      "frequencyPenalty",
      "bestOf",
      "logitBias",
      "seed"
    ];
    return Object.fromEntries(
      Object.entries(this.settings).filter(
        ([c]) => G.includes(c)
      )
    );
  }
  withTextPrompt() {
    return this.withPromptTemplate(nl());
  }
  withInstructionPrompt() {
    return this.withPromptTemplate(fl());
  }
  withChatPrompt(G) {
    return this.withPromptTemplate(Ol(G));
  }
  withPromptTemplate(G) {
    return new hI({
      model: this.withSettings({
        stopSequences: [
          ...this.settings.stopSequences ?? [],
          ...G.stopSequences
        ]
      }),
      promptTemplate: G
    });
  }
  withSettings(G) {
    return new aZ(
      Object.assign({}, this.settings, G)
    );
  }
}, Ra = {};
L(Ra, {
  ChatTextGenerator: () => pa,
  CompletionTextGenerator: () => sa,
  FireworksAIApi: () => ha,
  PerplexityApi: () => Fa,
  TextEmbedder: () => Qa,
  TogetherAIApi: () => Ya
});
var na = class NZ extends lZ {
  constructor(I) {
    super(I);
  }
  get provider() {
    return this.settings.provider ?? this.settings.api.provider ?? "openaicompatible";
  }
  get modelName() {
    return this.settings.model;
  }
  get dimensions() {
    return this.settings.dimensions;
  }
  get settingsForEvent() {
    return {
      dimensions: this.settings.dimensions
    };
  }
  withSettings(I) {
    return new NZ(
      Object.assign({}, this.settings, I)
    );
  }
}, ta = class extends K {
  constructor(I = {}) {
    super({
      ...I,
      headers: {
        Authorization: `Bearer ${j({
          apiKey: I.apiKey,
          environmentVariableName: "PERPLEXITY_API_KEY",
          description: "Perplexity"
        })}`
      },
      baseUrlDefaults: {
        protocol: "https",
        host: "api.perplexity.ai",
        port: "443",
        path: ""
      }
    });
    a(this, "provider", "openaicompatible-perplexity");
  }
}, ea = class extends K {
  constructor(I = {}) {
    super({
      ...I,
      headers: {
        Authorization: `Bearer ${j({
          apiKey: I.apiKey,
          environmentVariableName: "TOGETHER_API_KEY",
          description: "Together AI"
        })}`
      },
      baseUrlDefaults: {
        protocol: "https",
        host: "api.together.xyz",
        port: "443",
        path: "/v1"
      }
    });
    a(this, "provider", "openaicompatible-togetherai");
  }
};
function ha(l = {}) {
  return new Xa(l);
}
function Fa(l = {}) {
  return new ta(l);
}
function Ya(l = {}) {
  return new ea(l);
}
function sa(l) {
  return new Na(l);
}
function pa(l) {
  return new aa(l);
}
function Qa(l) {
  return new na(l);
}
var RZ = class extends K {
  constructor(l = {}) {
    super({
      ...l,
      headers: l.headers ?? {
        Authorization: `Bearer ${j({
          apiKey: l.apiKey,
          environmentVariableName: "STABILITY_API_KEY",
          description: "Stability"
        })}`
      },
      baseUrlDefaults: {
        protocol: "https",
        host: "api.stability.ai",
        port: "443",
        path: "/v1"
      }
    });
  }
}, Ha = W.object({
  message: W.string()
}), Ja = FI({
  errorSchema: s(Ha),
  errorToMessage: (l) => l.message
}), ua = {};
L(ua, {
  Api: () => Ea,
  ImageGenerator: () => oa
});
function va() {
  return {
    format: (l) => [{ text: l }]
  };
}
var ya = class nZ extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "stability");
  }
  get modelName() {
    return this.settings.model;
  }
  async callAPI(G, c) {
    var d, V, m;
    const b = this.settings.api ?? new RZ(), Z = (d = c.run) == null ? void 0 : d.abortSignal;
    return A({
      retry: (V = this.settings.api) == null ? void 0 : V.retry,
      throttle: (m = this.settings.api) == null ? void 0 : m.throttle,
      call: async () => k({
        url: b.assembleUrl(
          `/generation/${this.settings.model}/text-to-image`
        ),
        headers: b.headers({
          functionType: c.functionType,
          functionId: c.functionId,
          run: c.run,
          callId: c.callId
        }),
        body: {
          height: this.settings.height,
          width: this.settings.width,
          text_prompts: G,
          cfg_scale: this.settings.cfgScale,
          clip_guidance_preset: this.settings.clipGuidancePreset,
          sampler: this.settings.sampler,
          samples: this.settings.numberOfGenerations,
          seed: this.settings.seed,
          steps: this.settings.steps,
          style_preset: this.settings.stylePreset
        },
        failedResponseHandler: Ja,
        successfulResponseHandler: U(
          s(wa)
        ),
        abortSignal: Z
      })
    });
  }
  get settingsForEvent() {
    return {
      numberOfGenerations: this.settings.numberOfGenerations,
      height: this.settings.height,
      width: this.settings.width,
      cfgScale: this.settings.cfgScale,
      clipGuidancePreset: this.settings.clipGuidancePreset,
      sampler: this.settings.sampler,
      seed: this.settings.seed,
      steps: this.settings.steps,
      stylePreset: this.settings.stylePreset
    };
  }
  async doGenerateImages(G, c) {
    const b = await this.callAPI(G, c);
    return {
      rawResponse: b,
      base64Images: b.artifacts.map((Z) => Z.base64)
    };
  }
  withTextPrompt() {
    return this.withPromptTemplate(va());
  }
  withPromptTemplate(G) {
    return new QG({
      model: this,
      promptTemplate: G
    });
  }
  withSettings(G) {
    return new nZ(
      Object.assign({}, this.settings, G)
    );
  }
}, wa = W.object({
  artifacts: W.array(
    W.object({
      base64: W.string(),
      seed: W.number(),
      finishReason: W.enum(["SUCCESS", "ERROR", "CONTENT_FILTERED"])
    })
  )
});
function Ea(l) {
  return new RZ(l);
}
function oa(l) {
  return new ya(l);
}
var tZ = class extends K {
  constructor(l = {}) {
    super({
      ...l,
      baseUrlDefaults: {
        protocol: "http",
        host: "127.0.0.1",
        port: "8080",
        path: ""
      }
    });
  }
}, ga = {};
L(ga, {
  Api: () => Ua,
  Transcriber: () => ka
});
var La = class eZ extends x {
  constructor(G) {
    super({ settings: G });
    a(this, "provider", "whispercpp");
    a(this, "modelName", null);
  }
  async doTranscribe({
    audioData: G,
    mimeType: c
  }, b) {
    const Z = await this.callAPI(
      {
        fileExtension: VZ(c),
        audioData: kG(G)
      },
      b
    );
    return {
      rawResponse: Z,
      transcription: Z.text
    };
  }
  async callAPI(G, c) {
    var V;
    const { temperature: b } = this.settings, Z = this.settings.api ?? new tZ(), d = (V = c.run) == null ? void 0 : V.abortSignal;
    return A({
      retry: Z.retry,
      throttle: Z.throttle,
      call: async () => {
        const m = new FormData();
        return m.append(
          "file",
          new Blob([G.audioData]),
          `audio.${G.fileExtension}`
        ), m.append("response_format", "json"), b != null && m.append("temperature", b.toString()), ql({
          url: Z.assembleUrl("/inference"),
          headers: Z.headers({
            functionType: c.functionType,
            functionId: c.functionId,
            run: c.run,
            callId: c.callId
          }),
          body: {
            content: m,
            values: { temperature: b }
          },
          failedResponseHandler: ia,
          successfulResponseHandler: ra,
          abortSignal: d
        });
      }
    });
  }
  get settingsForEvent() {
    return {
      temperature: this.settings.temperature
    };
  }
  withSettings(G) {
    return new eZ(
      Object.assign({}, this.settings, G)
    );
  }
}, Aa = W.union([
  W.object({ text: W.string() }),
  W.object({ error: W.string() })
]), ra = async ({ response: l, url: I, requestBodyValues: G }) => {
  const c = await l.text(), b = TI({
    text: c,
    schema: s(Aa)
  });
  if (!b.success)
    throw new z({
      message: "Invalid JSON response",
      cause: b.error,
      statusCode: l.status,
      responseBody: c,
      url: I,
      requestBodyValues: G
    });
  if ("error" in b.value)
    throw new z({
      message: b.value.error,
      statusCode: l.status,
      responseBody: c,
      url: I,
      requestBodyValues: G
    });
  return {
    text: b.value.text.trim()
  };
}, ia = async ({
  response: l,
  url: I,
  requestBodyValues: G
}) => {
  const c = await l.text();
  return new z({
    message: c,
    url: I,
    requestBodyValues: G,
    statusCode: l.status,
    responseBody: c
  });
};
function Ua(l) {
  return new tZ(l);
}
function ka(l = {}) {
  return new La(l);
}
var pN = class extends Oc {
  constructor({
    baseUrl: l = "https://oai.hconeai.com/v1",
    openAIApiKey: I,
    heliconeApiKey: G,
    retry: c,
    throttle: b,
    customCallHeaders: Z
  } = {}) {
    super({
      baseUrl: l,
      headers: {
        Authorization: `Bearer ${j({
          apiKey: I,
          environmentVariableName: "OPENAI_API_KEY",
          apiKeyParameterName: "openAIApiKey",
          description: "OpenAI"
        })}`,
        "Helicone-Auth": `Bearer ${j({
          apiKey: G,
          environmentVariableName: "HELICONE_API_KEY",
          apiKeyParameterName: "heliconeApiKey",
          description: "Helicone"
        })}`
      },
      retry: c,
      throttle: b,
      customCallHeaders: Z
    });
  }
};
async function QN(l, I, G) {
  return Rl({
    options: G,
    input: I,
    functionType: "retrieve",
    execute: (c) => l.retrieve(I, c),
    inputPropertyName: "query",
    outputPropertyName: "results"
  });
}
function HN({
  separator: l
}) {
  return async ({ text: I }) => I.split(l);
}
function kl({
  maxChunkSize: l,
  segments: I
}) {
  if (I.length < l)
    return Array.isArray(I) ? [I.join("")] : [I];
  const G = Math.ceil(I.length / 2), c = I.slice(0, G), b = I.slice(G);
  return [
    ...kl({
      segments: c,
      maxChunkSize: l
    }),
    ...kl({
      segments: b,
      maxChunkSize: l
    })
  ];
}
var JN = ({
  maxCharactersPerChunk: l
}) => async ({ text: I }) => kl({
  maxChunkSize: l,
  segments: I
}), uN = ({
  tokenizer: l,
  maxTokensPerChunk: I
}) => async ({ text: G }) => kl({
  maxChunkSize: I,
  segments: (await l.tokenizeWithTexts(G)).tokenTexts
});
async function vN(l, I) {
  return (await Promise.all(
    I.map((c) => xa(l, c))
  )).flat();
}
async function xa(l, I) {
  return (await l(I)).map((c) => ({
    ...I,
    text: c
  }));
}
var za = class extends Error {
  constructor({
    toolName: I,
    parameters: G
  }) {
    super(
      `Tool definition '${I}' not found. Parameters: ${JSON.stringify(G)}.`
    );
    a(this, "toolName");
    a(this, "cause");
    a(this, "parameters");
    this.name = "NoSuchToolDefinitionError", this.toolName = I, this.parameters = G;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      toolName: this.toolName,
      parameter: this.parameters
    };
  }
}, hZ = class {
  constructor({
    name: l,
    description: I,
    parameters: G,
    returnType: c,
    execute: b
  }) {
    /**
     * The name of the tool.
     * Should be understandable for language models and unique among the tools that they know.
     */
    a(this, "name");
    /**
     * A optional description of what the tool does. Will be used by the language model to decide whether to use the tool.
     */
    a(this, "description");
    /**
     * The schema of the input that the tool expects. The language model will use this to generate the input.
     * Use descriptions to make the input understandable for the language model.
     */
    a(this, "parameters");
    /**
     * An optional schema of the output that the tool produces. This will be used to validate the output.
     */
    a(this, "returnType");
    /**
     * The actual execution function of the tool.
     */
    a(this, "execute");
    this.name = l, this.description = I, this.parameters = G, this.returnType = c, this.execute = b;
  }
}, yN = class extends hZ {
  constructor({
    name: l = "object-generator",
    // eslint-disable-line @typescript-eslint/no-explicit-any
    description: I,
    model: G,
    parameters: c,
    objectSchema: b,
    prompt: Z
  }) {
    super({
      name: l,
      description: I,
      parameters: c,
      execute: async (d, V) => _W({
        model: G,
        schema: b,
        prompt: Z(d),
        ...V
      })
    });
  }
}, FG = class extends Error {
  constructor({
    toolName: I,
    args: G,
    cause: c
  }) {
    super(
      `Argument validation failed for tool '${I}'.
Arguments: ${JSON.stringify(G)}.
Error message: ${_(c)}`
    );
    a(this, "toolName");
    a(this, "cause");
    a(this, "args");
    this.name = "ToolCallArgumentsValidationError", this.toolName = I, this.cause = c, this.args = G;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      toolName: this.toolName,
      args: this.args
    };
  }
}, FZ = class extends Error {
  constructor({
    cause: I,
    toolCall: G,
    message: c = _(I)
  }) {
    super(`Tool call for tool '${G.name}' failed: ${c}`);
    a(this, "toolCall");
    a(this, "cause");
    this.name = "ToolCallError", this.toolCall = G, this.cause = I;
  }
  toJSON() {
    return {
      name: this.name,
      cause: this.cause,
      message: this.message,
      stack: this.stack,
      toolCall: this.toolCall
    };
  }
}, dG = class extends Error {
  constructor({ toolName: I, cause: G }) {
    super(
      `Tool call generation failed for tool '${I}'. Error message: ${_(G)}`
    );
    a(this, "toolName");
    a(this, "cause");
    this.name = "ToolCallsGenerationError", this.toolName = I, this.cause = G;
  }
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      cause: this.cause,
      stack: this.stack,
      toolName: this.toolName
    };
  }
}, YZ = class extends Error {
  constructor({
    toolName: I,
    input: G,
    cause: c,
    message: b = _(c)
  }) {
    super(`Error executing tool '${I}': ${b}`);
    a(this, "toolName");
    a(this, "input");
    a(this, "cause");
    this.name = "ToolExecutionError", this.toolName = I, this.input = G, this.cause = c;
  }
  toJSON() {
    return {
      name: this.name,
      cause: this.cause,
      message: this.message,
      stack: this.stack,
      toolName: this.toolName,
      input: this.input
    };
  }
}, Ba = s(
  W.object({
    results: W.array(
      W.object({
        title: W.string(),
        link: W.string().url(),
        snippet: W.string()
      })
    )
  })
), Ca = (l) => (
  // same schema, but with description:
  s(
    W.object({
      query: W.string().describe(l)
    })
  )
), wN = class extends hZ {
  constructor({
    name: l,
    description: I,
    queryDescription: G = "Search query",
    execute: c
  }) {
    super({
      name: l,
      description: I,
      parameters: Ca(G),
      returnType: Ba,
      execute: c
    });
  }
};
async function Ma({
  tool: l,
  args: I,
  fullResponse: G,
  ...c
}) {
  const b = await Ta({ tool: l, args: I, ...c });
  return G ? b : b.output;
}
async function Ta({
  tool: l,
  args: I,
  ...G
}) {
  var N;
  const c = await Ml(G == null ? void 0 : G.run), b = new Xl({
    observers: [
      ...Cl((G == null ? void 0 : G.logging) ?? Nl()),
      ...al(),
      ...(c == null ? void 0 : c.functionObserver) != null ? [c.functionObserver] : [],
      ...(G == null ? void 0 : G.observers) ?? []
    ],
    errorHandler: c == null ? void 0 : c.errorHandler
  }), Z = Tl(), d = {
    functionType: "execute-tool",
    callId: `call-${EI()}`,
    parentCallId: G == null ? void 0 : G.callId,
    runId: c == null ? void 0 : c.runId,
    sessionId: c == null ? void 0 : c.sessionId,
    userId: c == null ? void 0 : c.userId,
    functionId: G == null ? void 0 : G.functionId,
    toolName: l.name,
    input: I
  };
  b.notify({
    ...d,
    eventType: "started",
    timestamp: Z.startDate,
    startTimestamp: Z.startDate
  });
  const V = await Zl(
    () => l.execute(I, {
      functionType: d.functionType,
      callId: d.callId,
      functionId: G == null ? void 0 : G.functionId,
      logging: G == null ? void 0 : G.logging,
      observers: G == null ? void 0 : G.observers,
      run: c
    })
  ), m = {
    ...d,
    eventType: "finished",
    timestamp: /* @__PURE__ */ new Date(),
    startTimestamp: Z.startDate,
    finishTimestamp: /* @__PURE__ */ new Date(),
    durationInMs: Z.durationInMs
  };
  if (!V.ok)
    throw V.isAborted ? (b.notify({
      ...m,
      result: {
        status: "abort"
      }
    }), new UI()) : (b.notify({
      ...m,
      result: {
        status: "error",
        error: V.error
      }
    }), new YZ({
      toolName: l.name,
      input: I,
      cause: V.error,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (N = V.error) == null ? void 0 : N.message
    }));
  const X = V.value;
  return b.notify({
    ...m,
    result: {
      status: "success",
      value: X
    }
  }), {
    output: X,
    metadata: m
  };
}
async function Ka({
  model: l,
  tool: I,
  prompt: G,
  fullResponse: c,
  ...b
}) {
  const Z = typeof G == "function" ? G(I) : G, d = await GI({
    functionType: "generate-tool-call",
    input: Z,
    model: l,
    options: b,
    generateResponse: async (V) => {
      try {
        const m = await l.doGenerateToolCall(
          I,
          Z,
          V
        ), X = m.toolCall;
        if (X === null)
          throw new dG({
            toolName: I.name,
            cause: "No tool call generated."
          });
        const N = I.parameters.validate(X.args);
        if (!N.success)
          throw new FG({
            toolName: I.name,
            args: X.args,
            cause: N.error
          });
        return {
          rawResponse: m.rawResponse,
          extractedValue: {
            id: X.id,
            name: I.name,
            args: N.value
          },
          usage: m.usage
        };
      } catch (m) {
        throw m instanceof FG || m instanceof dG ? m : new dG({
          toolName: I.name,
          cause: m
        });
      }
    }
  });
  return c ? {
    toolCall: d.value,
    rawResponse: d.rawResponse,
    metadata: d.metadata
  } : d.value;
}
var ja = (l) => [
  `You are calling the function "${l.name}".`,
  l.description != null ? `Function description: ${l.description}` : null,
  `Function parameters JSON schema: ${JSON.stringify(
    l.parameters.getJsonSchema()
  )}`,
  "",
  "You MUST answer with a JSON object that matches the JSON schema above."
].filter(Boolean).join(`
`), EN = {
  text({
    toolPrompt: l
  } = {}) {
    return {
      createPrompt(I, G) {
        return {
          system: Qc({ tool: G, toolPrompt: l }),
          instruction: I
        };
      },
      extractToolCall: Hc,
      withJsonOutput: ({ model: I, schema: G }) => I.withJsonOutput(G)
    };
  },
  instruction({
    toolPrompt: l
  } = {}) {
    return {
      createPrompt(I, G) {
        return {
          system: Qc({
            originalSystemPrompt: I.system,
            tool: G,
            toolPrompt: l
          }),
          instruction: I.instruction
        };
      },
      extractToolCall: Hc,
      withJsonOutput: ({ model: I, schema: G }) => I.withJsonOutput(G)
    };
  }
};
function Qc({
  originalSystemPrompt: l,
  toolPrompt: I = ja,
  tool: G
}) {
  return [
    l,
    l != null ? "" : null,
    I(G)
  ].filter(Boolean).join(`
`);
}
function Hc(l) {
  return { id: EI(), args: eI({ text: l }) };
}
async function Sa({
  model: l,
  tools: I,
  prompt: G,
  fullResponse: c,
  ...b
}) {
  const Z = typeof G == "function" ? G(I) : G, d = await GI({
    functionType: "generate-tool-calls",
    input: Z,
    model: l,
    options: b,
    generateResponse: async (V) => {
      const m = await l.doGenerateToolCalls(
        I,
        Z,
        V
      ), { text: X, toolCalls: N } = m;
      if (N == null)
        return {
          rawResponse: m.rawResponse,
          extractedValue: { text: X, toolCalls: null },
          usage: m.usage
        };
      const t = N.map((p) => {
        const F = I.find((v) => v.name === p.name);
        if (F == null)
          throw new za({
            toolName: p.name,
            parameters: p.args
          });
        const H = F.parameters.validate(p.args);
        if (!H.success)
          throw new FG({
            toolName: F.name,
            args: p.args,
            cause: H.error
          });
        return {
          id: p.id,
          name: F.name,
          args: H.value
        };
      });
      return {
        rawResponse: m.rawResponse,
        extractedValue: {
          text: X,
          toolCalls: t
        },
        usage: m.usage
      };
    }
  });
  return c ? d : d.value;
}
async function sZ(l, I, G) {
  try {
    return {
      tool: I.name,
      toolCall: I,
      args: I.args,
      ok: !0,
      result: await Ma({ tool: l, args: I.args, ...G })
    };
  } catch (c) {
    if (c instanceof Error && c.name === "AbortError")
      throw c;
    return {
      tool: I.name,
      toolCall: I,
      args: I.args,
      ok: !1,
      result: new FZ({
        toolCall: I,
        cause: c instanceof YZ ? c.cause : c
      })
    };
  }
}
async function oN({
  model: l,
  tool: I,
  prompt: G,
  ...c
}) {
  const b = typeof G == "function" ? G(I) : G;
  return Rl({
    options: c,
    input: b,
    functionType: "run-tool",
    execute: async (Z) => sZ(
      I,
      await Ka({ model: l, tool: I, prompt: b, ...Z }),
      Z
    )
  });
}
async function gN({
  model: l,
  tools: I,
  prompt: G,
  ...c
}) {
  const b = typeof G == "function" ? G(I) : G;
  return Rl({
    options: c,
    input: b,
    functionType: "run-tools",
    execute: async (Z) => {
      const d = await Sa({
        model: l,
        tools: I,
        prompt: b,
        fullResponse: !1,
        ...Z
      }), { toolCalls: V, text: m } = d;
      if (V == null)
        return { text: m, toolResults: null };
      const X = await Promise.all(
        V.map(async (N) => {
          const t = I.find((p) => p.name === N.name);
          return t == null ? {
            tool: N.name,
            toolCall: N,
            args: N.args,
            ok: !1,
            result: new FZ({
              message: `No tool with name '${N.name}' found.`,
              toolCall: N
            })
          } : await sZ(
            t,
            N,
            Z
          );
        })
      );
      return {
        text: m,
        toolResults: X
      };
    }
  });
}
var Pa = new TextEncoder();
function LN(l) {
  return new ReadableStream({
    async start(I) {
      try {
        for await (const G of l)
          I.enqueue(
            Pa.encode(`data: ${JSON.stringify(G)}

`)
          );
      } finally {
        I.close();
      }
    }
  });
}
var AN = class pZ {
  constructor({
    vectorIndex: I,
    embeddingModel: G,
    maxResults: c,
    similarityThreshold: b,
    filter: Z
  }) {
    a(this, "vectorIndex");
    a(this, "embeddingModel");
    a(this, "settings");
    this.vectorIndex = I, this.embeddingModel = G, this.settings = {
      maxResults: c,
      similarityThreshold: b,
      filter: Z
    };
  }
  async retrieve(I, G) {
    var Z;
    const c = await lb({
      model: this.embeddingModel,
      value: I,
      ...G
    });
    return (await this.vectorIndex.queryByVector({
      queryVector: c,
      maxResults: this.settings.maxResults ?? 1,
      similarityThreshold: this.settings.similarityThreshold,
      filter: (Z = this.settings) == null ? void 0 : Z.filter
    })).map((d) => d.data);
  }
  withSettings(I) {
    return new pZ(
      Object.assign({}, this.settings, I, {
        vectorIndex: this.vectorIndex,
        embeddingModel: this.embeddingModel
      })
    );
  }
}, fa = s(
  W.array(
    W.object({
      id: W.string(),
      vector: W.array(W.number()),
      data: W.unknown()
    })
  )
), rN = class QZ {
  constructor() {
    a(this, "entries", /* @__PURE__ */ new Map());
  }
  static async deserialize({
    serializedData: I,
    schema: G
  }) {
    const c = eI({ text: I, schema: fa });
    if (G != null)
      for (const Z of c) {
        const d = G.validate(Z.data);
        if (!d.success)
          throw d.error;
      }
    const b = new QZ();
    return b.upsertMany(
      c
    ), b;
  }
  async upsertMany(I) {
    for (const G of I)
      this.entries.set(G.id, G);
  }
  async queryByVector({
    queryVector: I,
    similarityThreshold: G,
    maxResults: c,
    filter: b
  }) {
    const Z = [...this.entries.values()].filter((d) => (b == null ? void 0 : b(d.data)) ?? !0).map((d) => ({
      id: d.id,
      similarity: _c(d.vector, I),
      data: d.data
    })).filter(
      (d) => G == null || d.similarity == null || d.similarity > G
    );
    return Z.sort((d, V) => V.similarity - d.similarity), Z.slice(0, c);
  }
  serialize() {
    return JSON.stringify([...this.entries.values()]);
  }
  asIndex() {
    return this;
  }
};
async function iN({
  vectorIndex: l,
  embeddingModel: I,
  generateId: G = EI,
  objects: c,
  getValueToEmbed: b,
  getId: Z
}, d) {
  return Rl({
    options: d,
    input: c,
    functionType: "upsert-into-vector-index",
    inputPropertyName: "objects",
    execute: async (V) => {
      const m = await Ib({
        model: I,
        values: c.map(b),
        ...V
      });
      await l.upsertMany(
        c.map((X, N) => ({
          id: (Z == null ? void 0 : Z(X, N)) ?? G(),
          vector: m[N],
          data: X
        }))
      );
    }
  });
}
const Oa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var Da = function() {
  throw new Error(
    "ws does not work in the browser. Browser clients must use the native WebSocket object"
  );
};
const qa = /* @__PURE__ */ ic(Da), _a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: qa
}, Symbol.toStringTag, { value: "Module" }));
export {
  UI as AbortError,
  qb as AbstractOpenAIChatModel,
  $b as AbstractOpenAICompletionModel,
  lZ as AbstractOpenAITextEmbeddingModel,
  wG as AlpacaPrompt,
  z as ApiCallError,
  oI as AsyncQueue,
  Fb as Automatic1111ApiConfiguration,
  LV as Automatic1111ImageGenerationModel,
  AX as AzureOpenAIApiConfiguration,
  Oc as BaseUrlApiConfiguration,
  K as BaseUrlApiConfigurationWithDefaults,
  ZG as CHAT_MODEL_CONTEXT_WINDOW_SIZES,
  mc as COHERE_TEXT_EMBEDDING_MODELS,
  KV as COHERE_TEXT_GENERATION_MODELS,
  EG as ChatMLPrompt,
  nN as ChatMessage,
  Vl as CohereApiConfiguration,
  BV as CohereTextEmbeddingModel,
  jV as CohereTextGenerationModel,
  Xc as CohereTextGenerationResponseFormat,
  xG as CohereTokenizer,
  IN as DefaultRun,
  eG as ElevenLabsApiConfiguration,
  $V as ElevenLabsSpeechModel,
  ZN as EmbeddingSimilarityClassifier,
  Xa as FireworksAIApiConfiguration,
  Xl as FunctionEventSource,
  pN as HeliconeOpenAIApiConfiguration,
  CG as HuggingFaceApiConfiguration,
  dm as HuggingFaceTextEmbeddingModel,
  Vm as HuggingFaceTextGenerationModel,
  B as InvalidPromptError,
  gl as JSONParseError,
  oG as Llama2Prompt,
  tl as LlamaCppApiConfiguration,
  om as LlamaCppCompletionModel,
  ec as LlamaCppCompletionResponseFormat,
  rm as LlamaCppTextEmbeddingModel,
  TG as LlamaCppTokenizer,
  kb as LmntApiConfiguration,
  Km as LmntSpeechModel,
  lN as MemoryCache,
  rN as MemoryVectorIndex,
  jG as MistralApiConfiguration,
  $m as MistralChatModel,
  hc as MistralChatResponseFormat,
  gG as MistralInstructPrompt,
  GX as MistralTextEmbeddingModel,
  LG as NeuralChatPrompt,
  za as NoSuchToolDefinitionError,
  bG as OPENAI_CHAT_MESSAGE_BASE_TOKEN_COUNT,
  kX as OPENAI_CHAT_PROMPT_BASE_TOKEN_COUNT,
  pc as OPENAI_TEXT_EMBEDDING_MODELS,
  CX as OPENAI_TEXT_GENERATION_MODELS,
  bb as ObjectFromTextGenerationModel,
  q as ObjectFromTextStreamingModel,
  yN as ObjectGeneratorTool,
  cb as ObjectParseError,
  aN as ObjectStreamFromResponse,
  XN as ObjectStreamResponse,
  qW as ObjectValidationError,
  _l as OllamaApiConfiguration,
  aX as OllamaChatModel,
  Fc as OllamaChatResponseFormat,
  sX as OllamaCompletionModel,
  Yc as OllamaCompletionResponseFormat,
  HX as OllamaTextEmbeddingModel,
  gI as OpenAIApiConfiguration,
  uI as OpenAIChatMessage,
  BX as OpenAIChatModel,
  rI as OpenAIChatResponseFormat,
  aa as OpenAICompatibleChatModel,
  Na as OpenAICompatibleCompletionModel,
  na as OpenAICompatibleTextEmbeddingModel,
  TX as OpenAICompletionModel,
  jX as OpenAIImageGenerationModel,
  fX as OpenAIImageGenerationResponseFormat,
  OX as OpenAISpeechModel,
  DX as OpenAITextEmbeddingModel,
  sc as OpenAITextResponseFormat,
  qX as OpenAITranscriptionModel,
  Ia as OpenAITranscriptionResponseFormat,
  ta as PerplexityApiConfiguration,
  Xb as PromptTemplateFullTextModel,
  QG as PromptTemplateImageGenerationModel,
  mb as PromptTemplateTextGenerationModel,
  hI as PromptTemplateTextStreamingModel,
  bc as RetryError,
  RZ as StabilityApiConfiguration,
  ya as StabilityImageGenerationModel,
  AG as SynthiaPrompt,
  vG as TextGenerationToolCallModel,
  yG as TextGenerationToolCallsModel,
  rG as TextPrompt,
  el as TikTokenTokenizer,
  ea as TogetherAIApiConfiguration,
  hZ as Tool,
  FG as ToolCallArgumentsValidationError,
  FZ as ToolCallError,
  dG as ToolCallGenerationError,
  lV as ToolCallParseError,
  GV as ToolCallsParseError,
  YZ as ToolExecutionError,
  QI as TypeValidationError,
  TW as UncheckedSchema,
  AN as VectorIndexRetriever,
  iG as VicunaPrompt,
  wN as WebSearchTool,
  tZ as WhisperCppApiConfiguration,
  La as WhisperCppTranscriptionModel,
  KW as ZodSchema,
  gW as api,
  oV as automatic1111,
  dN as classify,
  kV as cohere,
  Dl as convertDataContentToBase64String,
  kG as convertDataContentToUint8Array,
  _c as cosineSimilarity,
  xX as countOpenAIChatMessageTokens,
  zX as countOpenAIChatPromptTokens,
  Wl as countTokens,
  tN as createChatPrompt,
  LN as createEventSourceStream,
  eN as createInstructionPrompt,
  hN as createTextPrompt,
  LW as delay,
  qV as elevenlabs,
  lb as embed,
  Ib as embedMany,
  cN as executeFunction,
  Ma as executeTool,
  WN as generateImage,
  _W as generateObject,
  VN as generateSpeech,
  JG as generateText,
  Ka as generateToolCall,
  Sa as generateToolCalls,
  YN as generateTranscription,
  VZ as getAudioFileExtension,
  GZ as getOpenAIChatModelInformation,
  MX as getOpenAICompletionModelInformation,
  Ml as getRun,
  Zm as huggingface,
  pG as isPromptFunction,
  NN as jsonObjectPrompt,
  EN as jsonToolCallPrompt,
  Am as llamacpp,
  Tm as lmnt,
  gV as mapBasicPromptToAutomatic1111Format,
  va as mapBasicPromptToStabilityFormat,
  sG as markAsPromptFunction,
  lX as mistral,
  wW as modelfusion,
  QX as ollama,
  sN as openAITextEmbeddingResponseSchema,
  KX as openai,
  Ra as openaicompatible,
  eI as parseJSON,
  QN as retrieve,
  jc as retryNever,
  AW as retryWithExponentialBackoff,
  oN as runTool,
  gN as runTools,
  TI as safeParseJSON,
  jW as safeValidateTypes,
  JN as splitAtCharacter,
  uN as splitAtToken,
  HN as splitOnSeparator,
  xa as splitTextChunk,
  vN as splitTextChunks,
  ua as stability,
  RN as streamObject,
  mN as streamSpeech,
  fW as streamText,
  cI as textGenerationModelProperties,
  iW as throttleMaxConcurrency,
  Pc as throttleOff,
  FN as trimChatPrompt,
  bN as uncheckedSchema,
  iN as upsertIntoVectorIndex,
  g as validateContentIsString,
  VI as validateTypes,
  ga as whispercpp,
  GN as withRun,
  s as zodSchema
};