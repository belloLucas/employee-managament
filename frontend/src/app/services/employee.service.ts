import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Employee, EmployeeFormData } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8080/api/employees';

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<{employees: Employee[]}>(this.apiUrl).pipe(
      map(response => response.employees)
    );
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.http.get<{employee: Employee}>(`${this.apiUrl}/${id}`).pipe(
      map(response => response.employee)
    );
  }

  createEmployee(employee: EmployeeFormData): Observable<Employee> {
    return this.http.post<{employee: Employee}>(this.apiUrl, employee).pipe(
      map(response => response.employee)
    );
  }

  updateEmployee(id: number, employee: EmployeeFormData): Observable<Employee> {
    return this.http.put<{employee: Employee}>(`${this.apiUrl}/${id}`, employee).pipe(
      map(response => response.employee)
    );
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}