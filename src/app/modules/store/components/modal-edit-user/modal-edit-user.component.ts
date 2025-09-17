import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  IonHeader,
  IonFooter,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonInput,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonIcon,
  ModalController,
} from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreService } from 'src/app/core/services/store.service';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  standalone: true,
  imports: [
    IonIcon,
    IonCol,
    IonRow,
    IonGrid,
    IonButton,
    IonInput,
    IonItem,
    IonContent,
    IonTitle,
    IonToolbar,
    IonFooter,
    IonHeader,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  selector: 'app-modal-edit-user',
  templateUrl: './modal-edit-user.component.html',
  styleUrls: ['./modal-edit-user.component.scss'],
})
export class ModalEditUserComponent implements OnInit {
  formUpdateUser!: FormGroup;
  blockBtn = signal(true);
  showLoader = signal(false);

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private _storeService: StoreService,
    private modalCtrl: ModalController
  ) {
    this.formUpdateUser = this.fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      celular: [
        '',
        [
          Validators.required,
          Validators.pattern('^3[0-9]{9}$'),
          Validators.minLength(10),
        ],
      ],
      direccion: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contrasena: [''],
    });
  }

  ngOnInit() {
    this.populateForm();
  }

  async populateForm() {
    this.showLoader.set(true);
    const info = await this._storeService.getData('current_user');
    const { data, status } = await this.authService.getUserById(info.user_id);
    console.log(data);
    if (data) {
      this.formUpdateUser.patchValue({
        nombre: data.nombre,
        apellido: data.apellido,
        celular: data.celular,
        direccion: data.direccion,
        email: data.email,
      });
      this.blockBtn.set(false);
      this.showLoader.set(false);
    }
  }

  async updateUser() {
    if (this.formUpdateUser.valid) {
      this.showLoader.set(true);
      const info = await this._storeService.getData('current_user');
      const userData = this.formUpdateUser.value;
      const resp = await this.authService.updateUser(info.user_id, userData);
      if (resp.status === 'success') {
        console.log(resp);
        this.showLoader.set(false);
        this.closeModal();
      }
    } else {
      this.showLoader.set(false);
      console.log('Form is invalid');
    }
  }

  closeModal() {
    this.modalCtrl.dismiss(null, 'cancel'); // también puedes pasar datos si quieres
  }
}
