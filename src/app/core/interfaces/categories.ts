export interface IResponseCategories {
  status: string;
  data: Data;
}

export interface Data {
  categories: { [key: string]: string };
}
