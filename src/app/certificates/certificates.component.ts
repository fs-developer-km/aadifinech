import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-certificates',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent {

  certificates = [
    {
      id: 1,
      title: 'Udyam Registration Certificate',
      issuedBy: 'Ministry of MSME, Govt. of India',
      certNumber: 'UDYAM-UP-28-0162367',
      date: '24 May 2025',
      type: 'MSME',
      accent: '#1565c0',
      pdfPath: 'certificates/AADI_FINTECH_Udyam_Registration_Certificate.pdf',
    },
    {
      id: 2,
      title: 'GST Registration Certificate',
      issuedBy: 'Goods & Services Tax Network, Govt. of India',
      certNumber: '09ACHFA9348J1ZV',
      date: '19 Jan 2026',
      type: 'GST',
      accent: '#dd3333',
      pdfPath: 'certificates/UP_GST_AADIFINTECH.pdf',
    },
  ];

  activeId: number | null = null;
  activeImgId: number | null = null;

  open(id: number) { this.activeId = id; document.body.style.overflow = 'hidden'; }
  close() { this.activeId = null; document.body.style.overflow = ''; }
  get activeCert() { return this.certificates.find(c => c.id === this.activeId); }

  openImg(id: number) { this.activeImgId = id; document.body.style.overflow = 'hidden'; }
  closeImg() { this.activeImgId = null; document.body.style.overflow = ''; }
}