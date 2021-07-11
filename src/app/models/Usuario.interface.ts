
export interface Usuario {
  id?: string;
  nombre?: string;
  apellido?: string;
  email: string;
  idPersona?: number;
  idPropietario?: number;
  password?: string;
  roles?: string[];
  idPropiedadHorizontal?: string;
  nombrePH?: string;
  cambiarContraseña?: boolean;
  room?: string;
}
