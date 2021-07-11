// Revisar desde la perspectiva del negocio, cómo se debe realizar este caso de uso.
// UPDATE: Realiza revisión del proceso cuando no hay más mociones en la asamblea. Cuando acaba(?)
// Consultar fechaFin para saber si una asamblea está en curso y si ya se le pueden mostrar los resultados al revisor
// (it means, cuando la asamblea haya finalizado).
// Para devolver los datos de votaciones en la asamblea, permitir que se consulte por fecha de asamblea.
// Estudiar si el secretario es quien inicia la asamblea, para saber quien debe tomar las huellas (él o admin).

// Si una persona repite ser secretario de asamblea, que al momento de la inscripción se tenga en cuenta
// el doc de identificación para sólo cambiarle el estado, correo y contraseña.
// (Que se muestre un mensaje arribita como en registro revisor/sec que le aclare al user lo anterior)

// Para revisor hacer inicio y este de abajo pidiendo fecha y mostrando
// el listado de mociones y votos por opción (definir bien qué y el orden de las columnas en que se mostrará al revisor).

// Listo módulos y routing revisor. Hoy seguir con html, .ts, inicio (el mismo de admin) y check/process

// Para mostrar la tabla, tomar en cuenta el endpoint getAllPropietario en donde se muestra algo similar.

// Procurar empezar el primer microsevicio en el back (user-data) apenas termine lo del botón en process.html.
// The better is barely coming here.

export const REVISOR_FISCAL = [
  {
    title: 'REVISAR',
    subtitles: [
      {
        name: 'Procesos de votación',
        icon: 'far fa-address-book',
        route: '/revisor/inicio'
      }
    ]
  }
];
