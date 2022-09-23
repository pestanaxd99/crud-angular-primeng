import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/Employee';

@Injectable()
export class EmployeeService {

  status: string[] = ['SUSPENDED', 'ACTIVE', 'INACTIVE', 'FIRED'];

  employeeNames: string[] = [
    "Bamboo Watch",
    "Black Watch",
    "Blue Band",
    "Blue T-Shirt",
    "Bracelet",
    "Brown Purse",
    "Chakra Bracelet",
    "Galaxy Earrings",
    "Game Controller",
    "Gaming Set",
    "Gold Phone Case",
    "Green Earbuds",
    "Green T-Shirt",
    "Grey T-Shirt",
    "Headphones",
    "Light Green T-Shirt",
    "Lime Band",
    "Mini Speakers",
    "Painted Phone Case",
    "Pink Band",
    "Pink Purse",
    "Purple Band",
    "Purple Gemstone Necklace",
    "Purple T-Shirt",
    "Shoes",
    "Sneakers",
    "Teal T-Shirt",
    "Yellow Earbuds",
    "Yoga Mat",
    "Yoga Set",
  ];

  constructor(private http: HttpClient) { }

  getEmployeeSmall() {
    return this.http.get<any>('assets/employee-data.json')
      .toPromise()
      .then(res => <Employee[]>res.data)
      .then(data => { return data; });
  }

  getEmployee() {
    return this.http.get<any>('assets/employee-data.json')
      .toPromise()
      .then(res => <Employee[]>res.data)
      .then(data => { return data; });
  }

  getEmployeeWithOrdersSmall() {
    return this.http.get<any>('assets/employee-orders-small.json')
      .toPromise()
      .then(res => <Employee[]>res.data)
      .then(data => { return data; });
  }

  generateEmployee(): Employee {
    const employee: Employee = {
      id: this.generateId(),
      employee_code: this.generateCode(),
      first_name: this.generateName(),
      init_date: new Date,
      description: " ",
      position_employee: " ",
      status: this.generateStatus(),
    };
    return employee;
  }

  generateId() {
    let text = "";
    let possible = "0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateCode() {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  generateName() {
    return this.employeeNames[Math.floor(Math.random() * Math.floor(30))];
  }

  generateStatus() {
    return this.status[Math.floor(Math.random() * Math.floor(4))];
  }
}