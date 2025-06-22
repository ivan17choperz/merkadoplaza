import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductoEmpresa } from '../interfaces/products.interface';

@Injectable({
  providedIn: 'root',
})
export class CartListProductsService {
  private _listProducts = signal<ProductoEmpresa[]>([]);
  public showListProducts = computed(() => this._listProducts());
  private _totalPrices = signal<number>(0);
  public totalPrices = computed(() => this._totalPrices());

  public addProduct(product: ProductoEmpresa) {
    this._listProducts.update((currentProducts) => {
      const existingIndex = currentProducts.findIndex(
        (p) => p.idProducto === product.idProducto
      );

      if (existingIndex >= 0) {
        // Clone array and update existing product
        const updatedProducts = [...currentProducts];
        updatedProducts[existingIndex] = {
          ...updatedProducts[existingIndex],
          quantity: product.quantity,
        };
        return updatedProducts;
      }
      // Add new product
      return [...currentProducts, product];
    });
    this._totalPrices.update(() => this._calculateTotal());
  }

  public removeProduct(id: string) {
    this._listProducts.update((currentProducts) => {
      const updatedProducts = currentProducts.filter(
        (product) => product.idProducto !== id
      );
      return updatedProducts;
    });
    this._totalPrices.update(() => this._calculateTotal());
  }

  public clearProducts() {
    this._listProducts.update(() => []);
    this._totalPrices.update(() => 0);
  }

  public verifyListProducts() {}

  private _calculateTotal(): number {
    return this._listProducts().reduce(
      (total, product) =>
        total + parseFloat(product.valor) * (product.quantity || 0),
      0
    );
  }
}
