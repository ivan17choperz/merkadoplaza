export interface ResponseUser {
  status: string;
  message: string;
  data: User;
}

export interface User {
  nombre: string;
  apellido: string;
  email: string;
  celular: string;
  telefono: string;
}
