import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent {
  @Input() employees: Employee[] = [];
  @Input() isLoading: boolean = false;
  
  @Output() viewEmployee = new EventEmitter<Employee>();
  @Output() editEmployee = new EventEmitter<Employee>();
  @Output() deleteEmployee = new EventEmitter<Employee>();

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  onViewEmployee(employee: Employee): void {
    this.viewEmployee.emit(employee);
  }

  onEditEmployee(employee: Employee): void {
    this.editEmployee.emit(employee);
  }

  onDeleteEmployee(employee: Employee): void {
    this.deleteEmployee.emit(employee);
  }
}
