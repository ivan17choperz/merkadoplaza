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
  IResponseProducts,
  ProductoEmpresa,
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

  public categories = signal<{ idCategoria: string; nombre: string }[]>([]);
  public measures = signal<{ idMedida: string; nombre: string }[]>([]);
  public products = signal<ProductoEmpresa[]>([]);
  public filterProducts = signal<ProductoEmpresa[]>([]);

  ngOnInit(): void {
    this._setProducts();
    this._getCategories();
    this._getMeasures();
  }
  private _setProducts() {
    this._apiProductService.getProducts().subscribe({
      next: ({ data }) => {
        if (data) {
          this.products.set(data);
          this.filterProducts.set(data);
        }
      },
    });
  }
  private _getCategories(): void {
    this._apiProductService.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res);
      },
    });
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

  public searchProductByTerm(event: any): void {
    const term = event.detail.value;
    if (term == '') {
      this.filterProducts.set(this.products());
    }

    this.filterProducts.set(
      this.products().filter((p) =>
        p.producto?.nombre?.toLowerCase()?.includes(term.toLowerCase())
      )
    );
  }

  public filterByCategory(category: string): void {
    this.filterProducts.set(
      this.products().filter((p) => p.producto.idCategoria == category)
    );
  }
}
