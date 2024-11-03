import { Routes } from '@angular/router';
import { AuthPageComponent } from './pages/auth-page/auth-page.component';
import { AppPageComponent } from './pages/app-page/app-page.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
  },
  {
    path: 'app',
    component: AppPageComponent,
  },
  {
    path: '**',
    redirectTo: '',
  }
];
