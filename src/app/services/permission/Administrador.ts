export const ADMINISTRADOR = [
  {
    title: 'REGISTRAR',
    subtitles: [
      {
        name: 'Anuncio',
        icon: 'fab fa-adversal',
        route: '/admin/registry/ad'
      },
      {
        name:  'Usuario para Revisor Fiscal',
        icon: 'fas fa-user-tie',
        route: '/admin/registry/revisor'
      },
      {
        name:  'Usuario para Secretario',
        icon:  'fas fa-user',
        route: '/admin/registry/secretary'
      },
      {
        name:  'Restricción',
        icon:  'fas fa-ban',
        route: '/admin/registry/restriction'
      },
      {
        name:  'Coef. de copropiedad',
        icon:  'fas fa-address-card',
        route: '/admin/registry/coeficiente'
      }
    ]
  },
  {
    title: 'ELIMINAR',
    subtitles: [
      {
        name:  'Personal de apoyo',
        icon:  'fas fa-user',
        route: '/admin/delete/support-personal'
      }
    ]
  }
];
