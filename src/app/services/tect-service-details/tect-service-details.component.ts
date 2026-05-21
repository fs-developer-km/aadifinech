import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

interface ServiceDetail {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  icon: string;
}

@Component({
  selector: 'app-tect-service-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './tect-service-details.component.html',
  styleUrl: './tect-service-details.component.css'
})
export class TectServiceDetailsComponent implements OnInit {

  serviceKey: string = 'web';
  applicationForm!: FormGroup;
  submitted = false;
  submitSuccess = false;

  roles = [
    'Backend Developer',
    'Frontend Developer',
    'Mobile App Developer',
    'DevOps & Cloud Engineer',
    'QA Automation Engineer',
    'Product Manager',
    'UI/UX Designer',
    'Customer Success Specialist',
    'Business Development',
  ];

  experienceLevels = [
    'Internship',
    'Fresher (0-1 yr)',
    '1 Year',
    '2 Years',
    '3 Years',
    '4 Years',
    '5 Years',
    '6 Years',
    '7 Years',
    '8 Years',
    '9 Years',
    '10+ Years',
  ];

  services: Record<string, ServiceDetail> = {
    web: {
      title: 'Web Development',
      subtitle: 'Modern, Fast & Scalable Websites',
      description: 'At our company, we provide professional web development services designed to help businesses establish a strong online presence. We create modern, responsive, and high-performing websites that work smoothly across all devices, including desktops, tablets, and smartphones. Our team focuses on delivering secure, scalable, and user-friendly websites tailored to each client’s unique business requirements. From business websites and ecommerce platforms to custom web applications, we ensure every project is built with the latest technologies and industry standards. Our goal is to create websites that not only look visually appealing but also improve customer engagement, generate leads, and support long-term business growth.',
      highlights: [
        'React, Angular & Vue.js frontends',
        'Node.js, Django & Laravel backends',
        'SEO-ready & mobile-first builds',
        'Secure API integrations',
      ],
      icon: '🌐',
    },
    mobile: {
      title: 'Mobile App Development',
      subtitle: 'iOS, Android & Cross-Platform Apps',
      description: 'We specialize in developing innovative and user-friendly mobile applications for Android and iOS platforms. Our mobile app development services are focused on creating fast, secure, and feature-rich applications that provide a seamless user experience. Whether it is a startup idea, business application, ecommerce app, or enterprise solution, our team designs and develops applications that meet modern market demands. We integrate advanced technologies, intuitive interfaces, and scalable architectures to ensure smooth performance and long-term reliability. Our mission is to help businesses connect with their customers more effectively through powerful and engaging mobile solutions.',
      highlights: [
        'Flutter & React Native cross-platform',
        'Native iOS (Swift) & Android (Kotlin)',
        'Push notifications & offline support',
        'App Store & Play Store deployment',
      ],
      icon: '📱',
    },
    uiux: {
      title: 'UI/UX Design',
      subtitle: 'User-First, Conversion-Focused Design',
      description: 'Our UI/UX design services are aimed at creating visually attractive and highly interactive digital experiences. We believe that great design is not only about appearance but also about usability and customer satisfaction. Our creative design team carefully studies user behavior and business goals to develop interfaces that are simple, engaging, and easy to navigate. From wireframing and prototyping to complete user interface design, we focus on delivering designs that improve user engagement and create a strong brand identity. By combining creativity with functionality, we ensure that every website and application provides an exceptional user experience.',
      highlights: [
        'Figma prototyping & wireframing',
        'User journey & flow mapping',
        'Design system creation',
        'Usability testing & iteration',
      ],
      icon: '🎨',
    },
    cloud: {
      title: 'Cloud Solutions',
      subtitle: 'Scalable, Secure Cloud Infrastructure',
      description: 'We provide advanced cloud solutions that help businesses improve efficiency, scalability, and data security. Our cloud services are designed to simplify business operations by enabling secure data storage, remote accessibility, and reliable infrastructure management. We assist organizations in migrating to cloud platforms, managing cloud environments, and implementing secure backup solutions. By using modern cloud technologies such as AWS, Microsoft Azure, and Google Cloud, we help businesses reduce operational costs while increasing flexibility and performance. Our cloud solutions ensure that companies can operate smoothly, securely, and efficiently in today’s digital ',
      highlights: [
        'AWS, Azure & GCP architecture',
        'Docker & Kubernetes deployment',
        'CI/CD pipeline automation',
        'Cloud cost optimization',
      ],
      icon: '☁️',
    },
    marketing: {
      title: 'Digital Marketing',
      subtitle: 'SEO, Ads & Growth Analytics',
      description: 'Our digital marketing services help businesses grow their online presence, reach targeted audiences, and increase revenue through strategic marketing campaigns. We use a combination of search engine optimization, social media marketing, paid advertising, content marketing, and branding strategies to deliver measurable results. Our team analyzes market trends, customer behavior, and business goals to create customized marketing plans that maximize visibility and engagement. Whether the objective is to generate leads, increase website traffic, or improve brand awareness, our digital marketing solutions are designed to help businesses achieve sustainable growth in the competitive online marketplace.',
      highlights: [
        'SEO & content strategy',
        'Google & Meta paid campaigns',
        'Social media management',
        'Analytics & conversion tracking',
      ],
      icon: '📈',
    },
    testing: {
      title: 'Software Testing',
      subtitle: 'End-to-End QA & Bug-Free Delivery',
      description: 'We provide comprehensive software testing services to ensure that applications are secure, reliable, and free from critical errors before deployment. Our testing process includes manual testing, automation testing, performance analysis, security testing, and quality assurance practices that help identify and resolve issues at every stage of development. We focus on improving software quality, functionality, and user satisfaction by ensuring smooth performance across different devices and platforms. Our experienced QA team follows industry best practices and advanced testing methodologies to deliver high-quality software solutions that meet business expectations and provide a seamless user experience.',
      highlights: [
        'Selenium & Cypress automation',
        'API testing with Postman',
        'Performance & load testing',
        'Detailed bug report & tracking',
      ],
      icon: '🧪',
    },
  };

  get currentService(): ServiceDetail {
    return this.services[this.serviceKey] || this.services['web'];
  }

  constructor(private route: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    this.route.queryParams.subscribe(params => {
      this.serviceKey = params['service'] || 'web';
    });

    this.applicationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      contact: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      role: ['', Validators.required],
      experience: ['', Validators.required],
      preferredLocation: ['', Validators.required],
      noticePeriod: ['', Validators.required],
      linkedinPortfolio: [''],
      profileSummary: ['', [Validators.required, Validators.minLength(20)]],
    });
  }

  get f() { return this.applicationForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.applicationForm.invalid) return;

    const v = this.applicationForm.value;
    const service = this.currentService.title;

    const message =
`🌟 *NEW APPLICATION — Aadifintech.com* 🌟
━━━━━━━━━━━━━━━━━━━━━━
📌 *Service Interest:* ${service}
━━━━━━━━━━━━━━━━━━━━━━

👤 *PERSONAL DETAILS*
• *Full Name:* ${v.fullName}
• *Email:* ${v.email}
• *Contact:* ${v.contact}

💼 *PROFESSIONAL DETAILS*
• *Role Applying For:* ${v.role}
• *Experience:* ${v.experience}
• *Preferred Location:* ${v.preferredLocation}
• *Notice Period:* ${v.noticePeriod}

🔗 *LinkedIn / Portfolio:*
${v.linkedinPortfolio ? v.linkedinPortfolio : 'Not provided'}

📝 *PROFILE SUMMARY*
${v.profileSummary}

━━━━━━━━━━━━━━━━━━━━━━
✅ Sent via Aadifintech.com`;

    const encoded = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919953656810?text=${encoded}`;

    window.open(whatsappUrl, '_blank');

    this.submitSuccess = true;
    this.applicationForm.reset();
    this.submitted = false;

    setTimeout(() => { this.submitSuccess = false; }, 5000);
  }
}




