export interface Employee {
  id: number;
  name: string;
  email: string;
  position?: string;
  department?: string;
  phone?: string;
  active: boolean;
  about?: string;
  created_at: string;
  updated_at: string;
}

export interface EmployeeFormData {
  name: string;
  email: string;
  position?: string;
  department?: string;
  phone?: string;
  active: boolean;
  about?: string;
}