import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calculator',
  imports: [CommonModule, FormsModule],
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent {
  activeTab: string = 'sip';
  iconColor: string = '#FFFFFF';
  
  // SIP Calculator
  sipData = {
    monthlyInvestment: 0,
    annualReturn: 0,
    timePeriod: 0,
    result: {
      maturityAmount: 0,
      totalInvestment: 0,
      totalReturns: 0
    }
  };

  // FD Calculator
  fdData = {
    principal: 0,
    interestRate: 0,
    timePeriod: 0,
    compoundingFrequency: 4, // Quarterly
    result: {
      maturityAmount: 0,
      totalInterest: 0
    }
  };

  // EMI Calculator
  emiData = {
    loanAmount: 0,
    interestRate: 0,
    loanTenure: 0,
    result: {
      emi: 0,
      totalAmount: 0,
      totalInterest: 0
    }
  };

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  calculateSIP() {
    const monthlyInvestment = this.sipData.monthlyInvestment;
    const annualReturn = this.sipData.annualReturn;
    const timePeriod = this.sipData.timePeriod;

    if (monthlyInvestment <= 0 || annualReturn <= 0 || timePeriod <= 0) {
      this.resetSIPResult();
      return;
    }

    const monthlyReturn = annualReturn / 100 / 12;
    const totalMonths = timePeriod * 12;
    
    const maturityAmount = monthlyInvestment * 
      (((Math.pow(1 + monthlyReturn, totalMonths)) - 1) / monthlyReturn) * 
      (1 + monthlyReturn);

    this.sipData.result.maturityAmount = Math.round(maturityAmount);
    this.sipData.result.totalInvestment = monthlyInvestment * totalMonths;
    this.sipData.result.totalReturns = this.sipData.result.maturityAmount - this.sipData.result.totalInvestment;
  }

  calculateFD() {
    const principal = this.fdData.principal;
    const rate = this.fdData.interestRate;
    const time = this.fdData.timePeriod;
    const n = this.fdData.compoundingFrequency;

    if (principal <= 0 || rate <= 0 || time <= 0) {
      this.resetFDResult();
      return;
    }

    const maturityAmount = principal * Math.pow((1 + (rate / 100) / n), n * time);
    
    this.fdData.result.maturityAmount = Math.round(maturityAmount);
    this.fdData.result.totalInterest = Math.round(maturityAmount - principal);
  }

  calculateEMI() {
    const principal = this.emiData.loanAmount;
    const rate = this.emiData.interestRate;
    const tenure = this.emiData.loanTenure;

    if (principal <= 0 || rate <= 0 || tenure <= 0) {
      this.resetEMIResult();
      return;
    }

    const monthlyRate = rate / 100 / 12;
    const totalMonths = tenure * 12;
    
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
                (Math.pow(1 + monthlyRate, totalMonths) - 1);

    this.emiData.result.emi = Math.round(emi);
    this.emiData.result.totalAmount = Math.round(emi * totalMonths);
    this.emiData.result.totalInterest = this.emiData.result.totalAmount - principal;
  }

  private resetSIPResult() {
    this.sipData.result = { maturityAmount: 0, totalInvestment: 0, totalReturns: 0 };
  }

  private resetFDResult() {
    this.fdData.result = { maturityAmount: 0, totalInterest: 0 };
  }

  private resetEMIResult() {
    this.emiData.result = { emi: 0, totalAmount: 0, totalInterest: 0 };
  }

  formatCurrency(amount: number): string {
    if (amount >= 10000000) { // 1 crore and above
      return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
    } else if (amount >= 100000) { // 1 lakh and above
      return '₹' + (amount / 100000).toFixed(2) + ' L';
    } else if (amount >= 1000) { // 1000 and above
      return '₹' + (amount / 1000).toFixed(1) + 'K';
    } else {
      return '₹' + amount.toLocaleString('en-IN');
    }
  }
}