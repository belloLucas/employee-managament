import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService, LoginData } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss'
})
export class LoginFormComponent {
  loginData: LoginData = {
    email: '',
    password: ''
  };
  
  isLoading: boolean = false;
  
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}
  
  async submitLogin(event: Event) {
    event.preventDefault();
    
    if (this.isLoading) {
      return;
    }
    
    this.isLoading = true;
    
    this.authService.login(this.loginData).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Login realizado com sucesso!');
        //TODO: Redirecionar o usuário ou salvar o token
      },
      error: (error) => {
        this.notificationService.showError(error.error?.message || 'Credenciais inválidas.');
        console.error('Erro no login:', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
