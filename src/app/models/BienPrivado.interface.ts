export interface BienPrivado {
  idPropiedadHorizontal: number;
  matriculaInmobilaria: string;
  referenciaCatastral: string;
  propietario: {
    fechaFin: Date;
    fechaInicio: Date;
    email: string[];
    foto: string;
    nombres: string;
    numeroDocumento: string;
    telefono: [];
    tipoDocumento: string;
  };
}
