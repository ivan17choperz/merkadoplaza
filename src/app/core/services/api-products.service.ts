import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { lastValueFrom, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  IResponseProducts,
  ProductoEmpresa,
} from '../interfaces/products.interface';
import { IResponseCategories } from '../interfaces/categories';
import { IResponseMeasure } from '../interfaces/measure';
import { Delivery } from '../interfaces/delivery';
import {
  ResponseDeliveriesUser,
  DeliveryCreated,
} from '../interfaces/responses/store/search-delivery';

@Injectable({
  providedIn: 'root',
})
export class ApiProductsService {
  private _httpClientService: HttpClient = inject(HttpClient);

  public getProducts(): Observable<IResponseProducts> {
    const headers = new HttpHeaders().append(
      'Authorization',
      environment.key_api
    );
    this.getCategories();
    return this._httpClientService.get<IResponseProducts>(
      `${environment.base_url}/products`,
      {
        headers,
      }
    );
  }

  public getCategories(): Observable<IResponseCategories> {
    const headers = new HttpHeaders().append(
      'Authorization',
      environment.key_api
    );
    return this._httpClientService.get<IResponseCategories>(
      `${environment.base_url}/categories`,
      {
        headers,
      }
    );
  }

  public getMeasures(): Observable<{ idMedida: string; nombre: string }[]> {
    const headers = new HttpHeaders().append(
      'Authorization',
      environment.key_api
    );
    return this._httpClientService
      .get<IResponseMeasure>(`${environment.base_url}/measures`, {
        headers,
      })
      .pipe(
        map((res) => {
          return Object.entries(res.data.measures).map(([key, value]) => ({
            idMedida: key,
            nombre: value,
          }));
        })
      );
  }

  public createDelivery(delivery: Delivery) {
    return this._httpClientService.post(
      `${environment.base_url}/generate-delivery`,
      delivery
    );
  }

  async getDeliveriesByUser(idUser: string): Promise<DeliveryCreated[]> {
    return await lastValueFrom(
      this._httpClientService
        .get<ResponseDeliveriesUser>(
          `${environment.base_url}/deliveries/user/${idUser}`
        )
        .pipe(map((res) => res.data))
    );
  }
}
