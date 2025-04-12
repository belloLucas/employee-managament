import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  login(loginData: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  register(userData: UserRegistration): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
}