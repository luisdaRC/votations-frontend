import { ADMINISTRADOR } from '../permission/Administrador';
// import { SUPER_ADMINISTRADOR } from '../permission/SuperAdministrador';

const asignarRutas = (LISTA_REFERENCIA) => {

  let rutas = [];
  LISTA_REFERENCIA.forEach((submenu) => {

    submenu.subtitles.forEach((subtitle) => {
      rutas.push(subtitle.route);
    });

  });
  return rutas;
};

let RUTAS_ADMINISTRADOR = asignarRutas(ADMINISTRADOR);


export const RUTAS_PERMITIDAS = {

  "GENERALES": {
    "ADMINISTRADOR": "/.*",
    "SUPER_ADMINISTRADOR": "/.*",
    "RESIDENTE": "/sgph-owner"
  },

  "ESPESIFICAS": {

//    "ADMINISTRADOR": RUTAS_SUPER_ADMINISTRADOR.concat(RUTAS_SEGURIDAD_ADMIN),
//    "SUPER_ADMINISTRADOR": RUTAS_ADMINISTRADOR.concat(RUTAS_SEGURIDAD_ADMIN),
    "RESIDENTE": []
  }
};

export const MODULOS = {
  ADMINISTRADOR: 'admin',
  SUPER_ADMINISTRADOR: 'super-admin',
  SECRETARIO: 'secretary',
  PROPIETARIO: 'owner',
  REVISOR: 'revisor'
};
