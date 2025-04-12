import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee, EmployeeFormData } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss'
})
export class EmployeeFormComponent implements OnInit {
  employeeForm: FormGroup;
  isEditMode = false;
  employeeId: number | null = null;
  isLoading = false;
  formSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      position: [''],
      department: [''],
      phone: [''],
      active: [true],
      about: ['']
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isEditMode = !!id && id !== 'new';
    
    if (this.isEditMode && id) {
      this.employeeId = +id;
      this.loadEmployeeData(+id);
    }
  }

  loadEmployeeData(id: number): void {
    this.isLoading = true;
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.employeeForm.patchValue({
          name: employee.name,
          email: employee.email,
          position: employee.position,
          department: employee.department,
          phone: employee.phone,
          active: employee.active,
          about: employee.about
        });
        this.isLoading = false;
      },
      error: (error) => {
        this.notificationService.showError('Erro ao carregar dados do funcionário: ' + error.message);
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      }
    });
  }

  onSubmit(): void {
    this.formSubmitted = true;
    
    if (this.employeeForm.invalid) {
      return;
    }
    
    this.isLoading = true;
    const formData: EmployeeFormData = this.employeeForm.value;
    
    if (this.isEditMode && this.employeeId) {
      // Edit mode
      this.employeeService.updateEmployee(this.employeeId, formData).subscribe({
        next: () => {
          this.notificationService.showSuccess('Funcionário atualizado com sucesso!');
          this.router.navigate(['/employees', this.employeeId]);
          this.isLoading = false;
        },
        error: (error) => {
          this.notificationService.showError('Erro ao atualizar funcionário: ' + error.message);
          this.isLoading = false;
        }
      });
    } else {
      // Creation mode
      this.employeeService.createEmployee(formData).subscribe({
        next: (newEmployee) => {
          this.notificationService.showSuccess('Funcionário criado com sucesso!');
          this.router.navigate(['/employees', newEmployee.id]);
          this.isLoading = false;
        },
        error: (error) => {
          this.notificationService.showError('Erro ao criar funcionário: ' + error.message);
          this.isLoading = false;
        }
      });
    }
  }

  cancel(): void {
    if (this.isEditMode && this.employeeId) {
      this.router.navigate(['/employees', this.employeeId]);
    } else {
      this.router.navigate(['/dashboard']);
    }
  }
}
