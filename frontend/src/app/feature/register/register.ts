import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PasswordToggleComponent } from '../../components/ui/toggle.component';
import { Router } from '@angular/router';
import { AccessService } from '../../services/access.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, PasswordToggleComponent],
  templateUrl: './register.html',
})
export class Register {
  private accessService = inject(AccessService);
  private router = inject(Router);
  public FormBuilder = inject(FormBuilder);

  passwordVisible = signal(false);

  public registerForm: FormGroup = this.FormBuilder.group({
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

  onRegister() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.getRawValue());
    }
  }
}
