import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-home-slider',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule, RouterModule],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.css'
})
export class HomeSliderComponent {

   slides = [
    {
      subtitle: 'Our Mission',
      title1: 'Our Mission',
      title2: 'With Aadifintech',
      description:
        'Aadi Fintech delivers tailored solutions in Wealth Management and Fund Raising. We empower real estate projects with financial insights and market strategy. Our expert team ensures optimal planning, execution, and profitability. With industry foresight, we drive sustainable growth and investor confidence.',
      image: '/img/hero/home1-1.png',
      link: '/services/ourMission'
    },
    {
      subtitle: 'Fund Raising',
      title1: 'Fund Raising',
      // title2: 'CRM Integration',
      description:
        'We build intelligent fintech solutions for banking and finance sectors. CRM implementation enhances client engagement and operational efficiency. Our tech-driven platforms automate workflows and reporting systems. We bridge finance with technology for scalable, future-ready growth.',
      image: '/img/hero/home1-2.png',
      link: '/services/fund-raising'
    },
    {
      subtitle: 'Debt Restructuring Services ',
      title1: 'Debt Restructuring Services',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/investment-banking'
    },
    {
      subtitle: 'Manpower Training & Placement Services',
      title1: 'Manpower Training &',
      title2: ' Placement Services',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/training-placement'
    },
     {
      subtitle: 'Credit Rating Advisory',
      title1: 'Credit Rating Advisory',
      // title2: ' Placement Services',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/credit-rating'
    },
     {
      subtitle: 'Tech Services',
      title1: 'Tech Services',
      // title2: ' Placement Services',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/tech-services'
    },
        {
      subtitle: 'Digital Marketing',
      title1: 'Digital Marketing',
      // title2: ' Placement Services',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/digital-marketing'
    },
          {
      subtitle: 'Loan For Every Indian',
      title1: 'Loan For Every Indian',
      // title2: ' Placement Services',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/loanForEveryIndian'
    },
        {
      subtitle: 'Real State Advisory',
      title1: 'Real State Advisory',
      // title2: ' Placement Services',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/realState'
    },
     {
      subtitle: 'Wealth Management',
      title1: 'Wealth Management',
      // title2: ' Placement Services',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/wealth'
    },
       {
      subtitle: 'Bill Discounting Solutions',
      title1: 'Bill Discounting Solutions',
      // title2: ' Placement Services',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/billDiscounting'
    },
        {
      subtitle: 'Export Bill Discounting',
      title1: 'Export Bill Discounting',
      // title2: ' Placement Services',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/exportbillDiscounting'
    },
        {
      subtitle: 'Credit Rating Advisory',
      title1: 'Credit Rating Advisory',
      // title2: ' Placement Services',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/creditRatingAdversory'
    },
        {
      subtitle: 'Our Insurance Services',
      title1: 'Our Insurance Services',
      // title2: ' Placement Services',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/ourInsuranceServices'
    },
        {
      subtitle: 'Our End to End Foreign Services',
      title1: 'Our End to End Foreign Services',
      // title2: ' Placement Services',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/ourEndToEndforeignServices'
    },
        {
      subtitle: 'Banking Domain Expert Consultancy',
      title1: 'Banking Domain  & ',
      title2: ' Expert Consultancy',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/bankingDomainExpertConsultency'
    },
        {
      subtitle: 'Financial Consultancy for Corporates',
      title1: 'Financial Consultancy &',
      title2: 'for Corporates',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
      link:'services/FinancialConsultancyforCorporates'
    },
  ];


  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000, // 5 seconds
    dots: false,
    arrows: false,
    fade: true,
    pauseOnHover: false,
    speed: 1000
  };

  // Text reset karenge har slide ke baad
  onAfterChange() {
    setTimeout(() => {
      const topElements = document.querySelectorAll('.animate-top');
      const bottomElements = document.querySelectorAll('.animate-bottom');

      topElements.forEach(el => {
        el.classList.remove('animate-top');
        void (el as HTMLElement).offsetWidth; // force reflow
        el.classList.add('animate-top');
      });

      bottomElements.forEach(el => {
        el.classList.remove('animate-bottom');
        void (el as HTMLElement).offsetWidth;
        el.classList.add('animate-bottom');
      });
    }, 50); // thoda delay better re-render ke liye
  }



}
