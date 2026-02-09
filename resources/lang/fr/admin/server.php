<?php

return [
    'exceptions' => [
        'no_new_default_allocation' => 'Vous essayez de supprimer l\'allocation par défaut pour ce serveur, mais il n\'y a pas d\'allocation de secours à utiliser.',
        'marked_as_failed' => 'Ce serveur a été marqué comme ayant échoué lors d\'une installation précédente. Le status actuel ne peut pas être modifié.',
        'bad_variable' => 'Une erreur de validation s\'est produite avec la variable :name.',
        'daemon_exception' => 'Une exception s\'est produite lors de la tentative de communication avec le daemon, entraînant un code de réponse HTTP/:code. Cette exception a été consignée. (ID de la requête : :request_id)',
        'default_allocation_not_found' => 'L\'allocation par défaut demandée n\'a pas été trouvée dans les allocations de ce serveur.',
    ],
    'alerts' => [
        'startup_changed' => 'La configuration de démarrage de ce serveur a été mise à jour. Si le nid ou l\'oeuf de ce serveur a été modifié, une réinstallation va maintenant avoir lieu.',
        'server_deleted' => 'Le serveur a été supprimé du système avec succès.',
        'server_created' => 'Le serveur a été créé avec succès sur le panneau. Veuillez patienter quelques minutes afin que le daemon puisse terminer l\'installation complète de ce serveur.',
        'build_updated' => 'Les détails de configuration de ce serveur ont été mis à jour. Certaines modifications peuvent nécessiter un redémarrage pour prendre effet.',
        'suspension_toggled' => 'Le statut de suspension du serveur a été modifié en :status.',
        'rebuild_on_boot' => 'Ce serveur a été marqué comme nécessitant une reconstruction du conteneur Docker. Cela se produira lors du prochain démarrage du serveur.',
        'install_toggled' => 'Le statut d\'installation de ce serveur a été modifié.',
        'server_reinstalled' => 'Ce serveur a été mis en file d\'attente pour une réinstallation qui commence dès maintenant.',
        'details_updated' => 'Les détails du serveur ont été mis à jour avec succès.',
        'docker_image_updated' => 'Modification réussie de l\'image Docker par défaut à utiliser pour ce serveur. Un redémarrage est nécessaire pour appliquer cette modification.',
        'node_required' => 'Vous devez avoir au moins un noeud configuré avant de pouvoir ajouter un serveur au panel.',
        'transfer_nodes_required' => 'Vous devez avoir au moins deux noeuds configurés avant de pouvoir transférer des serveurs.',
        'transfer_started' => 'Le transfert du serveur a commencé.',
        'transfer_not_viable' => 'Le noeud que vous avez sélectionné ne dispose pas de l\'espace disque ou de la mémoire requis pour accueillir ce serveur.',
    ],
];
