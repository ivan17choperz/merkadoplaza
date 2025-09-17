export interface DeliveryResponse {
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
  items: Item[];
}

export interface Item {
  cantidad: string;
  valor: string;
  precio: string;
  producto: Producto;
}

export interface Producto {
  idProducto: string;
  nombre: string;
  idCategoria: string;
  idMedida: string;
  imagen: string;
}
