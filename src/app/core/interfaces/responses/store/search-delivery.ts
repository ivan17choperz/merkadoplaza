export interface ResponseDeliveriesUser {
  status: string;
  message: string;
  data: DeliveryCreated[];
}

export interface DeliveryCreated {
  idPedido: string;
  idEmpresa: string;
  idUsuario: string;
  fechaEntrega: Date;
  diaEntrega: string;
  hora: string;
  recibe: string;
  detalle: string;
  total: string;
  estado: string;
  fechaHora: Date;
}
