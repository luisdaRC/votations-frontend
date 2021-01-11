export const SUPER_ADMINISTRADOR = [ // En este administrador seguir las rutas del admin de estos manes
  {
    title: 'REGISTRAR',
    subtitles: [
      {
        name:  'Anuncio',
        icon: 'fas fa-ad',
        route: '/admin/registry/ad'
      },
      {
        name:  'Revisor fiscal',
        icon: 'fas fa-user-tie',
        route: '/admin/registry/revisor'
      },
      {
        name:  'Secretario de asamblea',
        icon: 'fas fa-user',
        route: '/admin/registry/secretary'
      }
    ]
  },
  {
    title: 'PRUEBA', // Hacer que el acordeón se recoja
    subtitles: [
      {
        name: 'Pruebita',
        icon: 'fas fa-swimer',
        route: '/admin/registry/ad'
      }
    ]
  }
];
