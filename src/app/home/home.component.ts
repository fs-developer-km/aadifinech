import { Component, ViewChild } from '@angular/core';
import { HomeSliderComponent } from '../home-slider/home-slider.component';
// import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CalculatorComponent } from '../calculator/calculator.component';
import { LogoSliderComponent } from '../logo-slider/logo-slider.component';
import { ServiceSliderComponent } from '../service-slider/service-slider.component';


interface servicesx {
  icon: string;
  title: string;
  description: string;
  link: string;
}



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSliderComponent, SlickCarouselModule, ReactiveFormsModule, CommonModule, CarouselModule, SlickCarouselModule, RouterModule, FormsModule, CalculatorComponent, LogoSliderComponent, ServiceSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  link: any;
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;




  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: false,
    arrows: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  // othre slider path

  slideConfigs = {
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    infinite: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  };

  ngOnInit(): void {
    // this.groupImages();
  }


  dematUrl: string = 'https://aaa.iiflcapital.com/login';

  openDematAccount(): void {
    window.open(this.dematUrl, '_blank');
  }



  // custom next/prev
  nextSlide() {
    if (this.slickModal) {
      this.slickModal.slickNext();
    }
  }

  prevSlide() {
    if (this.slickModal) {
      this.slickModal.slickPrev();
    }
  }





  servicesx = [
    {
      icon: '/img/icon/icon1.png',
      title: 'Fund Raising',
      description: 'Get fast funding and support to grow your business and achieve goals smarter.',
      link: 'services/fund-raising'
    },
    {
      icon: '/img/icon/icon4.png',
      title: 'Manpower Training & Placement Services',
      description: 'Expert training and placement to help you...',
      link: 'services/training-placement'
    },
    {
      icon: '/img/icon/icon5.png',
      title: 'Debt Restructuring Services',
      description: 'Restructure your debts smartly for a healthier...',
      link: 'services/investment-banking'
    },
    {
      icon: '/img/icon/icon6.png',
      title: 'Credit Rating Advisory',
      description: 'Boost your credit profile with expert guidance for smarter financial decisions.',
      link: 'services/credit-rating'
    },
    {
      icon: '/img/icon/icon7.png',
      title: 'Tech Services',
      description: 'Innovative tech solutions to help your business stay ahead and grow efficiently.',
      link: 'services/tech-services'
    },
    {
      icon: '/img/icon/icon8.png',
      title: 'Digital Marketing',
      description: 'Effective marketing strategies to boost your brand presence and drive results.',
      link: 'services/digital-marketing'
    },
    {
      icon: '/img/icon/icon9.png',
      title: 'Loan For Every Indian',
      description: 'Hassle-free loans designed to meet diverse needs with quick approvals and easy terms.',
      link: 'services/loanForEveryIndian'
    },
    {
      icon: '/img/icon/icon10.png',
      title: 'Real Estate Advisory',
      description: 'Expert guidance to make informed decisions and succeed in the real estate.',
      link: 'services/realState'
    },
    {
      icon: '/img/icon/icon11.png',
      title: 'Wealth Management',
      description: 'Personalized solutions to grow, protect, and optimize your financial assets smartly.',
      link: 'services/wealth'
    },
    {
      icon: '/img/icon/icon12.png',
      title: 'Bill Discounting Solutions',
      description: 'Convert invoices into instant cash to keep your business.',
      link: 'services/billDiscounting'
    },
    {
      icon: '/img/icon/icon13.png',
      title: 'Export Bill Discounting',
      description: 'Get immediate funds on export invoices to boost...',
      link: 'services/exportbillDiscounting'
    },
    {
      icon: '/img/icon/icon14.png',
      title: 'Credit Rating Advisory',
      description: 'Enhance your rating with expert guidance for stronger financial credibility.',
      link: 'services/creditRatingAdversory'
    },
    {
      icon: '/img/icon/icon15.png',
      title: 'Our Insurance Services',
      description: 'Tailored insurance solutions to protect what matters...',
      link: 'services/ourInsuranceServices'
    },
    {
      icon: '/img/icon/icon16.png',
      title: 'End-to-End Foreign Services',
      description: 'Seamless international solutions...',
      link: 'services/ourEndToEndforeignServices'
    },
    {
      icon: '/img/icon/icon17.png',
      title: 'Banking Domain Expert Consultancy',
      description: 'Expert insights to optimize banking...',
      link: 'services/bankingDomainExpertConsultency'
    },
    {
      icon: '/img/icon/icon18.png',
      title: 'Financial Consultancy for Corporates',
      description: 'Strategic financial advice to empower corporate...',
      link: 'services/FinancialConsultancyforCorporates'
    }
  ];



  // angular whastapp form work start

  businessLoanForm: FormGroup;
  isSubmittedSuccessfully = false;


  discountingForm: FormGroup;
  isDiscountingSubmitted = false;

  fundingForm: FormGroup;
  isFundingSubmitted = false;

  complianceForm: FormGroup;
  isComplianceSubmitted = false;

  // for footer

  newsletterForm: FormGroup;
  isNewsletterSubmitted = false;


  constructor(private fb: FormBuilder) {
    this.businessLoanForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required]
    });

    this.discountingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      discountingType: ['', Validators.required]
    });

    // Funding form initialize karo
    this.fundingForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      fundingType: ['', Validators.required]
    });

    // Compliance form init karo
    this.complianceForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      compliance: ['', Validators.required]
    });

    // for footer 

    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  sendBusinessLoanToWhatsApp(): void {
    if (this.businessLoanForm.valid) {
      const name = this.businessLoanForm.value.name;
      const email = this.businessLoanForm.value.email;
      const service = this.businessLoanForm.value.service;

      const message = `💼 *New Business Loan Inquiry!*\n
📌 *Name:* ${name}\n
📧 *Email:* ${email}\n
🏦 *Loan Type:* ${service}\n
🕒 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n
📣 _This lead came from the website. Please respond ASAP._ 🚀`;

      this.isSubmittedSuccessfully = true;

      const encodedMessage = encodeURIComponent(message);
      const adminNumber = '919953656810'; // ✅ No +
      const whatsappURL = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

      window.open(whatsappURL, '_blank');
    } else {
      this.businessLoanForm.markAllAsTouched();
    }
  }





  // second bill discount





  sendDiscountingToWhatsApp(): void {
    if (this.discountingForm.valid) {
      const { name, email, discountingType } = this.discountingForm.value;

      const message = `💼 *New Bill Discounting Inquiry!*

📌 *Name:* ${name}
📧 *Email:* ${email}
🧾 *Invoice Type:* ${discountingType}

🕒 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

🚀 _Lead submitted from the website. Please respond ASAP!_`;

      const encodedMessage = encodeURIComponent(message);
      const adminNumber = '919953656810'; // Replace with admin's WhatsApp number
      const whatsappURL = `https://wa.me/${adminNumber}?ftext=${encodedMessage}`;

      window.open(whatsappURL, '_blank');

      this.isDiscountingSubmitted = true;
      this.discountingForm.reset();
    } else {
      this.discountingForm.markAllAsTouched();
      this.isDiscountingSubmitted = false;
    }
  }


  // Funding form ka WhatsApp method
  sendFundingToWhatsApp(): void {
    if (this.fundingForm.valid) {
      const { name, email, fundingType } = this.fundingForm.value;

      const message = `💼 *New Funding Solutions Inquiry!*

📌 *Name:* ${name}
📧 *Email:* ${email}
💰 *Funding Option:* ${fundingType}

🕒 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

🚀 _Lead submitted from the website. Please respond ASAP!_`;

      const encodedMessage = encodeURIComponent(message);
      const adminNumber = '919953656810'; // admin number yaha dalein
      const whatsappURL = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

      window.open(whatsappURL, '_blank');

      this.isFundingSubmitted = true;
      this.fundingForm.reset();
    } else {
      this.fundingForm.markAllAsTouched();
      this.isFundingSubmitted = false;
    }
  }




  sendComplianceToWhatsApp(): void {
    if (this.complianceForm.valid) {
      const { name, email, compliance } = this.complianceForm.value;

      const message = `💼 *New Compliance Advisory Inquiry!*

📌 *Name:* ${name}
📧 *Email:* ${email}
⚖️ *Compliance Type:* ${compliance}

🕒 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

🚀 _Lead submitted from the website. Please respond ASAP!_`;

      const encodedMessage = encodeURIComponent(message);
      const adminNumber = '919953656810'; // Admin ka WhatsApp number
      const whatsappURL = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

      window.open(whatsappURL, '_blank');

      this.isComplianceSubmitted = true;
      this.complianceForm.reset();
    } else {
      this.complianceForm.markAllAsTouched();
      this.isComplianceSubmitted = false;
    }
  }

  // end bill discount


  // for footer email send


  sendNewsletterToWhatsApp(): void {
    if (this.newsletterForm.valid) {
      const { email } = this.newsletterForm.value;

      const message = `📬 *New Newsletter Subscription!*

📧 *Email:* ${email}

🕒 *Time:* ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

🚀 _Someone subscribed to the newsletter. Please follow up!_`;

      const encodedMessage = encodeURIComponent(message);
      const adminNumber = '919953656810'; // jo number diya hai use yahi daalo (India code ke saath)
      const whatsappURL = `https://wa.me/${adminNumber}?text=${encodedMessage}`;

      window.open(whatsappURL, '_blank');

      this.isNewsletterSubmitted = true;
      this.newsletterForm.reset();
    } else {
      this.newsletterForm.markAllAsTouched();
      this.isNewsletterSubmitted = false;
    }
  }



  // Direct path
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
      title: 'Interest Cost Optimization',
      link: '/services/investment-banking',
      text: 'We evaluate your existing loans and negotiate with banks or NBFCs to reduce interest costs on business loans, CC/OD limits, and other financial products.'
    },
    {
      image: '/img/service/service_5_2.jpg',
      icon: '/img/icon/service_icon_6_2.svg',
      title: 'Limit Enhancement Strategy',
      link: '/services/investment-banking',
      text: 'We help enhance your loan limits using your existing turnover and assets, without the need for new collateral, ensuring more working capital access.'
    },
    {
      image: '/img/service/service_5_3.jpg',
      icon: '/img/icon/service_icon_6_3.svg',
      title: 'Better Returns on Deposits',
      link: '/services/investment-banking',
      text: 'Improve your idle fund usage with better FD rates. We help corporates, SMEs, and HNIs strategically place funds to maximize fixed deposit returns.'
    },
    {
      image: '/img/service/service_5_4.jpg',
      icon: '/img/icon/service_icon_6_4.svg',
      title: 'Strategic Banking Restructuring',
      link: '/services/investment-banking',
      text: 'We redesign your banking approach to lower hidden charges, streamline operations, and improve relationships with banks and financial institutions.'
    },
    {
      image: '/img/service/service_5_5.jpg',
      icon: '/img/icon/service_icon_6_5.svg',
      title: 'One-on-One Financial Consultations',
      link: '/services/investment-banking',

      text: 'Get personal advice from Mr. Raj Sharma to reduce EMI pressure, choose smarter banking solutions, and manage business or personal cash flow better.'
    }
  ];



  customOptions = {
    loop: true,
    margin: 30,
    nav: false,
    dots: false,
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

  // slideConfig = {
  //   centerMode: true,
  //   slidesToShow: 1,
  //   dots: false,
  //   autoplay: true,
  //   autoplayTimeout: 1000,
  //   arrows: false,
  //   infinite: true,
  //   responsive: [
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: 1,
  //         centerMode: false,
  //       }
  //     }
  //   ]
  // };


  // projectItems = [
  //   {
  //     img: '/img/team/event1.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event7.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event10.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event11.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event12.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event13.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event14.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event15.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event16.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event17.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event18.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event19.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event20.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event21.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event23.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event24.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event25.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event26.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event27.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event28.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event29.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event30.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event31.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event32.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event33.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event34.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event35.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event36.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event37.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event38.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event39.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event40.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event41.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event42.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   },
  //   {
  //     img: '/img/team/event43.jpg',
  //     subtitle: 'Aadifintech',
  //     title: 'Aadifintech',
  //     link: ''
  //   }
  // ];

  // Grouped items - har group mein 2 images
  groupedProjectItems: any[][] = [];

  // slideConfigs = {
  //   slidesToShow: 3,
  //   slidesToScroll: 1,
  //   autoplay: true,
  //   autoplaySpeed: 2000,
  //   dots: true,
  //   arrows: true,
  //   infinite: true,
  //   responsive: [
  //     {
  //       breakpoint: 1200,
  //       settings: {
  //         slidesToShow: 3
  //       }
  //     },
  //     {
  //       breakpoint: 992,
  //       settings: {
  //         slidesToShow: 2
  //       }
  //     },
  //     {
  //       breakpoint: 576,
  //       settings: {
  //         slidesToShow: 1
  //       }
  //     }
  //   ]
  // };


  // groupImages(): void {
  //   const groupSize = 2;
  //   for (let i = 0; i < this.projectItems.length; i += groupSize) {
  //     this.groupedProjectItems.push(
  //       this.projectItems.slice(i, i + groupSize)
  //     );
  //   }
  // }


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


  // 🔹 Default active tab
  activeTab: string = 'loan';

  // 🔹 Tab Titles
  tabTitles: any = {
    loan: 'Business Loan',
    discounting: 'Bill Discounting',
    funding: 'Funding Solutions',
    compliance: 'Compliance Advisory'
  };

  // 🔹 Selected tab title
  selectedTabTitle: string = this.tabTitles[this.activeTab];

  // 🔹 Method to handle tab click
  onTabClick(tabKey: string): void {
    this.activeTab = tabKey;
    this.selectedTabTitle = this.tabTitles[tabKey];
  }


}
