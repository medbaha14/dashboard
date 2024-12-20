import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, map, of, switchMap } from 'rxjs';
import { AuthState } from './auth.reducers';
import { selectIsLoggedIn, selectUser } from './auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private store: Store<{ auth: AuthState }>, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.store.pipe(
      select(selectIsLoggedIn),
      switchMap(isLoggedIn => { 
        if (isLoggedIn) {
          const requiredRoles = route.data['roles'] as string[];
          if (requiredRoles) {
            return this.store.pipe(
              select(selectUser),
              map(user => {
                if (user) {
                  const userRoles = user.roles as string[];
                  const hasRequiredRole = requiredRoles.some(role => userRoles.includes(role));
                  if (!hasRequiredRole) {
                    this.router.navigate(['/unauthorized']);
                    return false;
                  }
                  return true;
                } else {
                  this.router.navigate(['/login']);
                  return false;
                }
              })
            );
          }
          return of(true);
        } else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          return of(false);
        }
      })
    );
  }
}