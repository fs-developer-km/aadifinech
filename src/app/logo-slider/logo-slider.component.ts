import { Component, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logo-slider',
  imports: [CommonModule],
  templateUrl: './logo-slider.component.html',
  styleUrl: './logo-slider.component.css'
})
export class LogoSliderComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('sliderTrack') sliderTrack!: ElementRef<HTMLElement>;

  // px per second — badhao to fast, ghatao to slow
  private speed = 60;

  private animationId: number = 0;
  private position = 0;
  private singleSetWidth = 0;
  private isPaused = false;
  private lastTime: number | null = null;

  partners = [
    { name: 'Axis Bank',               logo: 'LOGO/AXIS BANK.png' },
    { name: 'Bajaj Housing Finance',   logo: 'LOGO/BAJAJ HOUSING FINANCE.png' },
    { name: 'Bank of Maharashtra',     logo: 'LOGO/BANK OF MAHARASHTRA.png' },
    { name: 'Chola Mandalam',          logo: 'LOGO/CHOLA MANDALAM.png' },
    { name: 'CSB Bank',                logo: 'LOGO/CSB BANK.png' },
    { name: 'DCB Bank',                logo: 'LOGO/DCB BANK.png' },
    { name: 'Godrej Capital',          logo: 'LOGO/GODREJ CAPITAL.png' },
    { name: 'HDFC Bank',               logo: 'LOGO/HDFC BANK.png' },
    { name: 'Home First Finance',      logo: 'LOGO/HOME FIRST FINANCE.png' },
    { name: 'ICICI Bank',              logo: 'LOGO/ICICI BANK.png' },
    { name: 'IDFC First Bank',         logo: 'LOGO/IDFC FIRST BANK.jpg' },
    { name: 'L&T Finance',             logo: 'LOGO/L&T FINANCE.png' },
    { name: 'Mahindra Finance',        logo: 'LOGO/MAHINDRA FINANCE.png' },
    { name: 'Piramal Finance',         logo: 'LOGO/PIRAMAL FINANCE.png' },
    { name: 'Tata Capital',            logo: 'LOGO/TATA CAPITAL.jpg' },
    { name: 'Ujjivan Small Finance',   logo: 'LOGO/UJJIVAN SMALL FINANCE BANK.jpg' },
  ];

  // 3 copies render karo — seamless loop ke liye koi glitch nahi aata
  get displayPartners() {
    return [...this.partners, ...this.partners, ...this.partners];
  }

  ngOnInit() {}

  ngAfterViewInit() {
    // Ek tick baad measure karo taaki DOM render ho jaye
    setTimeout(() => this.initScroll(), 100);
  }

  private initScroll() {
    const track = this.sliderTrack?.nativeElement;
    if (!track) return;

    // Original ek set ki width = total track width / 3
    this.singleSetWidth = track.scrollWidth / 3;
    this.position = 0;

    this.animate(0);
  }

  private animate(timestamp: number) {
    if (this.lastTime === null) this.lastTime = timestamp;
    const delta = timestamp - this.lastTime;
    this.lastTime = timestamp;

    if (!this.isPaused) {
      this.position += (this.speed * delta) / 1000;

      // Jab pehla set khatam ho, reset to 0 — seamless loop
      if (this.position >= this.singleSetWidth) {
        this.position -= this.singleSetWidth;
      }

      const track = this.sliderTrack?.nativeElement;
      if (track) {
        track.style.transform = `translateX(-${this.position}px)`;
      }
    }

    this.animationId = requestAnimationFrame((t) => this.animate(t));
  }

  pauseScroll() {
    this.isPaused = true;
  }

  resumeScroll() {
    this.isPaused = false;
    this.lastTime = null; // delta reset so no jump after pause
  }

  ngOnDestroy() {
    if (this.animationId) cancelAnimationFrame(this.animationId);
  }
}