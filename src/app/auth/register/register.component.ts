import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonToast,
  IonInput,
  IonInputPasswordToggle,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
} from '@ionic/angular/standalone';

import { CreateUser } from 'src/app/core/interfaces/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { StoreService } from 'src/app/core/services/store.service';
import { customEmailValidator } from 'src/app/core/validators/email.validator';
import { validNameValidator } from 'src/app/core/validators/names.validator';
import { strongPasswordValidator } from 'src/app/core/validators/password.validator';
import { colombianPhoneValidator } from 'src/app/core/validators/phone.validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    IonInput,
    IonInputPasswordToggle,
    IonToast,
    IonContent,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    IonSelect,
    IonSelectOption,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent implements OnInit {
  private _authServices: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _fb: FormBuilder = inject(FormBuilder);
  private _storageServices: StoreService = inject(StoreService);

  public registerForm!: FormGroup;
  public showToastErrorMsg = signal<boolean>(false);
  public msgError = signal<string>('');
  public loading = signal<boolean>(false);
  public showErrors = signal<boolean>(false);

  public departments = signal<{ idDepartamento: string; nombre: string }[]>([]);
  public cities = signal<{ idCiudad: string; nombre: string }[]>([]);

  constructor() {
    this.registerForm = this._fb.group({
      nombre: ['', [Validators.required, validNameValidator()]],
      apellido: ['', [Validators.required, validNameValidator()]],
      sexo: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required]],
      tipoDocumento: ['', [Validators.required]],
      numDocumento: ['', [Validators.required]],
      ciudad: ['', [Validators.required]],
      barrio: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      celular: ['', [Validators.required, colombianPhoneValidator()]],
      telefono: ['', [Validators.required]],
      email: [
        '',
        [Validators.required, Validators.email, customEmailValidator()],
      ],
      contraseña: ['', [Validators.required, strongPasswordValidator()]],
    });
  }

  ngOnInit(): void {
    this.getDepartments();
    this.getCities();
  }

  public async getDepartments() {
    const { status, error, data } = await this._authServices.getDepartments();
    if (status == 'error') {
      this.showToastErrorMsg.set(true);
      this.msgError.set('Error al obtener departamentos');
      this.loading.set(false);
      return;
    }
    this.departments.set(data);
  }

  public async getCities() {
    const { status, error, data } = await this._authServices.getCities();
    if (status == 'error') {
      this.showToastErrorMsg.set(true);
      this.msgError.set('Error al obtener ciudades');
      this.loading.set(false);
      return;
    }
    this.cities.set(data);
  }

  public async register(): Promise<void> {
    try {
      this.showErrors.set(false);
      this.loading.set(true);
      if (this.registerForm.invalid) {
        this.loading.set(false);
        this.showErrors.set(true);
        console.log(this.registerForm.errors);
        return;
      }

      const saveUser: CreateUser = {
        idRol: 2,
        idCiudad: this.registerForm.value.ciudad,
        idEmpresa: 3,
        email: this.registerForm.value.email,
        password: this.registerForm.value.contraseña,
        tipoDocumento: this.registerForm.value.tipoDocumento,
        numDocumento: this.registerForm.value.numDocumento,
        nombre: this.registerForm.value.nombre,
        apellido: this.registerForm.value.apellido,
        sexo: this.registerForm.value.sexo,
        fechaNacimiento: this.registerForm.value.fechaNacimiento,
        direccion: this.registerForm.value.direccion,
        barrio: this.registerForm.value.barrio,
        celular: this.registerForm.value.celular,
        telefono: this.registerForm.value.telefono,
      };

      const data = await this._authServices.register(saveUser);

      if (data.status == 'success') {
        this._storageServices.saveData('current_user_id', data.data);
        this._router.navigate(['/modules/store']);
      }
    } catch (error) {
      this.showErrors.set(true);
    }
  }
}
