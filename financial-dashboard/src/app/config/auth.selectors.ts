import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducers'; 

export const selectAuthState = createFeatureSelector<AuthState>('auth'); 


export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: AuthState) => state.isLoggedIn
);

export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.user
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);

export const selectIsLoading = createSelector(
    selectAuthState,
    (state: AuthState) => state.loading
);