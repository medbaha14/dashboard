import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isLoggedIn: boolean;
  user: any | null;
  error: string | null; 
  loading: boolean; 
}

const initialState: AuthState = {
  isLoggedIn: false,
  user: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(AuthActions.login, (state) => ({ ...state, loading: true, error: null })), 
  on(AuthActions.loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user,
    loading: false,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoggedIn: false,
    error,
    loading: false,
  })),
    on(AuthActions.logout, (state) => ({ ...state, loading: true })),
    on(AuthActions.logoutSuccess, (state) => ({ ...initialState })),
    on(AuthActions.logoutFailure, (state, { error }) => ({ ...state, error, loading: false }))

);