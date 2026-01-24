import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-20px)' }),
        animate('400ms cubic-bezier(0.4, 0.0, 0.2, 1)', 
          style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms cubic-bezier(0.4, 0.0, 0.2, 1)', 
          style({ opacity: 0, transform: 'translateY(-20px)' }))
      ])
    ])
  ]
})
export class UserManagementComponent {
  activeTab: 'employee' | 'partner' = 'employee';

  // ✅ ADD: Employee dropdown data
employees: any[] = [];
selectedEmployee: string = '';
selectedManager: string = '';
  
  // API Base URL
  private apiUrl = 'https://api.aadifintech.com/api/auth';
  // private apiUrl = 'http://localhost:5000/api/auth';
    // private apiUrl: 'https://aadifintech-backend.onrender.com/api'  // when deployed (e.g. AWS)


  // Loading and message states
  isLoading = false;
  successMessage = '';
  errorMessage = '';
  showSuccessPopup = false;

  // Employee Form Data
  employeeForm = {
    name: '',
    mobile: '',
    password: '',
    role: 'employee', // Auto-filled
    employeeCode: '',
    department: '',
    designation: '',
    reportingTo: '',
    allowedPermissions: [] as string[],
    accountStatus: 'Active' // Default
  };

  // Partner Form Data
  partnerForm = {
    name: '',
    mobile: '',
    password: '',
    role: 'partner', // Auto-filled
    companyName: '',
    businessType: '',
    commissionType: 'fixed',
    commissionValue: null as number | null,
    gstNumber: '',
    address: '',
    accountStatus: 'Active' // Default
  };

  // Dropdown Options
  departments = ['Sales', 'Support', 'Lead Manager', 'Operations', 'HR'];
  designations = ['Executive', 'Manager', 'Senior Manager', 'Team Lead'];
  businessTypes = ['Freelancer', 'Agency', 'Vendor', 'Consultant'];
  commissionTypes = [
    { value: 'fixed', label: 'Fixed Amount' },
    { value: 'percent', label: 'Percentage' }
  ];

  constructor(private http: HttpClient) {}


  ngOnInit() {
  this.loadEmployeesDropdown();
}

// ✅ ADD: New method to load employees
loadEmployeesDropdown() {
  this.http.get(`${this.apiUrl}/employees/dropdown`, { 
    headers: this.getHeaders() 
  }).subscribe({
    next: (response: any) => {
      this.employees = response.employees || [];
      console.log('Employees loaded:', this.employees);
    },
    error: (error) => {
      console.error('Error loading employees:', error);
    }
  });
}

  // Get authorization headers with token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // or sessionStorage
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  switchTab(tab: 'employee' | 'partner') {
    this.activeTab = tab;
    this.clearMessages();
  }

  submitEmployeeForm() {
    this.clearMessages();
    this.isLoading = true;

    // Prepare payload - only send non-empty optional fields
    const payload: any = {
      name: this.employeeForm.name,
      mobile: this.employeeForm.mobile,
      password: this.employeeForm.password,
      role: this.employeeForm.role,
      accountStatus: this.employeeForm.accountStatus
    };

    // Add optional fields only if they have values
    if (this.employeeForm.employeeCode) payload.employeeCode = this.employeeForm.employeeCode;
    if (this.employeeForm.department) payload.department = this.employeeForm.department;
    if (this.employeeForm.designation) payload.designation = this.employeeForm.designation;
    if (this.employeeForm.reportingTo) payload.reportingTo = this.employeeForm.reportingTo;
    if (this.employeeForm.allowedPermissions.length > 0) payload.allowedPermissions = this.employeeForm.allowedPermissions;

    // API Call with Authorization Header
    this.http.post(`${this.apiUrl}/create-employee`, payload, { headers: this.getHeaders() }).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.showSuccessPopup = true;
        console.log('Employee Created:', response);
        
        // Hide popup and reset form after 2.5 seconds
        setTimeout(() => {
          this.showSuccessPopup = false;
          this.cancelForm();
        }, 2500);
      },
      error: (error) => {
        this.isLoading = false;
        
        // Handle specific error messages
        if (error.status === 401) {
          this.errorMessage = 'Unauthorized - Please login first';
        } else if (error.status === 409) {
          this.errorMessage = 'Mobile number already exists';
        } else {
          this.errorMessage = error.error?.msg || error.error?.message || 'Failed to create employee. Please try again.';
        }
        
        console.error('Error creating employee:', error);
        
        // Clear error after 5 seconds
        setTimeout(() => this.clearMessages(), 5000);
      }
    });
  }

  submitPartnerForm() {
    this.clearMessages();
    this.isLoading = true;

    // Prepare payload - only send non-empty optional fields
    const payload: any = {
      name: this.partnerForm.name,
      mobile: this.partnerForm.mobile,
      password: this.partnerForm.password,
      role: this.partnerForm.role,
      accountStatus: this.partnerForm.accountStatus
    };

    // Add optional fields only if they have values
    if (this.partnerForm.companyName) payload.companyName = this.partnerForm.companyName;
    if (this.partnerForm.businessType) payload.businessType = this.partnerForm.businessType;
    if (this.partnerForm.commissionType) payload.commissionType = this.partnerForm.commissionType;
    if (this.partnerForm.commissionValue) payload.commissionValue = this.partnerForm.commissionValue;
    if (this.partnerForm.gstNumber) payload.gstNumber = this.partnerForm.gstNumber;
    if (this.partnerForm.address) payload.address = this.partnerForm.address;

    // ✅ ADD: Tagging fields
    if (this.selectedEmployee) payload.assignedEmployee = this.selectedEmployee;
    if (this.selectedManager) payload.assignedManager = this.selectedManager;

    // API Call with Authorization Header
    this.http.post(`${this.apiUrl}/partners`, payload, { headers: this.getHeaders() }).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        this.showSuccessPopup = true;
        console.log('Partner Created:', response);
        
        // Hide popup and reset form after 2.5 seconds
        setTimeout(() => {
          this.showSuccessPopup = false;
          this.cancelForm();
        }, 2500);
      },
      error: (error) => {
        this.isLoading = false;
        
        // Handle specific error messages
        if (error.status === 401) {
          this.errorMessage = 'Unauthorized - Please login first';
        } else if (error.status === 409) {
          this.errorMessage = 'Mobile number already exists';
        } else {
          this.errorMessage = error.error?.msg || error.error?.message || 'Failed to create partner. Please try again.';
        }
        
        console.error('Error creating partner:', error);
        
        // Clear error after 5 seconds
        setTimeout(() => this.clearMessages(), 5000);
      }
    });
  }

  cancelForm() {
    if (this.activeTab === 'employee') {
      this.employeeForm = {
        name: '',
        mobile: '',
        password: '',
        role: 'employee',
        employeeCode: '',
        department: '',
        designation: '',
        reportingTo: '',
        allowedPermissions: [],
        accountStatus: 'Active'
      };
    } else {
      this.partnerForm = {
        name: '',
        mobile: '',
        password: '',
        role: 'partner',
        companyName: '',
        businessType: '',
        commissionType: 'fixed',
        commissionValue: null,
        gstNumber: '',
        address: '',
        accountStatus: 'Active'
      };

            // ✅ ADD: Reset tagging fields
      this.selectedEmployee = '';
      this.selectedManager = '';
    }
    this.clearMessages();
  }

  clearMessages() {
    this.successMessage = '';
    this.errorMessage = '';
  }
}