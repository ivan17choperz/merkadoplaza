import { Component, Input, OnInit, signal } from '@angular/core';
import { StoreService } from 'src/app/core/services/store.service';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  ModalController,
  IonItem,
  IonList,
  IonCardHeader,
  IonCardTitle,
  IonCard,
  IonTitle,
  IonCardSubtitle,
  IonCardContent,
  IonFooter,
  IonButton,
  IonModal,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { ApiProductsService } from 'src/app/core/services/api-products.service';
import { User } from 'src/app/core/interfaces/responses/auth/search-user';
import { DeliveryCreated } from 'src/app/core/interfaces/responses/store/search-delivery';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { settingsOutline, closeCircleOutline } from 'ionicons/icons';
import { ModalEditUserComponent } from '../modal-edit-user/modal-edit-user.component';

@Component({
  standalone: true,
  imports: [
    IonModal,
    IonButton,
    IonFooter,
    IonCardContent,
    IonCardSubtitle,
    IonTitle,
    IonCard,
    IonCardTitle,
    IonCardHeader,
    IonList,
    IonIcon,
    IonCol,
    IonRow,
    IonGrid,
    IonToolbar,
    IonHeader,
    IonContent,
    CommonModule,
    IonItem,
  ],
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent implements OnInit {
  @Input() userInfo!: User | null;
  // userInfo = input<User | null>(null);
  deliveries = signal<DeliveryCreated[]>([]);

  constructor(
    private modalCtrl: ModalController,
    private apiProductsService: ApiProductsService,
    private _storeService: StoreService,
    private router: Router
  ) {
    addIcons({ closeCircleOutline, settingsOutline });
  }

  ngOnInit(): void {
    this.getDeliveries();
  }

  closeModal() {
    this.modalCtrl.dismiss(null, 'cancel'); // también puedes pasar datos si quieres
  }

  private async getDeliveries() {
    if (this.userInfo) {
      try {
        const resp = await this.apiProductsService.getDeliveriesByUser(
          this.userInfo.user_id
        );

        if (resp) {
          this.deliveries.set(resp);
        }
      } catch (error) {
        this.deliveries.set([]);
      }
    }
  }

  async openModalEditUser() {
    const modal = await this.modalCtrl.create({
      component: ModalEditUserComponent,
      componentProps: {
        userInfo: this.userInfo,
      },
      showBackdrop: true,
      canDismiss: true,
    });

    modal.onWillDismiss().then((res) => {
      if (res.role === 'cancel') {
        // this.showModalUser.set(false);
      }
    });

    modal.present();
  }
  closeSession() {
    localStorage.removeItem('user');
    this._storeService.clearData();
    this.router.navigate(['/login']);
    this.closeModal();
  }
}
