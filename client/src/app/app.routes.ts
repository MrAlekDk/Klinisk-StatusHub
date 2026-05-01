import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';

export const routes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent
  },
  { path: 'login',
    component: LoginPageComponent
  }
];
