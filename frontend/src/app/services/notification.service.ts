import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Notification {
  message: string;
  type: 'success-message' | 'error-message';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  notification$ = this.notificationSubject.asObservable();
  
  constructor() {}
  
  showSuccess(message: string): void {
    this.notificationSubject.next({ message, type: 'success-message' });
    this.autoClose();
  }
  
  showError(message: string): void {
    this.notificationSubject.next({ message, type: 'error-message' });
    this.autoClose();
  }
  
  clearNotification(): void {
    this.notificationSubject.next(null);
  }
  
  private autoClose(): void {
    setTimeout(() => {
      this.clearNotification();
    }, 5000);
  }
}