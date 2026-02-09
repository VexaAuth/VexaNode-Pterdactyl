<?php

return [
    'validation' => [
        'fqdn_not_resolvable' => 'O FQDN ou endereço IP fornecido não resolve para um endereço IP válido.',
        'fqdn_required_for_ssl' => 'Um nome de domínio totalmente qualificado que resolve para um endereço IP público é necessário para usar SSL neste nó.',
    ],
    'notices' => [
        'allocations_added' => 'As alocações foram adicionadas com sucesso a este nó.',
        'node_deleted' => 'O nó foi removido com sucesso do painel.',
        'location_required' => 'Você deve ter pelo menos uma localização configurada antes de poder adicionar um nó a este painel.',
        'node_created' => 'Novo nó criado com sucesso. Você pode configurar automaticamente o daemon nesta máquina visitando a aba \'Configuração\'. <strong>Antes de poder adicionar quaisquer servidores, você deve primeiro alocar pelo menos um endereço IP e porta.</strong>',
        'node_updated' => 'As informações do nó foram atualizadas. Se quaisquer configurações do daemon foram alteradas, você precisará reiniciá-lo para que essas alterações entrem em vigor.',
        'unallocated_deleted' => 'Todas as portas não alocadas para <code>:ip</code> foram excluídas.',
    ],
];
