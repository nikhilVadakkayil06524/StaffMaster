import { Component, ElementRef, ViewChild, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../../Models/employee';
import { EmployeeService } from '../../Services/employee.service';
import { Modal } from 'bootstrap';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('myModal') myModal!: ElementRef;
  employeeList: Employee[] = [];
  employeeForm: FormGroup = new FormGroup({});
  modalInstance: Modal | null = null;

  constructor(private http: HttpClient, private empService: EmployeeService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setFormState();
    this.getEmployees();
  }

  ngAfterViewInit() {
    if (this.myModal) {
      console.log(this.myModal);
    }
  }

  openModal() {
    if (this.myModal) {
      this.modalInstance = new Modal(this.myModal.nativeElement);
      this.modalInstance.show();
    }
  }

  closeModal() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }

  getEmployees() {
    this.empService.getAllEmployees().subscribe((res) => {
      this.employeeList = res;
    });
  }

  setFormState() {
    this.employeeForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required]],
      age: ['', [Validators.required]],
      salary: ['', [Validators.required]],
      status: [false] // Default checkbox value
    });
  }
  formValues:any;
  onSubmit() {
    console.log(this.employeeForm.value);
    if (this.employeeForm.invalid) {
      alert('Please fill all fields');
      return;
    }
     this.formValues = this.employeeForm.value;
     this.empService.addEmployees(this.formValues).subscribe((res) => {

      alert('Employee Added Successfully');
      
      this.getEmployees();
      
      this.employeeForm.reset();
      
      this.closeModal();
      }
    );
  }

  ngOnDestroy(): void {
    // Cleanup logic if needed
  }
}
