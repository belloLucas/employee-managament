import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { 
    path: 'login', 
    loadComponent: () => import('./login-page/login-page.component').then(m => m.LoginPageComponent)
  },
  { 
    path: 'dashboard', 
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/new', 
    loadComponent: () => import('./employee-form/employee-form.component').then(m => m.EmployeeFormComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/:id', 
    loadComponent: () => import('./employee-view/employee-view.component').then(m => m.EmployeeViewComponent),
    canActivate: [AuthGuard]
  },
  { 
    path: 'employees/:id/edit', 
    loadComponent: () => import('./employee-form/employee-form.component').then(m => m.EmployeeFormComponent),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: '/login' }
];
