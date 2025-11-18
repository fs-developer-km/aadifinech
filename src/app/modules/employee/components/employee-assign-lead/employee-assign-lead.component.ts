import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Lead {
  id: number;
  customerName: string;
  loanType: string;
  loanAmount: number;
  email: string;
  phone: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
  assignedDate: Date;
  priority: 'High' | 'Medium' | 'Low';
  creditScore: number;
  employmentType: string;
  monthlyIncome: number;
  purpose: string;
  branch: string;
  tenure: string;
}

@Component({
  selector: 'app-employee-assign-lead',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-assign-lead.component.html',
  styleUrl: './employee-assign-lead.component.css'
})
export class EmployeeAssignLeadComponent {
  leads: Lead[] = [
    {
      id: 1001,
      customerName: 'Rajesh Kumar Sharma',
      loanType: 'Home Loan',
      loanAmount: 4500000,
      email: 'rajesh.sharma@gmail.com',
      phone: '+91 98765 43210',
      status: 'Pending',
      assignedDate: new Date('2024-11-15'),
      priority: 'High',
      creditScore: 780,
      employmentType: 'Salaried',
      monthlyIncome: 125000,
      purpose: 'Purchase 3BHK apartment in Gurgaon',
      branch: 'Connaught Place, Delhi',
      tenure: '20 Years'
    },
    {
      id: 1002,
      customerName: 'Priya Mehta',
      loanType: 'Personal Loan',
      loanAmount: 350000,
      email: 'priya.mehta@outlook.com',
      phone: '+91 87654 32109',
      status: 'Pending',
      assignedDate: new Date('2024-11-16'),
      priority: 'Medium',
      creditScore: 720,
      employmentType: 'Salaried',
      monthlyIncome: 85000,
      purpose: 'Wedding expenses and home renovation',
      branch: 'Koramangala, Bangalore',
      tenure: '5 Years'
    },
    {
      id: 1003,
      customerName: 'Amit Patel',
      loanType: 'Business Loan',
      loanAmount: 8500000,
      email: 'amit.patel@business.com',
      phone: '+91 76543 21098',
      status: 'Accepted',
      assignedDate: new Date('2024-11-14'),
      priority: 'High',
      creditScore: 810,
      employmentType: 'Self-Employed',
      monthlyIncome: 450000,
      purpose: 'Expansion of manufacturing unit',
      branch: 'Satellite, Ahmedabad',
      tenure: '10 Years'
    },
    {
      id: 1004,
      customerName: 'Sneha Verma',
      loanType: 'Car Loan',
      loanAmount: 850000,
      email: 'sneha.verma@yahoo.com',
      phone: '+91 65432 10987',
      status: 'Pending',
      assignedDate: new Date('2024-11-17'),
      priority: 'Low',
      creditScore: 690,
      employmentType: 'Salaried',
      monthlyIncome: 65000,
      purpose: 'Purchase Honda City ZX',
      branch: 'Gomti Nagar, Lucknow',
      tenure: '7 Years'
    },
    {
      id: 1005,
      customerName: 'Vikram Singh Rathore',
      loanType: 'Home Loan',
      loanAmount: 6200000,
      email: 'vikram.rathore@gmail.com',
      phone: '+91 54321 09876',
      status: 'Rejected',
      assignedDate: new Date('2024-11-13'),
      priority: 'Medium',
      creditScore: 580,
      employmentType: 'Self-Employed',
      monthlyIncome: 95000,
      purpose: 'Purchase villa in Jaipur',
      branch: 'C-Scheme, Jaipur',
      tenure: '15 Years'
    },
    {
      id: 1006,
      customerName: 'Ananya Desai',
      loanType: 'Education Loan',
      loanAmount: 2500000,
      email: 'ananya.desai@student.com',
      phone: '+91 99887 76655',
      status: 'Pending',
      assignedDate: new Date('2024-11-18'),
      priority: 'High',
      creditScore: 750,
      employmentType: 'Student',
      monthlyIncome: 0,
      purpose: 'MBA from IIM Bangalore',
      branch: 'Shivaji Nagar, Pune',
      tenure: '10 Years'
    },
    {
      id: 1007,
      customerName: 'Rahul Kapoor',
      loanType: 'Personal Loan',
      loanAmount: 500000,
      email: 'rahul.kapoor@tech.com',
      phone: '+91 88776 65544',
      status: 'Accepted',
      assignedDate: new Date('2024-11-12'),
      priority: 'Low',
      creditScore: 740,
      employmentType: 'Salaried',
      monthlyIncome: 95000,
      purpose: 'Debt consolidation and medical expenses',
      branch: 'Cyber City, Gurgaon',
      tenure: '3 Years'
    },
    {
      id: 1008,
      customerName: 'Neha Agarwal',
      loanType: 'Gold Loan',
      loanAmount: 150000,
      email: 'neha.agarwal@gmail.com',
      phone: '+91 77665 54433',
      status: 'Pending',
      assignedDate: new Date('2024-11-17'),
      priority: 'Medium',
      creditScore: 680,
      employmentType: 'Self-Employed',
      monthlyIncome: 55000,
      purpose: 'Working capital for boutique business',
      branch: 'Lajpat Nagar, Delhi',
      tenure: '2 Years'
    },
    {
      id: 1009,
      customerName: 'Sanjay Malhotra',
      loanType: 'Home Loan',
      loanAmount: 7500000,
      email: 'sanjay.malhotra@corporate.com',
      phone: '+91 66554 43322',
      status: 'Accepted',
      assignedDate: new Date('2024-11-11'),
      priority: 'High',
      creditScore: 820,
      employmentType: 'Salaried',
      monthlyIncome: 285000,
      purpose: 'Purchase 4BHK luxury apartment in Mumbai',
      branch: 'Bandra West, Mumbai',
      tenure: '25 Years'
    },
    {
      id: 1010,
      customerName: 'Divya Iyer',
      loanType: 'Two Wheeler Loan',
      loanAmount: 95000,
      email: 'divya.iyer@yahoo.com',
      phone: '+91 55443 32211',
      status: 'Pending',
      assignedDate: new Date('2024-11-18'),
      priority: 'Low',
      creditScore: 710,
      employmentType: 'Salaried',
      monthlyIncome: 45000,
      purpose: 'Purchase Honda Activa 6G',
      branch: 'T Nagar, Chennai',
      tenure: '3 Years'
    },
    {
      id: 1011,
      customerName: 'Karthik Reddy',
      loanType: 'Business Loan',
      loanAmount: 5500000,
      email: 'karthik.reddy@startup.com',
      phone: '+91 44332 21100',
      status: 'Pending',
      assignedDate: new Date('2024-11-16'),
      priority: 'High',
      creditScore: 760,
      employmentType: 'Self-Employed',
      monthlyIncome: 225000,
      purpose: 'Tech startup expansion and hiring',
      branch: 'HITEC City, Hyderabad',
      tenure: '7 Years'
    },
    {
      id: 1012,
      customerName: 'Pooja Chatterjee',
      loanType: 'Personal Loan',
      loanAmount: 275000,
      email: 'pooja.chatterjee@gmail.com',
      phone: '+91 33221 10099',
      status: 'Accepted',
      assignedDate: new Date('2024-11-10'),
      priority: 'Medium',
      creditScore: 730,
      employmentType: 'Salaried',
      monthlyIncome: 72000,
      purpose: 'Home renovation and furniture',
      branch: 'Salt Lake, Kolkata',
      tenure: '4 Years'
    }
  ];

  selectedLead: Lead | null = null;
  showDetailsModal: boolean = false;
  showConfirmModal: boolean = false;
  confirmAction: 'accept' | 'reject' | null = null;
  filterStatus: string = 'All';
  searchTerm: string = '';
  
  // Pagination
  currentPage: number = 1;
  itemsPerPage: number = 6;

  acceptLead(lead: Lead): void {
    this.selectedLead = lead;
    this.confirmAction = 'accept';
    this.showConfirmModal = true;
  }

  rejectLead(lead: Lead): void {
    this.selectedLead = lead;
    this.confirmAction = 'reject';
    this.showConfirmModal = true;
  }

  confirmActionExecute(): void {
    if (this.selectedLead && this.confirmAction) {
      if (this.confirmAction === 'accept') {
        this.selectedLead.status = 'Accepted';
      } else {
        this.selectedLead.status = 'Rejected';
      }
    }
    this.closeConfirmModal();
  }

  closeConfirmModal(): void {
    this.showConfirmModal = false;
    this.confirmAction = null;
    if (!this.showDetailsModal) {
      this.selectedLead = null;
    }
  }

  viewDetails(lead: Lead): void {
    this.selectedLead = lead;
    this.showDetailsModal = true;
  }

  closeModal(): void {
    this.showDetailsModal = false;
    this.selectedLead = null;
  }

  getPriorityClass(priority: string): string {
    switch(priority) {
      case 'High': return 'priority-high';
      case 'Medium': return 'priority-medium';
      case 'Low': return 'priority-low';
      default: return '';
    }
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'Accepted': return 'status-accepted';
      case 'Rejected': return 'status-rejected';
      case 'Pending': return 'status-pending';
      default: return '';
    }
  }

  getFilteredLeads(): Lead[] {
    let filtered = this.leads;

    if (this.filterStatus !== 'All') {
      filtered = filtered.filter(lead => lead.status === this.filterStatus);
    }

    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(lead => 
        lead.customerName.toLowerCase().includes(term) ||
        lead.loanType.toLowerCase().includes(term) ||
        lead.email.toLowerCase().includes(term) ||
        lead.phone.includes(term) ||
        lead.branch.toLowerCase().includes(term)
      );
    }

    return filtered;
  }

  getPaginatedLeads(): Lead[] {
    const filtered = this.getFilteredLeads();
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  }

  getTotalPages(): number {
    return Math.ceil(this.getFilteredLeads().length / this.itemsPerPage);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.getTotalPages()) {
      this.currentPage = page;
    }
  }

  getPageNumbers(): number[] {
    const totalPages = this.getTotalPages();
    const pages: number[] = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (this.currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
        pages.push(-1); // ellipsis
        pages.push(totalPages);
      } else if (this.currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push(-1);
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        pages.push(1);
        pages.push(-1);
        for (let i = this.currentPage - 1; i <= this.currentPage + 1; i++) pages.push(i);
        pages.push(-1);
        pages.push(totalPages);
      }
    }
    
    return pages;
  }

  getTotalValue(): number {
    return this.getFilteredLeads()
      .filter(lead => lead.status === 'Accepted')
      .reduce((sum, lead) => sum + lead.loanAmount, 0);
  }

  getPendingCount(): number {
    return this.leads.filter(lead => lead.status === 'Pending').length;
  }

  getAcceptedCount(): number {
    return this.leads.filter(lead => lead.status === 'Accepted').length;
  }

  exportToCSV(): void {
    const leads = this.getFilteredLeads();
    const headers = ['Lead ID', 'Customer Name', 'Loan Type', 'Amount', 'Email', 'Phone', 'Status', 'Credit Score', 'Branch'];
    const csvContent = [
      headers.join(','),
      ...leads.map(lead => [
        lead.id,
        lead.customerName,
        lead.loanType,
        lead.loanAmount,
        lead.email,
        lead.phone,
        lead.status,
        lead.creditScore,
        lead.branch
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'loan-leads-export.csv';
    a.click();
  }
}