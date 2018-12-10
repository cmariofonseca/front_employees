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

  getEmployees() {
    this.empSvc.getEmployees().subscribe(res => {
      this.employeeList = res as Employee[];
      console.log(res);
    });
  }

  createEmployee(): void {
    this.empSvc.postEmployee(this.newEmployee).subscribe(res => {
      if (res) {
        this.getEmployees();
      }
      console.log(res);
    });
  }

  editEmployee() {
    const editEmployee = {
      id: this.newEmployee._id,
      name: this.newEmployee.name,
      position: this.newEmployee.position,
      office: this.newEmployee.office,
      salary: this.newEmployee.salary
    };
    this.empSvc.putEmployee(editEmployee).subscribe(res => {
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

}
