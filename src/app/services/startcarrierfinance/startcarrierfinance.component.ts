import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-startcarrierfinance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './startcarrierfinance.component.html',
  styleUrl: './startcarrierfinance.component.css'
})
export class StartcarrierfinanceComponent {
  // Active tab state
  activeTab: string = 'twelve';
  
  // FAQ state
  openFaqIndex: number | null = null;
  
  // Form data
  formData = {
    name: '',
    phone: '',
    email: '',
    city: '',
    qualification: '',
    interest: ''
  };
  
  formMessage = '';
  isFormError = false;
  
  // WhatsApp number
  whatsappNumber = '+919953656810'; // Replace with your WhatsApp number

  // Programs data
  programs = [
    {
      icon: 'fa-solid fa-graduation-cap',
      title: '12th Pass Students',
      description: 'Start with the fundamentals and become job-ready for banking operations, customer handling, and entry-level finance roles.',
      tracks: [
        'Starter Program - 3 Months',
        'Professional Program - 6 Months',
        'Elite Program - 3 Years'
      ]
    },
    {
      icon: 'fa-solid fa-briefcase',
      title: 'Graduate Students',
      description: 'Get practical exposure from day one and prepare for banking, NBFC, wealth, and investment roles.',
      tracks: [
        'Graduate Starter - 3 Months',
        'Graduate Professional - 6 Months',
        'Graduate Elite - 3 Years'
      ]
    }
  ];

  // 12th Pass Tracks
  twelfthTracks = [
    {
      number: '01',
      title: 'Starter Program',
      duration: '3 Months',
      fees: '₹2,000',
      training: 'Basic banking operations, finance fundamentals, customer handling, KYC & documentation.',
      outcome: 'Guaranteed placement in banks and financial institutions.',
      roles: 'Bank Sales, CASA, Loan BDM, Aadi Fintech.',
      popular: false
    },
    {
      number: '02',
      title: 'Professional Program',
      duration: '6 Months',
      fees: '₹3,000',
      training: 'Advanced finance, wealth management, securities, trading basics, investment advisory.',
      outcome: 'Placement at better position and higher salary.',
      roles: 'Wealth CP, Securities, Trading Associate, Investment Executive.',
      popular: true
    },
    {
      number: '03',
      title: 'Elite Program',
      duration: '3 Years',
      fees: '₹4,000',
      training: 'Complete banking & finance mastery, practical exposure, industry projects.',
      certification: 'Skill India Government Certificate.',
      outcome: 'Placement as Banker, Branch Manager level roles, premium institutions.',
      roles: 'Senior Banker, Branch Operations, Credit Officer, Investment Manager.',
      popular: false
    }
  ];

  // Graduate Tracks
  graduateTracks = [
    {
      number: '01',
      title: 'Graduate Starter',
      duration: '3 Months',
      fees: '₹2,000',
      training: 'Banking operations + finance + practical exposure from Day 1.',
      placement: 'Bank roles, BDM, CASA, Aadi Fintech, Loan roles.',
      popular: false
    },
    {
      number: '02',
      title: 'Graduate Professional',
      duration: '6 Months',
      fees: '₹3,000',
      training: 'Advanced training: Wealth management, CP roles, securities, trading, investment.',
      placement: 'Mid-senior level roles in private banks and NBFCs.',
      popular: true
    },
    {
      number: '03',
      title: 'Graduate Elite',
      duration: '3 Years',
      fees: '₹4,000',
      training: 'Complete banker training with Skill India certification.',
      placement: 'Senior banking roles, Relationship Manager, Credit Manager, Branch Manager.',
      popular: false
    }
  ];

  // Roles data
  roles = [
    { icon: 'fa-solid fa-id-badge', title: 'Bank Sales Executive', description: 'Manage bank products, lead follow-ups, and customer onboarding.' },
    { icon: 'fa-solid fa-handshake', title: 'Loan BDM', description: 'A business development role focused on loan sourcing and client acquisition.' },
    { icon: 'fa-solid fa-mobile-screen-button', title: 'Aadi Fintech Associate', description: 'Support digital finance products and fintech customer operations.' },
    { icon: 'fa-solid fa-chart-pie', title: 'Wealth CP', description: 'Channel partner coordination and advisory support for wealth products.' },
    { icon: 'fa-solid fa-piggy-bank', title: 'CASA Executive', description: 'Handle current and savings account acquisition, activation, and servicing.' },
    { icon: 'fa-solid fa-file-invoice-dollar', title: 'Securities Dealer', description: 'Market orders, client desk support, and compliance-led dealing.' },
    { icon: 'fa-solid fa-arrow-trend-up', title: 'Trading Associate', description: 'Support trading basics, platform operations, and portfolio execution.' },
    { icon: 'fa-solid fa-coins', title: 'Investment Advisor', description: 'Provide financial planning, product fitment, and investment guidance.' }
  ];

  // Features data
  features = [
    { icon: 'fa-solid fa-chalkboard-user', title: 'Practical & Real-World Training', description: 'Hands-on practice with banking processes, customer scenarios, and documentation.' },
    { icon: 'fa-solid fa-user-tie', title: 'Guaranteed Placement Support', description: 'Interview preparation, referrals, and hiring partner coordination.' },
    { icon: 'fa-solid fa-certificate', title: 'Skill India Certified', description: 'Recognized certification pathway through the 3-year Elite Program.' },
    { icon: 'fa-solid fa-building-columns', title: 'Expert Banking Trainers', description: 'Mentors with private bank, NBFC, and financial services experience.' }
  ];

  // Steps data
  steps = [
    { number: 1, title: 'Register & Pay Entry Fee', description: 'Confirm your application after basic counselling.' },
    { number: 2, title: 'Attend Training', description: 'Complete your 3-month, 6-month, or 3-year track.' },
    { number: 3, title: 'Placement Interviews', description: 'Attend hiring rounds with banks, FinTech companies, and NBFCs.' },
    { number: 4, title: 'Get Placed', description: 'Start your career journey in a bank or financial institution.' }
  ];

  // Testimonials data
  testimonials = [
    { avatar: 'RK', name: 'Rohit Kumar', program: '3 Month Starter', text: '"After completing the 3-month training, I got placed at HDFC Bank. Best decision of my life!"' },
    { avatar: 'PS', name: 'Priya Sharma', program: '6 Month Professional', text: '"The wealth management modules and interview practice gave me confidence. I now work in an NBFC role."' },
    { avatar: 'AK', name: 'Aman Khan', program: 'Graduate Starter', text: '"After graduation, I needed clear direction. This practical banking training helped me get placed."' }
  ];

  // FAQ data
  faqs = [
    { question: 'Can 12th pass students apply?', answer: 'Yes, 12th pass students can apply for the Starter, Professional, and Elite tracks.' },
    { question: 'Is placement guaranteed?', answer: 'The program includes guaranteed placement support, interview preparation, and hiring partner coordination.' },
    { question: 'Is training online or offline?', answer: 'Online, offline, or blended training may be available depending on your city and batch availability.' },
    { question: 'When will I receive the Skill India certificate?', answer: 'The Skill India Government Certificate is part of the 3-year Elite Program completion pathway.' },
    { question: 'Is the entry fee refundable?', answer: 'The entry fee covers the registration and counselling process. The refund policy will be explained during admission confirmation.' }
  ];

  // Methods
  setTab(tab: string): void {
    this.activeTab = tab;
  }

  toggleFaq(index: number): void {
    this.openFaqIndex = this.openFaqIndex === index ? null : index;
  }

  isFaqOpen(index: number): boolean {
    return this.openFaqIndex === index;
  }

  applyProgram(qualification: string): void {
    this.formData.qualification = qualification;
    const applySection = document.getElementById('apply');
    if (applySection) {
      applySection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  onSubmit(): void {
    this.isFormError = false;
    this.formMessage = '';

    // Validation
    if (!this.formData.name || !this.formData.phone || !this.formData.email || 
        !this.formData.city || !this.formData.qualification || !this.formData.interest) {
      this.formMessage = 'Please fill all required fields.';
      this.isFormError = true;
      return;
    }

    // Phone validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(this.formData.phone)) {
      this.formMessage = 'Please enter a valid 10-digit mobile number.';
      this.isFormError = true;
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.formData.email)) {
      this.formMessage = 'Please enter a valid email address.';
      this.isFormError = true;
      return;
    }

    // Send to WhatsApp
    this.sendToWhatsApp();
  }

  sendToWhatsApp(): void {
    const { name, phone, email, city, qualification, interest } = this.formData;
    
    const message = encodeURIComponent(
      `🎓 *New Application Received*\n\n` +
      `👤 *Name:* ${name}\n` +
      `📱 *Phone:* ${phone}\n` +
      `📧 *Email:* ${email}\n` +
      `🏙️ *City:* ${city}\n` +
      `🎯 *Qualification:* ${qualification}\n` +
      `📚 *Program Interest:* ${interest}\n\n` +
      `Please contact this candidate with program details.`
    );

    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');

    // Show success message
    const firstName = name.trim().split(' ')[0] || 'Student';
    this.formMessage = `Thank you, ${firstName}! Your application is being sent to WhatsApp. Our team will contact you soon.`;
    
    // Reset form
    this.formData = {
      name: '',
      phone: '',
      email: '',
      city: '',
      qualification: '',
      interest: ''
    };
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}