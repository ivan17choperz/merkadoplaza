export interface ResponseUser {
  status: string;
  message: string;
  data: User;
}

export interface User {
  user_id: string;
  nombre: string;
  apellido: string;
  email: string;
  celular: string;
  telefono: string;
  direccion: string;
  barrio: string;
}
