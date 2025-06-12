export interface IResponseProducts {
  status: string;
  data: ProductoEmpresa[];
}

export interface ProductoEmpresa {
  idProductoEmpresa: string;
  idEmpresa: string;
  idProducto: null | string;
  nombreAlt: null;
  valor: string;
  minimo: string;
  maximo: string;
  indHabilitado: string;
  producto: Producto;
}

export interface Producto {
  idProducto: null | string;
  nombre: null | string;
  idCategoria: null | string;
  idMedida: null | string;
  imagen: null | string;
}

export enum CategoriaNombre {
  Frutas = 'FRUTAS',
  FrutosSecosSemillasCereales = 'FRUTOS SECOS / SEMILLAS / CEREALES',
  Hortalizas = 'HORTALIZAS',
  VARIOSHuevosOtros = 'VARIOS - Huevos / Otros',
}
