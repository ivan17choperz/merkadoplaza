import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
  Signal,
} from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
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
import { StoreService } from 'src/app/core/services/store.service';

@Component({
  selector: 'app-cart-shopping',
  standalone: true,
  imports: [
    IonIcon,
    IonContent,
    IonFooter,
    IonToolbar,
    IonTitle,
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './cart-shopping.component.html',
  styleUrl: './cart-shopping.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CartShoppingComponent implements OnInit {
  // public listProducts = signal<ProductoEmpresa[]>([]);

  measures = signal<{ idMedida: string; nombre: string }[]>([]);

  dayDelivery = new FormControl('');
  hourDelivery = new FormControl('');
  dateDelivery = new FormControl('');
  recipient = new FormControl('');
  phone = new FormControl('');
  detail = new FormControl('');

  constructor(
    private _cartListServices: CartListProductsService,
    private _apiProductService: ApiProductsService,
    private _storeService: StoreService
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

  async saveDelivery(): Promise<void> {
    const currentUser = await this._storeService.getData('current_user');

    if (currentUser) {
      const dataToSave = {
        idEmpresa: 3,
        idUsuario: currentUser.user_id ?? 1, //this data recept to api
        fechaEntrega: this.parseDate(this.dateDelivery.value ?? ''),
        recibe: this.recipient.value ?? '',
        telefono: this.phone.value ?? '',
        detalle: this.detail.value ?? '',
        diaEntrega: this.dayDelivery.value ?? '',
        hora: this.hourDelivery.value ?? '',
        items: this.listProducts.map((p) => {
          return {
            idProductoEmpresa: parseInt(p.idProductoEmpresa),
            cantidad: p.quantity,
            valor: parseFloat(p.valor),
          };
        }),
      };

      const totalDelivery = parseFloat(
        dataToSave.items
          .reduce((acc: number, item) => {
            return acc + item.cantidad * item.valor;
          }, 0)
          .toFixed(2)
      );

      if (totalDelivery >= 40000) {
        this._apiProductService
          .createDelivery(dataToSave)
          .subscribe(console.log);
      }
    }
  }

  parseDate(entryDate: string) {
    const dateParts = entryDate.split('/');
    return entryDate.length > 0
      ? new Date(
          parseInt(dateParts[2]),
          parseInt(dateParts[1]) - 1,
          parseInt(dateParts[0])
        )
      : new Date();
  }
}
