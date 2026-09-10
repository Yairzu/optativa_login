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
  private fb = inject(FormBuilder);

  passwordVisible = signal(false);

  public loginForm: FormGroup = this.fb.group({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(30)],
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)],
    }),
  });

  onVisibilityChange(value: boolean) {
    this.passwordVisible.set(value);
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const formValue = this.loginForm.getRawValue();

    const object: login = {
      nick_user: formValue.username,
      password_user: formValue.password,
    };

    this.accessService.login(object).subscribe({
      next: (data) => {
        
        if (!data?.access_token || !data?.user) {
          alert('Invalid server response.');
          return;
        }

        localStorage.setItem('token', data.access_token);
        localStorage.setItem('user', JSON.stringify(data.user));

        this.redirectByRole(data.user.id_rol);
      },

      error: (err) => {
        switch (err.status) {
          case 401:
            alert('Invalid credentials.');
            break;
          case 500:
            alert('Server error. Please try again later.');
            break;
          default:
            alert('Unexpected error occurred.');
        }
      }
    });
  }

  private redirectByRole(role: number) {
    switch (role) {
      case 1:
        this.router.navigate(['/admin/home.admin']);
        alert('Welcome, admin!');
        break;
      case 2:
        this.router.navigate(['/user/home.user']);
        alert('Welcome, user!');
        break;
      default:
        this.router.navigate(['/login']);
    }
  }
}