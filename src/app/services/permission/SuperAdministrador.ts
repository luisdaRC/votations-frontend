// En el perfil del super-admin, encargarlo de actualizar los datos
// de bienes privado y personas con endpoint persona/list.

// Este perfil SuperAdmin se debe a la naturaleza de las tareas que va a realizar.
export const SUPER_ADMINISTRADOR = [
  {
    title: 'ACTUALIZAR', // Retrieve data from core and insert into db.
    subtitles: [// Ver el swagger core para saber qué datos necesita ingresar el super para consultar bienes y personas
      {
        name: 'Datos PH',
        icon: 'fas fa-sync',
        route: '/super-admin/update/data'
// En el html de inicio hacer lo mismo que con admin cuando hay revisor/secretario para rellenar sus rows de PH en DB
// Poner una variable existePH en el .ts del super y hacer llamado (crear) a un get en phService.
      }
    ]
  }
];
// Actualizar Personas y Bienes.

// Con el siguiente botón usted podrá actualizar los datos de las
// personas que habitan la propiedad y los bienes que la componen.

// Actualizar

// -Mostrar SweetAlert de actualización exitosa-
