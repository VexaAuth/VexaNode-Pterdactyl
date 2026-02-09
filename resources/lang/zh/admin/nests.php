<?php

return [
    'notices' => [
        'created' => '新的巢穴 :name 已成功创建。',
        'deleted' => '已成功从面板中删除所请求的巢穴。',
        'updated' => '巢穴配置选项已成功更新。',
    ],
    'eggs' => [
        'notices' => [
            'imported' => '已成功导入此 Egg 及其相关变量。',
            'updated_via_import' => '此 Egg 已使用提供的文件进行更新。',
            'deleted' => '已成功从面板中删除所请求的 egg。',
            'updated' => 'Egg 配置已成功更新。',
            'script_updated' => 'Egg 安装脚本已更新，将在服务器安装时运行。',
            'egg_created' => '新的 egg 已成功创建。您需要重新启动任何正在运行的守护进程才能应用此新 egg。',
        ],
    ],
    'variables' => [
        'notices' => [
            'variable_deleted' => '变量 ":variable" 已被删除，重建后将不再对服务器可用。',
            'variable_updated' => '变量 ":variable" 已更新。您需要重建使用此变量的任何服务器才能应用更改。',
            'variable_created' => '新变量已成功创建并分配给此 egg。',
        ],
    ],
];
