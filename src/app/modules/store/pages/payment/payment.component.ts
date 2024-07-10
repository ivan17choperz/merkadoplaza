import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PaymentComponent { }
