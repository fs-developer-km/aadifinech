import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SlickCarouselComponent, SlickCarouselModule } from 'ngx-slick-carousel';
import { ServiceSliderComponent } from '../../../service-slider/service-slider.component';


@Component({
  selector: 'app-pricing-plan',
  imports: [SlickCarouselModule, ReactiveFormsModule, CommonModule, CarouselModule, SlickCarouselModule,
    
  ],
  templateUrl: './pricing-plan.component.html',
  styleUrl: './pricing-plan.component.css'
})
export class PricingPlanComponent {

    link: any;
  @ViewChild('slickModal') slickModal!: SlickCarouselComponent;

  ngOnInit(): void {
    this.groupImages();
    window.scrollTo({ top: 0, behavior: 'smooth' }); // optional smooth scroll
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  projectItems = [
    {
      img: '/img/team/event1.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event7.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event10.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event11.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event12.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event13.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event14.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event15.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event16.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event17.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event18.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event19.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event20.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event21.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event23.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event24.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event25.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event26.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event27.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event28.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event29.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event30.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event31.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event32.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event33.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event34.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event35.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event36.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event37.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event38.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event39.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event40.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event41.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event42.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    },
    {
      img: '/img/team/event43.jpg',
      subtitle: 'Aadifintech',
      title: 'Aadifintech',
      link: ''
    }
  ];

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

  // Grouped items - har group mein 2 images
  groupedProjectItems: any[][] = [];

  groupImages(): void {
    const groupSize = 2;
    for (let i = 0; i < this.projectItems.length; i += groupSize) {
      this.groupedProjectItems.push(
        this.projectItems.slice(i, i + groupSize)
      );
    }
  }

}
