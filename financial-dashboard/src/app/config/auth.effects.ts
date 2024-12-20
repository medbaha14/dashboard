import { Injectable, Injector } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { AuthService } from '../services/AuthService';
import * as AuthActions from './auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  authService = this.injector.get(AuthService);
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(async ({ username, password }) => {
        try {
          const response = await this.authService.login(username, password);
          return AuthActions.loginSuccess({ user: response.body }); 
        } catch (error) {
          return AuthActions.loginFailure({ error: error}); 
        }
      })
    )
  );

    logout$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.logout),
            switchMap(async () => {
                try {
                    const response = await this.authService.logout();
                    return AuthActions.logoutSuccess();
                } catch (error) {
                    return AuthActions.logoutFailure({ error: error });
                }
            })
        )
    );

    logoutSuccess$ = createEffect(() =>
            this.actions$.pipe(
                ofType(AuthActions.logoutSuccess),
                tap(() => this.router.navigate(['/login']))
            ),
            {dispatch: false}
        )

        constructor(
          private actions$: Actions, 
           private injector: Injector,
          private router: Router 
        ) {}
}