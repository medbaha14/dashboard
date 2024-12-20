import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthGuard } from './config/canActive';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path: 'finnhub',
        loadChildren: () =>
          import('../../projects/finnhub/src/app/app.routes').then((m) => m.routes),
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] },
      },
      {
        path: 'twelvedata',
        loadChildren: () =>
          import('../../projects/twelvedata/src/app/app.routes').then((m) => m.routes),
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_USER', 'ROLE_ADMIN'] },
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];
