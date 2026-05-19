import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home-slider',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.css'
})
export class HomeSliderComponent implements OnInit, OnDestroy {

  currentIndex = 0;
  isAnimating = false;
  private scrollTimeout: any;

  slides = [
    {
      subtitle: 'Our Mission',
      title1: 'Our Mission',
      title2: 'With Aadifintech',
      description: 'Aadi Fintech delivers tailored solutions in Wealth Management and Fund Raising. We empower real estate projects with financial insights and market strategy. Our expert team ensures optimal planning, execution, and profitability.',
      badge1: 'Financial Excellence',
      badge2: 'Since 2014',
      stat1num: '10+', stat1label: 'Years Experience',
      stat2num: '500+', stat2label: 'Clients Served',
      iconType: 'mission',
      link: '/services/ourMission'
    },
    {
      subtitle: 'Fund Raising',
      title1: 'Fund Raising',
      title2: 'Solutions',
      description: 'We build intelligent fintech solutions for banking and finance sectors. CRM implementation enhances client engagement and operational efficiency. Our tech-driven platforms automate workflows and reporting systems.',
      badge1: 'Capital Markets',
      badge2: 'Growth Focused',
      stat1num: '₹200Cr+', stat1label: 'Funds Raised',
      stat2num: '150+', stat2label: 'Projects Funded',
      iconType: 'fundraise',
      link: '/services/fund-raising'
    },
    {
      subtitle: 'Debt Restructuring Services',
      title1: 'Debt Restructuring',
      title2: 'Services',
      description: 'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness.',
      badge1: 'NPA Consulting',
      badge2: 'Compliance Ready',
      stat1num: '98%', stat1label: 'Recovery Rate',
      stat2num: '₹50Cr+', stat2label: 'NPA Resolved',
      iconType: 'debt',
      link: '/services/investment-banking'
    },
    {
      subtitle: 'Manpower Training & Placement',
      title1: 'Manpower Training &',
      title2: 'Placement Services',
      description: 'We provide end-to-end manpower solutions from skill development to placement. Our training programs are industry-aligned and build future-ready professionals for banking and fintech domains.',
      badge1: 'Industry Ready',
      badge2: 'Job Guaranteed',
      stat1num: '2000+', stat1label: 'Trained Professionals',
      stat2num: '95%', stat2label: 'Placement Rate',
      iconType: 'training',
      link: '/services/training-placement'
    },
    {
      subtitle: 'Credit Rating Advisory',
      title1: 'Credit Rating',
      title2: 'Advisory',
      description: 'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. We provide clarity and direction in complex financial landscapes.',
      badge1: 'CRISIL Aligned',
      badge2: 'Audit Ready',
      stat1num: '200+', stat1label: 'Ratings Advised',
      stat2num: '100%', stat2label: 'Compliance Rate',
      iconType: 'credit',
      link: '/services/credit-rating'
    },
    {
      subtitle: 'Tech Services',
      title1: 'Tech',
      title2: 'Services',
      description: 'We bridge finance with technology for scalable, future-ready growth. Our platforms offer API integrations, CRM systems, workflow automation, and custom fintech dashboards built for banking and NBFC sectors.',
      badge1: 'API Driven',
      badge2: 'Fintech Ready',
      stat1num: '50+', stat1label: 'Tech Projects',
      stat2num: '99.9%', stat2label: 'Uptime SLA',
      iconType: 'tech',
      link: '/services/tech-services'
    },
    {
      subtitle: 'Digital Marketing',
      title1: 'Digital',
      title2: 'Marketing',
      description: 'We craft powerful digital marketing strategies for fintech brands. From SEO and social media to performance advertising, our campaigns are data-driven and ROI-focused for maximum lead generation.',
      badge1: 'SEO & Social',
      badge2: 'ROI Focused',
      stat1num: '300%', stat1label: 'Avg ROI',
      stat2num: '100+', stat2label: 'Campaigns Run',
      iconType: 'digital',
      link: '/services/digital-marketing'
    },
    {
      subtitle: 'Loan For Every Indian',
      title1: 'Loan For',
      title2: 'Every Indian',
      description: 'We connect individuals and businesses to the right loan products at the best rates. From home loans to MSME credit, we simplify the entire process with our expert advisory and lender network.',
      badge1: 'Home & MSME Loans',
      badge2: 'Low Interest Rates',
      stat1num: '₹500Cr+', stat1label: 'Loans Disbursed',
      stat2num: '10000+', stat2label: 'Happy Borrowers',
      iconType: 'loan',
      link: '/services/loanForEveryIndian'
    },
    {
      subtitle: 'Real Estate Advisory',
      title1: 'Real Estate',
      title2: 'Advisory',
      description: 'We empower real estate projects with financial insights and market strategy. From land acquisition to project financing, our advisory ensures optimal planning, execution, and profitability.',
      badge1: 'RERA Compliant',
      badge2: 'Pan India Network',
      stat1num: '200+', stat1label: 'Projects Advised',
      stat2num: '₹800Cr+', stat2label: 'Property Value',
      iconType: 'realestate',
      link: '/services/realState'
    },
    {
      subtitle: 'Wealth Management',
      title1: 'Wealth',
      title2: 'Management',
      description: 'Our wealth management services help you grow, protect, and transfer wealth efficiently. We use data-driven strategies to maximize returns and minimize risk for individuals and corporates.',
      badge1: 'Portfolio Growth',
      badge2: 'Risk Optimized',
      stat1num: '₹1000Cr+', stat1label: 'AUM Managed',
      stat2num: '18%', stat2label: 'Avg Returns',
      iconType: 'wealth',
      link: '/services/wealth'
    },
    {
      subtitle: 'Bill Discounting Solutions',
      title1: 'Bill Discounting',
      title2: 'Solutions',
      description: 'We provide fast and reliable bill discounting services to improve your business liquidity. Our solutions cover domestic and export bills with competitive discount rates and quick processing.',
      badge1: 'Quick Processing',
      badge2: 'Best Rates',
      stat1num: '₹300Cr+', stat1label: 'Bills Discounted',
      stat2num: '48hrs', stat2label: 'Processing Time',
      iconType: 'bill',
      link: '/services/billDiscounting'
    },
    {
      subtitle: 'Export Bill Discounting',
      title1: 'Export Bill',
      title2: 'Discounting',
      description: 'We support exporters with fast bill discounting services to maintain steady cash flow. Our international trade finance expertise ensures compliance with FEMA and RBI guidelines.',
      badge1: 'FEMA Compliant',
      badge2: 'Global Reach',
      stat1num: '₹150Cr+', stat1label: 'Export Bills',
      stat2num: '30+', stat2label: 'Countries Covered',
      iconType: 'export',
      link: '/services/exportbillDiscounting'
    },
    {
      subtitle: 'Our Insurance Services',
      title1: 'Our Insurance',
      title2: 'Services',
      description: 'We offer comprehensive insurance solutions covering life, health, motor, and business. Our advisors help you choose the right plan with maximum coverage at competitive premiums.',
      badge1: 'Life & Health',
      badge2: 'Best Premiums',
      stat1num: '100+', stat1label: 'Plans Available',
      stat2num: '5000+', stat2label: 'Policies Issued',
      iconType: 'insurance',
      link: '/services/ourInsuranceServices'
    },
    {
      subtitle: 'Our End to End Foreign Services',
      title1: 'End to End',
      title2: 'Foreign Services',
      description: 'We offer complete foreign services including FEMA compliance, overseas investment advisory, forex management, and cross-border transaction support for businesses and individuals.',
      badge1: 'Forex Advisory',
      badge2: 'FEMA Compliant',
      stat1num: '50+', stat1label: 'Countries Served',
      stat2num: '₹200Cr+', stat2label: 'Forex Managed',
      iconType: 'foreign',
      link: '/services/ourEndToEndforeignServices'
    },
    {
      subtitle: 'Banking Domain Expert Consultancy',
      title1: 'Banking Domain &',
      title2: 'Expert Consultancy',
      description: 'Our banking domain experts provide deep consultancy on operations, compliance, credit, and technology. We help banks and NBFCs optimize performance and navigate regulatory challenges.',
      badge1: 'RBI Guidelines',
      badge2: 'NBFC Experts',
      stat1num: '25+', stat1label: 'Bank Clients',
      stat2num: '100%', stat2label: 'Compliance Track',
      iconType: 'banking',
      link: '/services/bankingDomainExpertConsultency'
    },
    {
      subtitle: 'Financial Consultancy for Corporates',
      title1: 'Financial Consultancy',
      title2: 'for Corporates',
      description: 'We deliver strategic financial consultancy for corporates — from CFO advisory and working capital management to fundraising and investor relations. Your growth, our blueprint.',
      badge1: 'CFO Advisory',
      badge2: 'Strategic Planning',
      stat1num: '300+', stat1label: 'Corporates Served',
      stat2num: '₹2000Cr+', stat2label: 'Value Created',
      iconType: 'corporate',
      link: '/services/FinancialConsultancyforCorporates'
    },
  ];

  get totalSlides() { return this.slides.length; }

  ngOnInit() {
    // keyboard navigation
    window.addEventListener('keydown', this.onKeyDown.bind(this));
  }

  ngOnDestroy() {
    window.removeEventListener('keydown', this.onKeyDown.bind(this));
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
  }

  onKeyDown(e: KeyboardEvent) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') this.goTo(this.currentIndex + 1);
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') this.goTo(this.currentIndex - 1);
  }

  @HostListener('wheel', ['$event'])
  onWheel(e: WheelEvent) {
    e.preventDefault();
    if (this.isAnimating) return;
    if (this.scrollTimeout) clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      if (e.deltaY > 0) this.goTo(this.currentIndex + 1);
      else this.goTo(this.currentIndex - 1);
    }, 50);
  }

  goTo(index: number) {
    if (this.isAnimating) return;
    if (index < 0 || index >= this.totalSlides) return;
    this.isAnimating = true;
    this.currentIndex = index;
    setTimeout(() => { this.isAnimating = false; }, 1000);
  }

  getTrackTransform(): string {
    return `translateY(-${this.currentIndex * 100}vh)`;
  }

  getProgressHeight(): string {
    return `${((this.currentIndex + 1) / this.totalSlides) * 100}%`;
  }

  getPanelBg(index: number): string {
    const bgs = [
      'linear-gradient(135deg, #dd3333 0%, #8b0000 55%, #1a0000 100%)',
      'linear-gradient(135deg, #0d0000 0%, #3d0000 40%, #dd3333 100%)',
      'linear-gradient(135deg, #dd3333 0%, #c0392b 30%, #2c0000 100%)'
    ];
    return bgs[index % 3];
  }

  // Touch support
  private touchStartY = 0;

  onTouchStart(e: TouchEvent) {
    this.touchStartY = e.touches[0].clientY;
  }

  onTouchEnd(e: TouchEvent) {
    const diff = this.touchStartY - e.changedTouches[0].clientY;
    if (Math.abs(diff) > 50) {
      if (diff > 0) this.goTo(this.currentIndex + 1);
      else this.goTo(this.currentIndex - 1);
    }
  }
}