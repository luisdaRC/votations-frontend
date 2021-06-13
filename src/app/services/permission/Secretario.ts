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
        name: 'Proposiciones',
        icon: 'fas fa-hand-paper',
        route: '/secretary/votations/proposicion'
      },
      {
        name: 'Candidatos individuales',
        icon: 'fas fa-user',
        route: '/secretary/votations/candidatos'
      },
      {
        name: 'Planchas de candidatos',
        icon: 'fas fa-users',
        route: '/secretary/votations/planchas'
      },
      {
        name: 'Poderes cedidos',
        icon: 'far fa-address-book',
        route: '/secretary/registry/poderes'
      }
    ]
  }
];
