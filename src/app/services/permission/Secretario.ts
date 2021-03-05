export const SECRETARIO = [
  {
    title: 'VER',
    subtitles: [
      {
        name: 'Lista de asistentes',
        icon: 'fas fa-owner',
        route: '/secretary/votations/asistentes'
      },
      {
        name: 'Control del quorum',
        icon: 'fas fa-chart-pie',
        route: '/secretary/votations/quorum'
      },
      {
        name: 'Resumen de procesos de votación',
        icon: 'fas fa-building',
        route: '/secretary/votations/procesos'
      },
      {
        name: 'Resultados última votación',
        icon: 'fas fa-chart-pie',
        route: '/secretary/votations/resultados'
      }
    ]
  },
  {
    title: 'REGISTRAR',
    subtitles: [
      {
        name: 'Proposiciones o candidatos',
        icon: 'fas fa-ad',
        route: '/secretary/votations/proposicion'
      },
      {
        name: 'Poderes cedidos',
        icon: 'far fa-address-book',
        route: '/secretary/votation/poderes'
      }
    ]
  }
];


// Para llevar el listado de los asistentes mostrar la lista de propietarios y un botón de asistió
