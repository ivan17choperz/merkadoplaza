import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductoEmpresa } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class CartListProductsService {
  private showToastProductExist: BehaviorSubject<{
    show: boolean;
    message: string;
  }> = new BehaviorSubject<{ show: boolean; message: string }>({
    show: false,
    message: '',
  });
  public showToastProductExist$ = this.showToastProductExist.asObservable();

  private _totalPrice: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  public totalPrice$ = this._totalPrice.asObservable();

  private _countProducts: BehaviorSubject<number> = new BehaviorSubject<number>(
    0
  );
  public countProducts$ = this._countProducts.asObservable();

  private listProducts: BehaviorSubject<ProductoEmpresa[]> =
    new BehaviorSubject<ProductoEmpresa[]>([]);
  public listProducts$ = this.listProducts.asObservable();

  public addProduct(product: ProductoEmpresa) {}
  public removeProduct(id: any) {}

  private _quantityProductsIntoCart(number: number) {}

  public clearProducts() {}

  public verifyListProducts() {}

  public getTotalPrices(arrayPrices: any): void {}

  //TODO: Messages and toasts
  public setShowToastProductExist(show: boolean, message: string) {
    this.showToastProductExist.next({ show, message });

    setTimeout(() => {
      this.showToastProductExist.next({ show: false, message: '' });
    }, 2000);
  }
}
