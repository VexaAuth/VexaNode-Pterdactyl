<?php

return [
    'validation' => [
        'fqdn_not_resolvable' => 'El FQDN o dirección IP proporcionada no resuelve a una dirección IP válida.',
        'fqdn_required_for_ssl' => 'Se requiere un nombre de dominio completamente cualificado que resuelva a una dirección IP pública para usar SSL en este nodo.',
    ],
    'notices' => [
        'allocations_added' => 'Las asignaciones se han añadido exitosamente a este nodo.',
        'node_deleted' => 'El nodo ha sido eliminado exitosamente del panel.',
        'location_required' => 'Debes tener al menos una ubicación configurada antes de poder añadir un nodo a este panel.',
        'node_created' => 'Nuevo nodo creado exitosamente. Puedes configurar automáticamente el daemon en esta máquina visitando la pestaña \'Configuración\'. <strong>Antes de poder añadir cualquier servidor, primero debes asignar al menos una dirección IP y puerto.</strong>',
        'node_updated' => 'La información del nodo ha sido actualizada. Si se cambiaron configuraciones del daemon, necesitarás reiniciarlo para que los cambios surtan efecto.',
        'unallocated_deleted' => 'Se eliminaron todos los puertos no asignados para <code>:ip</code>.',
    ],
];
