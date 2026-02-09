<?php

return [
    'validation' => [
        'fqdn_not_resolvable' => '提供的 FQDN 或 IP 地址无法解析为有效的 IP 地址。',
        'fqdn_required_for_ssl' => '要为此节点使用 SSL，需要一个能解析为公共 IP 地址的完全限定域名。',
    ],
    'notices' => [
        'allocations_added' => '分配已成功添加到此节点。',
        'node_deleted' => '节点已成功从面板中删除。',
        'location_required' => '在向此面板添加节点之前，您必须至少配置一个位置。',
        'node_created' => '新节点创建成功。您可以通过访问"配置"选项卡自动配置此机器上的守护进程。<strong>在添加任何服务器之前，您必须首先分配至少一个 IP 地址和端口。</strong>',
        'node_updated' => '节点信息已更新。如果更改了任何守护进程设置，您需要重新启动它才能使这些更改生效。',
        'unallocated_deleted' => '已删除 <code>:ip</code> 的所有未分配端口。',
    ],
];
