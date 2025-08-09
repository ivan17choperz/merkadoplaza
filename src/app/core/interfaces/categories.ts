export interface IResponseCategories {
  status: string;
  data: Data;
}

export interface Data {
  categories: Category[];
}

export interface Category {
  idCategoria: string;
  nombre: string;
}
