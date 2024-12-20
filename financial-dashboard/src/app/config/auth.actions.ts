import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Login Page] Login', 
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth API] Login Success',
  props<{ user: any }>() 
);

export const loginFailure = createAction(
  '[Auth API] Login Failure',
  props<{ error: any }>() 
);

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth API] Logout Success');
export const logoutFailure = createAction('[Auth API] Logout Failure', props<{ error: any }>());
