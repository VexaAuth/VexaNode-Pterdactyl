<?php

return [
    'validation' => [
        'fqdn_not_resolvable' => 'Le FQDN ou l\'adresse IP fourni ne résout pas en une adresse IP valide.',
        'fqdn_required_for_ssl' => 'Un nom de domaine complet qui résout une adresse IP publique est nécessaire pour utiliser SSL pour ce noeud.',
    ],
    'notices' => [
        'allocations_added' => 'Les allocations ont été ajoutées avec succès à ce noeud.',
        'node_deleted' => 'Le noeud a été supprimé du panneau.',
        'location_required' => 'Vous devez avoir configuré au moins un emplacement avant de pouvoir ajouter un noeud au panel.',
        'node_created' => 'Nouveau noeud créé avec succès. Vous pouvez configurer automatiquement le daemon sur cette machine en vous rendant dans l\'onglet \'Configuration\'. <strong>Avant de pouvoir ajouter des serveurs, vous devez d\'abord attribuer au moins une adresse IP et un port. </strong>',
        'node_updated' => 'Les informations relatives aux noeuds ont été mises à jour. Si des paramètres du daemon ont été modifiés, vous devrez le redémarrer pour que ces modifications prennent effet.',
        'unallocated_deleted' => 'Suppression de tous les ports non attribués pour <code>:ip</code>.',
    ],
];
