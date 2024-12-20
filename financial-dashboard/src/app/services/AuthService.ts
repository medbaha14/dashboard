import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { loginSuccess, loginFailure, logout } from '../config/auth.actions'; 

const AUTH_API = 'http://localhost:8081/api/auth/';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    withCredentials: true,
    observe: 'response' as 'response',
  };

  async login(username: string, password: string): Promise<any> {
    const url = `${AUTH_API}signin`;
    const body = { username, password };
  
    try {
      const response = await firstValueFrom(this.http.post(url, body, this.httpOptions));
      this.store.dispatch(loginSuccess({ user: response.body }));
      return response;
    } catch (error) {
      this.store.dispatch(loginFailure({ error: error }));
      console.error('Error during login:', error);
      throw error;
    }
  }


  async register(username: string, email: string, password: string): Promise<any> {
    const url = `${AUTH_API}signup`;
    const body = { "username":username, "email":email, "password":password };
  console.log(body);
  
    try {
      const response = await firstValueFrom(this.http.post(url, body, this.httpOptions));
      this.store.dispatch(loginSuccess({ user: response.body })); 
      return response;
    } catch (error) {
      this.store.dispatch(loginFailure({ error: error })); 
      console.error('Error during registration:', error);
      throw error; 
    }
  }

  async logout(): Promise<any> {
    const url = `${AUTH_API}signout`;
  
    try {
      const response = await firstValueFrom(this.http.post(url, {}, this.httpOptions));
      this.store.dispatch(logout());
      return response; 
    } catch (error) {
      console.error('Error during logout:', error);
      this.store.dispatch(logout());
      throw error; 
    }
  }
}