import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page/login-page.component';
import { HomePageComponent } from './pages/home-page/home-page/home-page.component';
import { authGuard } from './guards/authguard/auth.guard';

export const routes: Routes = [
  { path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomePageComponent,
    canActivate: [authGuard]
  },
  { path: 'login',
    component: LoginPageComponent
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];
