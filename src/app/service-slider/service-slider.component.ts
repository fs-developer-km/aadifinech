import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-service-slider',
  imports: [CommonModule],
  templateUrl: './service-slider.component.html',
  styleUrl: './service-slider.component.css'
})
export class ServiceSliderComponent {

   serviceNames = [
    'Fund Raising',
    'Manpower Training',
    'Debt Restructuring',
    'Credit Rating Advisory',
    'Tech Services',
    'Digital Marketing',
    'Loan For Every Indian',
    'Real Estate Advisory',
    'Wealth Management',
    'Bill Discounting',
    'Export Bill Discounting',
    'Insurance Services',
    'Banking Consultancy'
  ];
}
