import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Datum } from '../interfaces/products.interface';

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

  private listProducts: BehaviorSubject<Datum[]> = new BehaviorSubject<Datum[]>(
    []
  );
  public listProducts$ = this.listProducts.asObservable();

  public addProduct(product: Datum) {
    let existProduct = this.listProducts.value.find(
      (p) => p.productoId === product.productoId
    );

    if (existProduct) {
      existProduct.quantity = product.quantity;
      existProduct.totalPrice = product.totalPrice;

      if (existProduct.quantity === 0) {
        this.removeProduct(existProduct.productoId);
      }
    } else {
      this.listProducts.next([...this.listProducts.value, product]);
      this._countProducts.next(this.listProducts.value.length);
    }

    const listTotalPrice = this.listProducts.value.map((p) => {
      return p.totalPrice;
    });

    if (listTotalPrice !== undefined) this.getTotalPrices(listTotalPrice);
  }
  public removeProduct(id: any) {
    this.listProducts.next(
      this.listProducts.value.filter((p) => p.productoId !== id)
    );

    const listTotalPrice = this.listProducts.value.map((p) => {
      return p.totalPrice;
    });

    if (listTotalPrice !== undefined) this.getTotalPrices(listTotalPrice);

    this._quantityProductsIntoCart(this.listProducts.value.length);
  }

  private _quantityProductsIntoCart(number: number) {
    this._countProducts.next(number);
  }

  public clearProducts() {
    this.listProducts.next([]);
  }

  public verifyListProducts() {
    this.listProducts.value.filter((product) => product.quantity! > 0);
  }

  public getTotalPrices(arrayPrices: any): void {
    const total = arrayPrices.reduce((a: any, b: any) => a + b, 0);
    this._totalPrice.next(total);
  }

  //TODO: Messages and toasts
  public setShowToastProductExist(show: boolean, message: string) {
    this.showToastProductExist.next({ show, message });

    setTimeout(() => {
      this.showToastProductExist.next({ show: false, message: '' });
    }, 2000);
  }
}
