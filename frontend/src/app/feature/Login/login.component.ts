import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { PasswordToggleComponent } from '../../components/ui/toggle.component';
import { AccessService } from '../../services/access.service';
import { Router } from '@angular/router';
import { login } from '../../interface/login';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordToggleComponent],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private accessService = inject(AccessService);
  private router = inject(Router);
  public FormBuilder = inject(FormBuilder);

  passwordVisible = signal(false);

  public loginForm: FormGroup = this.FormBuilder.group({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  onVisibilityChange(value: boolean) {
    this.passwordVisible.set(value);
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.getRawValue());

      const object: login = {
        nick_user: this.loginForm.value.username,
        password_user: this.loginForm.value.password,
      };
      this.accessService.login(object).subscribe({
        next: (date) => {
          console.log(date);
          if (date.access_token) {
            localStorage.setItem('token', date.access_token);
            localStorage.setItem('user', JSON.stringify(date.user));

            const role = date.user.id_rol;

            if (role === 1) {
              this.router.navigate(['/admin/home.admin']);
            }
            else if (role === 2) {
              this.router.navigate(['/user/home.user']);
            }
            else{
              this.router.navigate(['/login']);
            }
          } else {
            alert('Credenciales incorrectas, por favor intente nuevamente.');
          }
        },
        error: (err) => {
          console.error(err.message);
          alert('Ocurrió un error durante el inicio de sesión. Por favor, inténtelo de nuevo más tarde.');
        }
      });
    }
  }
}
