<?php

return [
    'exceptions' => [
        'no_new_default_allocation' => 'Du försöker ta bort standardallokeringen för denna server men det finns ingen reservallokering att använda.',
        'marked_as_failed' => 'Denna server markerades som misslyckad vid en tidigare installation. Nuvarande status kan inte växlas i detta tillstånd.',
        'bad_variable' => 'Det uppstod ett valideringsfel med variabeln :name.',
        'daemon_exception' => 'Ett undantag uppstod när systemet försökte kommunicera med daemonen vilket resulterade i en HTTP/:code svarskod. Detta undantag har loggats. (förfrågnings-id: :request_id)',
        'default_allocation_not_found' => 'Den begärda standardallokeringen hittades inte i denna servers allokeringar.',
    ],
    'alerts' => [
        'startup_changed' => 'Startkonfigurationen för denna server har uppdaterats. Om denna servers näste eller ägg ändrades kommer en ominstallation att ske nu.',
        'server_deleted' => 'Servern har tagits bort framgångsrikt från systemet.',
        'server_created' => 'Servern skapades framgångsrikt i panelen. Vänligen ge daemonen några minuter att helt installera denna server.',
        'build_updated' => 'Byggdetaljerna för denna server har uppdaterats. Vissa ändringar kan kräva en omstart för att träda i kraft.',
        'suspension_toggled' => 'Serverns avstängningsstatus har ändrats till :status.',
        'rebuild_on_boot' => 'Denna server har markerats som att den kräver en Docker Container-återuppbyggnad. Detta kommer att ske nästa gång servern startas.',
        'install_toggled' => 'Installationsstatusen för denna server har växlats.',
        'server_reinstalled' => 'Denna server har köats för en ominstallation som börjar nu.',
        'details_updated' => 'Serverdetaljer har uppdaterats framgångsrikt.',
        'docker_image_updated' => 'Standard Docker-avbildningen för denna server har ändrats framgångsrikt. En omstart krävs för att tillämpa denna ändring.',
        'node_required' => 'Du måste ha minst en nod konfigurerad innan du kan lägga till en server i denna panel.',
        'transfer_nodes_required' => 'Du måste ha minst två noder konfigurerade innan du kan överföra servrar.',
        'transfer_started' => 'Serveröverföringen har startats.',
        'transfer_not_viable' => 'Noden du valde har inte tillräckligt med diskutrymme eller minne för att rymma denna server.',
    ],
];
