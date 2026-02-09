<?php

return [
    'validation' => [
        'fqdn_not_resolvable' => 'FQDN atau alamat IP yang diberikan tidak dapat diselesaikan ke alamat IP yang valid.',
        'fqdn_required_for_ssl' => 'Nama domain yang sepenuhnya memenuhi syarat (FQDN) yang merujuk ke alamat IP publik diperlukan untuk menggunakan SSL pada node ini.',
    ],
    'notices' => [
        'allocations_added' => 'Alokasi telah berhasil ditambahkan ke node ini.',
        'node_deleted' => 'Node telah berhasil dihapus dari panel.',
        'location_required' => 'Anda harus memiliki setidaknya satu lokasi yang dikonfigurasi sebelum Anda dapat menambahkan node ke panel ini.',
        'node_created' => 'Berhasil membuat node baru. Anda dapat secara otomatis mengonfigurasi daemon pada mesin ini dengan mengunjungi tab \'Konfigurasi\'. <strong>Sebelum Anda dapat menambahkan server apa pun, Anda harus terlebih dahulu mengalokasikan setidaknya satu alamat IP dan port.</strong>',
        'node_updated' => 'Informasi node telah diperbarui. Jika pengaturan daemon diubah, Anda perlu me-rebootnya agar perubahan tersebut berlaku.',
        'unallocated_deleted' => 'Menghapus semua port yang tidak dialokasikan untuk <code>:ip</code>.',
    ],
];
