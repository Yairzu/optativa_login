import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordToggleComponent } from '../../components/ui/toggle.component';
import { Router } from '@angular/router';
import { AccessService } from '../../services/access.service';
import { register } from '../../interface/register';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, PasswordToggleComponent],
  templateUrl: './register.html',
})
export class Register {

  private accessService = inject(AccessService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  passwordVisible = signal(false);
  confirmPasswordVisible = signal(false);

  public registerForm: FormGroup = this.fb.group(
    {
      name_user: ['', Validators.required],
      surname_user: ['', Validators.required],
      nick_user: ['', Validators.required],
      email_user: ['', [Validators.required, Validators.email]],
      password_user: ['', [Validators.required, Validators.minLength(3)]],
      password_user_confirmation: ['', Validators.required],
    },
    { validators: this.passwordMatchValidator }
  );

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password_user')?.value;
    const confirm = control.get('password_user_confirmation')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onVisibilityChange(value: boolean) {
    this.passwordVisible.set(value);
  }

  onConfirmVisibilityChange(value: boolean) {
    this.confirmPasswordVisible.set(value);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const formValue = this.registerForm.getRawValue();

    const object: register = {
      name_user: formValue.name_user,
      surname_user: formValue.surname_user,
      nick_user: formValue.nick_user,
      email_user: formValue.email_user,
      password_user: formValue.password_user,
      password_user_confirmation: formValue.password_user_confirmation,
    };

    this.accessService.register(object).subscribe({
      next: (data) => {
        if (!data?.message) {
          alert('Unexpected server response.');
          return;
        }

        alert('Registro Exitoso.');

        this.router.navigate(['/login'])
      },

      error: (err) => {
        switch (err.status) {
          case 422:
            alert('Email or nickname en uso.');
            break;
          case 500:
            alert('Server error. Please try again later.');
            break;
          default:
            alert('Registration failed.');
        }
      }
    });
  }
}