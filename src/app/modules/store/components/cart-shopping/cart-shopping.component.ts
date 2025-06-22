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

  constructor(private _cartListServices: CartListProductsService) {
    addIcons({
      addCircleOutline,
      removeCircleOutline,
    });
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get listProducts() {
    return this._cartListServices.showListProducts();
  }

  public updateQuantityProduct(idProduct: string, quantity: number): void {}

  public deleteProduct(idProduct: string): void {}
}
