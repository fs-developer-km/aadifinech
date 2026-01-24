import { Component } from '@angular/core';

@Component({
  selector: 'app-our-mission',
  imports: [],
  templateUrl: './our-mission.component.html',
  styleUrl: './our-mission.component.css'
})
export class OurMissionComponent {


  ngOnInit(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // optional smooth scroll
}

scrollToSection(sectionId: string) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
}
