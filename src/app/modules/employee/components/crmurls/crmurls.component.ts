import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface QuickLink {
  title: string;
  description: string;
  url: string;
  icon: string;
  category: string;
}

@Component({
  selector: 'app-crmurls',
  imports: [CommonModule],
  templateUrl: './crmurls.component.html',
  styleUrl: './crmurls.component.css'
})
export class CrmurlsComponent {

   quickLinks: QuickLink[] = [
    {
      title: 'Refrens',
      description: 'Create professional invoices, estimates & manage your business finances seamlessly',
      url: 'https://www.refrens.com/login',
      icon: 'invoice',
      category: 'Business Tools'
    },
    {
      title: 'InvestWell',
      description: 'Complete mutual fund investment platform with expert advisory and portfolio tracking',
      url: 'https://aadifintech.investwell.app/app/#/login',
      icon: 'investment',
      category: 'Investment'
    },
    {
      title: 'IIFL Capital',
      description: 'Full-service stockbroking platform for trading in equity, F&O, commodities & currencies',
      url: 'https://aaa.iiflcapital.com/login',
      icon: 'trading',
      category: 'Trading'
    },
    {
      title: 'IIFL Demat',
      description: 'Open free demat account with zero maintenance charges and instant account activation',
      url: 'https://aaa.iiflcapital.com/login',
      icon: 'demat',
      category: 'Trading'
    },
    {
      title: 'GST Portal',
      description: 'Official GST portal for filing returns, payment of taxes & managing GST compliance',
      url: 'https://services.gst.gov.in/services/login',
      icon: 'gst',
      category: 'Tax & Compliance'
    },
    {
      title: 'ITR Portal',
      description: 'Income Tax e-Filing portal for filing returns, tracking refunds & tax payments',
      url: 'https://eportal.incometax.gov.in/iec/foservices/#/login',
      icon: 'itr',
      category: 'Tax & Compliance'
    },
    {
      title: 'GST Trend Line',
      description: 'Track GST compliance trends, analyze business creditworthiness & financial health',
      url: 'https://famescore.in/',
      icon: 'analytics',
      category: 'Analytics'
    }
  ];

  openLink(url: string): void {
    window.open(url, '_blank');
  }
}
