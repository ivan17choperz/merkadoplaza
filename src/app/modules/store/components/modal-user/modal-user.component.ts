import { Component, inject, input, OnInit, output } from '@angular/core';
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
  IonLabel,
  IonList,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    IonList,

    IonItem,
    IonIcon,
    IonCol,
    IonRow,
    IonGrid,
    IonToolbar,
    IonHeader,
    IonContent,
    CommonModule,
  ],
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.scss'],
})
export class ModalUserComponent {
  userInfo = input();
  constructor(private modalCtrl: ModalController) {}

  closeModal() {
    this.modalCtrl.dismiss(null, 'cancel'); // también puedes pasar datos si quieres
  }
}
