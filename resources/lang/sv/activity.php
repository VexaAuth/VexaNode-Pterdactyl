<?php

/**
 * Contains all of the translation strings for different activity log
 * events. These should be keyed by the value in front of the colon (:)
 * in the event name. If there is no colon present, they should live at
 * the top level.
 */
return [
    'entries' => [
        'system-user' => 'Systemanvändare',
        'system' => 'System',
        'using-api-key' => 'Använder API-nyckel',
        'using-sftp' => 'Använder SFTP',
    ],
    'auth' => [
        'fail' => 'Misslyckad inloggning',
        'success' => 'Inloggad',
        'password-reset' => 'Lösenordsåterställning',
        'reset-password' => 'Begärd lösenordsåterställning',
        'checkpoint' => 'Tvåfaktorsautentisering begärd',
        'recovery-token' => 'Använde tvåfaktorsåterställningstoken',
        'token' => 'Löste tvåfaktorsutmaning',
        'ip-blocked' => 'Blockerad förfrågan från olistad IP-adress för :identifier',
        'sftp' => [
            'fail' => 'Misslyckad SFTP-inloggning',
        ],
    ],
    'user' => [
        'account' => [
            'email-changed' => 'Ändrade e-post från :old till :new',
            'password-changed' => 'Ändrade lösenord',
            'language-changed' => 'Ändrade e-post från :gammal till :ny',
        ],
        'api-key' => [
            'create' => 'Skapade ny API-nyckel :identifier',
            'delete' => 'Raderad API-nyckel: identifierare',
        ],
        'ssh-key' => [
            'create' => 'Lade till SSH-nyckel: fingeravtryck till konto',
            'delete' => 'Tog bort SSH-nyckel: fingeravtryck från konto',
        ],
        'two-factor' => [
            'create' => 'Aktiverade tvåfaktorsautentisering',
            'delete' => 'Inaktiverade tvåfaktorsautentisering',
        ],
    ],
    'server' => [
        'reinstall' => 'Ominstallerade server]',
        'console' => [
            'command' => 'Exekverade "kommando" på servern',
        ],
        'power' => [
            'start' => 'Startade servern',
            'stop' => 'Stoppade servern',
            'restart' => 'Startade om servern',
            'kill' => 'Dödade serverprocessen',
        ],
        'backup' => [
            'download' => 'Laddade ner säkerhetskopian: namn',
            'delete' => 'Raderade säkerhetskopian: namn',
            'restore' => 'Återställde säkerhetskopian: namn (raderade filer: :truncate)',
            'restore-complete' => 'Slutförde återställningen av säkerhetskopian: namn',
            'restore-failed' => 'Misslyckades med att slutföra återställningen av säkerhetskopian: namn',
            'start' => 'Startade en ny säkerhetskopia: namn',
            'complete' => 'Markerade säkerhetskopian: namn som slutförd',
            'fail' => 'Markerade säkerhetskopian: namn som misslyckad',
            'lock' => 'Låste säkerhetskopian: namn',
            'unlock' => 'Låste upp säkerhetskopian: namn',
        ],
        'database' => [
            'create' => 'Skapade ny databas: namn',
            'rotate-password' => 'Lösenord roterat för databas: namn',
            'delete' => 'Raderade databasen: namn',
        ],
        'file' => [
            'compress_one' => 'Komprimerade katalogen: fil ',
            'compress_other' => 'Komprimerade antal filer i katalogen ',
            'read' => 'Visade innehållet i filen',
            'copy' => 'Skapade en kopia av filen',
            'create-directory' => 'Skapade katalogen: namn',
            'decompress' => 'Dekomprimerade filer i katalogen',
            'delete_one' => 'Raderade katalogen: fil',
            'delete_other' => 'Raderade antal filer i katalogen',
            'download' => 'Laddade ner filen',
            'pull' => 'Laddade ner en fil från URL till katalog',
            'rename_one' => 'Döpte om katalogen: fil från till',
            'rename_other' => 'Döpte om antal filer i katalogen',
            'write' => 'Skrev nytt innehåll till filen',
            'upload' => 'Påbörjade en uppladdning',
            'uploaded' => 'Laddade upp filen',
        ],
        'sftp' => [
            'denied' => 'Blockerade SFTP-åtkomst på grund av behörigheter ',
            'create_one' => 'Skapade: fil ',
            'create_other' => 'Skapade antal nya filer ',
            'write_one' => 'Ändrade innehållet i filen ',
            'write_other' => 'Ändrade innehållet i antal filer',
            'delete_one' => 'Raderade: fil',
            'delete_other' => 'Raderade antal filer ',
            'create-directory_one' => 'Skapade katalogen',
            'create-directory_other' => 'Skapade antal kataloger ',
            'rename_one' => 'Döpte om filer från till',
            'rename_other' => 'Döpte om eller flyttade antal filer',
        ],
        'allocation' => [
            'create' => 'Lade till allokering till servern',
            'notes' => 'Uppdaterade nätverksallokeringen från "gammal" till "ny" ',
            'primary' => 'Ställde in allokering som primär serverallokering ',
            'delete' => 'Raderade allokeringen',
        ],
        'schedule' => [
            'create' => 'Skapade schemat: namn',
            'update' => 'Uppdaterade schemat: namn',
            'execute' => 'Utförde schemat manuellt: namn',
            'delete' => 'Raderade schemat: namn',
        ],
        'task' => [
            'create' => 'Skapade en ny "åtgärd"-uppgift för schemat: namn',
            'update' => 'Uppdaterade "åtgärd"-uppgiften för schemat: namn',
            'delete' => 'Raderade en uppgift för schemat: namn',
        ],
        'settings' => [
            'rename' => 'Döpte om servern från gammal till ny',
            'description' => 'Ändrade serverbeskrivningen från gammal till ny',
        ],
        'startup' => [
            'edit' => 'Ändrade variabeln från "gammal" till "ny"',
            'image' => 'Uppdaterade Docker-bilden för servern från gammal till ny',
        ],
        'subuser' => [
            'create' => 'Lade till e-post som underanvändare',
            'update' => 'Uppdaterade underanvändarbehörigheter för e-post',
            'delete' => 'Tog bort e-post som underanvändare',
        ],
    ],
];
