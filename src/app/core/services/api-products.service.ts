import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IResponseProducts,
  ProductoEmpresa,
} from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class ApiProductsService {
  private _httpClientService: HttpClient = inject(HttpClient);

  private _productsVarios: ProductoEmpresa[] = [];
  private _productsFrutas: ProductoEmpresa[] = [];
  private _productsSemillas: ProductoEmpresa[] = [];
  private _productsVegetales: ProductoEmpresa[] = [];
  private _allProducts: ProductoEmpresa[] = [];

  public getProducts(): Observable<IResponseProducts> {
    const headers = new HttpHeaders().append(
      'Authorization',
      environment.key_api
    );
    return this._httpClientService
      .get<IResponseProducts>(`${environment.base_url}/products`, {
        headers,
      })
      .pipe(
        tap((res) => {
          console.log(res);
        })
      );
  }

  public getproductv2() {
    const headers = new HttpHeaders().append(
      'Authorization',
      environment.key_api
    );
    this._httpClientService
      .get('http://localhost/mdp/api/productos', {
        headers,
      })
      .subscribe(console.log);
  }
  public setProductIntoCategories() {
    this.getProducts().subscribe({
      next: (res: IResponseProducts) => {},
    });
  }

  public getProductsVarios(): ProductoEmpresa[] {
    return this._productsVarios;
  }

  public getProductsFrutas(): ProductoEmpresa[] {
    return this._productsFrutas;
  }

  public getProductsSemillas(): ProductoEmpresa[] {
    return this._productsSemillas;
  }

  public getProductsVegetales(): ProductoEmpresa[] {
    return this._productsVegetales;
  }

  public getAllProducts(): ProductoEmpresa[] {
    return this._allProducts;
  }
}
