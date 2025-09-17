import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { Delivery } from 'src/app/core/interfaces/delivery';
import { DeliveryResponse } from 'src/app/core/interfaces/responses/store/delivery-response';
import {
  IonCard,
  IonCardTitle,
  IonCardHeader,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon,
  IonList,
  ModalController,
  IonAvatar,
  IonContent,
  IonLabel,
  IonItem,
} from '@ionic/angular/standalone';

import { ProductCardComponent } from '../product-card/product-card.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    IonItem,
    IonLabel,
    IonContent,
    IonAvatar,
    IonList,
    IonIcon,
    IonButton,
    IonCol,
    IonRow,
    IonGrid,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCard,
    CommonModule,
  ],
  selector: 'app-delivery-detail-modal',
  templateUrl: './delivery-detail-modal.component.html',
  styleUrls: ['./delivery-detail-modal.component.scss'],
})
export class DeliveryDetailModalComponent implements OnInit {
  @Input() delivery!: DeliveryResponse;

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  closeModal() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  getTotalDelivery(quantity: string, price: string): string {
    return (Number(quantity) * Number(price)).toFixed(2);
  }
}
