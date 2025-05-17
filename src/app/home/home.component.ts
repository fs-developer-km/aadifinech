import { Component } from '@angular/core';
import { HomeSliderComponent } from '../home-slider/home-slider.component';
// import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-home',
  standalone: true,
  imports : [HomeSliderComponent, CommonModule, CarouselModule, SlickCarouselModule, RouterModule, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

   // Direct path use करें
   backgroundImage = '/img/bg/service-bg-6.png';


   // Ya phir dynamic agar chahiye toh
   getBackgroundImage() {
     return 'url(' + this.backgroundImage + ')';
   }
   isMobileMenuOpen = false;

  //  isMobileMenuOpenn() {
  //    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  //  }

  //  toggleMobileMenu() {
  //    this.isMobileMenuOpen = false;
  //  }

   toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }


  //  backgroundImage = 'path-to-your-background-image.jpg';

  services = [
    {
      image: '/img/service/service_5_1.jpg',
      icon: '/img/icon/service_icon_6_1.svg',
      title: 'Fund Raising',
      text: 'We help businesses raise capital through equity, debt, or hybrid models, offering full support from pitch to closure.'
    },
    {
      image: '/img/service/service_5_2.jpg',
      icon: '/img/icon/service_icon_6_2.svg',
      title: 'Investment Banking',
      text: 'We handle mergers, acquisitions, and alliances, ensuring optimized capital structures and strategic business growth.'
    },
    {
      image: '/img/service/service_5_3.jpg',
      icon: '/img/icon/service_icon_6_3.svg',
      title: 'Credit Rating Support',
      text: 'We assist with financials, documentation, and strategy to improve credit ratings and boost funding opportunities.'
    },
    {
      image: '/img/service/service_5_4.jpg',
      icon: '/img/icon/service_icon_6_4.svg',
      title: 'Training & Outsourcing',
      text: 'We provide skill training, strong placement support, and outsourcing services to improve efficiency and talent growth.'
    },
    {
      image: '/img/service/service_5_5.jpg',
      icon: '/img/icon/service_icon_6_5.svg',
      title: 'Tech Services',
      text: 'We build scalable tech platforms, from websites to SaaS, with a focus on performance, security, and transformation.'
    }
  ];


   customOptions = {
    loop: true,
    margin: 30,
    nav: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 1000,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      992: {
        items: 4
      }
    }
  };


  // seven slider

 slideConfig = {
  centerMode: true,
  slidesToShow: 1,
  dots: false,
  autoplay: true,
    autoplayTimeout: 1000,
  arrows: false,  
  infinite: true,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerMode: false, 
      }
    }
  ]
};


  projectItems = [
    {
      img: '/img/project/portfolio_5_1.png',
      subtitle: 'Health Insurance',
      title: 'Long-term Care Solutions',
      link: 'project-details.html'
    },
    {
      img: '/img/project/portfolio_5_2.png',
      subtitle: 'Liability Insurance',
      title: 'Family Liability Solution',
      link: 'project-details.html'
    },
    {
      img: '/img/project/portfolio_5_3.png',
      subtitle: 'Life Insurance',
      title: 'Future Financial Solutions',
      link: 'project-details.html'
    },
    // ...aur bhi add kar sakte ho
  ];


  // ten

/* Slider Configuration Update */
slideConfig2 = {
  infinite: true,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 2000,
  pauseOnHover: true,
  arrows: false, // Default arrows hide karein
  dots: false,
  prevArrow: '.slick-prev', // Custom arrow selectors
  nextArrow: '.slick-next',
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        centerMode: false
      }
    }
  ]
};



testimonials = [
  {
    img: '/img/testimonial/testi_5_1.png',
    title: 'Reliable Support',
    rating: [1, 2, 3, 4],
    emptyRating: [1],
    text: 'Aadi Fintech made my loan journey simple and clear.',
    name: 'Rajesh Mehra',
    designation: 'Entrepreneur'
  },
  {
    img: '/img/testimonial/testi_4_2.png',
    title: 'Professional Team',
    rating: [1, 2, 3, 4],
    emptyRating: [1],
    text: 'Got the right financial advice for my business.',
    name: 'Priya Sharma',
    designation: 'Business Owner'
  },
  {
    img: '/img/testimonial/testi_3_1.png',
    title: 'Quick Processing',
    rating: [1, 2, 3, 4],
    emptyRating: [1],
    text: 'Loan approval was quick and stress-free.',
    name: 'Amit Khurana',
    designation: 'Freelancer'
  },
  {
    img: '/img/testimonial/testi_4_1.png',
    title: 'Highly Recommended',
    rating: [1, 2, 3, 4],
    emptyRating: [1],
    text: 'Great service and complete trust in Aadi Fintech.',
    name: 'Neha Verma',
    designation: 'IT Consultant'
  }
];



}
