import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-employee-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-view.component.html',
  styleUrl: './employee-view.component.scss'
})
export class EmployeeViewComponent implements OnInit {
  employee: Employee | null = null;
  isLoading = false;
  showDeleteModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadEmployee();
  }

  loadEmployee(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.notificationService.showError('ID do funcionário não encontrado.');
      this.router.navigate(['/dashboard']);
      return;
    }

    this.isLoading = true;
    this.employeeService.getEmployeeById(+id).subscribe({
      next: (data) => {
        this.employee = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.showError('Erro ao carregar dados do funcionário: ' + error.message);
        this.isLoading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/dashboard']);
  }

  editEmployee(): void {
    if (this.employee) {
      this.router.navigate(['/employees', this.employee.id, 'edit']);
    }
  }

  confirmDeleteEmployee(): void {
    this.showDeleteModal = true;
  }

  cancelDelete(): void {
    this.showDeleteModal = false;
  }

  deleteEmployeeConfirmed(): void {
    if (this.employee) {
      this.employeeService.deleteEmployee(this.employee.id).subscribe({
        next: () => {
          this.notificationService.showSuccess(`Funcionário ${this.employee?.name} excluído com sucesso!`);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.notificationService.showError('Erro ao excluir funcionário: ' + error.message);
          this.showDeleteModal = false;
        }
      });
    }
  }
}
