import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgIf, NgClass } from '@angular/common';
import { trigger, state, style, animate, transition } from '@angular/animations';

interface UserRegistration {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NgIf, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    trigger('toastAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(20px)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', animate('300ms ease-out')),
      transition('* => void', animate('200ms ease-in'))
    ])
  ]
})
export class AppComponent {
  title = 'Employee Management';
  authMode: 'login' | 'register' = 'login';
  
  user: UserRegistration = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };
  
  loginData: LoginData = {
    email: '',
    password: ''
  };
  
  message: string = '';
  messageType: string = '';

  constructor(private http: HttpClient) {}

  clearMessage(): void {
    this.message = '';
    this.messageType = '';
  }

  async submitUser(event: Event) {
    event.preventDefault();
    
    try {
      const response = await this.http.post('http://localhost:8080/api/register', this.user).toPromise();
      
      this.message = 'Usuário registrado com sucesso!';
      this.messageType = 'success-message';
      
      this.user = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
      };
      
      setTimeout(() => this.clearMessage(), 5000);
      
    } catch (error: any) {
      this.message = error.error?.message || 'Erro ao registrar usuário.';
      this.messageType = 'error-message';
      setTimeout(() => this.clearMessage(), 5000);
      console.error('Erro no registro:', error);
    }
  }
  
  async submitLogin(event: Event) {
    event.preventDefault();
    
    try {
      const response = await this.http.post('http://localhost:8080/api/login', this.loginData).toPromise();
      
      this.message = 'Login realizado com sucesso!';
      this.messageType = 'success-message';
      
      setTimeout(() => this.clearMessage(), 5000);
      
    } catch (error: any) {
      this.message = error.error?.message || 'Credenciais inválidas.';
      this.messageType = 'error-message';
      setTimeout(() => this.clearMessage(), 5000);
      console.error('Erro no login:', error);
    }
  }
}