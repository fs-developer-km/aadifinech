import { Component, OnInit, ViewChild } from '@angular/core';
import { PopupFormComponent } from '../popup-form/popup-form.component';
import { CommonModule } from '@angular/common';

export interface LoanCard {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
  colorClass: string;
}

@Component({
  standalone: true,
  selector: 'app-loan-for-every-indian',
  imports: [CommonModule,PopupFormComponent],
  templateUrl: './loan-for-every-indian.component.html',
  styleUrl: './loan-for-every-indian.component.css'
})
export class LoanForEveryIndianComponent implements OnInit {
    @ViewChild(PopupFormComponent) popupForm!: PopupFormComponent;


    duplicatedCards: LoanCard[] = [];

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' }); // optional smooth scroll
        this.duplicatedCards = [...this.loanCards, ...this.loanCards];
  }
  

  personalLoans = [
    { title: 'Personal Loan', icon: 'fas fa-user', description: '₹50,000 to ₹25 Lakhs – for medical, travel, wedding' },
    { title: 'Home Loan', icon: 'fas fa-home', description: '₹5 Lakhs to ₹5 Cr – affordable EMIs up to 30 yrs' },
    { title: 'Car Loan', icon: 'fas fa-car', description: 'Finance up to 100% for new or used cars' },
    { title: 'Education Loan', icon: 'fas fa-graduation-cap', description: 'Covers tuition, hostel, travel in India & abroad' },
    { title: 'Gold Loan', icon: 'fas fa-coins', description: 'Quick cash against gold in 30 minutes' },
    { title: 'Business Loan', icon: 'fas fa-briefcase', description: 'Unsecured loan for startups, MSMEs up to ₹1 Cr' }
  ];



  faqs = [
    {
      question: '1. MSME Loans under Government Schemes',
      answer: `1.	Mudra Loan (Shishu / Kishor / Tarun) For small businesses, traders, and micro entrepreneurs
Loan Amount: ₹50,000 to ₹10 Lakhs
No collateral required`,
      isOpen: true
    },
    {
      question: '2.	CGTMSE Loan',
      answer: 'Credit Guarantee Fund Trust for Micro and Small Enterprises – collateral-free funding up to ₹2 Cr',
      isOpen: true
    },
    {
      question: '3.	Women Entrepreneur Loan',
      answer: 'Special schemes for women-led enterprises – lower interest & priority processing',
      isOpen: false
    },
    {
      question: '4. Service Coverage',
      answer: 'We offer loan services PAN-India including Tier 1, Tier 2, and Tier 3 cities – whether you are in Delhi, Mumbai, Ahmedabad, Bhopal, Patna, Kolkata, or even remote towns.',
      isOpen: false
    },
    {
      question: '5.Working Capital Loan',
      answer: 'Maintain daily cash flow and business operations. Customized repayment plans for SMEs.',
      isOpen: false
    }
  ];





  toggleFaq(index: number): void {
    this.faqs = this.faqs.map((faq, i) => {
      return {
        ...faq,
        isOpen: i === index ? !faq.isOpen : false
      };
    });
  }


  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }



  loanCards: LoanCard[] = [
    {
      id: 1,
      icon: 'fas fa-user',
      title: 'Personal Loan',
      description: 'Fast and easy personal loans for medical emergencies, weddings, travel, or home renovation. Both salaried and self-employed can apply.',
      features: [
        'Loan Amount: ₹50,000 to ₹25 Lakhs',
        'Tenure: Up to 5 years',
        'Quick approval',
        'Minimal documentation'
      ],
      colorClass: 'white-card'
    },
    {
      id: 2,
      icon: 'fas fa-car',
      title: 'Car Loan',
      description: 'Finance your dream car or buy a quality pre-owned vehicle with competitive interest rates and flexible payment options.',
      features: [
        'Up to 100% financing',
        'New & Used car loans',
        'Quick processing',
        'Competitive rates'
      ],
      colorClass: 'red-card'
    },
    {
      id: 3,
      icon: 'fas fa-home',
      title: 'Home Loan',
      description: 'Turn your dream of owning a house into reality. Affordable EMIs, flexible tenure, and doorstep assistance.',
      features: [
        'Amount: ₹5 Lakhs to ₹5 Crores',
        'Tenure: Up to 30 years',
        'Balance transfer available',
        'Top-up options'
      ],
      colorClass: 'white-card'
    },
    {
      id: 4,
      icon: 'fas fa-graduation-cap',
      title: 'Education Loan',
      description: 'Support for higher education in India or abroad. Covers tuition, hostel, travel, and living expenses.',
      features: [
        'Collateral & non-collateral options',
        'Study in India or abroad',
        'Complete expense coverage',
        'Flexible repayment'
      ],
      colorClass: 'red-card'
    },
    {
      id: 5,
      icon: 'fas fa-ring',
      title: 'Wedding Loan',
      description: 'Make your big day special without budget worries. Quick disbursal and no collateral needed for your dream wedding.',
      features: [
        'No collateral required',
        'Quick disbursal',
        'Covers all wedding expenses',
        'Flexible EMIs'
      ],
      colorClass: 'white-card'
    },
    {
      id: 6,
      icon: 'fas fa-plane',
      title: 'Holiday Loan',
      description: 'Take a break and travel the world! Fund your domestic or international vacation stress-free.',
      features: [
        'Amount: ₹50,000 to ₹5 Lakhs',
        'Domestic & international travel',
        'Quick approval',
        'No collateral needed'
      ],
      colorClass: 'red-card'
    }
  ];


 openForm() {
    this.popupForm.serviceName = 'Loan For Every Indian';
    this.popupForm.open();
  }



}
