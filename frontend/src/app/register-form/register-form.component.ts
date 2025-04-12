import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService, UserRegistration } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.scss'
})
export class RegisterFormComponent {
  user: UserRegistration = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };
  
  isLoading: boolean = false;
  
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}
  
  async submitRegister(event: Event) {
    event.preventDefault();
    
    if (this.isLoading) {
      return;
    }
    
    this.isLoading = true;
    
    this.authService.register(this.user).subscribe({
      next: (response) => {
        this.notificationService.showSuccess('Usuário registrado com sucesso!');
        this.user = {
          name: '',
          email: '',
          password: '',
          password_confirmation: ''
        };
      },
      error: (error) => {
        this.notificationService.showError(error.error?.message || 'Erro ao registrar usuário.');
        console.error('Erro no registro:', error);
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
