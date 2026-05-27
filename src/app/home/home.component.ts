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
    private readonly WHATSAPP_NUMBER = '918299007927';

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
private flow: { [key: string]: FlowNode } = {

  language_select: {
    message: `🌐 <b>Welcome to Aadi Fintech!</b><br><br>Please choose your preferred language:<br><br>अपनी भाषा चुनें:`,
    options: [
      { label: '🇮🇳 हिंदी', value: 'hi', next: 'welcome_hi' },
      { label: '🇬🇧 English', value: 'en', next: 'welcome_en' },
    ]
  },

  // ── HINDI FLOW ──────────────────────────────────────────
  welcome_hi: {
    message: `👋 <b>नमस्ते! Aadi Fintech में आपका स्वागत है।</b><br><br>
मेरा नाम <b>Aadi</b> है — आपका virtual financial assistant! 🏦<br><br>
आज मैं आपकी क्या मदद कर सकता हूँ?`,
    options: [
      { label: '💰 लोन & फंडिंग', value: 'loan', next: 'loan_menu_hi' },
      { label: '📊 क्रेडिट & CIBIL', value: 'credit', next: 'credit_menu_hi' },
      { label: '🏢 बिज़नेस सर्विसेज़', value: 'business', next: 'business_menu_hi' },
      { label: '📈 इन्वेस्टमेंट & वेल्थ', value: 'wealth', next: 'wealth_menu_hi' },
      { label: '🎓 ट्रेनिंग & प्लेसमेंट', value: 'training', next: 'training_menu_hi' },
      { label: '📞 सीधे Consultant से बात', value: 'contact', next: 'collect_name_hi' },
    ]
  },

  loan_menu_hi: {
    message: `💰 <b>लोन & फंडिंग सॉल्यूशंस</b><br><br>हम इनमें expert हैं। आप कौन सा लोन ढूंढ रहे हैं?`,
    options: [
      { label: '🏭 बिज़नेस / SME लोन', value: 'sme', next: 'loan_sme_hi' },
      { label: '💼 वर्किंग कैपिटल लोन', value: 'wc', next: 'loan_wc_hi' },
      { label: '🏗️ मशीनरी / प्रोजेक्ट लोन', value: 'proj', next: 'loan_proj_hi' },
      { label: '📄 बिल डिस्काउंटिंग', value: 'bill', next: 'loan_bill_hi' },
      { label: '🌍 एक्सपोर्ट फाइनेंस', value: 'export', next: 'loan_export_hi' },
      { label: '⬅️ वापस जाएं', value: 'back', next: 'welcome_hi' },
    ]
  },

  loan_sme_hi: {
    message: `🏭 <b>बिज़नेस / SME लोन</b><br><br>
हम आपको <b>₹10 लाख से ₹50 करोड़</b> तक के business loans दिलाते हैं।<br><br>
✅ Competitive interest rates<br>
✅ Minimal documentation<br>
✅ Quick approval — 3-7 working days<br>
✅ Collateral & non-collateral दोनों options`,
    options: [
      { label: '📋 Free Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ लोन मेनू', value: 'back', next: 'loan_menu_hi' },
    ]
  },

  loan_wc_hi: {
    message: `💼 <b>वर्किंग कैपिटल लोन</b><br><br>
Business के दिन-प्रतिदिन के खर्चों के लिए instant working capital:<br><br>
✅ CC / OD limit enhancement<br>
✅ Invoice financing available<br>
✅ Flexible repayment terms<br>
✅ Turnover-based limit`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ लोन मेनू', value: 'back', next: 'loan_menu_hi' },
    ]
  },

  loan_proj_hi: {
    message: `🏗️ <b>मशीनरी / प्रोजेक्ट लोन</b><br><br>
नए equipment या project के लिए funding:<br><br>
✅ Term loans upto 7 years<br>
✅ Bank + NBFC दोनों options<br>
✅ Subsidy-linked loans available<br>
✅ MSME registered businesses preferred`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ लोन मेनू', value: 'back', next: 'loan_menu_hi' },
    ]
  },

  loan_bill_hi: {
    message: `📄 <b>बिल डिस्काउंटिंग सॉल्यूशंस</b><br><br>
अपने invoices को instant cash में convert करें:<br><br>
✅ Trade invoice discounting<br>
✅ Purchase order financing<br>
✅ 80-90% invoice value instantly<br>
✅ B2B & B2G दोनों accepted`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ लोन मेनू', value: 'back', next: 'loan_menu_hi' },
    ]
  },

  loan_export_hi: {
    message: `🌍 <b>एक्सपोर्ट बिल डिस्काउंटिंग</b><br><br>
Export invoices पर तुरंत funding पाएं:<br><br>
✅ Pre & post shipment financing<br>
✅ Letter of Credit (LC) discounting<br>
✅ Foreign currency loans<br>
✅ RBI compliant process`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ लोन मेनू', value: 'back', next: 'loan_menu_hi' },
    ]
  },

  credit_menu_hi: {
    message: `📊 <b>क्रेडिट & CIBIL सर्विसेज़</b><br><br>
आपका credit score आपकी financial reputation है। हम इसे बेहतर बनाते हैं!`,
    options: [
      { label: '📉 CIBIL Score सुधारें', value: 'cibil', next: 'credit_cibil_hi' },
      { label: '🏆 क्रेडिट रेटिंग Advisory', value: 'rating', next: 'credit_rating_hi' },
      { label: '🔧 लोन रिस्ट्रक्चरिंग', value: 'restructure', next: 'credit_restructure_hi' },
      { label: '⬅️ वापस जाएं', value: 'back', next: 'welcome_hi' },
    ]
  },

  credit_cibil_hi: {
    message: `📉 <b>CIBIL Score सुधार</b><br><br>
खराब CIBIL score से loan reject हो रहा है? हम fix करेंगे!<br><br>
✅ Free CIBIL analysis<br>
✅ Bureau records में error rectification<br>
✅ Step-by-step improvement plan<br>
✅ Score 600 → 750+ — 6 महीनों में संभव<br>
✅ 500+ cases successfully improved`,
    options: [
      { label: '📋 Free Analysis बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ क्रेडिट मेनू', value: 'back', next: 'credit_menu_hi' },
    ]
  },

  credit_rating_hi: {
    message: `🏆 <b>क्रेडिट रेटिंग Advisory</b><br><br>
Corporate credit rating बेहतर करो, बेहतर rates पाओ:<br><br>
✅ CRISIL / ICRA / CARE rating advisory<br>
✅ Bank rating improvement strategy<br>
✅ Financial statement optimization<br>
✅ Lender presentation support`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ क्रेडिट मेनू', value: 'back', next: 'credit_menu_hi' },
    ]
  },

  credit_restructure_hi: {
    message: `🔧 <b>लोन रिस्ट्रक्चरिंग सर्विसेज़</b><br><br>
EMI का बोझ कम करो, financial health restore करो:<br><br>
✅ NPA / bad loan resolution<br>
✅ OTS (One Time Settlement) advisory<br>
✅ Interest rate renegotiation<br>
✅ Bank negotiation support<br>
✅ RBI SARFAESI guidance`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ क्रेडिट मेनू', value: 'back', next: 'credit_menu_hi' },
    ]
  },

  business_menu_hi: {
    message: `🏢 <b>बिज़नेस सर्विसेज़</b><br><br>
Aadi Fintech आपके business को 360° support देता है।`,
    options: [
      { label: '🏦 Banking Consultancy', value: 'banking', next: 'biz_banking_hi' },
      { label: '⚖️ Compliance Advisory', value: 'compliance', next: 'biz_compliance_hi' },
      { label: '🏠 Real Estate Advisory', value: 'realestate', next: 'biz_realestate_hi' },
      { label: '💻 Tech सर्विसेज़', value: 'tech', next: 'biz_tech_hi' },
      { label: '📣 Digital Marketing', value: 'digital', next: 'biz_digital_hi' },
      { label: '⬅️ वापस जाएं', value: 'back', next: 'welcome_hi' },
    ]
  },

  biz_banking_hi: {
    message: `🏦 <b>Banking Domain Expert Consultancy</b><br><br>
<b>Mr. Raj Sharma</b> — Ex-McKinsey, 22+ साल का banking experience:<br><br>
✅ Interest cost optimization<br>
✅ CC/OD limit enhancement<br>
✅ Bank relationship management<br>
✅ Strategic banking restructuring<br><br>
<i>"Lower Interest, Higher Limits, Better Financial Health"</i>`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ बिज़नेस मेनू', value: 'back', next: 'business_menu_hi' },
    ]
  },

  biz_compliance_hi: {
    message: `⚖️ <b>Compliance Advisory</b><br><br>
Business को legally compliant रखें:<br><br>
✅ RERA compliance<br>
✅ Company Law advisory<br>
✅ GST & tax compliance<br>
✅ RBI regulatory guidance`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ बिज़नेस मेनू', value: 'back', next: 'business_menu_hi' },
    ]
  },

  biz_realestate_hi: {
    message: `🏠 <b>Real Estate Advisory</b><br><br>
Property investment में सही decision करें:<br><br>
✅ Property financing guidance<br>
✅ RERA-compliant projects only<br>
✅ Loan against property<br>
✅ Commercial & residential दोनों`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ बिज़नेस मेनू', value: 'back', next: 'business_menu_hi' },
    ]
  },

  biz_tech_hi: {
    message: `💻 <b>Tech सर्विसेज़</b><br><br>
Modern technology से business को scale करें:<br><br>
✅ CRM implementation<br>
✅ Digital tools setup<br>
✅ Fintech software consulting<br>
✅ Process automation`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ बिज़नेस मेनू', value: 'back', next: 'business_menu_hi' },
    ]
  },

  biz_digital_hi: {
    message: `📣 <b>Digital Marketing</b><br><br>
अपने brand को online strong बनाओ:<br><br>
✅ SEO & content marketing<br>
✅ Social media management<br>
✅ Lead generation campaigns<br>
✅ Google & Meta ads`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ बिज़नेस मेनू', value: 'back', next: 'business_menu_hi' },
    ]
  },

  wealth_menu_hi: {
    message: `📈 <b>इन्वेस्टमेंट & वेल्थ मैनेजमेंट</b><br><br>
अपनी wealth smartly grow करें। कौन सी service चाहिए?`,
    options: [
      { label: '📊 वेल्थ मैनेजमेंट', value: 'wealth', next: 'wealth_detail_hi' },
      { label: '📈 IIFL Demat Account', value: 'demat', next: 'wealth_demat_hi' },
      { label: '🌐 Foreign Services', value: 'foreign', next: 'wealth_foreign_hi' },
      { label: '⬅️ वापस जाएं', value: 'back', next: 'welcome_hi' },
    ]
  },

  wealth_detail_hi: {
    message: `📊 <b>वेल्थ मैनेजमेंट</b><br><br>
Personalized wealth solutions:<br><br>
✅ Portfolio management<br>
✅ Mutual fund advisory<br>
✅ Fixed deposit optimization<br>
✅ Tax-efficient investment planning`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ वेल्थ मेनू', value: 'back', next: 'wealth_menu_hi' },
    ]
  },

  wealth_demat_hi: {
    message: `📈 <b>IIFL Demat & Trading Account</b><br><br>
✅ <b>Free Demat Account</b> — कोई charges नहीं<br>
✅ Paperless KYC — मिनटों में<br>
✅ Equity, F&O, Currency, Commodity<br>
✅ Advanced trading platform<br><br>
<b>Powered by IIFL Capital</b> 🏦`,
    options: [
      { label: '🔗 Account खोलें', value: 'demat_open', next: 'demat_redirect_hi' },
      { label: '📋 पहले Consultation', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ वेल्थ मेनू', value: 'back', next: 'wealth_menu_hi' },
    ]
  },

  demat_redirect_hi: {
    message: `✅ IIFL Capital का link आपके लिए open हो रहा है!<br><br>
कोई भी सवाल हो तो हम यहाँ हैं। 😊`,
    options: [
      { label: '🏠 Main Menu', value: 'home', next: 'welcome_hi' },
      { label: '📞 Expert से बात करें', value: 'consult', next: 'collect_name_hi' },
    ]
  },

  wealth_foreign_hi: {
    message: `🌐 <b>End-to-End Foreign Services</b><br><br>
✅ Foreign currency loans<br>
✅ FEMA compliance advisory<br>
✅ NRI banking solutions<br>
✅ Import/Export financing`,
    options: [
      { label: '📋 Consultation बुक करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ वेल्थ मेनू', value: 'back', next: 'wealth_menu_hi' },
    ]
  },

  training_menu_hi: {
    message: `🎓 <b>ट्रेनिंग & प्लेसमेंट सर्विसेज़</b><br><br>
Fintech/Banking में अपना career बनाओ। क्या चाहिए?`,
    options: [
      { label: '🎓 Internship Program', value: 'intern', next: 'training_intern_hi' },
      { label: '💼 Job Placement', value: 'job', next: 'training_job_hi' },
      { label: '📚 Banking Domain Training', value: 'course', next: 'training_course_hi' },
      { label: '⬅️ वापस जाएं', value: 'back', next: 'welcome_hi' },
    ]
  },

  training_intern_hi: {
    message: `🎓 <b>Internship Program</b><br><br>
Aadi Fintech के साथ internship करें:<br><br>
✅ Paid internship opportunities<br>
✅ Live project experience<br>
✅ Certificate + recommendation letter<br>
✅ PPO (Pre-Placement Offer) के chances`,
    options: [
      { label: '📋 अभी Apply करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ ट्रेनिंग मेनू', value: 'back', next: 'training_menu_hi' },
    ]
  },

  training_job_hi: {
    message: `💼 <b>Job Placement सर्विसेज़</b><br><br>
हमारा placement network बहुत strong है:<br><br>
✅ Banking & NBFC placements<br>
✅ Resume & interview preparation<br>
✅ 500+ successful placements<br>
✅ Freshers से experienced — सभी welcome`,
    options: [
      { label: '📋 Register करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ ट्रेनिंग मेनू', value: 'back', next: 'training_menu_hi' },
    ]
  },

  training_course_hi: {
    message: `📚 <b>Banking Domain Training</b><br><br>
Mr. Raj Sharma के साथ सीखें:<br><br>
✅ Credit analysis & appraisal<br>
✅ MSME banking operations<br>
✅ Loan documentation<br>
✅ Online + offline batches available`,
    options: [
      { label: '📋 Enroll करें', value: 'consult', next: 'collect_name_hi' },
      { label: '⬅️ ट्रेनिंग मेनू', value: 'back', next: 'training_menu_hi' },
    ]
  },

  collect_name_hi: {
    message: `📋 <b>Free Consultation बुक करें</b><br><br>
हम आपको expert से connect करेंगे! 🎯<br><br>
पहले अपना <b>नाम</b> बताएं:`,
    options: []
  },

  collect_phone_hi: {
    message: `👍 शुक्रिया! अब अपना <b>WhatsApp नंबर</b> share करें (10 digit):`,
    options: []
  },

  collect_service_hi: {
    message: `📌 आप मुख्यतः किस service के बारे में जानना चाहते हैं?`,
    options: [
      { label: '💰 लोन/फंडिंग', value: 'Loan/Funding', next: 'send_whatsapp_hi' },
      { label: '📊 CIBIL/क्रेडिट', value: 'CIBIL/Credit Rating', next: 'send_whatsapp_hi' },
      { label: '🏢 Business Consultancy', value: 'Business Consultancy', next: 'send_whatsapp_hi' },
      { label: '📈 Investment/Wealth', value: 'Investment/Wealth', next: 'send_whatsapp_hi' },
      { label: '🎓 Training/Placement', value: 'Training/Placement', next: 'send_whatsapp_hi' },
      { label: '🔄 अन्य / General Query', value: 'General Query', next: 'send_whatsapp_hi' },
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
    message: `🎉 <b>Congratulations! आपका request submit हो गया।</b><br><br>
हमारी team <b>24 घंटे के अंदर</b> आपसे contact करेगी।<br><br>
कुछ और जानना है?`,
    options: [
      { label: '🏠 Main Menu', value: 'home', next: 'welcome_hi' },
      { label: '✕ Chat बंद करें', value: 'close', next: 'close' },
    ]
  },

  // ── ENGLISH FLOW ────────────────────────────────────────
  welcome_en: {
    message: `👋 <b>Welcome to Aadi Fintech!</b><br><br>
I'm <b>Aadi</b> — your virtual financial assistant! 🏦<br><br>
How can I help you today?`,
    options: [
      { label: '💰 Loan & Funding', value: 'loan', next: 'loan_menu_en' },
      { label: '📊 Credit & CIBIL', value: 'credit', next: 'credit_menu_en' },
      { label: '🏢 Business Services', value: 'business', next: 'business_menu_en' },
      { label: '📈 Investment & Wealth', value: 'wealth', next: 'wealth_menu_en' },
      { label: '🎓 Training & Placement', value: 'training', next: 'training_menu_en' },
      { label: '📞 Talk to a Consultant', value: 'contact', next: 'collect_name_en' },
    ]
  },

  loan_menu_en: {
    message: `💰 <b>Loan & Funding Solutions</b><br><br>We're experts in this space. What type of loan are you looking for?`,
    options: [
      { label: '🏭 Business / SME Loan', value: 'sme', next: 'loan_sme_en' },
      { label: '💼 Working Capital Loan', value: 'wc', next: 'loan_wc_en' },
      { label: '🏗️ Machinery / Project Loan', value: 'proj', next: 'loan_proj_en' },
      { label: '📄 Bill Discounting', value: 'bill', next: 'loan_bill_en' },
      { label: '🌍 Export Finance', value: 'export', next: 'loan_export_en' },
      { label: '⬅️ Go Back', value: 'back', next: 'welcome_en' },
    ]
  },

  loan_sme_en: {
    message: `🏭 <b>Business / SME Loan</b><br><br>
We help you secure business loans from <b>₹10 Lakh to ₹50 Crore</b>.<br><br>
✅ Competitive interest rates<br>
✅ Minimal documentation<br>
✅ Quick approval — 3-7 working days<br>
✅ Collateral & non-collateral options`,
    options: [
      { label: '📋 Book Free Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Loan Menu', value: 'back', next: 'loan_menu_en' },
    ]
  },

  loan_wc_en: {
    message: `💼 <b>Working Capital Loan</b><br><br>
Instant working capital for day-to-day business operations:<br><br>
✅ CC / OD limit enhancement<br>
✅ Invoice financing available<br>
✅ Flexible repayment terms<br>
✅ Turnover-based limit`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Loan Menu', value: 'back', next: 'loan_menu_en' },
    ]
  },

  loan_proj_en: {
    message: `🏗️ <b>Machinery / Project Loan</b><br><br>
Funding for new equipment or projects:<br><br>
✅ Term loans up to 7 years<br>
✅ Bank + NBFC options<br>
✅ Subsidy-linked loans available<br>
✅ MSME registered businesses preferred`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Loan Menu', value: 'back', next: 'loan_menu_en' },
    ]
  },

  loan_bill_en: {
    message: `📄 <b>Bill Discounting Solutions</b><br><br>
Convert your invoices into instant cash:<br><br>
✅ Trade invoice discounting<br>
✅ Purchase order financing<br>
✅ 80-90% invoice value instantly<br>
✅ B2B & B2G both accepted`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Loan Menu', value: 'back', next: 'loan_menu_en' },
    ]
  },

  loan_export_en: {
    message: `🌍 <b>Export Bill Discounting</b><br><br>
Get instant funding on export invoices:<br><br>
✅ Pre & post shipment financing<br>
✅ Letter of Credit (LC) discounting<br>
✅ Foreign currency loans<br>
✅ RBI compliant process`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Loan Menu', value: 'back', next: 'loan_menu_en' },
    ]
  },

  credit_menu_en: {
    message: `📊 <b>Credit & CIBIL Services</b><br><br>
Your credit score is your financial reputation. We help you improve it!`,
    options: [
      { label: '📉 CIBIL Score Check/Improve', value: 'cibil', next: 'credit_cibil_en' },
      { label: '🏆 Credit Rating Advisory', value: 'rating', next: 'credit_rating_en' },
      { label: '🔧 Loan Restructuring', value: 'restructure', next: 'credit_restructure_en' },
      { label: '⬅️ Go Back', value: 'back', next: 'welcome_en' },
    ]
  },

  credit_cibil_en: {
    message: `📉 <b>CIBIL Score Improvement</b><br><br>
Getting loan rejections due to a low CIBIL score? We'll fix it!<br><br>
✅ Free CIBIL analysis<br>
✅ Error rectification in bureau records<br>
✅ Step-by-step improvement plan<br>
✅ Score 600 → 750+ achievable in 6 months<br>
✅ 500+ cases successfully resolved`,
    options: [
      { label: '📋 Book Free Analysis', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Credit Menu', value: 'back', next: 'credit_menu_en' },
    ]
  },

  credit_rating_en: {
    message: `🏆 <b>Credit Rating Advisory</b><br><br>
Improve your corporate credit rating to get better rates:<br><br>
✅ CRISIL / ICRA / CARE rating advisory<br>
✅ Bank rating improvement strategy<br>
✅ Financial statement optimization<br>
✅ Lender presentation support`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Credit Menu', value: 'back', next: 'credit_menu_en' },
    ]
  },

  credit_restructure_en: {
    message: `🔧 <b>Loan Restructuring Services</b><br><br>
Reduce EMI burden and restore financial health:<br><br>
✅ NPA / bad loan resolution<br>
✅ OTS (One Time Settlement) advisory<br>
✅ Interest rate renegotiation<br>
✅ Bank negotiation support<br>
✅ RBI SARFAESI guidance`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Credit Menu', value: 'back', next: 'credit_menu_en' },
    ]
  },

  business_menu_en: {
    message: `🏢 <b>Business Services</b><br><br>
Aadi Fintech provides 360° support for your business. What do you need?`,
    options: [
      { label: '🏦 Banking Domain Consultancy', value: 'banking', next: 'biz_banking_en' },
      { label: '⚖️ Compliance Advisory', value: 'compliance', next: 'biz_compliance_en' },
      { label: '🏠 Real Estate Advisory', value: 'realestate', next: 'biz_realestate_en' },
      { label: '💻 Tech Services', value: 'tech', next: 'biz_tech_en' },
      { label: '📣 Digital Marketing', value: 'digital', next: 'biz_digital_en' },
      { label: '⬅️ Go Back', value: 'back', next: 'welcome_en' },
    ]
  },

  biz_banking_en: {
    message: `🏦 <b>Banking Domain Expert Consultancy</b><br><br>
<b>Mr. Raj Sharma</b> — Ex-McKinsey, 22+ years banking experience:<br><br>
✅ Interest cost optimization<br>
✅ CC/OD limit enhancement<br>
✅ Bank relationship management<br>
✅ Strategic banking restructuring<br><br>
<i>"Lower Interest, Higher Limits, Better Financial Health"</i>`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Business Menu', value: 'back', next: 'business_menu_en' },
    ]
  },

  biz_compliance_en: {
    message: `⚖️ <b>Compliance Advisory</b><br><br>
Keep your business legally compliant:<br><br>
✅ RERA compliance<br>
✅ Company Law advisory<br>
✅ GST & tax compliance<br>
✅ RBI regulatory guidance`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Business Menu', value: 'back', next: 'business_menu_en' },
    ]
  },

  biz_realestate_en: {
    message: `🏠 <b>Real Estate Advisory</b><br><br>
Make informed property investment decisions:<br><br>
✅ Property financing guidance<br>
✅ RERA-compliant projects only<br>
✅ Loan against property<br>
✅ Commercial & residential both`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Business Menu', value: 'back', next: 'business_menu_en' },
    ]
  },

  biz_tech_en: {
    message: `💻 <b>Tech Services</b><br><br>
Scale your business with modern technology:<br><br>
✅ CRM implementation<br>
✅ Digital tools setup<br>
✅ Fintech software consulting<br>
✅ Process automation`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Business Menu', value: 'back', next: 'business_menu_en' },
    ]
  },

  biz_digital_en: {
    message: `📣 <b>Digital Marketing</b><br><br>
Build a strong online presence for your brand:<br><br>
✅ SEO & content marketing<br>
✅ Social media management<br>
✅ Lead generation campaigns<br>
✅ Google & Meta ads`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Business Menu', value: 'back', next: 'business_menu_en' },
    ]
  },

  wealth_menu_en: {
    message: `📈 <b>Investment & Wealth Management</b><br><br>
Grow your wealth smartly. What service do you need?`,
    options: [
      { label: '📊 Wealth Management', value: 'wealth', next: 'wealth_detail_en' },
      { label: '📈 IIFL Demat Account', value: 'demat', next: 'wealth_demat_en' },
      { label: '🌐 Foreign Services', value: 'foreign', next: 'wealth_foreign_en' },
      { label: '⬅️ Go Back', value: 'back', next: 'welcome_en' },
    ]
  },

  wealth_detail_en: {
    message: `📊 <b>Wealth Management</b><br><br>
Personalized wealth solutions:<br><br>
✅ Portfolio management<br>
✅ Mutual fund advisory<br>
✅ Fixed deposit optimization<br>
✅ Tax-efficient investment planning`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Wealth Menu', value: 'back', next: 'wealth_menu_en' },
    ]
  },

  wealth_demat_en: {
    message: `📈 <b>IIFL Demat & Trading Account</b><br><br>
✅ <b>Free Demat Account</b> — Zero charges<br>
✅ Paperless KYC — done in minutes<br>
✅ Equity, F&O, Currency, Commodity<br>
✅ Advanced trading platform<br><br>
<b>Powered by IIFL Capital</b> 🏦`,
    options: [
      { label: '🔗 Open Account', value: 'demat_open', next: 'demat_redirect_en' },
      { label: '📋 Consult First', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Wealth Menu', value: 'back', next: 'wealth_menu_en' },
    ]
  },

  demat_redirect_en: {
    message: `✅ Opening IIFL Capital link for you!<br><br>
Feel free to ask if you have any questions. 😊`,
    options: [
      { label: '🏠 Main Menu', value: 'home', next: 'welcome_en' },
      { label: '📞 Talk to an Expert', value: 'consult', next: 'collect_name_en' },
    ]
  },

  wealth_foreign_en: {
    message: `🌐 <b>End-to-End Foreign Services</b><br><br>
✅ Foreign currency loans<br>
✅ FEMA compliance advisory<br>
✅ NRI banking solutions<br>
✅ Import/Export financing`,
    options: [
      { label: '📋 Book Consultation', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Wealth Menu', value: 'back', next: 'wealth_menu_en' },
    ]
  },

  training_menu_en: {
    message: `🎓 <b>Training & Placement Services</b><br><br>
Build your career in fintech/banking. What do you need?`,
    options: [
      { label: '🎓 Internship Program', value: 'intern', next: 'training_intern_en' },
      { label: '💼 Job Placement', value: 'job', next: 'training_job_en' },
      { label: '📚 Banking Domain Training', value: 'course', next: 'training_course_en' },
      { label: '⬅️ Go Back', value: 'back', next: 'welcome_en' },
    ]
  },

  training_intern_en: {
    message: `🎓 <b>Internship Program</b><br><br>
Intern with Aadi Fintech:<br><br>
✅ Paid internship opportunities<br>
✅ Live project experience<br>
✅ Certificate + recommendation letter<br>
✅ PPO (Pre-Placement Offer) chances`,
    options: [
      { label: '📋 Apply Now', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Training Menu', value: 'back', next: 'training_menu_en' },
    ]
  },

  training_job_en: {
    message: `💼 <b>Job Placement Services</b><br><br>
Our placement network is very strong:<br><br>
✅ Banking & NBFC placements<br>
✅ Resume & interview preparation<br>
✅ 500+ successful placements<br>
✅ Freshers to experienced — all welcome`,
    options: [
      { label: '📋 Register Now', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Training Menu', value: 'back', next: 'training_menu_en' },
    ]
  },

  training_course_en: {
    message: `📚 <b>Banking Domain Training</b><br><br>
Learn with Mr. Raj Sharma:<br><br>
✅ Credit analysis & appraisal<br>
✅ MSME banking operations<br>
✅ Loan documentation<br>
✅ Online + offline batches available`,
    options: [
      { label: '📋 Enroll Now', value: 'consult', next: 'collect_name_en' },
      { label: '⬅️ Training Menu', value: 'back', next: 'training_menu_en' },
    ]
  },

  collect_name_en: {
    message: `📋 <b>Book a Free Consultation</b><br><br>
We'll connect you with an expert! 🎯<br><br>
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
      { label: '💰 Loan/Funding', value: 'Loan/Funding', next: 'send_whatsapp_en' },
      { label: '📊 CIBIL/Credit', value: 'CIBIL/Credit Rating', next: 'send_whatsapp_en' },
      { label: '🏢 Business Consultancy', value: 'Business Consultancy', next: 'send_whatsapp_en' },
      { label: '📈 Investment/Wealth', value: 'Investment/Wealth', next: 'send_whatsapp_en' },
      { label: '🎓 Training/Placement', value: 'Training/Placement', next: 'send_whatsapp_en' },
      { label: '🔄 Other / General Query', value: 'General Query', next: 'send_whatsapp_en' },
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
    message: `🎉 <b>Congratulations! Your request has been submitted.</b><br><br>
Our team will contact you <b>within 24 hours</b>.<br><br>
Anything else you'd like to know?`,
    options: [
      { label: '🏠 Main Menu', value: 'home', next: 'welcome_en' },
      { label: '✕ Close Chat', value: 'close', next: 'close' },
    ]
  },

  // ── KEEP ORIGINAL (for safety, unused) ──
  welcome: { message: '', options: [] },
  collect_name: { message: '', options: [] },
  collect_phone: { message: '', options: [] },
  collect_service: { message: '', options: [] },
  send_whatsapp: { message: '', options: [], isEnd: true },
  final_message: { message: '', options: [] },
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
    this.currentStep = `collect_service_${lang}`;
    this.addBotMessage(
      this.flow[`collect_service_${lang}`].message,
      this.flow[`collect_service_${lang}`].options || []
    );
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
