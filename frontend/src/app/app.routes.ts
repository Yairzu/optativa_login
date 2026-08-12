import { Routes } from '@angular/router';
import { LoginComponent } from './feature/Login/login.component';
import { HomeAdmin } from './feature/admin/home.admin/home.admin';
import { HomeUsers } from './feature/users/home.users/home.users';
import { Register } from './feature/register/register';
import { authGuard } from './auth/auth-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',  
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: 'admin/home.admin',
    component: HomeAdmin,
    canActivate: [authGuard],
  },
  {
    path: 'user/home.user',
    component: HomeUsers,
    canActivate: [authGuard],
  },
];
