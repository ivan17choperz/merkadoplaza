import { CommonModule } from '@angular/common';

import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
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
  IonModal,
  IonToast,
  ModalController,
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
import { StoreService } from 'src/app/core/services/store.service';
import { ICurrentUser } from 'src/app/core/interfaces/user.interface';
import { ModalUserComponent } from './components/modal-user/modal-user.component';
import { AuthService } from 'src/app/core/services/auth.service';
import { User } from 'src/app/core/interfaces/responses/auth/search-user';

const ionComponents = [
  IonTitle,
  IonHeader,
  IonToolbar,
  IonFooter,

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

  public numberProductsIntoCart: number = 0;

  public userInfo = signal<User | null>(null);

  constructor(
    private modalCtrl: ModalController,
    private _storeService: StoreService,
    private authService: AuthService,
    private _cartListServices: CartListProductsService
  ) {
    addIcons({
      settingsOutline,
      personCircleOutline,
      cartOutline,
      cart,
      closeCircleOutline,
    });

    this.getInfoUser();
  }

  get totalPrice(): number {
    return this._cartListServices.totalPrices();
  }
  get totalListProducts(): number {
    return this._cartListServices.showListProducts().length;
  }

  async ngOnInit(): Promise<void> {
    const info = await this._storeService.getData('current_user');
    this.userInfo.set(info);
    console.log(this.userInfo());
  }

  public scrollTop(): void {
    this.content.scrollToTop();
  }

  public handleScroll(ev: CustomEvent<any>) {
    console.log('scroll', JSON.stringify(ev.detail));
  }

  async showModalUser() {
    const modal = await this.modalCtrl.create({
      component: ModalUserComponent,
      componentProps: {
        userInfo: this.userInfo(),
      },
      showBackdrop: true,
      canDismiss: true,
    });

    modal.onWillDismiss().then((res) => {
      if (res.role === 'cancel') {
        // this.showModalUser.set(false);
      }
    });

    await modal.present();
  }

  async getInfoUser() {
    try {
      const info = await this._storeService.getData('current_user');
      const { data, status } = await this.authService.getUserById(info.user_id);

      if (status == 'success') {
        console.log(data);
        this.userInfo.set(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
