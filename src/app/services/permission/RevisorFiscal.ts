// Revisar desde la perspectiva del negocio, cómo se debe realizar este caso de uso.
// UPDATE: Realiza revisión del proceso cuando no hay más mociones en la asamblea. Cuando acaba(?)
// Consultar fechaFin para saber si una asamblea está en curso y si ya se le pueden mostrar los resultados al revisor
// (it means, cuando la asamblea haya finalizado)
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
