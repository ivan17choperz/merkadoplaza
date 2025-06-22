export interface IResponseMeasure {
  status: string;
  data: Data;
}

export interface Data {
  measures: { [key: string]: string };
}
