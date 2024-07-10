import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Datum, IResponseProducts } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiProductsService {
  private _httpClientService: HttpClient = inject(HttpClient);

  private _productsVarios: Datum[] = [];
  private _productsFrutas: Datum[] = [];
  private _productsSemillas: Datum[] = [];
  private _productsVegetales: Datum[] = [];
  private _allProducts: Datum[] = [];
  public getProducts(): Observable<IResponseProducts> {
    const headers = new HttpHeaders().append(
      'Authorization',
      environment.key_api
    );
    return this._httpClientService.get<IResponseProducts>(
      `${environment.base_url}/api/get_productos`,
      {
        headers,
      }
    );
  }

  public setProductIntoCategories() {
    this.getProducts().subscribe({
      next: (res: IResponseProducts) => {
        this._productsFrutas = res.data.filter(
          (product) => product.categoriaNombre === 'FRUTAS'
        );

        this._productsSemillas = res.data.filter((product) =>
          product.categoriaNombre.includes('SEMILLAS')
        );

        this._productsVegetales = res.data.filter((product) =>
          product.categoriaNombre.includes('HORTALIZAS')
        );

        this._productsVarios = res.data.filter((product) =>
          product.categoriaNombre.includes('VARIOS')
        );
      },
    });
  }

  public getProductsVarios(): Datum[] {
    return this._productsVarios;
  }

  public getProductsFrutas(): Datum[] {
    return this._productsFrutas;
  }

  public getProductsSemillas(): Datum[] {
    return this._productsSemillas;
  }

  public getProductsVegetales(): Datum[] {
    return this._productsVegetales;
  }

  public getAllProducts(): Datum[] {
    return this._allProducts;
  }
}
