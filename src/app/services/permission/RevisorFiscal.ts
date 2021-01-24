// Revisar desde la perspectiva del negocio, cómo se debe realizar este caso de uso.
// ¿Sólo se le mostrará la última votación y los propietarios que votaron o los resultados
// de todas las votaciones que se han realizado en la PH?.
// UPDATE: Realiza revisión del proceso cuando no hay más mociones en la asamblea. Cuando acaba(?)
export const REVISOR_FISCAL = [
  {
    title: 'LISTAR',
    subtitles: [
      {
        name: 'Votación',
        icon: 'fas fa-owner',
        route: '/list'
      }
    ]
  }
];
