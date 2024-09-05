import { Routes } from '@angular/router';
import { authGuard } from './Gaurds/auth.guard';

export const routes: Routes = [

  // Redirect to Login Component
  {
    path: '', redirectTo: '/login', pathMatch: 'full'
  },


  // Path to login Component
  {
    path: 'login',
    loadComponent: ()=> import('./Components/login/login.component').then(m => m.LoginComponent)
  },

  // Path to Registration Component
  {
    path: 'registration',
    loadComponent: ()=> import('./Components/registration/registration.component').then(m => m.RegistrationComponent)
  },
   // Path to Home Component
  {
    path: 'home', canActivate:[authGuard],
    loadComponent: ()=> import('./Components/home/home.component').then(m => m.HomeComponent)
  },
  // Path to Add new Todo Component
  {
    path: 'add-todo',canActivate:[authGuard],
    loadComponent: ()=> import('./Components/add-todo/add-todo.component').then(m => m.AddTodoComponent)
  },
  // Path to Live Todo Component
  {
    path: 'live-todo',canActivate:[authGuard],
    loadComponent: ()=> import('./Components/livetodo/livetodo.component').then(m => m.LivetodoComponent)
  },
];
