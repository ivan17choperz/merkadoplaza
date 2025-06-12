import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
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
  private _cartListServices: CartListProductsService = inject(
    CartListProductsService
  );

  public listProducts: ProductoEmpresa[] = [];
  constructor() {
    addIcons({
      addCircleOutline,
      removeCircleOutline,
    });
  }

  ngOnInit(): void {
    this._cartListServices.listProducts$.subscribe({
      next: (products) => {
        this.listProducts = products;
        console.log(products);
      },
      error: (err) => console.log(err),
    });
  }

  public updateQuantityProduct(idProduct: string, quantity: number): void {
    const product = this.listProducts.find((p) => p.idProducto === idProduct);
    if (product) {
      // product.productoy = quantity;
    }
  }

  public deleteProduct(idProduct: string): void {
    this._cartListServices.removeProduct(idProduct);
  }
}
