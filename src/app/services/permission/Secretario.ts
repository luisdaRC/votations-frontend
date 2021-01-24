export const SECRETARIO = [ // En este secretario seguir las rutas del propitario de estos manes
  {
    title: 'VER',
    subtitles: [
      {
        name: 'Lista de asistentes',
        icon: 'fas fa-owner',
        route: '/votations/asistentes'
      },
      {
        name: 'Control del quorum',
        icon: 'fas fa-chart-pie',
        route: '/votations/quorum'
      },
      {
        name: 'Resumen de procesos de votación',
        icon: 'fas fa-building',
        route: '/votations/procesos'
      },
      {
        name: 'Resultados última votación',
        icon: 'fas fa-chart-pie',
        route: '/votations/resultados'
      }
    ]
  },
  {
    title: 'REGISTRAR',
    subtitles: [
      {
        name: 'Proposiciones o candidatos',
        icon: 'fas fa-ad',
        route: '/votations/proposicion'
      },
      {
        name: 'Constancias de votación',
        icon: 'fas fa-ad',
        route: '/votation/constancias'
      },
    ]
  }
];
