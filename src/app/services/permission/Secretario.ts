export const SECRETARIO = [
  {
    title: 'VER',
    subtitles: [
      {
        name: 'Lista de asistentes',
        icon: 'fas fa-list',
        route: '/secretary/list/asistentes'
      },
      {
        name: 'Control del quorum',
        icon: 'fas fa-chart-pie',
        route: '/secretary/votations/quorum'
      },
      {
        name: 'Procesos de votación',
        icon: 'fas fa-building',
        route: '/secretary/votations/procesos'
      },
      {
        name: 'Última votación',
        icon: 'fas fa-chart-pie',
        route: '/secretary/votations/resultados'
      }
    ]
  },
  {
    title: 'REGISTRAR',
    subtitles: [
      {
        name: 'Proposiciones / candidatos',
        icon: 'fas fa-ad',
        route: '/secretary/votations/proposicion'
      },
      {
        name: 'Poderes cedidos',
        icon: 'far fa-address-book',
        route: '/secretary/votations/poderes'
      }
    ]
  }
];


// Para llevar el listado de los asistentes mostrar la lista de propietarios y un botón de asistió
