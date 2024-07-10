import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonContent, IonToast } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    IonToast,
    IonContent,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class RegisterComponent {
  private _authServices: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _fb: FormBuilder = inject(FormBuilder);

  public registerForm!: FormGroup;
  public showToastErrorMsg = signal<boolean>(false);
  public msgError = signal<string>('');
  public loading = signal<boolean>(false);

  constructor() {
    this.registerForm = this._fb.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      barrio: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      contraseña: ['', [Validators.required, Validators.minLength(4)]],
      contraseña2: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public async register(): Promise<void> {
    if (this.registerForm.invalid) return;
    this.loading.set(true);
    let sendData = {
      ...this.registerForm.value,
      slcCiudad: 856,
      slcTipoDocumento: 'CC',
    };
    const { status, error, data } = await this._authServices.register(sendData);
    if (status == 'error') {
      this.showToastErrorMsg.set(true);
      this.msgError.set('Error al registrar usuario');
      this.loading.set(false);
      return;
    }
    this._router.navigate(['/modules/store']);
  }
}
