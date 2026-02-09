<?php

return [
    'validation' => [
        'fqdn_not_resolvable' => 'Det angivna FQDN eller IP-adressen löser inte till en giltig IP-adress.',
        'fqdn_required_for_ssl' => 'Ett fullständigt kvalificerat domännamn som löser till en offentlig IP-adress krävs för att använda SSL för denna nod.',
    ],
    'notices' => [
        'allocations_added' => 'Allokeringar har lagts till framgångsrikt på denna nod.',
        'node_deleted' => 'Noden har tagits bort framgångsrikt från panelen.',
        'location_required' => 'Du måste ha minst en plats konfigurerad innan du kan lägga till en nod i denna panel.',
        'node_created' => 'Ny nod skapad framgångsrikt. Du kan automatiskt konfigurera daemonen på denna maskin genom att besöka fliken \'Konfiguration\'. <strong>Innan du kan lägga till några servrar måste du först allokera minst en IP-adress och port.</strong>',
        'node_updated' => 'Nodinformationen har uppdaterats. Om några daemoninställningar ändrades behöver du starta om den för att dessa ändringar ska träda i kraft.',
        'unallocated_deleted' => 'Alla icke-allokerade portar för <code>:ip</code> har tagits bort.',
    ],
];
