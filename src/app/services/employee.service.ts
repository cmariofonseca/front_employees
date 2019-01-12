import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {

  selectedEmployee: Employee;
  employees: Employee[];
  readonly urlApi: string;

  constructor(private http: HttpClient) {
    this.employees = [];
    this.selectedEmployee = {
      id: '',
      name: '',
      position: '',
      office: '',
      salary: 0
    };
    this.urlApi = 'http://localhost:3000/employees';
  }

  postEmployee(employee: Employee) {
    return this.http.post(this.urlApi, employee);
  }

  putEmployee(employee: Employee) {
    return this.http.put(`${this.urlApi}/${employee._id}`, employee);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(`${this.urlApi}/${_id}`);
  }

  getEmployees() {
    return this.http.get(this.urlApi);
  }

}
