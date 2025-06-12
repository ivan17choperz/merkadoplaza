import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import {
  FormBuilder,
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
  IonCardContent,
  IonImg,
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
export class ProductCardComponent {
  @Input() product: ProductoEmpresa | null = null;
  private _fb: FormBuilder = inject(FormBuilder);

  private _cartListProductsService: CartListProductsService = inject(
    CartListProductsService
  );

  public countForm!: FormGroup;
  public quantityProduct: number = 0;

  constructor() {
    this.countForm = this._fb.group({
      quantity: [0, [Validators.min(1), Validators.max(20)]],
    });
  }

  public addProductIntoCart(product: any) {
    if (!product) {
      return;
    }
    this._cartListProductsService.addProduct(product);
  }

  public updateCountProduct(product: any, target: any) {
    let quantity = parseInt(target.value);

    if (quantity <= 0 || !quantity) return;

    console.log(quantity);

    let data = {
      ...product,
      quantity: quantity,
      totalPrice: quantity * parseInt(product?.valor),
    };

    if (this.quantityProduct === quantity) {
      this.quantityProduct = quantity;
      return;
    }

    //console.log('producto añadido al carrito', data);

    this.addProductIntoCart(data);
  }

  public plusQuantity(product: any, number: number) {
    if (this.quantityProduct < 0) return;
    this.quantityProduct += number;
    this.countForm.controls['quantity'].setValue(this.quantityProduct);

    let data = {
      ...product,
      quantity: this.quantityProduct,
      totalPrice: this.quantityProduct * parseInt(product?.valor),
    };

    this.addProductIntoCart(data);
    //console.log('producto quitado del carrito', data);
  }

  public lessQuantity(product: any, number: number) {
    if (this.quantityProduct <= 0) return;
    this.quantityProduct -= number;
    this.countForm.controls['quantity'].setValue(this.quantityProduct);

    let data = {
      ...product,
      quantity: this.quantityProduct,
      totalPrice: this.quantityProduct * parseInt(product?.valor),
    };
    this.addProductIntoCart(data);
    //console.log('producto quitado del carrito', data);
  }
}
