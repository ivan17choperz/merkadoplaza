export interface IResponseProducts {
  status: string;
  data: Datum[];
}

export interface Datum {
  productoId: string;
  productoNombre: string;
  categoriaNombre: CategoriaNombre;
  medidaId: string;
  medidaNombre: string;
  valor: string;
  imagen: string;
  minimo: string;
  maximo: string;
  quantity?: number;
  totalPrice?: number;
}

export enum CategoriaNombre {
  Frutas = 'FRUTAS',
  FrutosSecosSemillasCereales = 'FRUTOS SECOS / SEMILLAS / CEREALES',
  Hortalizas = 'HORTALIZAS',
  VARIOSHuevosOtros = 'VARIOS - Huevos / Otros',
}
