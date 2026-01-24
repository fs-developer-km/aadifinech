import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface LoanMetrics {
  totalLoans: number;
  approvedLoans: number;
  disbursedLoans: number;
  totalDisbursedAmount: number;
  conversionRate?: number;
}

interface Targets {
  loanTarget: number;
  amountTarget: number;
  achievedPercentage?: number;
}

interface IncentiveBreakdown {
  perLoanIncentive: number;
  performanceBonus: number;
  targetAchievementBonus: number;
  qualityBonus: number;
  penalties: number;
}

interface Incentive {
  _id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  year: number;
  loanMetrics?: LoanMetrics;
  targets?: Targets;
  incentiveBreakdown?: IncentiveBreakdown;
  grossIncentive: number;
  deductions: number;
  netIncentive: number;
  status: string;
  calculatedAt?: Date;
  approvedAt?: Date;
  paidAt?: Date;
  rejectionReason?: string;
  adminRemarks?: string;
}

@Component({
  selector: 'app-employee-incentive',
  imports:[CommonModule,FormsModule],
  templateUrl: './employee-incentive.component.html',
  styleUrls: ['./employee-incentive.component.css']
})
export class EmployeeIncentiveComponent implements OnInit {
  // API Configuration
  // private apiUrl = 'http://localhost:5000/api';
  private apiUrl = 'https://api.aadifintech.com/api';
  private token = localStorage.getItem('token') || '';
  
  // Data
  incentives: Incentive[] = [];
  
  // UI State
  loading = false;
  saving = false;
  expandedCard: string | null = null;
  showRateCard = false;
  previewCalculation: any = null;
  
  // Filters
  filters = {
    month: this.getCurrentMonth(),
    status: '',
    year: new Date().getFullYear()
  };
  
  // Modals
  showCalculateModal = false;
  
  // Calculate Form
  calculateForm = {
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
      performanceRate: 0.02,
      targetBonusRate: 0.05,
      qualityBonusRate: 0.01
    }
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadIncentives();
  }

  // =============================================
  // HTTP Headers
  // =============================================
  private getHeaders(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
  }

  // =============================================
  // Utility Functions
  // =============================================
  getCurrentMonth(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  }

  // =============================================
  // Load Data
  // =============================================
  loadIncentives(): void {
    this.loading = true;
    
    let url = `${this.apiUrl}/incentive/my-incentives`;
    const params = new URLSearchParams();
    
    if (this.filters.status) params.append('status', this.filters.status);
    if (this.filters.month) {
      const [year, month] = this.filters.month.split('-');
      params.append('month', this.filters.month);
      params.append('year', year);
    }
    
    const queryString = params.toString();
    const finalUrl = queryString ? `${url}?${queryString}` : url;
    
    this.http.get<any>(finalUrl, { headers: this.getHeaders() })
      .subscribe({
        next: (response) => {
          this.incentives = response.data || [];
          this.loading = false;
          console.log('Incentives loaded:', this.incentives.length);
        },
        error: (error) => {
          console.error('Error loading incentives:', error);
          this.showError('Failed to load incentives');
          this.loading = false;
        }
      });
  }

  // =============================================
  // Calculate Incentive
  // =============================================
  calculateIncentive(): void {
    if (!this.isFormValid()) {
      this.showError('Please fill all required fields');
      return;
    }

    this.saving = true;
    
    const [year, month] = this.calculateForm.month.split('-');
    
    const payload = {
      month: this.calculateForm.month,
      year: parseInt(year),
      loanMetrics: this.calculateForm.loanMetrics,
      targets: this.calculateForm.targets,
      rateCard: {
        perLoan: this.calculateForm.rateCard.perLoan,
        performanceRate: this.calculateForm.rateCard.performanceRate / 100, // Convert to decimal
        targetBonusRate: this.calculateForm.rateCard.targetBonusRate / 100,
        qualityBonusRate: this.calculateForm.rateCard.qualityBonusRate / 100
      }
    };

    this.http.post<any>(`${this.apiUrl}/incentive/calculate`, payload, { headers: this.getHeaders() })
      .subscribe({
        next: (response) => {
          this.showSuccess('Incentive calculated successfully');
          this.closeCalculateModal();
          this.loadIncentives();
          this.saving = false;
        },
        error: (error) => {
          console.error('Error calculating incentive:', error);
          this.showError(error.error?.msg || 'Failed to calculate incentive');
          this.saving = false;
        }
      });
  }

  // =============================================
  // Preview Calculation
  // =============================================
  previewIncentive(): void {
    const metrics = this.calculateForm.loanMetrics;
    const rates = this.calculateForm.rateCard;
    
    if (metrics.totalLoans === 0) {
      this.showError('Please enter loan metrics first');
      return;
    }

    // Calculate conversion rate
    const conversionRate = metrics.totalLoans > 0 
      ? ((metrics.disbursedLoans / metrics.totalLoans) * 100).toFixed(2)
      : '0';

    // Simple estimation
    const perLoanIncentive = metrics.disbursedLoans * rates.perLoan;
    const performanceBonus = metrics.totalDisbursedAmount * (rates.performanceRate / 100);
    const estimatedIncentive = perLoanIncentive + performanceBonus;

    this.previewCalculation = {
      conversionRate: conversionRate,
      estimatedIncentive: estimatedIncentive
    };
  }

  // =============================================
  // Modal Functions
  // =============================================
  openCalculateModal(): void {
    this.calculateForm = {
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
    this.previewCalculation = null;
    this.showRateCard = false;
    this.showCalculateModal = true;
  }

  closeCalculateModal(): void {
    this.showCalculateModal = false;
    this.previewCalculation = null;
  }

  // =============================================
  // Form Validation
  // =============================================
  isFormValid(): boolean {
    const form = this.calculateForm;
    return !!(
      form.month &&
      form.loanMetrics.totalLoans >= 0 &&
      form.loanMetrics.approvedLoans >= 0 &&
      form.loanMetrics.disbursedLoans >= 0 &&
      form.loanMetrics.totalDisbursedAmount >= 0 &&
      form.targets.loanTarget > 0 &&
      form.targets.amountTarget > 0
    );
  }

  // =============================================
  // UI Helper Functions
  // =============================================
  toggleExpand(cardId: string): void {
    this.expandedCard = this.expandedCard === cardId ? null : cardId;
  }

  clearFilters(): void {
    this.filters = {
      month: this.getCurrentMonth(),
      status: '',
      year: new Date().getFullYear()
    };
    this.loadIncentives();
  }

  getTargetPercentage(achieved: number = 0, target: number = 0): number {
    if (target === 0) return 0;
    const percentage = (achieved / target) * 100;
    return Math.min(percentage, 100);
  }

  // =============================================
  // Statistics Functions
  // =============================================
  getTotalRecords(): number {
    return this.incentives.length;
  }

  getTotalIncentive(): number {
    return this.incentives.reduce((sum, inc) => sum + (inc.netIncentive || 0), 0);
  }

  getApprovedCount(): number {
    return this.incentives.filter(inc => inc.status === 'approved' || inc.status === 'paid').length;
  }

  getPaidCount(): number {
    return this.incentives.filter(inc => inc.status === 'paid').length;
  }

  // =============================================
  // Notification Functions
  // =============================================
  showSuccess(message: string): void {
    alert(message); // Replace with toast/snackbar
  }

  showError(message: string): void {
    alert(message); // Replace with toast/snackbar
  }
}