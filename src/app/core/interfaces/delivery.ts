export interface Delivery {
  idEmpresa: number;
  idUsuario: number;
  fechaEntrega: Date;
  recibe: string;
  telefono: string;
  detalle: string;
  diaEntrega: string;
  hora: string;
  items: Item[];
}

export interface Item {
  idProductoEmpresa: number;
  cantidad: number;
  valor: number;
}
