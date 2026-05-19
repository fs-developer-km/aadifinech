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

  // SIP Calculator
  sipData = {
    monthlyInvestment: 10000,
    annualReturn: 12,
    timePeriod: 10,
    result: {
      maturityAmount: 0,
      totalInvestment: 0,
      totalReturns: 0
    }
  };

  // FD Calculator
  fdData = {
    principal: 100000,
    interestRate: 6.5,
    timePeriod: 5,
    compoundingFrequency: 4,
    result: {
      maturityAmount: 0,
      totalInterest: 0
    }
  };

  // EMI Calculator
  emiData = {
    loanAmount: 1000000,
    interestRate: 8.5,
    loanTenure: 20,
    result: {
      emi: 0,
      totalAmount: 0,
      totalInterest: 0
    }
  };

  constructor() {
    // Calculate defaults on load
    this.calculateSIP();
    this.calculateFD();
    this.calculateEMI();
  }

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  calculateSIP() {
    const { monthlyInvestment, annualReturn, timePeriod } = this.sipData;
    if (monthlyInvestment <= 0 || annualReturn <= 0 || timePeriod <= 0) {
      this.resetSIPResult(); return;
    }
    const r = annualReturn / 100 / 12;
    const n = timePeriod * 12;
    const maturityAmount = monthlyInvestment * (((Math.pow(1 + r, n)) - 1) / r) * (1 + r);
    this.sipData.result.maturityAmount = Math.round(maturityAmount);
    this.sipData.result.totalInvestment = monthlyInvestment * n;
    this.sipData.result.totalReturns = Math.round(maturityAmount) - monthlyInvestment * n;
  }

  calculateFD() {
    const { principal, interestRate, timePeriod, compoundingFrequency } = this.fdData;
    if (principal <= 0 || interestRate <= 0 || timePeriod <= 0) {
      this.resetFDResult(); return;
    }
    const maturityAmount = principal * Math.pow((1 + (interestRate / 100) / compoundingFrequency), compoundingFrequency * timePeriod);
    this.fdData.result.maturityAmount = Math.round(maturityAmount);
    this.fdData.result.totalInterest = Math.round(maturityAmount - principal);
  }

  calculateEMI() {
    const { loanAmount, interestRate, loanTenure } = this.emiData;
    if (loanAmount <= 0 || interestRate <= 0 || loanTenure <= 0) {
      this.resetEMIResult(); return;
    }
    const r = interestRate / 100 / 12;
    const n = loanTenure * 12;
    const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    this.emiData.result.emi = Math.round(emi);
    this.emiData.result.totalAmount = Math.round(emi * n);
    this.emiData.result.totalInterest = Math.round(emi * n) - loanAmount;
  }

  /**
   * Returns SVG stroke-dasharray string for the donut chart.
   * Circumference = 2 * π * 80 ≈ 502.65
   */
  getDonutDash(tab: string): string {
    const circumference = 502.65;
    let ratio = 0;

    if (tab === 'sip') {
      const total = this.sipData.result.maturityAmount;
      const returns = this.sipData.result.totalReturns;
      ratio = total > 0 ? returns / total : 0;
    } else if (tab === 'fd') {
      const total = this.fdData.result.maturityAmount;
      const interest = this.fdData.result.totalInterest;
      ratio = total > 0 ? interest / total : 0;
    } else if (tab === 'emi') {
      const total = this.emiData.result.totalAmount;
      const interest = this.emiData.result.totalInterest;
      ratio = total > 0 ? interest / total : 0;
    }

    ratio = Math.max(0, Math.min(1, ratio));
    const dash = ratio * circumference;
    const gap = circumference - dash;
    return `${dash} ${gap}`;
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
    if (!amount || amount === 0) return '₹0';
    if (amount >= 10000000) return '₹' + (amount / 10000000).toFixed(2) + ' Cr';
    if (amount >= 100000)   return '₹' + (amount / 100000).toFixed(2) + ' L';
    if (amount >= 1000)     return '₹' + (amount / 1000).toFixed(1) + 'K';
    return '₹' + amount.toLocaleString('en-IN');
  }

  formatCurrencyShort(amount: number): string {
    if (!amount || amount === 0) return '₹0';
    if (amount >= 10000000) return '₹' + (amount / 10000000).toFixed(1) + 'Cr';
    if (amount >= 100000)   return '₹' + (amount / 100000).toFixed(1) + 'L';
    if (amount >= 1000)     return '₹' + Math.round(amount / 1000) + 'K';
    return '₹' + amount;
  }
}