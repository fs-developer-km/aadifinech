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
     // Show welcome message after 1.5s delay
    setTimeout(() => {
      this.addBotMessage(this.flow['welcome'].message, this.flow['welcome'].options || []);
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
 
    welcome: {
      message: `👋 <b>Namaste! Welcome to Aadi Fintech.</b><br><br>
Mera naam <b>Aadi</b> hai — aapka virtual financial assistant! 🏦<br><br>
Main aapki kya madad kar sakta hoon aaj?`,
      options: [
        { label: '💰 Loan & Funding', value: 'loan', next: 'loan_menu' },
        { label: '📊 Credit & CIBIL', value: 'credit', next: 'credit_menu' },
        { label: '🏢 Business Services', value: 'business', next: 'business_menu' },
        { label: '📈 Investment & Wealth', value: 'wealth', next: 'wealth_menu' },
        { label: '🎓 Training & Placement', value: 'training', next: 'training_menu' },
        { label: '📞 Direct Consultant se Baat', value: 'contact', next: 'collect_name' },
      ]
    },
 
    // ── LOAN MENU ─────────────────────────────────────────────
    loan_menu: {
      message: `💰 <b>Loan & Funding Solutions</b><br><br>
Hum inke mein expert hain. Aap kaunsa loan dhundh rahe hain?`,
      options: [
        { label: '🏭 Business / SME Loan', value: 'sme', next: 'loan_sme' },
        { label: '💼 Working Capital Loan', value: 'wc', next: 'loan_wc' },
        { label: '🏗️ Machinery / Project Loan', value: 'proj', next: 'loan_proj' },
        { label: '📄 Bill Discounting', value: 'bill', next: 'loan_bill' },
        { label: '🌍 Export Finance', value: 'export', next: 'loan_export' },
        { label: '⬅️ Wapas Jao', value: 'back', next: 'welcome' },
      ]
    },
 
    loan_sme: {
      message: `🏭 <b>Business / SME Loan</b><br><br>
Hum aapko <b>₹10 Lakh se ₹50 Crore</b> tak ke business loans dilwate hain.<br><br>
✅ Competitive interest rates<br>
✅ Minimal documentation<br>
✅ Quick approval — 3-7 working days<br>
✅ Collateral & non-collateral dono options<br><br>
Aage badhne ke liye apna naam dein:`,
      options: [
        { label: '📋 Free Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Loan Menu', value: 'back', next: 'loan_menu' },
      ]
    },
 
    loan_wc: {
      message: `💼 <b>Working Capital Loan</b><br><br>
Business ke din-to-din kharche ke liye instant working capital:<br><br>
✅ CC / OD limit enhancement<br>
✅ Invoice financing available<br>
✅ Flexible repayment terms<br>
✅ Turnover-based limit<br><br>
Aaj hi consult karein:`,
      options: [
        { label: '📋 Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Loan Menu', value: 'back', next: 'loan_menu' },
      ]
    },
 
    loan_proj: {
      message: `🏗️ <b>Machinery / Project Loan</b><br><br>
Naye equipment ya project ke liye funding:<br><br>
✅ Term loans upto 7 years<br>
✅ Bank + NBFC both options<br>
✅ Subsidy-linked loans available<br>
✅ MSME registered businesses preferred<br><br>
Expert se baat karein:`,
      options: [
        { label: '📋 Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Loan Menu', value: 'back', next: 'loan_menu' },
      ]
    },
 
    loan_bill: {
      message: `📄 <b>Bill Discounting Solutions</b><br><br>
Apne invoices ko instant cash mein convert karein:<br><br>
✅ Trade invoice discounting<br>
✅ Purchase order financing<br>
✅ 80-90% invoice value instantly<br>
✅ B2B & B2G dono accepted<br><br>
Abhi apply karein:`,
      options: [
        { label: '📋 Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Loan Menu', value: 'back', next: 'loan_menu' },
      ]
    },
 
    loan_export: {
      message: `🌍 <b>Export Bill Discounting</b><br><br>
Export invoices pe turat funding payen:<br><br>
✅ Pre & post shipment financing<br>
✅ Letter of Credit (LC) discounting<br>
✅ Foreign currency loans<br>
✅ RBI compliant process<br><br>
Hum aapki help karenge:`,
      options: [
        { label: '📋 Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Loan Menu', value: 'back', next: 'loan_menu' },
      ]
    },
 
    // ── CREDIT MENU ───────────────────────────────────────────
    credit_menu: {
      message: `📊 <b>Credit & CIBIL Services</b><br><br>
Aapka credit score aapki financial reputation hai. Hum isko better banate hain!<br><br>
Aapko kya chahiye?`,
      options: [
        { label: '📉 CIBIL Score Check/Improve', value: 'cibil', next: 'credit_cibil' },
        { label: '🏆 Credit Rating Advisory', value: 'rating', next: 'credit_rating' },
        { label: '🔧 Loan Restructuring', value: 'restructure', next: 'credit_restructure' },
        { label: '⬅️ Wapas Jao', value: 'back', next: 'welcome' },
      ]
    },
 
    credit_cibil: {
      message: `📉 <b>CIBIL Score Improvement</b><br><br>
Kharab CIBIL score se loan reject ho raha hai? Hum fix karenge!<br><br>
✅ Free CIBIL analysis<br>
✅ Error rectification in bureau records<br>
✅ Step-by-step improvement plan<br>
✅ Score 600 → 750+ achievable in 6 months<br>
✅ Over 500+ cases successfully improved<br><br>
<b>Mr. Raj Sharma</b> (22+ years experience) personally guide karte hain.`,
      options: [
        { label: '📋 Free Analysis Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Credit Menu', value: 'back', next: 'credit_menu' },
      ]
    },
 
    credit_rating: {
      message: `🏆 <b>Credit Rating Advisory</b><br><br>
Corporate credit rating better karo, better rates pao:<br><br>
✅ CRISIL / ICRA / CARE rating advisory<br>
✅ Bank rating improvement strategy<br>
✅ Financial statement optimization<br>
✅ Lender presentation support<br><br>
Expert advice lein:`,
      options: [
        { label: '📋 Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Credit Menu', value: 'back', next: 'credit_menu' },
      ]
    },
 
    credit_restructure: {
      message: `🔧 <b>Loan Restructuring Services</b><br><br>
EMI burden kam karo, financial health restore karo:<br><br>
✅ NPA / bad loan resolution<br>
✅ OTS (One Time Settlement) advisory<br>
✅ Interest rate renegotiation<br>
✅ Bank negotiation support<br>
✅ RBI SARFAESI guidance<br>`,
      options: [
        { label: '📋 Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Credit Menu', value: 'back', next: 'credit_menu' },
      ]
    },
 
    // ── BUSINESS MENU ─────────────────────────────────────────
    business_menu: {
      message: `🏢 <b>Business Services</b><br><br>
Aadi Fintech aapke business ko 360° support deta hai. Kya chahiye?`,
      options: [
        { label: '🏦 Banking Domain Consultancy', value: 'banking', next: 'biz_banking' },
        { label: '⚖️ Compliance Advisory', value: 'compliance', next: 'biz_compliance' },
        { label: '🏠 Real Estate Advisory', value: 'realestate', next: 'biz_realestate' },
        { label: '💻 Tech Services', value: 'tech', next: 'biz_tech' },
        { label: '📣 Digital Marketing', value: 'digital', next: 'biz_digital' },
        { label: '⬅️ Wapas Jao', value: 'back', next: 'welcome' },
      ]
    },
 
    biz_banking: {
      message: `🏦 <b>Banking Domain Expert Consultancy</b><br><br>
<b>Mr. Raj Sharma</b> — Ex-McKinsey, 22+ years banking experience:<br><br>
✅ Interest cost optimization<br>
✅ CC/OD limit enhancement<br>
✅ Bank relationship management<br>
✅ Strategic banking restructuring<br>
✅ Corporate financial advisory<br><br>
<i>"Lower Interest, Higher Limits, Better Financial Health"</i>`,
      options: [
        { label: '📋 Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Business Menu', value: 'back', next: 'business_menu' },
      ]
    },
 
    biz_compliance: {
      message: `⚖️ <b>Compliance Advisory</b><br><br>
Business ko legally compliant rakhein:<br><br>
✅ RERA compliance<br>
✅ Company Law advisory<br>
✅ Financial audit support<br>
✅ GST & tax compliance<br>
✅ RBI regulatory guidance<br>`,
      options: [
        { label: '📋 Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Business Menu', value: 'back', next: 'business_menu' },
      ]
    },
 
    biz_realestate: {
      message: `🏠 <b>Real Estate Advisory</b><br><br>
Property investment mein sahi decision karein:<br><br>
✅ Property financing guidance<br>
✅ RERA-compliant projects only<br>
✅ Loan against property<br>
✅ Commercial & residential both<br>`,
      options: [
        { label: '📋 Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Business Menu', value: 'back', next: 'business_menu' },
      ]
    },
 
    biz_tech: {
      message: `💻 <b>Tech Services</b><br><br>
Modern technology se business ko scale karein:<br><br>
✅ CRM implementation<br>
✅ Digital tools setup<br>
✅ Data analytics solutions<br>
✅ Fintech software consulting<br>
✅ Process automation<br>`,
      options: [
        { label: '📋 Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Business Menu', value: 'back', next: 'business_menu' },
      ]
    },
 
    biz_digital: {
      message: `📣 <b>Digital Marketing</b><br><br>
Apne brand ko online strong banao:<br><br>
✅ SEO & content marketing<br>
✅ Social media management<br>
✅ Lead generation campaigns<br>
✅ Google & Meta ads<br>
✅ Website development<br>`,
      options: [
        { label: '📋 Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Business Menu', value: 'back', next: 'business_menu' },
      ]
    },
 
    // ── WEALTH MENU ───────────────────────────────────────────
    wealth_menu: {
      message: `📈 <b>Investment & Wealth Management</b><br><br>
Apni wealth smartly grow karein:<br><br>
Kaunsi service chahiye?`,
      options: [
        { label: '📊 Wealth Management', value: 'wealth', next: 'wealth_detail' },
        { label: '📈 IIFL Demat Account', value: 'demat', next: 'wealth_demat' },
        { label: '🌐 Foreign Services', value: 'foreign', next: 'wealth_foreign' },
        { label: '⬅️ Wapas Jao', value: 'back', next: 'welcome' },
      ]
    },
 
    wealth_detail: {
      message: `📊 <b>Wealth Management</b><br><br>
Personalized wealth solutions:<br><br>
✅ Portfolio management<br>
✅ Mutual fund advisory<br>
✅ Fixed deposit optimization<br>
✅ Tax-efficient investment planning<br>
✅ HNI & corporate treasury solutions<br>`,
      options: [
        { label: '📋 Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Wealth Menu', value: 'back', next: 'wealth_menu' },
      ]
    },
 
    wealth_demat: {
      message: `📈 <b>IIFL Demat & Trading Account</b><br><br>
✅ <b>Free Demat Account</b> — No charges<br>
✅ Paperless KYC — minutes mein<br>
✅ Equity, F&O, Currency, Commodity<br>
✅ Advanced trading platform<br>
✅ Real-time market data<br><br>
<b>Powered by IIFL Capital</b> 🏦`,
      options: [
        { label: '🔗 Account Open Karo', value: 'demat_open', next: 'demat_redirect' },
        { label: '📋 Pehle Consultation', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Wealth Menu', value: 'back', next: 'wealth_menu' },
      ]
    },
 
    demat_redirect: {
      message: `✅ IIFL Capital ka link aapke liye open ho raha hai!<br><br>
Agar koi bhi sawal ho toh hum yahan hain. 😊`,
      options: [
        { label: '🏠 Main Menu', value: 'home', next: 'welcome' },
        { label: '📞 Expert se Baat Karein', value: 'consult', next: 'collect_name' },
      ]
    },
 
    wealth_foreign: {
      message: `🌐 <b>End-to-End Foreign Services</b><br><br>
✅ Foreign currency loans<br>
✅ FEMA compliance advisory<br>
✅ NRI banking solutions<br>
✅ Import/Export financing<br>
✅ Trade finance structuring<br>`,
      options: [
        { label: '📋 Consultation Book Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Wealth Menu', value: 'back', next: 'wealth_menu' },
      ]
    },
 
    // ── TRAINING MENU ─────────────────────────────────────────
    training_menu: {
      message: `🎓 <b>Training & Placement Services</b><br><br>
Apna career fintech/banking mein banao:<br><br>
Aapko kya chahiye?`,
      options: [
        { label: '🎓 Internship Program', value: 'intern', next: 'training_intern' },
        { label: '💼 Job Placement', value: 'job', next: 'training_job' },
        { label: '📚 Banking Domain Training', value: 'course', next: 'training_course' },
        { label: '⬅️ Wapas Jao', value: 'back', next: 'welcome' },
      ]
    },
 
    training_intern: {
      message: `🎓 <b>Internship Program</b><br><br>
Aadi Fintech ke saath internship karein:<br><br>
✅ Paid internship opportunities<br>
✅ Live project experience<br>
✅ Fintech & banking domain<br>
✅ Certificate + recommendation letter<br>
✅ PPO (Pre-Placement Offer) chances<br><br>
Apply karne ke liye apna naam dein:`,
      options: [
        { label: '📋 Apply Now', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Training Menu', value: 'back', next: 'training_menu' },
      ]
    },
 
    training_job: {
      message: `💼 <b>Job Placement Services</b><br><br>
Hamara placement network bahut strong hai:<br><br>
✅ Banking & NBFC placements<br>
✅ Fintech startup opportunities<br>
✅ Resume & interview preparation<br>
✅ 500+ successful placements<br>
✅ Freshers to experienced both welcome<br>`,
      options: [
        { label: '📋 Register Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Training Menu', value: 'back', next: 'training_menu' },
      ]
    },
 
    training_course: {
      message: `📚 <b>Banking Domain Training</b><br><br>
Mr. Raj Sharma ke saath seekhein:<br><br>
✅ Credit analysis & appraisal<br>
✅ MSME banking operations<br>
✅ Loan documentation<br>
✅ Compliance & regulatory framework<br>
✅ Online + offline batches available<br>`,
      options: [
        { label: '📋 Enroll Karein', value: 'consult', next: 'collect_name' },
        { label: '⬅️ Training Menu', value: 'back', next: 'training_menu' },
      ]
    },
 
    // ── COLLECT USER INFO ─────────────────────────────────────
    collect_name: {
      message: `📋 <b>Free Consultation Book Karein</b><br><br>
Hum aapko expert se connect karenge! 🎯<br><br>
Pehle aapka <b>naam</b> batayein:`,
      options: []
    },
 
    collect_phone: {
      message: `👍 Shukriya! Ab aapka <b>WhatsApp number</b> share karein (10 digit):`,
      options: []
    },
 
    collect_service: {
      message: `📌 Aap mainly kaunsi service ke baare mein jaanna chahte hain?`,
      options: [
        { label: '💰 Loan/Funding', value: 'Loan/Funding', next: 'send_whatsapp' },
        { label: '📊 CIBIL/Credit', value: 'CIBIL/Credit Rating', next: 'send_whatsapp' },
        { label: '🏢 Business Consultancy', value: 'Business Consultancy', next: 'send_whatsapp' },
        { label: '📈 Investment/Wealth', value: 'Investment/Wealth', next: 'send_whatsapp' },
        { label: '🎓 Training/Placement', value: 'Training/Placement', next: 'send_whatsapp' },
        { label: '🔄 Other / General Query', value: 'General Query', next: 'send_whatsapp' },
      ]
    },
 
    send_whatsapp: {
      message: `✅ <b>Shukriya! Aapki details mil gayi.</b><br><br>
Ab WhatsApp pe hamari team se directly connect ho rahe hain...<br><br>
<i>Ek second...</i> 🚀`,
      options: [],
      isEnd: true
    },
 
    final_message: {
      message: `🎉 <b>Congratulations! Aapka request submit ho gaya.</b><br><br>
Hamari team <b>24 ghante ke andar</b> aapse contact karegi.<br><br>
Kuch aur jaanna hai?`,
      options: [
        { label: '🏠 Main Menu', value: 'home', next: 'welcome' },
        { label: '✕ Chat Band Karein', value: 'close', next: 'close' },
      ]
    }
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
 
    // Special actions
    if (opt.next === 'close') {
      this.isOpen = false;
      return;
    }
 
    if (opt.next === 'demat_redirect') {
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
      this.addBotMessage(this.flow['final_message'].message, this.flow['final_message'].options || []);
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
 
    // Handle collect flow
    if (this.currentStep === 'collect_name') {
      this.userData['name'] = input;
      this.currentStep = 'collect_phone';
      this.addBotMessage(this.flow['collect_phone'].message, []);
      return;
    }
 
    if (this.currentStep === 'collect_phone') {
      if (!/^\d{10}$/.test(input.replace(/\s/g, ''))) {
        this.addBotMessage('⚠️ Please enter a valid 10-digit mobile number.', []);
        return;
      }
      this.userData['phone'] = input;
      this.currentStep = 'collect_service';
      this.addBotMessage(this.flow['collect_service'].message, this.flow['collect_service'].options || []);
      return;
    }
 
    // Generic fallback
    this.addBotMessage(
      `Samajh gaya! Aapka message hamari team tak pahunch gaya. 😊<br><br>
Kya aap hamse directly WhatsApp pe baat karna chahenge?`,
      [
        { label: '✅ Haan, WhatsApp karo', value: 'wa', next: 'collect_name' },
        { label: '🏠 Main Menu', value: 'home', next: 'welcome' }
      ]
    );
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
