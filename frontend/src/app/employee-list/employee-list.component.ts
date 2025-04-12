import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Employee } from '../models/employee.model';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss'
})
export class EmployeeListComponent implements OnChanges {
  @Input() employees: Employee[] = [];
  @Input() isLoading: boolean = false;
  
  @Output() viewEmployee = new EventEmitter<Employee>();
  @Output() editEmployee = new EventEmitter<Employee>();
  @Output() deleteEmployee = new EventEmitter<Employee>();

  filteredEmployees: Employee[] = [];
  searchTerm: string = '';
  departmentFilter: string = '';
  statusFilter: string = '';

  getInitials(name: string): string {
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }

  get departments(): string[] {
    const depts = this.employees
      .map(emp => emp.department)
      .filter((dept): dept is string => !!dept);
    return [...new Set(depts)].sort();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['employees']) {
      this.applyFilters();
    }
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

  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
    this.applyFilters();
  }

  filterByDepartment(event: Event): void {
    this.departmentFilter = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  filterByStatus(event: Event): void {
    this.statusFilter = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }

  private applyFilters(): void {
    // Apply search
    let result = this.employees;
    
    if (this.searchTerm) {
      result = result.filter(emp => 
        emp.name.toLowerCase().includes(this.searchTerm) ||
        emp.email.toLowerCase().includes(this.searchTerm) ||
        (emp.position && emp.position.toLowerCase().includes(this.searchTerm)) ||
        (emp.department && emp.department.toLowerCase().includes(this.searchTerm))
      );
    }
    
    // Apply department filter
    if (this.departmentFilter) {
      result = result.filter(emp => emp.department === this.departmentFilter);
    }
    
    // Apply status filter
    if (this.statusFilter) {
      result = result.filter(emp => 
        (this.statusFilter === 'active' && emp.active) || 
        (this.statusFilter === 'inactive' && !emp.active)
      );
    }
    
    this.filteredEmployees = result;
  }
}
