<?php

use Kirby\Cms\App;
use Kirby\Cms\Site;
use Kirby\Exception\Exception;
use Kirby\Panel\Panel;

return [
    'content' => [
        'locking' => false
    ],

    'panel' => [
        'css' => 'assets/panel.css',
        'js' => 'assets/panel.js',
        'frameAncestors' => ['https://try.kirbycopilot.com']
    ],

    'hooks' => [
        'site.update:before' => function (Site $site, array $values, array $strings) {
            throw new Exception('You cannot save changes to the playground content, you can only make local changes as a preview.');
        },

        'system.loadPlugins:after' => function () {
            $kirby = App::instance();

            $kirby->extend([
                'fields' => [
                    'apiKey' => [
                        'extends' => 'text'
                    ]
                ],
                'routes' => fn (App $kirby) => [
                    [
                        'pattern' => '(:all)',
                        'action' => function () use ($kirby) {
                            go(Panel::url($kirby->user() === null ? 'login' : 'site'));
                        }
                    ]
                ],
                'areas' => [
                    'login' => function (App $kirby) {
                        return [
                            'views' => [
                                // Auto-login for the playground
                                'login' => [
                                    'pattern' => 'login',
                                    'auth' => false,
                                    'action' => function () use ($kirby) {
                                        if ($kirby->user() === null) {
                                            $system = $kirby->system();
                                            $role = $system->isLocal() ? 'admin' : 'playground';
                                            $kirby->users()->role($role)->first()->loginPasswordless();
                                        }

                                        go(Panel::url('site'));
                                    }
                                ]
                            ]
                        ];
                    }
                ]
            ], $kirby->plugin('johannschopplich/copilot'));
        }
    ],

    'johannschopplich.copilot' => [
        'providers' => [
            'openai' => [
                'model' => [
                    'default' => 'gpt-4-1106-preview',
                    'vision' => 'gpt-4-vision-preview'
                ],
                'apiKey' => env('OPENAI_API_KEY', 'YOUR_API_KEY')
            ]
        ]
    ]
];
