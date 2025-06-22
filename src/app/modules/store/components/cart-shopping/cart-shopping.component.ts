import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import {
  IonTitle,
  IonToolbar,
  IonFooter,
  IonContent,
  IonIcon,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircleOutline, removeCircleOutline } from 'ionicons/icons';
import { ProductoEmpresa } from 'src/app/core/interfaces/products.interface';
import { ApiProductsService } from 'src/app/core/services/api-products.service';
import { CartListProductsService } from 'src/app/core/services/cart-list-products.service';

@Component({
  selector: 'app-cart-shopping',
  standalone: true,
  imports: [IonIcon, IonContent, IonFooter, IonToolbar, IonTitle, CommonModule],
  templateUrl: './cart-shopping.component.html',
  styleUrl: './cart-shopping.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartShoppingComponent implements OnInit {
  // public listProducts = signal<ProductoEmpresa[]>([]);

  measures = signal<{ idMedida: string; nombre: string }[]>([]);

  constructor(
    private _cartListServices: CartListProductsService,
    private _apiProductService: ApiProductsService
  ) {
    addIcons({
      addCircleOutline,
      removeCircleOutline,
    });
  }

  ngOnInit(): void {
    this._getMeasures();
  }

  get listProducts() {
    return this._cartListServices.showListProducts();
  }

  private _getMeasures(): void {
    this._apiProductService.getMeasures().subscribe({
      next: (res) => {
        this.measures.set(res);
      },
    });
  }

  getMeasures(id: string): string {
    return this.measures().find((m) => m.idMedida === id)?.nombre || '';
  }

  getTotalValue(product: ProductoEmpresa): number {
    return parseFloat(product.valor) * (product.quantity || 0);
  }

  get totalListProducts(): number {
    return this._cartListServices.totalPrices();
  }

  public updateQuantityProduct(idProduct: string, quantity: number): void {}

  public deleteProduct(idProduct: string): void {}
}
