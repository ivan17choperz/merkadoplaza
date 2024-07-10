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
import { IonButton, IonToast } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth.service';

const ionicComponents = [IonButton];

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    IonToast,
    CommonModule,
    ReactiveFormsModule,
    ...ionicComponents,
    RouterModule,
  ],
  templateUrl: `./login.component.html`,
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LoginComponent {
  private _router: Router = inject(Router);
  private _fb: FormBuilder = inject(FormBuilder);
  private _authServices: AuthService = inject(AuthService);

  public loginForm!: FormGroup;

  public showToastErrorMsg = signal<boolean>(false);
  public msgError = signal<string>('');
  public loading = signal<boolean>(false);
  constructor() {
    this.loginForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  public async login(): Promise<void> {
    if (this.loginForm.invalid) {
      return;
    }

    this.loading.set(true);
    const { status, error } = await this._authServices.login(
      this.loginForm.value
    );

    if (status == 'error') {
      this.showToastErrorMsg.set(true);
      this.msgError.set(error);
      this.loading.set(false);
      return;
    }

    this._router.navigateByUrl('modules/store');
  }
}
