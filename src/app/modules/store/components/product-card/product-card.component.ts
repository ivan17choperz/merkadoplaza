import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnChanges,
  OnInit,
  signal,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonCard,
  IonTitle,
  IonCardSubtitle,
  IonCardHeader,
  IonCardTitle,
} from '@ionic/angular/standalone';

import { ProductoEmpresa } from 'src/app/core/interfaces/products.interface';
import { CartListProductsService } from 'src/app/core/services/cart-list-products.service';

const ionComponents = [
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonTitle,
];

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    // ...ionComponents,
  ],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss',
})
export class ProductCardComponent implements OnInit, OnChanges {
  @Input() product: ProductoEmpresa | null = null;
  @Input() medida: string = '';

  private _cartListProductsService: CartListProductsService = inject(
    CartListProductsService
  );

  currentQuantity = new FormControl<number | null>(null);

  ngOnInit() {
    this.setupQuantityListeners();

    if (this.product) {
      this.currentQuantity.setValue(this.product?.quantity || 0);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      const realQuantity = this._cartListProductsService.getQuantityByID(
        this.product.idProducto!
      );
      this.currentQuantity.setValue(realQuantity, { emitEvent: false });
    }
  }

  private setupQuantityListeners() {
    this.currentQuantity.valueChanges.subscribe((value) => {
      if (value === null || value < 0) {
        this.currentQuantity.setValue(0, { emitEvent: false });
        return;
      }
      this.updateCartQuantity();
    });
  }

  addQty() {
    const newQuantity = this.currentQuantity.value! + 1;
    this.currentQuantity.setValue(newQuantity, { emitEvent: false });
    this.updateCartQuantity();
  }

  lessQty() {
    const currentValue = this.currentQuantity.value!;
    if (currentValue <= 0) return;

    const newQuantity = currentValue - 1;
    this.currentQuantity.setValue(newQuantity, { emitEvent: false });
    this.updateCartQuantity();
  }

  private updateCartQuantity() {
    const quantity = this.currentQuantity.value!;

    if (quantity === 0) {
      this.removeProductFromCart();
    } else if (quantity > 0) {
      this.addProductIntoCart();
    }
  }
  onInput(event: any) {
    let value = event.target.value;

    // Elimina ceros a la izquierda
    if (value) {
      value = value.replace(/^0+/, '');

      // Si el usuario borra todo, dejarlo vacío o 0
      if (value === '') {
        value = '0';
      }
    }

    // Actualiza el control SIN disparar doble evento
    this.currentQuantity.setValue(Number(value), { emitEvent: false });

    this.updateCartQuantity();
  }
  private addProductIntoCart() {
    if (!this.product) return;

    const productToAdd: ProductoEmpresa = {
      ...this.product,
      quantity: this.currentQuantity.value!,
    };

    this._cartListProductsService.addProduct(productToAdd);
  }

  private removeProductFromCart() {
    if (!this.product) return;
    this._cartListProductsService.removeProduct(this.product.idProducto!);
  }
}
