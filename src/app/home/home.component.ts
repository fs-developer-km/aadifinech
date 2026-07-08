import { Component, ElementRef, ViewChild } from '@angular/core';
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
import { Meta, Title } from '@angular/platform-browser';
import { CertificatesComponent } from '../certificates/certificates.component';


interface servicesx {
  icon: string;
  title: string;
  description: string;
  link: string;
}

interface Message {
  type: 'bot' | 'user';
  text: string;
  time: string;
}
 
interface Option {
  label: string;
  value: string;
  next: string;
}
 
interface FlowNode {
  message: string;
  options?: Option[];
  isEnd?: boolean;
  whatsappMsg?: string;
}



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeSliderComponent, SlickCarouselModule, ReactiveFormsModule, CommonModule, CarouselModule, SlickCarouselModule, RouterModule, FormsModule, CalculatorComponent, LogoSliderComponent, ServiceSliderComponent,CertificatesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  link: any;
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;
   @ViewChild('chatBody') chatBody!: ElementRef;
    private readonly WHATSAPP_NUMBER = '919953656890';

selectedLang: 'hi' | 'en' | null = null;


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
  setTimeout(() => {
    this.addBotMessage(
      this.flow['language_select'].message,
      this.flow['language_select'].options || []
    );
  }, 1500);
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


  constructor(private fb: FormBuilder,

    private titleService: Title,
    private metaService: Meta

  ) {
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



    // Page Title
    this.titleService.setTitle('Aadi Fintech | Loan & Business Finance Services');

    // Meta Description
    this.metaService.updateTag({
      name: 'description',
      content: 'Aadi Fintech is a trusted fintech consultancy offering loan restructuring, CIBIL score restoration, business financing, coaching, internships, placement services, and expert financial solutions.'
    });

    // Meta Keywords
    this.metaService.updateTag({
      name: 'keywords',
      content: `
      Fintech consultancy,
      Loan restructuring services,
      CIBIL score improvement,
      Business financing,
      New loan services,
      Student internship,
      Placement services,
      Financial consultancy,
      Business loan experts,
      Credit score restoration
      `
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


  // chat boat ts 

   isOpen = false;
  isTyping = false;
  unreadCount = 1;
  messages: Message[] = [];
  currentOptions: Option[] = [];
  userInput = '';
  private shouldScroll = false;
 
  // Collected user data for final WhatsApp message
  private userData: { [key: string]: string } = {};
  private currentStep = 'welcome';
 
  // ─── Conversation Flow ───────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// REPLACE ONLY the `private flow` object inside HomeComponent with this block.
// Everything else in home.component.ts stays exactly the same.
// ─────────────────────────────────────────────────────────────────────────────

private flow: { [key: string]: FlowNode } = {

  // ── STEP 1 : Language Select ──────────────────────────────────────────────
  language_select: {
    message: `🌐 <b>Welcome to Aadi Fintech!</b><br><br>Please choose your preferred language:<br><br>अपनी भाषा चुनें:`,
    options: [
      { label: '🇮🇳 हिंदी',   value: 'hi', next: 'welcome_hi' },
      { label: '🇬🇧 English', value: 'en', next: 'welcome_en' },
    ]
  },


  // ══════════════════════════════════════════════════════════════════════════
  //  HINDI FLOW
  // ══════════════════════════════════════════════════════════════════════════

welcome_hi: {
    message: `👋 <b>नमस्ते! Aadi Fintech में आपका स्वागत है।</b><br><br>
मैं हूँ <b>Aadi</b> — आपका virtual financial assistant! 🏦<br><br>
आज मैं आपकी क्या सहायता कर सकता हूँ?`,
    options: [
      { label: '📈 Investment',       value: 'investment', next: 'investment_menu_hi' },
      { label: '🛡️ Insurance',        value: 'insurance',  next: 'insurance_menu_hi'  },
      { label: '💰 Loans',            value: 'loans',      next: 'loans_menu_hi'      },
      { label: '🎓 Career & Finance Training', value: 'career', next: 'career_menu_hi' },
      { label: '📞 Connect With Us',  value: 'connect',    next: 'connect_menu_hi'    },
    ]
  },

  // ── INVESTMENT (Hindi) ────────────────────────────────────────────────────
  investment_menu_hi: {
    message: `📈 <b>Investment सर्विसेज़</b><br><br>आप किस Investment सर्विस में रुचि रखते हैं?`,
    options: [
      { label: '📊 Demat Account',             value: 'demat',      next: 'inv_demat_hi'      },
      { label: '💹 Trading Account',           value: 'trading',    next: 'inv_trading_hi'    },
      { label: '📋 Investment Advisory',       value: 'advisory',   next: 'inv_advisory_hi'   },
      { label: '🏦 Mutual Funds',              value: 'mf',         next: 'inv_mf_hi'         },
      { label: '📅 SIP Investment',            value: 'sip',        next: 'inv_sip_hi'        },
      { label: '🚀 IPO Services',              value: 'ipo',        next: 'inv_ipo_hi'        },
      { label: '💼 Portfolio Management',      value: 'portfolio',  next: 'inv_portfolio_hi'  },
      { label: '🎯 Retirement Planning',       value: 'retirement', next: 'inv_retirement_hi' },
      { label: '💡 Wealth Creation Solutions', value: 'wealth',     next: 'inv_wealth_hi'     },
      { label: '⬅️ वापस जाएं',                value: 'back',       next: 'welcome_hi'        },
    ]
  },

  inv_demat_hi: {
    message: `📊 <b>Demat Account</b><br><br>
Aadi Fintech के साथ अपना Demat Account खोलें:<br><br>
✅ <b>Free Demat Account</b> — Zero opening & maintenance charges<br>
✅ Paperless KYC — मिनटों में complete<br>
✅ Equity, F&O, Currency, Commodity — सब एक जगह<br>
✅ Advanced trading platform with real-time data<br>
✅ Expert guidance हर step पर`,
    options: [
      { label: '📋 Free Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Investment मेनू',            value: 'back',    next: 'investment_menu_hi' },
    ]
  },

  inv_trading_hi: {
    message: `💹 <b>Trading Account</b><br><br>
Professional trading के लिए best platform:<br><br>
✅ Equity & Derivatives trading<br>
✅ Intraday & positional दोनों strategies<br>
✅ Real-time market data & charts<br>
✅ Mobile + desktop trading app<br>
✅ Research reports & expert tips`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Investment मेनू',       value: 'back',    next: 'investment_menu_hi' },
    ]
  },

  inv_advisory_hi: {
    message: `📋 <b>Investment Advisory</b><br><br>
Expert financial advisors आपकी wealth बढ़ाने में मदद करेंगे:<br><br>
✅ Personalized investment planning<br>
✅ Risk profiling & asset allocation<br>
✅ Tax-efficient investment strategies<br>
✅ Regular portfolio review<br>
✅ Goal-based investment planning`,
    options: [
      { label: '📋 Free Advisory Session बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Investment मेनू',                value: 'back',    next: 'investment_menu_hi' },
    ]
  },

  inv_mf_hi: {
    message: `🏦 <b>Mutual Funds</b><br><br>
Mutual Funds में smart investment करें:<br><br>
✅ 1000+ mutual fund schemes<br>
✅ Direct & regular plans दोनों available<br>
✅ Equity, Debt, Hybrid funds<br>
✅ ELSS for tax saving<br>
✅ Zero commission direct plans`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Investment मेनू',       value: 'back',    next: 'investment_menu_hi' },
    ]
  },

  inv_sip_hi: {
    message: `📅 <b>SIP Investment</b><br><br>
Systematic Investment Plan — छोटी राशि से बड़ी wealth बनाएं:<br><br>
✅ ₹500/month से शुरू करें<br>
✅ Rupee cost averaging का फायदा<br>
✅ Long-term wealth creation<br>
✅ Auto-debit सुविधा<br>
✅ Pause / stop anytime`,
    options: [
      { label: '📋 SIP Start करें',  value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Investment मेनू', value: 'back',    next: 'investment_menu_hi' },
    ]
  },

  inv_ipo_hi: {
    message: `🚀 <b>IPO Services</b><br><br>
नई companies में early-stage investment का मौका:<br><br>
✅ Upcoming IPO alerts<br>
✅ IPO analysis & recommendations<br>
✅ Seamless online IPO application<br>
✅ ASBA & UPI application support<br>
✅ Grey market premium tracking`,
    options: [
      { label: '📋 IPO Advisory बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Investment मेनू',       value: 'back',    next: 'investment_menu_hi' },
    ]
  },

  inv_portfolio_hi: {
    message: `💼 <b>Portfolio Management</b><br><br>
Professional portfolio management services:<br><br>
✅ Customized investment portfolio<br>
✅ Regular rebalancing<br>
✅ Risk-adjusted returns<br>
✅ Dedicated relationship manager<br>
✅ Monthly performance reports`,
    options: [
      { label: '📋 Portfolio Review बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Investment मेनू',           value: 'back',    next: 'investment_menu_hi' },
    ]
  },

  inv_retirement_hi: {
    message: `🎯 <b>Retirement Planning</b><br><br>
आज से plan करें, कल को secure बनाएं:<br><br>
✅ Retirement corpus calculation<br>
✅ NPS (National Pension System) advisory<br>
✅ Annuity & pension products<br>
✅ Senior citizen investment plans<br>
✅ Tax-efficient retirement strategy`,
    options: [
      { label: '📋 Retirement Plan बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Investment मेनू',          value: 'back',    next: 'investment_menu_hi' },
    ]
  },

  inv_wealth_hi: {
    message: `💡 <b>Wealth Creation Solutions</b><br><br>
Long-term financial freedom के लिए smart strategies:<br><br>
✅ Goal-based wealth planning<br>
✅ Multi-asset diversification<br>
✅ Tax & estate planning<br>
✅ HNI & ultra-HNI solutions<br>
✅ Quarterly wealth review`,
    options: [
      { label: '📋 Wealth Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Investment मेनू',              value: 'back',    next: 'investment_menu_hi' },
    ]
  },

  // ── INSURANCE (Hindi) ─────────────────────────────────────────────────────
  insurance_menu_hi: {
    message: `🛡️ <b>Insurance सर्विसेज़</b><br><br>
सही insurance से खुद को और अपने परिवार को सुरक्षित रखें। आपको किस insurance में रुचि है?`,
    options: [
      { label: '❤️ Life Insurance',              value: 'life',     next: 'ins_life_hi'     },
      { label: '🏥 Health Insurance',            value: 'health',   next: 'ins_health_hi'   },
      { label: '🛡️ Term Insurance',             value: 'term',     next: 'ins_term_hi'     },
      { label: '🚗 Motor Insurance',             value: 'motor',    next: 'ins_motor_hi'    },
      { label: '🛵 Two-Wheeler Insurance',       value: 'bike',     next: 'ins_bike_hi'     },
      { label: '✈️ Travel Insurance',            value: 'travel',   next: 'ins_travel_hi'   },
      { label: '🏠 Home Insurance',              value: 'home',     next: 'ins_home_hi'     },
      { label: '🩺 Personal Accident Insurance', value: 'accident', next: 'ins_accident_hi' },
      { label: '🎯 Retirement/Pension Plans',    value: 'pension',  next: 'ins_pension_hi'  },
      { label: '⬅️ वापस जाएं',                  value: 'back',     next: 'welcome_hi'      },
    ]
  },

  ins_life_hi: {
    message: `❤️ <b>Life Insurance</b><br><br>
अपने परिवार का भविष्य सुरक्षित करें:<br><br>
✅ Whole life & endowment plans<br>
✅ ULIP (Unit Linked Insurance Plans)<br>
✅ Money-back policies<br>
✅ Child future security plans<br>
✅ Best premium rates comparison`,
    options: [
      { label: '📋 Free Quote लें',   value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Insurance मेनू', value: 'back',    next: 'insurance_menu_hi' },
    ]
  },

  ins_health_hi: {
    message: `🏥 <b>Health Insurance</b><br><br>
Medical expenses से चिंता मुक्त रहें:<br><br>
✅ Individual & family floater plans<br>
✅ Cashless hospitalisation network<br>
✅ Critical illness cover<br>
✅ Senior citizen health plans<br>
✅ Top-up & super top-up plans`,
    options: [
      { label: '📋 Free Quote लें',   value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Insurance मेनू', value: 'back',    next: 'insurance_menu_hi' },
    ]
  },

  ins_term_hi: {
    message: `🛡️ <b>Term Insurance</b><br><br>
सबसे किफायती life cover:<br><br>
✅ High sum assured at low premium<br>
✅ ₹1 Crore+ cover available<br>
✅ Death benefit + critical illness rider<br>
✅ Online instant policy<br>
✅ 30-day free-look period`,
    options: [
      { label: '📋 Free Quote लें',   value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Insurance मेनू', value: 'back',    next: 'insurance_menu_hi' },
    ]
  },

  ins_motor_hi: {
    message: `🚗 <b>Motor Insurance</b><br><br>
अपनी car को हर situation में protect करें:<br><br>
✅ Third-party & comprehensive cover<br>
✅ Instant online renewal<br>
✅ Cashless garage network 5000+<br>
✅ Zero depreciation add-on<br>
✅ 24x7 roadside assistance`,
    options: [
      { label: '📋 Free Quote लें',   value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Insurance मेनू', value: 'back',    next: 'insurance_menu_hi' },
    ]
  },

  ins_bike_hi: {
    message: `🛵 <b>Two-Wheeler Insurance</b><br><br>
अपनी bike/scooter की सुरक्षा करें:<br><br>
✅ Third-party (mandatory) cover<br>
✅ Own damage cover<br>
✅ Personal accident cover for rider<br>
✅ Instant renewal online<br>
✅ No-claim bonus protection`,
    options: [
      { label: '📋 Free Quote लें',   value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Insurance मेनू', value: 'back',    next: 'insurance_menu_hi' },
    ]
  },

  ins_travel_hi: {
    message: `✈️ <b>Travel Insurance</b><br><br>
Domestic या international — हर trip secure करें:<br><br>
✅ Flight delay & cancellation cover<br>
✅ Medical emergency abroad<br>
✅ Lost baggage & passport cover<br>
✅ Trip cancellation cover<br>
✅ Adventure sports cover available`,
    options: [
      { label: '📋 Free Quote लें',   value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Insurance मेनू', value: 'back',    next: 'insurance_menu_hi' },
    ]
  },

  ins_home_hi: {
    message: `🏠 <b>Home Insurance</b><br><br>
अपने घर और सामान को protect करें:<br><br>
✅ Structure & content cover<br>
✅ Fire, flood, earthquake protection<br>
✅ Burglary & theft cover<br>
✅ Tenant & landlord policies<br>
✅ Affordable annual premiums`,
    options: [
      { label: '📋 Free Quote लें',   value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Insurance मेनू', value: 'back',    next: 'insurance_menu_hi' },
    ]
  },

  ins_accident_hi: {
    message: `🩺 <b>Personal Accident Insurance</b><br><br>
दुर्घटना में financial support पाएं:<br><br>
✅ Accidental death benefit<br>
✅ Permanent disability cover<br>
✅ Temporary disability income<br>
✅ Hospital cash benefit<br>
✅ Low premium, high cover`,
    options: [
      { label: '📋 Free Quote लें',   value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Insurance मेनू', value: 'back',    next: 'insurance_menu_hi' },
    ]
  },

  ins_pension_hi: {
    message: `🎯 <b>Retirement / Pension Plans</b><br><br>
Retirement के बाद भी regular income पाएं:<br><br>
✅ Guaranteed pension plans<br>
✅ Deferred & immediate annuity options<br>
✅ NPS integration possible<br>
✅ Tax benefits under 80CCC<br>
✅ Joint life annuity option`,
    options: [
      { label: '📋 Free Quote लें',   value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Insurance मेनू', value: 'back',    next: 'insurance_menu_hi' },
    ]
  },

  // ── LOANS (Hindi) ─────────────────────────────────────────────────────────
  loans_menu_hi: {
    message: `💰 <b>Loan सर्विसेज़</b><br><br>
आपको किस प्रकार का Loan चाहिए?`,
    options: [
      { label: '👤 Personal Loan',                 value: 'personal',  next: 'loan_personal_hi'  },
      { label: '🏠 Home Loan',                     value: 'home',      next: 'loan_home_hi'      },
      { label: '🏭 Business Loan',                 value: 'business',  next: 'loan_business_hi'  },
      { label: '🔐 Loan Against Security',         value: 'security',  next: 'loan_security_hi'  },
      { label: '🏗️ Loan Against Property',        value: 'property',  next: 'loan_property_hi'  },
      { label: '🚘 Vehicle Loan',                  value: 'vehicle',   next: 'loan_vehicle_hi'   },
      { label: '💼 Working Capital Loan',          value: 'wc',        next: 'loan_wc_hi'        },
      { label: '🏢 MSME Loan',                     value: 'msme',      next: 'loan_msme_hi'      },
      { label: '⬅️ वापस जाएं',                    value: 'back',      next: 'welcome_hi'        },
    ]
  },

  loan_personal_hi: {
    message: `👤 <b>Personal Loan</b><br><br>
किसी भी जरूरत के लिए instant personal loan:<br><br>
✅ ₹50,000 से ₹40 लाख तक<br>
✅ No collateral required<br>
✅ Approval in 24-48 hours<br>
✅ Flexible tenure 12-60 months<br>
✅ Minimal documentation`,
    options: [
      { label: '📋 Apply Now',       value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Loan मेनू',      value: 'back',    next: 'loans_menu_hi' },
    ]
  },

  loan_home_hi: {
    message: `🏠 <b>Home Loan</b><br><br>
अपने सपनों का घर बनाएं Aadi Fintech के साथ:<br><br>
✅ ₹5 लाख से ₹10 करोड़ तक<br>
✅ Competitive interest rates<br>
✅ Up to 30 years tenure<br>
✅ Balance transfer facility<br>
✅ Top-up loan available`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Loan मेनू', value: 'back',    next: 'loans_menu_hi' },
    ]
  },

  loan_business_hi: {
    message: `🏭 <b>Business Loan</b><br><br>
Secured & Unsecured दोनों options उपलब्ध:<br><br>
✅ ₹1 लाख से ₹50 करोड़ तक<br>
✅ Collateral & non-collateral दोनों<br>
✅ Quick approval in 3-7 working days<br>
✅ SME, MSME, startup — सभी eligible<br>
✅ Flexible repayment options`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Loan मेनू', value: 'back',    next: 'loans_menu_hi' },
    ]
  },

  loan_security_hi: {
    message: `🔐 <b>Loan Against Security</b><br><br>
अपनी investments को collateral बनाकर instant loan पाएं:<br><br>
✅ Loan against shares / mutual funds<br>
✅ Loan against FD / bonds<br>
✅ Low interest rates<br>
✅ No prepayment charges<br>
✅ Overdraft facility available`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Loan मेनू', value: 'back',    next: 'loans_menu_hi' },
    ]
  },

  loan_property_hi: {
    message: `🏗️ <b>Loan Against Property</b><br><br>
अपनी property की value unlock करें:<br><br>
✅ Residential & commercial दोनों<br>
✅ Up to 70% of property value<br>
✅ Loan up to ₹25 Crore<br>
✅ Tenure up to 15 years<br>
✅ Balance transfer facility`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Loan मेनू', value: 'back',    next: 'loans_menu_hi' },
    ]
  },

  loan_vehicle_hi: {
    message: `🚘 <b>Vehicle Loan</b><br><br>
New या used vehicle के लिए easy financing:<br><br>
✅ Car, bike, commercial vehicle — सभी<br>
✅ Up to 100% on-road price funding<br>
✅ Low EMI options<br>
✅ Quick approval<br>
✅ Attractive interest rates`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Loan मेनू', value: 'back',    next: 'loans_menu_hi' },
    ]
  },

  loan_wc_hi: {
    message: `💼 <b>Working Capital Loan</b><br><br>
Business की रोज़मर्रा की जरूरतें पूरी करें:<br><br>
✅ CC / OD limit enhancement<br>
✅ Invoice financing<br>
✅ Flexible revolving credit<br>
✅ Turnover-based eligibility<br>
✅ Fast disbursement`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Loan मेनू', value: 'back',    next: 'loans_menu_hi' },
    ]
  },

  loan_msme_hi: {
    message: `🏢 <b>MSME Loan</b><br><br>
Micro, Small & Medium Enterprises के लिए special funding:<br><br>
✅ Government-backed MSME schemes<br>
✅ MUDRA loan up to ₹10 lakh<br>
✅ CGTMSE collateral-free loans<br>
✅ Subsidy-linked loan options<br>
✅ Priority sector lending benefits`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Loan मेनू', value: 'back',    next: 'loans_menu_hi' },
    ]
  },

// ── CAREER & FINANCE TRAINING (Hindi) ─────────────────────────────────────
  career_menu_hi: {
    message: `🎓 <b>Career & Finance Training</b><br><br>
Banking, FinTech aur Financial Institutions mein <b>guaranteed placement assistance</b> के साथ अपना finance career शुरू करें!<br><br>
आप किस category में हैं?`,
    options: [
      { label: '📘 12th Pass Students', value: 'twelve',   next: 'career_twelve_hi' },
      { label: '🎓 Graduate Students',  value: 'graduate', next: 'career_graduate_hi' },
      { label: '💼 Placement Roles देखें', value: 'roles', next: 'career_roles_hi' },
      { label: '⬅️ वापस जाएं',          value: 'back',     next: 'welcome_hi' },
    ]
  },

  career_twelve_hi: {
    message: `📘 <b>12th Pass Students के लिए Tracks</b><br><br>
<b>1️⃣ Starter Program — 3 Months (₹2,000)</b><br>
Basic banking operations, finance fundamentals, customer handling, KYC & documentation.<br>
✅ Guaranteed placement — Bank Sales, CASA, Loan BDM, Aadi Fintech<br><br>
<b>2️⃣ Professional Program — 6 Months (₹3,000)</b> ⭐ Most Popular<br>
Advanced finance, wealth management, securities, trading basics, investment advisory.<br>
✅ Better position & higher salary — Wealth CP, Securities, Trading Associate<br><br>
<b>3️⃣ Elite Program — 3 Years (₹4,000)</b><br>
Complete banking & finance mastery + Skill India Government Certificate.<br>
✅ Senior roles — Branch Manager, Credit Officer, Investment Manager`,
    options: [
      { label: '📋 Apply Now (12th Pass)', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Career मेनू',           value: 'back',    next: 'career_menu_hi' },
    ]
  },

  career_graduate_hi: {
    message: `🎓 <b>Graduate Students के लिए Tracks</b><br><br>
<b>1️⃣ Graduate Starter — 3 Months (₹2,000)</b><br>
Banking operations + finance + practical exposure Day 1 से।<br>
✅ Bank roles, BDM, CASA, Aadi Fintech, Loan roles<br><br>
<b>2️⃣ Graduate Professional — 6 Months (₹3,000)</b> ⭐ Most Popular<br>
Wealth management, CP roles, securities, trading, investment training।<br>
✅ Mid-senior roles in private banks & NBFCs<br><br>
<b>3️⃣ Graduate Elite — 3 Years (₹4,000)</b><br>
Complete banker training + Skill India certification।<br>
✅ Relationship Manager, Credit Manager, Branch Manager roles`,
    options: [
      { label: '📋 Apply Now (Graduate)', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Career मेनू',          value: 'back',    next: 'career_menu_hi' },
    ]
  },

  career_roles_hi: {
    message: `💼 <b>Real Job Paths Finance Industry में</b><br><br>
✅ Bank Sales Executive<br>
✅ Loan BDM<br>
✅ Aadi Fintech Associate<br>
✅ Wealth CP<br>
✅ CASA Executive<br>
✅ Securities Dealer<br>
✅ Trading Associate<br>
✅ Investment Advisor<br><br>
Training + Interview prep + Hiring partner coordination — सब कुछ included! 🎯`,
    options: [
      { label: '📋 Apply करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Career मेनू', value: 'back',   next: 'career_menu_hi' },
    ]
  },


  // ── CAREER & FINANCE TRAINING (English) ───────────────────────────────────
  career_menu_en: {
    message: `🎓 <b>Career & Finance Training</b><br><br>
Build your finance career with <b>guaranteed placement assistance</b> in Banks, FinTech & Financial Institutions!<br><br>
Which category are you in?`,
    options: [
      { label: '📘 12th Pass Students', value: 'twelve',   next: 'career_twelve_en' },
      { label: '🎓 Graduate Students',  value: 'graduate', next: 'career_graduate_en' },
      { label: '💼 View Placement Roles', value: 'roles', next: 'career_roles_en' },
      { label: '⬅️ Go Back',            value: 'back',     next: 'welcome_en' },
    ]
  },

  career_twelve_en: {
    message: `📘 <b>Tracks for 12th Pass Students</b><br><br>
<b>1️⃣ Starter Program — 3 Months (₹2,000)</b><br>
Basic banking operations, finance fundamentals, customer handling, KYC & documentation.<br>
✅ Guaranteed placement — Bank Sales, CASA, Loan BDM, Aadi Fintech<br><br>
<b>2️⃣ Professional Program — 6 Months (₹3,000)</b> ⭐ Most Popular<br>
Advanced finance, wealth management, securities, trading basics, investment advisory.<br>
✅ Better position & higher salary — Wealth CP, Securities, Trading Associate<br><br>
<b>3️⃣ Elite Program — 3 Years (₹4,000)</b><br>
Complete banking & finance mastery + Skill India Government Certificate.<br>
✅ Senior roles — Branch Manager, Credit Officer, Investment Manager`,
    options: [
      { label: '📋 Apply Now (12th Pass)', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Career Menu',           value: 'back',    next: 'career_menu_en' },
    ]
  },

  career_graduate_en: {
    message: `🎓 <b>Tracks for Graduate Students</b><br><br>
<b>1️⃣ Graduate Starter — 3 Months (₹2,000)</b><br>
Banking operations + finance + practical exposure from Day 1.<br>
✅ Bank roles, BDM, CASA, Aadi Fintech, Loan roles<br><br>
<b>2️⃣ Graduate Professional — 6 Months (₹3,000)</b> ⭐ Most Popular<br>
Wealth management, CP roles, securities, trading, investment training.<br>
✅ Mid-senior roles in private banks & NBFCs<br><br>
<b>3️⃣ Graduate Elite — 3 Years (₹4,000)</b><br>
Complete banker training + Skill India certification.<br>
✅ Relationship Manager, Credit Manager, Branch Manager roles`,
    options: [
      { label: '📋 Apply Now (Graduate)', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Career Menu',          value: 'back',    next: 'career_menu_en' },
    ]
  },

  career_roles_en: {
    message: `💼 <b>Real Job Paths in the Finance Industry</b><br><br>
✅ Bank Sales Executive<br>
✅ Loan BDM<br>
✅ Aadi Fintech Associate<br>
✅ Wealth CP<br>
✅ CASA Executive<br>
✅ Securities Dealer<br>
✅ Trading Associate<br>
✅ Investment Advisor<br><br>
Training + Interview prep + Hiring partner coordination — all included! 🎯`,
    options: [
      { label: '📋 Apply Now', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Career Menu', value: 'back',  next: 'career_menu_en' },
    ]
  },

  // ── CONNECT WITH US (Hindi) ───────────────────────────────────────────────
  connect_menu_hi: {
    message: `📞 <b>Connect With Us</b><br><br>
हमसे कैसे connect करना चाहते हैं?`,
    options: [
      { label: '💬 WhatsApp Chat',       value: 'whatsapp', next: 'connect_whatsapp_hi' },
      { label: '📲 Request a Callback',  value: 'callback', next: 'collect_name_hi'     },
      { label: '📧 Email Support',       value: 'email',    next: 'connect_email_hi'    },
      { label: '🏢 Visit Office',        value: 'office',   next: 'connect_office_hi'   },
      { label: '⬅️ वापस जाएं',          value: 'back',     next: 'welcome_hi'          },
    ]
  },

  connect_whatsapp_hi: {
    message: `💬 <b>WhatsApp Chat</b><br><br>
हमारे expert से directly WhatsApp पर बात करें!<br><br>
📱 <b>+91 99536 56810</b><br><br>
हम typically <b>instant reply</b> करते हैं।`,
    options: [
      { label: '💬 WhatsApp पर Chat करें', value: 'wa',   next: 'collect_name_hi' },
      { label: '⬅️ Connect मेनू',          value: 'back', next: 'connect_menu_hi' },
    ]
  },

  connect_email_hi: {
    message: `📧 <b>Email Support</b><br><br>
📩 हमें email करें:<br>
<b>customer.care@aadifintech.com</b><br><br>
हम <b>24 घंटे के अंदर</b> आपके email का जवाब देते हैं।`,
    options: [
      { label: '📋 Callback Request करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Connect मेनू',          value: 'back',    next: 'connect_menu_hi' },
    ]
  },

  connect_office_hi: {
    message: `🏢 <b>Visit Our Office</b><br><br>
📍 <b>Address:</b><br>
i-THUM Building, Tower-A,<br>
Sector-62, Noida,<br>
Uttar Pradesh — 201301<br><br>
🕐 <b>Office Hours:</b> Mon–Fri, 09:00 AM – 05:00 PM`,
    options: [
      { label: '📋 Appointment बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ Connect मेनू',         value: 'back',    next: 'connect_menu_hi' },
    ]
  },

  // ── LEAD COLLECTION (Hindi) ───────────────────────────────────────────────
  collect_name_hi: {
    message: `📋 <b>बेहतरीन! हम आपकी मदद करेंगे।</b><br><br>
हमारे Financial Expert जल्द आपसे contact करेंगे। 🎯<br><br>
पहले कृपया अपना <b>नाम</b> बताएं:`,
    options: []
  },

  collect_phone_hi: {
    message: `👍 धन्यवाद! अब अपना <b>WhatsApp नंबर</b> share करें (10 अंक):`,
    options: []
  },

collect_service_hi: {
    message: `📌 आप मुख्यतः किस service के बारे में बात करना चाहते हैं?`,
    options: [
      { label: '📈 Investment',     value: 'Investment',     next: 'send_whatsapp_hi' },
      { label: '🛡️ Insurance',     value: 'Insurance',      next: 'send_whatsapp_hi' },
      { label: '💰 Loan',          value: 'Loan',           next: 'send_whatsapp_hi' },
      { label: '🎓 Career Training', value: 'Career Training', next: 'send_whatsapp_hi' },
      { label: '🔄 General Query', value: 'General Query',  next: 'send_whatsapp_hi' },
    ]
  },

  send_whatsapp_hi: {
    message: `✅ <b>शुक्रिया! आपकी details मिल गईं।</b><br><br>
WhatsApp पर हमारी team से directly connect हो रहे हैं...<br><br>
<i>एक second...</i> 🚀`,
    options: [],
    isEnd: true
  },

  final_message_hi: {
    message: `🎉 <b>आपका request submit हो गया!</b><br><br>
हमारे Financial Expert <b>जल्द ही</b> आपसे contact करेंगे।<br><br>
<b>Aadi Fintech</b> को choose करने के लिए धन्यवाद! 🙏<br><br>
कुछ और जानना है?`,
    options: [
      { label: '🏠 Main Menu',   value: 'home',  next: 'welcome_hi' },
      { label: '✕ Chat बंद करें', value: 'close', next: 'close'      },
    ]
  },


  // ══════════════════════════════════════════════════════════════════════════
  //  ENGLISH FLOW
  // ══════════════════════════════════════════════════════════════════════════

welcome_en: {
    message: `👋 <b>Welcome to Aadi Fintech!</b><br><br>
I'm <b>Aadi</b> — your virtual financial assistant! 🏦<br><br>
How can I assist you today?`,
    options: [
      { label: '📈 Investment',      value: 'investment', next: 'investment_menu_en' },
      { label: '🛡️ Insurance',       value: 'insurance',  next: 'insurance_menu_en'  },
      { label: '💰 Loans',           value: 'loans',      next: 'loans_menu_en'      },
      { label: '🎓 Career & Finance Training', value: 'career', next: 'career_menu_en' },
      { label: '📞 Connect With Us', value: 'connect',    next: 'connect_menu_en'    },
    ]
  },

  // ── INVESTMENT (English) ──────────────────────────────────────────────────
  investment_menu_en: {
    message: `📈 <b>Investment Services</b><br><br>Which investment service are you interested in?`,
    options: [
      { label: '📊 Demat Account',             value: 'demat',      next: 'inv_demat_en'      },
      { label: '💹 Trading Account',           value: 'trading',    next: 'inv_trading_en'    },
      { label: '📋 Investment Advisory',       value: 'advisory',   next: 'inv_advisory_en'   },
      { label: '🏦 Mutual Funds',              value: 'mf',         next: 'inv_mf_en'         },
      { label: '📅 SIP Investment',            value: 'sip',        next: 'inv_sip_en'        },
      { label: '🚀 IPO Services',              value: 'ipo',        next: 'inv_ipo_en'        },
      { label: '💼 Portfolio Management',      value: 'portfolio',  next: 'inv_portfolio_en'  },
      { label: '🎯 Retirement Planning',       value: 'retirement', next: 'inv_retirement_en' },
      { label: '💡 Wealth Creation Solutions', value: 'wealth',     next: 'inv_wealth_en'     },
      { label: '⬅️ Go Back',                  value: 'back',       next: 'welcome_en'        },
    ]
  },

  inv_demat_en: {
    message: `📊 <b>Demat Account</b><br><br>
Open your Demat Account with Aadi Fintech:<br><br>
✅ <b>Free Demat Account</b> — Zero opening & maintenance charges<br>
✅ Paperless KYC — completed in minutes<br>
✅ Equity, F&O, Currency, Commodity — all in one place<br>
✅ Advanced trading platform with real-time data<br>
✅ Expert guidance at every step`,
    options: [
      { label: '📋 Book Free Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Investment Menu',        value: 'back',    next: 'investment_menu_en' },
    ]
  },

  inv_trading_en: {
    message: `💹 <b>Trading Account</b><br><br>
The best platform for professional trading:<br><br>
✅ Equity & Derivatives trading<br>
✅ Intraday & positional strategies<br>
✅ Real-time market data & charts<br>
✅ Mobile + desktop trading app<br>
✅ Research reports & expert tips`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Investment Menu',   value: 'back',    next: 'investment_menu_en' },
    ]
  },

  inv_advisory_en: {
    message: `📋 <b>Investment Advisory</b><br><br>
Expert financial advisors to help grow your wealth:<br><br>
✅ Personalized investment planning<br>
✅ Risk profiling & asset allocation<br>
✅ Tax-efficient investment strategies<br>
✅ Regular portfolio review<br>
✅ Goal-based investment planning`,
    options: [
      { label: '📋 Book Free Advisory Session', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Investment Menu',            value: 'back',    next: 'investment_menu_en' },
    ]
  },

  inv_mf_en: {
    message: `🏦 <b>Mutual Funds</b><br><br>
Invest smart with mutual funds:<br><br>
✅ 1000+ mutual fund schemes<br>
✅ Direct & regular plans both available<br>
✅ Equity, Debt, Hybrid funds<br>
✅ ELSS for tax saving<br>
✅ Zero commission direct plans`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Investment Menu',   value: 'back',    next: 'investment_menu_en' },
    ]
  },

  inv_sip_en: {
    message: `📅 <b>SIP Investment</b><br><br>
Build big wealth with small, regular investments:<br><br>
✅ Start from just ₹500/month<br>
✅ Benefit of rupee cost averaging<br>
✅ Long-term wealth creation<br>
✅ Auto-debit facility<br>
✅ Pause / stop anytime`,
    options: [
      { label: '📋 Start SIP Now',   value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Investment Menu', value: 'back',    next: 'investment_menu_en' },
    ]
  },

  inv_ipo_en: {
    message: `🚀 <b>IPO Services</b><br><br>
Invest early in promising new companies:<br><br>
✅ Upcoming IPO alerts<br>
✅ IPO analysis & recommendations<br>
✅ Seamless online IPO application<br>
✅ ASBA & UPI application support<br>
✅ Grey market premium tracking`,
    options: [
      { label: '📋 Book IPO Advisory', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Investment Menu',   value: 'back',    next: 'investment_menu_en' },
    ]
  },

  inv_portfolio_en: {
    message: `💼 <b>Portfolio Management</b><br><br>
Professional portfolio management services:<br><br>
✅ Customized investment portfolio<br>
✅ Regular rebalancing<br>
✅ Risk-adjusted returns<br>
✅ Dedicated relationship manager<br>
✅ Monthly performance reports`,
    options: [
      { label: '📋 Book Portfolio Review', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Investment Menu',       value: 'back',    next: 'investment_menu_en' },
    ]
  },

  inv_retirement_en: {
    message: `🎯 <b>Retirement Planning</b><br><br>
Plan today, secure tomorrow:<br><br>
✅ Retirement corpus calculation<br>
✅ NPS (National Pension System) advisory<br>
✅ Annuity & pension products<br>
✅ Senior citizen investment plans<br>
✅ Tax-efficient retirement strategy`,
    options: [
      { label: '📋 Book Retirement Plan', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Investment Menu',      value: 'back',    next: 'investment_menu_en' },
    ]
  },

  inv_wealth_en: {
    message: `💡 <b>Wealth Creation Solutions</b><br><br>
Smart strategies for long-term financial freedom:<br><br>
✅ Goal-based wealth planning<br>
✅ Multi-asset diversification<br>
✅ Tax & estate planning<br>
✅ HNI & ultra-HNI solutions<br>
✅ Quarterly wealth review`,
    options: [
      { label: '📋 Book Wealth Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Investment Menu',          value: 'back',    next: 'investment_menu_en' },
    ]
  },

  // ── INSURANCE (English) ───────────────────────────────────────────────────
  insurance_menu_en: {
    message: `🛡️ <b>Insurance Services</b><br><br>
Protect yourself and your family with the right insurance. What are you looking for?`,
    options: [
      { label: '❤️ Life Insurance',              value: 'life',     next: 'ins_life_en'     },
      { label: '🏥 Health Insurance',            value: 'health',   next: 'ins_health_en'   },
      { label: '🛡️ Term Insurance',             value: 'term',     next: 'ins_term_en'     },
      { label: '🚗 Motor Insurance',             value: 'motor',    next: 'ins_motor_en'    },
      { label: '🛵 Two-Wheeler Insurance',       value: 'bike',     next: 'ins_bike_en'     },
      { label: '✈️ Travel Insurance',            value: 'travel',   next: 'ins_travel_en'   },
      { label: '🏠 Home Insurance',              value: 'home',     next: 'ins_home_en'     },
      { label: '🩺 Personal Accident Insurance', value: 'accident', next: 'ins_accident_en' },
      { label: '🎯 Retirement/Pension Plans',    value: 'pension',  next: 'ins_pension_en'  },
      { label: '⬅️ Go Back',                    value: 'back',     next: 'welcome_en'      },
    ]
  },

  ins_life_en: {
    message: `❤️ <b>Life Insurance</b><br><br>
Secure your family's future:<br><br>
✅ Whole life & endowment plans<br>
✅ ULIP (Unit Linked Insurance Plans)<br>
✅ Money-back policies<br>
✅ Child future security plans<br>
✅ Best premium rates comparison`,
    options: [
      { label: '📋 Get Free Quote',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Insurance Menu', value: 'back',    next: 'insurance_menu_en' },
    ]
  },

  ins_health_en: {
    message: `🏥 <b>Health Insurance</b><br><br>
Stay worry-free from medical expenses:<br><br>
✅ Individual & family floater plans<br>
✅ Cashless hospitalisation network<br>
✅ Critical illness cover<br>
✅ Senior citizen health plans<br>
✅ Top-up & super top-up plans`,
    options: [
      { label: '📋 Get Free Quote',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Insurance Menu', value: 'back',    next: 'insurance_menu_en' },
    ]
  },

  ins_term_en: {
    message: `🛡️ <b>Term Insurance</b><br><br>
The most affordable life cover:<br><br>
✅ High sum assured at low premium<br>
✅ ₹1 Crore+ cover available<br>
✅ Death benefit + critical illness rider<br>
✅ Instant online policy<br>
✅ 30-day free-look period`,
    options: [
      { label: '📋 Get Free Quote',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Insurance Menu', value: 'back',    next: 'insurance_menu_en' },
    ]
  },

  ins_motor_en: {
    message: `🚗 <b>Motor Insurance</b><br><br>
Protect your car in every situation:<br><br>
✅ Third-party & comprehensive cover<br>
✅ Instant online renewal<br>
✅ 5000+ cashless garage network<br>
✅ Zero depreciation add-on<br>
✅ 24x7 roadside assistance`,
    options: [
      { label: '📋 Get Free Quote',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Insurance Menu', value: 'back',    next: 'insurance_menu_en' },
    ]
  },

  ins_bike_en: {
    message: `🛵 <b>Two-Wheeler Insurance</b><br><br>
Protect your bike or scooter:<br><br>
✅ Third-party (mandatory) cover<br>
✅ Own damage cover<br>
✅ Personal accident cover for rider<br>
✅ Instant online renewal<br>
✅ No-claim bonus protection`,
    options: [
      { label: '📋 Get Free Quote',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Insurance Menu', value: 'back',    next: 'insurance_menu_en' },
    ]
  },

  ins_travel_en: {
    message: `✈️ <b>Travel Insurance</b><br><br>
Secure every domestic or international trip:<br><br>
✅ Flight delay & cancellation cover<br>
✅ Medical emergency abroad<br>
✅ Lost baggage & passport cover<br>
✅ Trip cancellation cover<br>
✅ Adventure sports cover available`,
    options: [
      { label: '📋 Get Free Quote',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Insurance Menu', value: 'back',    next: 'insurance_menu_en' },
    ]
  },

  ins_home_en: {
    message: `🏠 <b>Home Insurance</b><br><br>
Protect your home and belongings:<br><br>
✅ Structure & content cover<br>
✅ Fire, flood, earthquake protection<br>
✅ Burglary & theft cover<br>
✅ Tenant & landlord policies<br>
✅ Affordable annual premiums`,
    options: [
      { label: '📋 Get Free Quote',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Insurance Menu', value: 'back',    next: 'insurance_menu_en' },
    ]
  },

  ins_accident_en: {
    message: `🩺 <b>Personal Accident Insurance</b><br><br>
Get financial support in case of accidents:<br><br>
✅ Accidental death benefit<br>
✅ Permanent disability cover<br>
✅ Temporary disability income<br>
✅ Hospital cash benefit<br>
✅ Low premium, high cover`,
    options: [
      { label: '📋 Get Free Quote',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Insurance Menu', value: 'back',    next: 'insurance_menu_en' },
    ]
  },

  ins_pension_en: {
    message: `🎯 <b>Retirement / Pension Plans</b><br><br>
Enjoy regular income even after retirement:<br><br>
✅ Guaranteed pension plans<br>
✅ Deferred & immediate annuity options<br>
✅ NPS integration possible<br>
✅ Tax benefits under 80CCC<br>
✅ Joint life annuity option`,
    options: [
      { label: '📋 Get Free Quote',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Insurance Menu', value: 'back',    next: 'insurance_menu_en' },
    ]
  },

  // ── LOANS (English) ───────────────────────────────────────────────────────
  loans_menu_en: {
    message: `💰 <b>Loan Services</b><br><br>
What type of loan are you looking for?`,
    options: [
      { label: '👤 Personal Loan',           value: 'personal', next: 'loan_personal_en' },
      { label: '🏠 Home Loan',               value: 'home',     next: 'loan_home_en'     },
      { label: '🏭 Business Loan',           value: 'business', next: 'loan_business_en' },
      { label: '🔐 Loan Against Security',   value: 'security', next: 'loan_security_en' },
      { label: '🏗️ Loan Against Property',  value: 'property', next: 'loan_property_en' },
      { label: '🚘 Vehicle Loan',            value: 'vehicle',  next: 'loan_vehicle_en'  },
      { label: '💼 Working Capital Loan',    value: 'wc',       next: 'loan_wc_en'       },
      { label: '🏢 MSME Loan',               value: 'msme',     next: 'loan_msme_en'     },
      { label: '⬅️ Go Back',                value: 'back',     next: 'welcome_en'       },
    ]
  },

  loan_personal_en: {
    message: `👤 <b>Personal Loan</b><br><br>
Instant personal loan for any need:<br><br>
✅ ₹50,000 to ₹40 Lakh<br>
✅ No collateral required<br>
✅ Approval in 24-48 hours<br>
✅ Flexible tenure 12-60 months<br>
✅ Minimal documentation`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Loan Menu', value: 'back',    next: 'loans_menu_en' },
    ]
  },

  loan_home_en: {
    message: `🏠 <b>Home Loan</b><br><br>
Build your dream home with Aadi Fintech:<br><br>
✅ ₹5 Lakh to ₹10 Crore<br>
✅ Competitive interest rates<br>
✅ Tenure up to 30 years<br>
✅ Balance transfer facility<br>
✅ Top-up loan available`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Loan Menu', value: 'back',    next: 'loans_menu_en' },
    ]
  },

  loan_business_en: {
    message: `🏭 <b>Business Loan</b><br><br>
Secured & Unsecured — both options available:<br><br>
✅ ₹1 Lakh to ₹50 Crore<br>
✅ Collateral & non-collateral options<br>
✅ Quick approval in 3-7 working days<br>
✅ SME, MSME, startup — all eligible<br>
✅ Flexible repayment options`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Loan Menu', value: 'back',    next: 'loans_menu_en' },
    ]
  },

  loan_security_en: {
    message: `🔐 <b>Loan Against Security</b><br><br>
Use your investments as collateral for instant loans:<br><br>
✅ Loan against shares / mutual funds<br>
✅ Loan against FD / bonds<br>
✅ Low interest rates<br>
✅ No prepayment charges<br>
✅ Overdraft facility available`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Loan Menu', value: 'back',    next: 'loans_menu_en' },
    ]
  },

  loan_property_en: {
    message: `🏗️ <b>Loan Against Property</b><br><br>
Unlock the value of your property:<br><br>
✅ Residential & commercial both<br>
✅ Up to 70% of property value<br>
✅ Loan up to ₹25 Crore<br>
✅ Tenure up to 15 years<br>
✅ Balance transfer facility`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Loan Menu', value: 'back',    next: 'loans_menu_en' },
    ]
  },

  loan_vehicle_en: {
    message: `🚘 <b>Vehicle Loan</b><br><br>
Easy financing for new or used vehicles:<br><br>
✅ Car, bike, commercial vehicle — all covered<br>
✅ Up to 100% on-road price funding<br>
✅ Low EMI options<br>
✅ Quick approval<br>
✅ Attractive interest rates`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Loan Menu', value: 'back',    next: 'loans_menu_en' },
    ]
  },

  loan_wc_en: {
    message: `💼 <b>Working Capital Loan</b><br><br>
Meet your day-to-day business needs:<br><br>
✅ CC / OD limit enhancement<br>
✅ Invoice financing<br>
✅ Flexible revolving credit<br>
✅ Turnover-based eligibility<br>
✅ Fast disbursement`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Loan Menu', value: 'back',    next: 'loans_menu_en' },
    ]
  },

  loan_msme_en: {
    message: `🏢 <b>MSME Loan</b><br><br>
Special funding for Micro, Small & Medium Enterprises:<br><br>
✅ Government-backed MSME schemes<br>
✅ MUDRA loan up to ₹10 lakh<br>
✅ CGTMSE collateral-free loans<br>
✅ Subsidy-linked loan options<br>
✅ Priority sector lending benefits`,
    options: [
      { label: '📋 Apply Now',  value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Loan Menu', value: 'back',    next: 'loans_menu_en' },
    ]
  },

  // ── CONNECT WITH US (English) ─────────────────────────────────────────────
  connect_menu_en: {
    message: `📞 <b>Connect With Us</b><br><br>
How would you like to reach us?`,
    options: [
      { label: '💬 WhatsApp Chat',      value: 'whatsapp', next: 'connect_whatsapp_en' },
      { label: '📲 Request a Callback', value: 'callback', next: 'collect_name_en'      },
      { label: '📧 Email Support',      value: 'email',    next: 'connect_email_en'     },
      { label: '🏢 Visit Office',       value: 'office',   next: 'connect_office_en'    },
      { label: '⬅️ Go Back',           value: 'back',     next: 'welcome_en'           },
    ]
  },

  connect_whatsapp_en: {
    message: `💬 <b>WhatsApp Chat</b><br><br>
Chat directly with our expert on WhatsApp!<br><br>
📱 <b>+91 99536 56810</b><br><br>
We typically reply <b>instantly</b>.`,
    options: [
      { label: '💬 Chat on WhatsApp', value: 'wa',   next: 'collect_name_en' },
      { label: '⬅️ Connect Menu',     value: 'back', next: 'connect_menu_en' },
    ]
  },

  connect_email_en: {
    message: `📧 <b>Email Support</b><br><br>
📩 Email us at:<br>
<b>customer.care@aadifintech.com</b><br><br>
We respond to all emails <b>within 24 hours</b>.`,
    options: [
      { label: '📋 Request a Callback', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Connect Menu',       value: 'back',    next: 'connect_menu_en' },
    ]
  },

  connect_office_en: {
    message: `🏢 <b>Visit Our Office</b><br><br>
📍 <b>Address:</b><br>
i-THUM Building, Tower-A,<br>
Sector-62, Noida,<br>
Uttar Pradesh — 201301<br><br>
🕐 <b>Office Hours:</b> Mon–Fri, 09:00 AM – 05:00 PM`,
    options: [
      { label: '📋 Book Appointment', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Connect Menu',     value: 'back',    next: 'connect_menu_en' },
    ]
  },

  // ── LEAD COLLECTION (English) ─────────────────────────────────────────────
  collect_name_en: {
    message: `📋 <b>Great! We're here to help.</b><br><br>
Our Financial Expert will contact you shortly. 🎯<br><br>
Please share your <b>name</b> first:`,
    options: []
  },

  collect_phone_en: {
    message: `👍 Thank you! Please share your <b>WhatsApp number</b> (10 digits):`,
    options: []
  },

collect_service_en: {
    message: `📌 Which service are you primarily interested in?`,
    options: [
      { label: '📈 Investment',     value: 'Investment',    next: 'send_whatsapp_en' },
      { label: '🛡️ Insurance',     value: 'Insurance',     next: 'send_whatsapp_en' },
      { label: '💰 Loan',          value: 'Loan',          next: 'send_whatsapp_en' },
      { label: '🎓 Career Training', value: 'Career Training', next: 'send_whatsapp_en' },
      { label: '🔄 General Query', value: 'General Query', next: 'send_whatsapp_en' },
    ]
  },

  send_whatsapp_en: {
    message: `✅ <b>Thank you! We've received your details.</b><br><br>
Connecting you with our team on WhatsApp...<br><br>
<i>One moment...</i> 🚀`,
    options: [],
    isEnd: true
  },

  final_message_en: {
    message: `🎉 <b>Your request has been submitted!</b><br><br>
Our Financial Expert will contact you <b>shortly</b>.<br><br>
Thank you for choosing <b>Aadi Fintech</b>! 🙏<br><br>
Anything else you'd like to know?`,
    options: [
      { label: '🏠 Main Menu',   value: 'home',  next: 'welcome_en' },
      { label: '✕ Close Chat',  value: 'close', next: 'close'       },
    ]
  },


  // ── SAFETY STUBS (unused, kept for type-safety) ───────────────────────────
  welcome:         { message: '', options: [] },
  collect_name:    { message: '', options: [] },
  collect_phone:   { message: '', options: [] },
  collect_service: { message: '', options: [] },
  send_whatsapp:   { message: '', options: [], isEnd: true },
  final_message:   { message: '', options: [] },
};
 

 
  ngAfterViewChecked(): void {
    if (this.shouldScroll) {
      this.scrollToBottom();
      this.shouldScroll = false;
    }
  }
 
  toggleChat(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.unreadCount = 0;
      setTimeout(() => this.scrollToBottom(), 100);
    }
  }
 
  private getTime(): string {
    return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
  }
 
  private addBotMessage(text: string, options: Option[] = []): void {
    this.messages.push({ type: 'bot', text, time: this.getTime() });
    this.currentOptions = options;
    this.shouldScroll = true;
    if (!this.isOpen) this.unreadCount++;
  }
 
  private addUserMessage(text: string): void {
    this.messages.push({ type: 'user', text, time: this.getTime() });
    this.currentOptions = [];
    this.shouldScroll = true;
  }
 
  private showTyping(duration = 1000): Promise<void> {
    this.isTyping = true;
    this.shouldScroll = true;
    return new Promise(resolve => setTimeout(() => {
      this.isTyping = false;
      resolve();
    }, duration));
  }
 
  private scrollToBottom(): void {
    try {
      if (this.chatBody) {
        this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
      }
    } catch { }
  }
 
async handleOption(opt: Option): Promise<void> {
  this.addUserMessage(opt.label);

  if (opt.next === 'close') { this.isOpen = false; return; }

  // Language track karo
  if (opt.value === 'hi') this.selectedLang = 'hi';
  if (opt.value === 'en') this.selectedLang = 'en';

  // Demat redirect dono languages ke liye
  if (opt.next === 'demat_redirect_hi' || opt.next === 'demat_redirect_en') {
    window.open('https://aaa.iiflcapital.com/login', '_blank');
  }

  await this.showTyping(900);
  const nextNode = this.flow[opt.next];
  if (!nextNode) return;

  this.currentStep = opt.next;

  if (nextNode.isEnd) {
    this.addBotMessage(nextNode.message, []);
    await this.showTyping(1500);
    this.sendToWhatsApp();
    await this.showTyping(600);
    const finalKey = this.selectedLang === 'en' ? 'final_message_en' : 'final_message_hi';
    this.addBotMessage(this.flow[finalKey].message, this.flow[finalKey].options || []);
  } else {
    this.addBotMessage(nextNode.message, nextNode.options || []);
  }
}
 
async sendCustomMessage(): Promise<void> {
  const input = this.userInput.trim();
  if (!input) return;

  this.addUserMessage(input);
  this.userInput = '';
  await this.showTyping(800);

  const lang = this.selectedLang === 'en' ? 'en' : 'hi';

  if (this.currentStep === `collect_name_${lang}`) {
    this.userData['name'] = input;
    this.currentStep = `collect_phone_${lang}`;
    this.addBotMessage(this.flow[`collect_phone_${lang}`].message, []);
    return;
  }

if (this.currentStep === `collect_phone_${lang}`) {
    if (!/^\d{10}$/.test(input.replace(/\s/g, ''))) {
      const errMsg = lang === 'en'
        ? '⚠️ Please enter a valid 10-digit mobile number.'
        : '⚠️ कृपया valid 10-digit mobile number enter करें।';
      this.addBotMessage(errMsg, []);
      return;
    }
    this.userData['phone'] = input;
    // collect_service skip — seedha WhatsApp pe bhejo
    const sendNode = this.flow[`send_whatsapp_${lang}`];
    this.currentStep = `send_whatsapp_${lang}`;
    this.addBotMessage(sendNode.message, []);
    await this.showTyping(1500);
    this.sendToWhatsApp();
    await this.showTyping(600);
    const finalKey = lang === 'en' ? 'final_message_en' : 'final_message_hi';
    this.addBotMessage(this.flow[finalKey].message, this.flow[finalKey].options || []);
    return;
  }

  // Fallback
  const fallback = lang === 'en'
    ? `Got it! Would you like to connect with our team on WhatsApp? 😊`
    : `समझ गया! क्या आप WhatsApp पर हमारी team से बात करना चाहते हैं? 😊`;
  this.addBotMessage(fallback, [
    { label: lang === 'en' ? '✅ Yes, WhatsApp me' : '✅ हाँ, WhatsApp करो', value: 'wa', next: `collect_name_${lang}` },
    { label: lang === 'en' ? '🏠 Main Menu' : '🏠 मुख्य मेनू', value: 'home', next: `welcome_${lang}` }
  ]);
}
 
  private sendToWhatsApp(): void {
    const name = this.userData['name'] || 'Not provided';
    const phone = this.userData['phone'] || 'Not provided';
    const service = this.userData['service'] || 'General Inquiry';
    const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
 
    const message = `🤖 *New Chatbot Lead — Aadi Fintech*
 
👤 *Name:* ${name}
📱 *Phone:* ${phone}
💼 *Interested In:* ${service}
🕒 *Time:* ${time}
 
📣 _Lead came via website chatbot. Please respond ASAP!_ 🚀`;
 
    const encodedMsg = encodeURIComponent(message);
    const url = `https://wa.me/${this.WHATSAPP_NUMBER}?text=${encodedMsg}`;
    window.open(url, '_blank');
  }


}
