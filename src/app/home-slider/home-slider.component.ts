import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';


@Component({
  selector: 'app-home-slider',
  standalone: true,
  imports: [CommonModule, SlickCarouselModule],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.css'
})
export class HomeSliderComponent {

   slides = [
    {
      subtitle: 'Strategic Advisory',
      title1: 'Strategic Financial &',
      title2: 'Real Estate Advisory',
      description:
        'Aadi Fintech delivers tailored solutions in Wealth Management and Fund Raising. We empower real estate projects with financial insights and market strategy. Our expert team ensures optimal planning, execution, and profitability. With industry foresight, we drive sustainable growth and investor confidence.',
      image: '/img/hero/home1-1.png',
    },
    {
      subtitle: 'Fintech Solutions',
      title1: 'Fintech Innovation &',
      title2: 'CRM Integration',
      description:
        'We build intelligent fintech solutions for banking and finance sectors. CRM implementation enhances client engagement and operational efficiency. Our tech-driven platforms automate workflows and reporting systems. We bridge finance with technology for scalable, future-ready growth.',
      image: '/img/hero/home1-2.png',
    },
    {
      subtitle: 'Compliance Expertise',
      title1: 'Compliance, Rating &',
      title2: 'NPA Consultation',
      description:
        'We offer expert guidance in credit rating and regulatory compliance. Our NPA consulting helps recover assets and restructure liabilities. Businesses trust us to ensure audit readiness and legal soundness. We provide clarity and direction in complex financial landscapes.',
      image: '/img/hero/home1-3.png',
    },
  ];


  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000, // 5 seconds
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
