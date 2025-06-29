export interface ICurrentUser {
  us_id: string;
  us_uuid: string;
  us_nombre: string;
  us_apellido: string;
  us_avatar: string;
  us_email: string;
  us_empresa: string;
  rol_codigo: string;
  rol_nombre: string;
  is_logged_in: boolean;
}
export interface CreateUser {
  idRol: number;
  idCiudad: number;
  idEmpresa: number;
  email: string;
  password: string;
  tipoDocumento: string;
  numDocumento: string;
  nombre: string;
  apellido: string;
  sexo: string;
  fechaNacimiento: Date;
  direccion: string;
  barrio: string;
  celular: string;
  telefono: string;
}
