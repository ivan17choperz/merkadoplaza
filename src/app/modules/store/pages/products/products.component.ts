import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import {
  IonGrid,
  IonCol,
  IonContent,
  IonRow,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { ApiProductsService } from 'src/app/core/services/api-products.service';
import {
  Datum,
  IResponseProducts,
} from 'src/app/core/interfaces/products.interface';
import { LoaderComponent } from '../../components/loader/loader.component';

const components = [ProductCardComponent, LoaderComponent];
const IonComponents = [IonSearchbar, IonRow, IonContent, IonCol, IonGrid];

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ...components, ...IonComponents],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductsComponent implements OnInit {
  private _apiProductService: ApiProductsService = inject(ApiProductsService);
  private _ctr = inject(ChangeDetectorRef);
  public products = signal<Datum[]>([]);
  private _termSearchCategory: string = '';
  ngOnInit(): void {
    this._setProducts();
  }
  private _setProducts() {
    this._apiProductService.getProducts().subscribe({
      next: ({ data }) => {
        //console.log(res.data);
        if (data) {
          data.map((product) => {
            return {
              ...product,
              quantity: 0,
              totalPrice: 0,
            };
          });
          this.products.set(data);
          this._apiProductService.setProductIntoCategories();
        }
      },
    });
  }

  public searchProductByTerm(event: any): void {
    let term = event.target.value;
    if (term === '') {
      this._setProducts();
      this._ctr.detectChanges();
    }
    this.products.set(
      this.products().filter((product) =>
        product.productoNombre
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      )
    );

    if (this.products().length === 0) {
      this.products.set(this._apiProductService.getAllProducts());
    }

    this._ctr.detectChanges();
  }

  public filterByCategory(term: string): void {
    if (term === '') {
      this._setProducts();
      this._ctr.detectChanges();
      return;
    }

    this._termSearchCategory = term;

    switch (term) {
      case 'frutas':
        console.log(this._apiProductService.getProductsFrutas());
        this.products.set(this._apiProductService.getProductsFrutas());
        this._ctr.detectChanges();
        break;
      case 'vegetales':
        // console.log(this._apiProductService.getProductsFrutas());
        this.products.set(this._apiProductService.getProductsVegetales());
        this._ctr.detectChanges();
        break;
      case 'semillas':
        this.products.set(this._apiProductService.getProductsSemillas());
        this._ctr.detectChanges();
        break;
      case 'varios':
        this.products.set(this._apiProductService.getProductsVarios());
        this._ctr.detectChanges();
        break;
      default:
        this.products.set(this._apiProductService.getAllProducts());
    }
  }
}
