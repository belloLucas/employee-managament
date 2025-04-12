import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgIf, NgClass } from '@angular/common';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent implements OnInit, OnDestroy {
  message: string = '';
  messageType: string = '';
  private subscription: Subscription | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscription = this.notificationService.notification$.subscribe(notification => {
      if (notification) {
        this.message = notification.message;
        this.messageType = notification.type;
      } else {
        this.message = '';
        this.messageType = '';
      }
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  close() {
    this.notificationService.clearNotification();
  }
}
