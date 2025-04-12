import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
import { EmployeeService } from '../services/employee.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, EmployeeListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  employees: Employee[] = [];
  isLoading = false;
  showDeleteModal = false;
  employeeToDelete: Employee | null = null;

  constructor(
    private employeeService: EmployeeService,
    public userService: UserService,
    private authService: AuthService,
    private notificationService: NotificationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading = true;
    this.employeeService.getAllEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.showError('Erro ao carregar funcionários: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  viewEmployeeDetails(employee: Employee): void {
    this.router.navigate(['/employees', employee.id]);
  }

  openNewEmployeeModal(): void {
    this.router.navigate(['/employees/new']);
  }

  editEmployee(employee: Employee): void {
    this.router.navigate(['/employees', employee.id, 'edit']);
  }

  confirmDeleteEmployee(employee: Employee): void {
    this.employeeToDelete = employee;
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
    this.employeeToDelete = null;
  }

  deleteEmployeeConfirmed(): void {
    if (this.employeeToDelete) {
      this.employeeService.deleteEmployee(this.employeeToDelete.id).subscribe({
        next: () => {
          this.notificationService.showSuccess(`Funcionário ${this.employeeToDelete?.name} excluído com sucesso!`);
          this.loadEmployees(); // reload the list
          this.showDeleteModal = false;
          this.employeeToDelete = null;
        },
        error: (error) => {
          this.notificationService.showError('Erro ao excluir funcionário: ' + error.message);
          this.showDeleteModal = false;
        }
      });
    }
  }

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {
        this.router.navigate(['/']);
        this.notificationService.showSuccess('Logout realizado com sucesso!');
      },
      error: () => {
        this.userService.clearAuthData();
        this.router.navigate(['/']);
        this.notificationService.showSuccess('Logout realizado com sucesso!');
      }
    });
  }
}
