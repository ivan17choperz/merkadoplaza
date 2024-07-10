import { CommonModule } from '@angular/common';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import { RouterModule } from '@angular/router';

import {
  IonRouterOutlet,
  IonTitle,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonContent,
  IonIcon,
  IonGrid,
  IonCol,
  IonRow,
  IonAvatar,
  IonFab,
  IonFabButton,
  IonActionSheet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  IonLabel,
  IonModal,
  IonToast,
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';

import {
  cart,
  cartOutline,
  closeCircleOutline,
  personCircleOutline,
  settingsOutline,
} from 'ionicons/icons';
import { CartShoppingComponent } from './components/cart-shopping/cart-shopping.component';
import { CartListProductsService } from 'src/app/core/services/cart-list-products.service';

const ionComponents = [
  IonTitle,
  IonHeader,
  IonToolbar,
  IonFooter,
  IonLabel,
  IonTabs,
  IonTabButton,
  IonTabBar,
  IonActionSheet,
  IonFabButton,
  IonFab,
  IonAvatar,
  IonRow,
  IonCol,
  IonGrid,
  IonIcon,
  IonContent,
  IonRouterOutlet,
  IonModal,
];

const components = [CartShoppingComponent];

@Component({
  selector: 'app-store',
  standalone: true,
  imports: [
    IonToast,
    CommonModule,
    RouterModule,
    ...ionComponents,
    ...components,
  ],
  templateUrl: './store.component.html',
  styleUrl: './store.component.scss',
})
export default class StoreComponent implements OnInit {
  @ViewChild(IonContent) content!: IonContent;
  public showModal = false;

  public showToastProductExist: boolean = false;
  public messageToast: string = '';
  public currentTotalPrice: number = 0;
  private _cartListServices: CartListProductsService = inject(
    CartListProductsService
  );

  public numberProductsIntoCart: number = 0;

  constructor() {
    addIcons({
      settingsOutline,
      personCircleOutline,
      cartOutline,
      cart,
      closeCircleOutline,
    });
  }

  ngOnInit(): void {
    this._cartListServices.countProducts$.subscribe((res) => {
      this.numberProductsIntoCart = res;
    });

    this._cartListServices.showToastProductExist$.subscribe((res) => {
      this.showToastProductExist = res.show;
      this.messageToast = res.message;
      //console.log(this.showToastProductExist, this.messageToast);
    });

    this._cartListServices.totalPrice$.subscribe((res) => {
      this.currentTotalPrice = res;
    });
  }

  public scrollTop(): void {
    this.content.scrollToTop();
  }

  public handleScroll(ev: CustomEvent<any>) {
    console.log('scroll', JSON.stringify(ev.detail));
  }
}
