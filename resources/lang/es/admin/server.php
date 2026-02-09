<?php

return [
    'exceptions' => [
        'no_new_default_allocation' => 'Estás intentando eliminar la asignación predeterminada para este servidor pero no hay asignación de respaldo disponible.',
        'marked_as_failed' => 'Este servidor fue marcado como fallido en una instalación anterior. El estado actual no puede cambiarse en este estado.',
        'bad_variable' => 'Hubo un error de validación con la variable :name.',
        'daemon_exception' => 'Hubo una excepción al intentar comunicarse con el daemon resultando en un código de respuesta HTTP/:code. Esta excepción ha sido registrada. (id de solicitud: :request_id)',
        'default_allocation_not_found' => 'La asignación predeterminada solicitada no se encontró en las asignaciones de este servidor.',
    ],
    'alerts' => [
        'startup_changed' => 'La configuración de inicio de este servidor ha sido actualizada. Si el nido o egg de este servidor fue cambiado, se realizará una reinstalación ahora.',
        'server_deleted' => 'El servidor ha sido eliminado exitosamente del sistema.',
        'server_created' => 'El servidor fue creado exitosamente en el panel. Por favor permite al daemon unos minutos para instalar completamente este servidor.',
        'build_updated' => 'Los detalles de construcción de este servidor han sido actualizados. Algunos cambios pueden requerir un reinicio para surtir efecto.',
        'suspension_toggled' => 'El estado de suspensión del servidor ha sido cambiado a :status.',
        'rebuild_on_boot' => 'Este servidor ha sido marcado como que requiere una reconstrucción del contenedor Docker. Esto ocurrirá la próxima vez que el servidor se inicie.',
        'install_toggled' => 'El estado de instalación de este servidor ha sido alternado.',
        'server_reinstalled' => 'Este servidor ha sido puesto en cola para una reinstalación comenzando ahora.',
        'details_updated' => 'Los detalles del servidor han sido actualizados exitosamente.',
        'docker_image_updated' => 'Se cambió exitosamente la imagen Docker predeterminada para este servidor. Se requiere un reinicio para aplicar este cambio.',
        'node_required' => 'Debes tener al menos un nodo configurado antes de poder añadir un servidor a este panel.',
        'transfer_nodes_required' => 'Debes tener al menos dos nodos configurados antes de poder transferir servidores.',
        'transfer_started' => 'La transferencia del servidor ha comenzado.',
        'transfer_not_viable' => 'El nodo seleccionado no tiene el espacio en disco o memoria disponible requerida para acomodar este servidor.',
    ],
];
