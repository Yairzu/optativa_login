import { Routes } from '@angular/router';
import { LoginComponent } from './feature/Login/login.component';
import { HomeAdmin } from './feature/admin/home.admin/home.admin';
import { HomeUsers } from './feature/users/home.users/home.users';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  /*{
    path: 'register',
    component: RegisterComponent,
  },*/
  {
    path: 'admin/home.admin',
    component: HomeAdmin,
  },
  {
    path: 'user/home.user',
    component: HomeUsers,
  },
  {
    path: '**',
    redirectTo: 'login',
  }
];
