import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  if (userService.isLoggedIn) {
    return true;
  }

  notificationService.showError('Acesso negado. Você precisa estar logado para acessar esta página.');
  return router.parseUrl('/login');
};