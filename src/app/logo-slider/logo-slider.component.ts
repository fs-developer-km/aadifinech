import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo-slider',
  imports: [CommonModule],
  templateUrl: './logo-slider.component.html',
  styleUrl: './logo-slider.component.css'
})
export class LogoSliderComponent {


    scrollSpeed = 10; // slider speed in seconds

  partners = [
    { name: 'Partner 1', logo: 'logos/logo1.png' },
    { name: 'Partner 1', logo: 'logos/logo2.jpg' },
    { name: 'Partner 1', logo: 'logos/logo3.png' },
    { name: 'Partner 1', logo: 'logos/logo4.png' },
    { name: 'Partner 1', logo: 'logos/logo5.png' },
    { name: 'Partner 1', logo: 'logos/logo6.png' },
    { name: 'Partner 1', logo: 'logos/logo7.png' },
    { name: 'Partner 1', logo: 'logos/logo9.png' },
    { name: 'Partner 1', logo: 'logos/logo10.png' },
    { name: 'Partner 1', logo: 'logos/logo11.png' },

  ];
}
