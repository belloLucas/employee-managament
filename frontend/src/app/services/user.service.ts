import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);
  
  public currentUser$ = this.currentUserSubject.asObservable();
  public token$ = this.tokenSubject.asObservable();
  
  constructor() {
    this.loadUserFromStorage();
  }
  
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }
  
  get token(): string | null {
    return this.tokenSubject.value;
  }
  
  get isLoggedIn(): boolean {
    return !!this.token;
  }
  
  setAuthData(authResponse: AuthResponse): void {
    localStorage.setItem('auth_token', authResponse.access_token);
    localStorage.setItem('user', JSON.stringify(authResponse.user));
    
    this.tokenSubject.next(authResponse.access_token);
    this.currentUserSubject.next(authResponse.user);
  }
  
  clearAuthData(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    
    this.tokenSubject.next(null);
    this.currentUserSubject.next(null);
  }
  
  private loadUserFromStorage(): void {
    try {
      const token = localStorage.getItem('auth_token');
      const userString = localStorage.getItem('user');
      
      if (token && userString) {
        const user = JSON.parse(userString) as User;
        this.tokenSubject.next(token);
        this.currentUserSubject.next(user);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário do localStorage:', error);
      this.clearAuthData();
    }
  }
}