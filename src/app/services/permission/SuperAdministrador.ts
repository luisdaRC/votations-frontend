export const SUPER_ADMINISTRADOR = [
  {
    title: 'REGISTRAR',
    subtitles: [
      {
        name: 'Anuncio',
        icon: 'fas fa-ad',
        route: '/admin/registry/ad'
      },
      {
        name:  'Usuario para Revisor fiscal',
        icon: 'fas fa-user-tie',
        route: '/admin/registry/revisor'
      },
      {
        name:  'Usuario para Secretario',
        icon: 'fas fa-user',
        route: '/admin/registry/secretary'
      }
    ]
  },
  {
    title: 'ELIMINAR', // HACER QUE EL ACORDEÓN FUNCIONE
    subtitles: [
      {
        name: 'Usuarios de Personal de apoyo',
        icon: 'fas fa-user',
        route: '/admin/delete/support-personal'
      }
    ]
  }
];
