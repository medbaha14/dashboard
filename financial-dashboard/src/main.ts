import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { authReducer } from './app/config/auth.reducers';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './app/config/auth.effects';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
      provideHttpClient(),
      provideRouter(routes),
      provideStore({ auth: authReducer }), 
      provideEffects([AuthEffects]),
  ],
}).catch(err => console.error(err));

