import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./feature/admin/home.admin/home.admin')
        .then(m => m.HomeAdmin),
    canActivate: [AuthGuard],
    data: { showNavbar: true }
  },
  {
    path: 'users',
    loadComponent: () =>
      import('./feature/users/home.users/home.users')
        .then(m => m.HomeUsers),
    canActivate: [AuthGuard],
    data: { showNavbar: true }
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./feature/login/login.component')
        .then(m => m.LoginComponent),
    data: { showNavbar: false }
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./feature/register/register')
        .then(m => m.Register),
    data: { showNavbar: false }
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full' 
  },
  {
    path: '**',
    redirectTo: '/login'
  }
  
];