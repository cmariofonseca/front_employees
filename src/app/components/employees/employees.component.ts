import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/services/employee.service';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  newEmployee: Employee;
  employeeList: Employee[];

  constructor(private empSvc: EmployeeService) { }

  ngOnInit(): void {
    this.employeeList = [];
    this.resetForm();
    this.getEmployees();
  }

  resetForm(): void {
    this.newEmployee = {
      id: '',
      name: '',
      position: '',
      office: '',
      salary: undefined
    };
  }

  selectedEmployee(employee: Employee) {
    this.newEmployee = {
      _id: employee._id,
      name: employee.name,
      position: employee.position,
      office: employee.office,
      salary: employee.salary
    };
  }

  createEmployee(): void {
    this.empSvc.postEmployee(this.newEmployee).subscribe(res => {
      if (res) {
        console.log(res);
        this.resetForm();
        this.getEmployees();
      }
    });
  }

  editEmployee() {
    this.empSvc.putEmployee(this.newEmployee).subscribe(res => {
      if (res) {
        console.log(res);
        this.resetForm();
        this.getEmployees();
      }
    });
  }

  deleteEmployee() {
    this.empSvc.deleteEmployee(this.newEmployee._id).subscribe(res => {
      if (res) {
        console.log(res);
        this.resetForm();
        this.getEmployees();
      }
    });
  }

  getEmployees() {
    this.empSvc.getEmployees().subscribe(res => {
      if (res) {
        console.log(res);
        this.employeeList = res as Employee[];
      }
    });
  }

}
