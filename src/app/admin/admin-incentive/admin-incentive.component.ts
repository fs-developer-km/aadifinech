import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Employee {
  _id: string;
  name: string;
  mobile: string;
  employeeCode?: string;
}


export interface Incentive {
_id: string;

  employeeId: string | Employee; // 👈 IMPORTANT

  employeeName: string;
  employeeMobile: string;
  month: string;
  year: number;

  loanMetrics?: any;
  targets?: any;
  incentiveBreakdown?: any;

  grossIncentive: number;
  deductions: number;
  netIncentive: number;
  status: string;

  calculatedAt?: Date;
  approvedAt?: Date;
  paidAt?: Date;
  rejectionReason?: string;
  adminRemarks?: string;
  paymentReference?: string;
}


@Component({
  selector: 'app-admin-incentive',
  imports:[CommonModule,FormsModule],
  templateUrl: './admin-incentive.component.html',
  styleUrls: ['./admin-incentive.component.css'],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('300ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class AdminIncentiveComponent implements OnInit {
  // private apiUrl = 'http://localhost:5000/api';
  private apiUrl = 'https://api.aadifintech.com/api';
  private token = localStorage.getItem('token') || '';
  
  incentives: Incentive[] = [];
  filteredIncentives: Incentive[] = [];
  statistics: any = null;
  selectedIncentive: Incentive | null = null;
  employees: any[] = [];
  
  loading = false;
  saving = false;
  loadingEmployees = false;
  viewMode: 'card' | 'table' = 'card';
  showRateCard = false;
  isEditMode = false;
  
  filters = {
    month: this.getCurrentMonth(),
    status: '',
    employeeId: '',
    employeeName: ''
  };
  
  showCalculateModal = false;
  showDetailsModal = false;
  showApproveModal = false;
  showRejectModal = false;
  showPayModal = false;
  
  approveRemarks = '';
  rejectReason = '';
  paymentReference = '';
  
  calculateForm = {
    employeeId: '',
    month: this.getCurrentMonth(),
    year: new Date().getFullYear(),
    loanMetrics: {
      totalLoans: 0,
      approvedLoans: 0,
      disbursedLoans: 0,
      totalDisbursedAmount: 0
    },
    targets: {
      loanTarget: 30,
      amountTarget: 5000000
    },
    rateCard: {
      perLoan: 500,
      performanceRate: 2,
      targetBonusRate: 5,
      qualityBonusRate: 1
    }
  };

  toast = {
    show: false,
    message: '',
    type: 'success' as 'success' | 'error' | 'info'
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadStatistics();
    this.loadIncentives();
    this.loadEmployees();
  }

  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  getCurrentMonth(): string {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  }

  // =============================================
  // LOAD DATA
  // =============================================
  loadEmployees(): void {
    this.loadingEmployees = true;
    
    // API endpoint to get all employees
    this.http.get<any>(`${this.apiUrl}/auth/employees`, { headers: this.getHeaders() })
      .subscribe({
        next: (response) => {
          // Handle both 'data' and 'employees' response formats
          const rawEmployees = response.data || response.employees || [];
          
          // ✅ Ensure employees have proper _id as string
          this.employees = rawEmployees.map((emp: any) => ({
            _id: emp._id?.toString() || emp._id,
            name: emp.name || 'Unknown',
            mobile: emp.mobile || '',
            employeeCode: emp.employeeCode || ''
          }));
          
          this.loadingEmployees = false;
          console.log('✅ Employees loaded:', this.employees);
          console.log('✅ Sample Employee:', this.employees[0]);
        },
        error: (error) => {
          console.error('❌ Error loading employees:', error);
          // Fallback: Extract unique employees from existing incentives
          this.extractEmployeesFromIncentives();
          this.loadingEmployees = false;
        }
      });
  }

  getEmployeeId(emp: string | Employee): string {
  return typeof emp === 'string' ? emp : emp._id;
}

getEmployeeName(emp: string | Employee, fallback: string): string {
  return typeof emp === 'string' ? fallback : emp.name;
}

getEmployeeMobile(emp: string | Employee, fallback: string): string {
  return typeof emp === 'string' ? fallback : emp.mobile;
}


extractEmployeesFromIncentives(): void {
  const uniqueEmployees = new Map<string, Employee>();

  this.incentives.forEach((inc: Incentive) => {

    const empId = this.getEmployeeId(inc.employeeId);

    if (!uniqueEmployees.has(empId)) {
      uniqueEmployees.set(empId, {
        _id: empId,
        name: this.getEmployeeName(inc.employeeId, inc.employeeName),
        mobile: this.getEmployeeMobile(inc.employeeId, inc.employeeMobile),
      });
    }
  });

  this.employees = Array.from(uniqueEmployees.values());

  console.log('✅ Extracted employees:', this.employees);
}



  loadStatistics(): void {
    let url = `${this.apiUrl}/incentive/admin/stats`;
    
    if (this.filters.month) {
      const [year, month] = this.filters.month.split('-');
      url += `?month=${this.filters.month}&year=${year}`;
    }
    
    this.http.get<any>(url, { headers: this.getHeaders() })
      .subscribe({
        next: (response) => {
          this.statistics = response.data;
          console.log("incentice static data dd",this.statistics)
        },
        error: (error) => {
          console.error('Error loading statistics:', error);
        }
      });
  }

  loadIncentives(): void {
    this.loading = true;
    
    let url = `${this.apiUrl}/incentive/admin/all`;
    const params = new URLSearchParams();
    
    if (this.filters.status) params.append('status', this.filters.status);
    if (this.filters.month) {
      const [year, month] = this.filters.month.split('-');
      params.append('month', this.filters.month);
      params.append('year', year);
    }
    if (this.filters.employeeId) params.append('employeeId', this.filters.employeeId);
    
    const queryString = params.toString();
    const finalUrl = queryString ? `${url}?${queryString}` : url;
    
    this.http.get<any>(finalUrl, { headers: this.getHeaders() })
      .subscribe({
        next: (response) => {
          this.incentives = response.data || [];
          console.log("incentivessssss",this.incentives);
          
          this.filterByName();
          // Extract employees if not loaded
          if (this.employees.length === 0) {
            this.extractEmployeesFromIncentives();
          }
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading incentives:', error);
          this.showToast('Failed to load incentives', 'error');
          this.loading = false;
        }
      });
  }

  filterByName(): void {
    if (!this.filters.employeeName) {
      this.filteredIncentives = [...this.incentives];
    } else {
      const search = this.filters.employeeName.toLowerCase();
      this.filteredIncentives = this.incentives.filter(i => 
        i.employeeName.toLowerCase().includes(search) ||
        i.employeeMobile.includes(search)
      );
    }
  }

  clearFilters(): void {
    this.filters = {
      month: this.getCurrentMonth(),
      status: '',
      employeeId: '',
      employeeName: ''
    };
    this.loadStatistics();
    this.loadIncentives();
  }

  onEmployeeSelect(employeeId: string): void {
    console.log('🔍 Raw Selected Value:', employeeId);
    console.log('🔍 Type:', typeof employeeId);
    
    // Clean the employeeId - remove any object conversion
    const cleanId = String(employeeId).trim();
    
    if (cleanId && cleanId !== '' && cleanId !== '[object Object]') {
      this.calculateForm.employeeId = cleanId;
      console.log('✅ Employee ID set to:', this.calculateForm.employeeId);
    } else {
      console.error('❌ Invalid Employee ID:', cleanId);
      this.showToast('Invalid employee selection', 'error');
    }
  }

  // ✅ NEW: Handle event directly from select element
  onEmployeeSelectFromEvent(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const employeeId = selectElement.value;
    
    console.log('🎯 Event Value:', employeeId);
    console.log('🎯 Type:', typeof employeeId);
    
    if (employeeId && employeeId !== '') {
      this.calculateForm.employeeId = employeeId;
      console.log('✅ Employee ID set to:', this.calculateForm.employeeId);
      console.log('✅ Form state:', this.calculateForm);
    } else {
      console.log('⚠️ No employee selected');
    }
  }

  // =============================================
  // CALCULATE/EDIT INCENTIVE
  // =============================================
  debugPayload(): void {
    console.group('🔍 DEBUG PAYLOAD');
    console.log('Employee ID:', this.calculateForm.employeeId);
    console.log('Type:', typeof this.calculateForm.employeeId);
    console.log('Is String?', typeof this.calculateForm.employeeId === 'string');
    console.log('Full Form:', this.calculateForm);
    console.groupEnd();
  }

  calculateIncentive(): void {
    if (!this.calculateForm.employeeId) {
      this.showToast('Please enter employee ID', 'error');
      return;
    }

    this.saving = true;
    
    const [year, month] = this.calculateForm.month.split('-');
    
    const payload = {
      employeeId: this.calculateForm.employeeId,
      month: this.calculateForm.month,
      year: parseInt(year),
      loanMetrics: this.calculateForm.loanMetrics,
      targets: this.calculateForm.targets,
      rateCard: {
        perLoan: this.calculateForm.rateCard.perLoan,
        performanceRate: this.calculateForm.rateCard.performanceRate / 100,
        targetBonusRate: this.calculateForm.rateCard.targetBonusRate / 100,
        qualityBonusRate: this.calculateForm.rateCard.qualityBonusRate / 100
      }
    };

    this.http.post<any>(`${this.apiUrl}/incentive/admin/calculate`, payload, { headers: this.getHeaders() })
      .subscribe({
        next: (response) => {
          this.showToast('Incentive calculated successfully', 'success');
          this.closeCalculateModal();
          this.loadStatistics();
          this.loadIncentives();
          this.saving = false;

          console.log('EMP IDddddddddddddddddd:', this.calculateForm.employeeId);
console.log('TYPE:', typeof this.calculateForm.employeeId);

        },
        error: (error) => {
          console.error('Error calculating incentive:', error);
          this.showToast(error.error?.msg || 'Failed to calculate incentive', 'error');
          this.saving = false;
        }
      });
  }

  editIncentive(incentive: Incentive): void {
    this.isEditMode = true;
    this.calculateForm = {
       employeeId: incentive._id,
      // employeeId: incentive.employeeId,
      month: incentive.month,
      year: incentive.year,
      loanMetrics: { ...incentive.loanMetrics },
      targets: { ...incentive.targets },
      rateCard: {
        perLoan: 500,
        performanceRate: 2,
        targetBonusRate: 5,
        qualityBonusRate: 1
      }
    };
    this.showCalculateModal = true;
  }

  // =============================================
  // APPROVE/REJECT/PAY
  // =============================================
  approveIncentive(): void {
    if (!this.selectedIncentive) return;
    
    this.saving = true;
    
    const payload: any = {};
    if (this.approveRemarks) {
      payload.adminRemarks = this.approveRemarks;
    }

    this.http.patch<any>(
      `${this.apiUrl}/incentive/admin/${this.selectedIncentive._id}/approve`,
      payload,
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showToast('Incentive approved successfully', 'success');
        this.closeApproveModal();
        this.loadStatistics();
        this.loadIncentives();
        this.saving = false;
      },
      error: (error) => {
        console.error('Error approving incentive:', error);
        this.showToast(error.error?.msg || 'Failed to approve incentive', 'error');
        this.saving = false;
      }
    });
  }

  rejectIncentive(): void {
    if (!this.selectedIncentive || !this.rejectReason) return;

    this.saving = true;

    this.http.patch<any>(
      `${this.apiUrl}/incentive/admin/${this.selectedIncentive._id}/reject`,
      { rejectionReason: this.rejectReason },
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showToast('Incentive rejected', 'success');
        this.closeRejectModal();
        this.loadStatistics();
        this.loadIncentives();
        this.saving = false;
      },
      error: (error) => {
        console.error('Error rejecting incentive:', error);
        this.showToast(error.error?.msg || 'Failed to reject incentive', 'error');
        this.saving = false;
      }
    });
  }

  markAsPaid(): void {
    if (!this.selectedIncentive) return;

    this.saving = true;

    const payload: any = {};
    if (this.paymentReference) {
      payload.paymentReference = this.paymentReference;
    }

    this.http.patch<any>(
      `${this.apiUrl}/incentive/admin/${this.selectedIncentive._id}/mark-paid`,
      payload,
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showToast('Incentive marked as paid successfully', 'success');
        this.closePayModal();
        this.loadStatistics();
        this.loadIncentives();
        this.saving = false;
      },
      error: (error) => {
        console.error('Error marking as paid:', error);
        this.showToast(error.error?.msg || 'Failed to mark as paid', 'error');
        this.saving = false;
      }
    });
  }

  deleteIncentive(incentiveId: string): void {
    if (!confirm('Are you sure you want to delete this incentive?')) return;

    this.http.delete<any>(
      `${this.apiUrl}/incentive/admin/${incentiveId}`,
      { headers: this.getHeaders() }
    ).subscribe({
      next: (response) => {
        this.showToast('Incentive deleted successfully', 'success');
        this.loadStatistics();
        this.loadIncentives();
      },
      error: (error) => {
        console.error('Error deleting incentive:', error);
        this.showToast(error.error?.msg || 'Failed to delete incentive', 'error');
      }
    });
  }

  // =============================================
  // MODALS
  // =============================================
  openCalculateModal(): void {
    this.isEditMode = false;
    this.calculateForm = {
      employeeId: '',
      month: this.getCurrentMonth(),
      year: new Date().getFullYear(),
      loanMetrics: {
        totalLoans: 0,
        approvedLoans: 0,
        disbursedLoans: 0,
        totalDisbursedAmount: 0
      },
      targets: {
        loanTarget: 30,
        amountTarget: 5000000
      },
      rateCard: {
        perLoan: 500,
        performanceRate: 2,
        targetBonusRate: 5,
        qualityBonusRate: 1
      }
    };
    this.showCalculateModal = true;
  }

  closeCalculateModal(): void {
    this.showCalculateModal = false;
    this.isEditMode = false;
  }

  viewDetails(incentive: Incentive): void {
    this.selectedIncentive = incentive;
    this.showDetailsModal = true;
  }

  closeDetailsModal(): void {
    this.showDetailsModal = false;
    this.selectedIncentive = null;
  }

  openApproveModal(incentive: Incentive): void {
    this.selectedIncentive = incentive;
    this.approveRemarks = '';
    this.showApproveModal = true;
  }

  closeApproveModal(): void {
    this.showApproveModal = false;
    this.selectedIncentive = null;
    this.approveRemarks = '';
  }

  openRejectModal(incentive: Incentive): void {
    this.selectedIncentive = incentive;
    this.rejectReason = '';
    this.showRejectModal = true;
  }

  closeRejectModal(): void {
    this.showRejectModal = false;
    this.selectedIncentive = null;
    this.rejectReason = '';
  }

  openPayModal(incentive: Incentive): void {
    this.selectedIncentive = incentive;
    this.paymentReference = '';
    this.showPayModal = true;
  }

  closePayModal(): void {
    this.showPayModal = false;
    this.selectedIncentive = null;
    this.paymentReference = '';
  }

  // =============================================
  // TOAST NOTIFICATION
  // =============================================
  showToast(message: string, type: 'success' | 'error' | 'info' = 'success'): void {
    this.toast = { show: true, message, type };
    setTimeout(() => {
      this.toast.show = false;
    }, 3000);
  }
}