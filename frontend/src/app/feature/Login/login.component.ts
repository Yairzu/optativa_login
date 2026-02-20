import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl, FormGroup, Validators } from '@angular/forms';
import { PasswordToggleComponent } from '../../components/ui/toggle.component';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PasswordToggleComponent,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  passwordVisible = signal(false);

  loginForm = new FormGroup({
    username: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10)]
    })
  });

  onVisibilityChange(value: boolean) {
    this.passwordVisible.set(value);
  }

  onLogin() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.getRawValue());
    }
  }
}