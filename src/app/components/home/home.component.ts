import { Component, OnInit, Input, ViewChild, ElementRef} from '@angular/core';
import { Employee } from '../../models/Employee';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { EmployeeService } from 'src/app/services/employee.service';
import { Table } from 'primeng/table';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  styles: [`
    :host ::ng-deep .p-dialog .product-image {
        width: 150px;
        margin: 0 auto 2rem auto;
        display: block;
    }
  `],
  providers: [ConfirmationService]
})

export class HomeComponent implements OnInit {
  dateValue!: Date;
  employees: Employee[] = [];
  msgs: Message[] = [];
  position!: string;
  employee!: Employee;
  submitted!: boolean;
  productDialog!: boolean;
  cols: any[] = [];
  _selectedColumns: any[] = [];
  exportColumns: any[] = [];
  selectedProducts: any;
  loading: boolean = true;
  statuses: any[] = [];

  @ViewChild('dt') table!: Table ;

  constructor(private employeeService: EmployeeService, private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig) { }

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.employeeService.getEmployeeSmall().then(data => this.employees = data);

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'first_name', header: 'First Name' },
      { field: 'last_name', header: 'Last Name' },
      { field: 'status', header: 'STATUS' },
      { field: 'description', header: 'Description' },
      // { field: 'init_date', header: 'Start Date' }
    ];

    this._selectedColumns = this.cols;

    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
  }

  onActivityChange(e: any) {
    const value = e.target.value;
    if (value && value.trim().length) {
        const activity = parseInt(value);

        if (!isNaN(activity)) {
            this.table.filter(activity, 'activity', 'gte');
        }
    }
}

onDateSelect(value: any) {
    this.table.filter(this.formatDate(value), 'date', 'equals')
}

formatDate(date: any) {
    let month = date.getMonth() + 1;
    let day = date.getDate();

    if (month < 10) {
        month = '0' + month;
    }

    if (day < 10) {
        day = '0' + day;
    }

    return date.getFullYear() + '-' + month + '-' + day;
}

onRepresentativeChange(e: any) {
    this.table.filter(e.value, 'representative', 'in')
}

  dateFormat(){
    console.log("hola")
  }

  openNew() {
    this.employee = {};
    this.submitted = false;
    this.productDialog = true;
  }

  @Input() get selectedColumns(): any[] {
    return this._selectedColumns;
  }

  set selectedColumns(val: any[]) {
    //restore original order
    this._selectedColumns = this.cols.filter(col => val.includes(col));
  }

  editProduct(employee: Employee) {
    this.employee = { ...employee };
    this.productDialog = true;
  }

  deleteProduct(employee: Employee) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + employee.first_name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.employees = this.employees.filter(val => val.id !== employee.id);
        this.employee = {};
        this.msgs = [{ severity: 'info', summary: 'Successful', detail: 'You have deleted the employee with the code: ' + employee.employee_code, life: 1 }];
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.employee?.first_name?.trim()) {
      if (this.employee.id) {
        this.employees[this.findIndexById(this.employee.id)] = this.employee;
        this.msgs = [{ severity: 'success', summary: 'Successful', detail: 'You have updated', life: 1 }];
      }
      else {
        this.employee.id = this.createId();
        this.employee.employee_code = this.createCode();
        this.employees.push(this.employee);
        this.msgs = [{ severity: 'success', summary: 'Successful', detail: 'You have created a new employee', life: 1 }];
      }

      this.employees = [...this.employees];
      this.productDialog = false;
      this.employee = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.employees.length; i++) {
      if (this.employees[i].id === id) {
        index = i;
        break;
      }
    }
    return index;
  }

  createCode(): string {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 9; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  createId(): string {
    let id = '';
    var chars = '0123456789';
    for (var i = 0; i < 4; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

}

