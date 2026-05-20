import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-team',
  imports: [RouterModule],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {


   constructor(
    private title: Title,
    private meta: Meta
  ) {

    this.title.setTitle('Team / Our Experts | Aadi Fintech');

    this.meta.updateTag({
      name: 'description',
      content: `Behind every financial breakthrough at Aadi Fintech is a team of seasoned experts — credit specialists, business strategists, finance educators, and industry veterans. Meet the people who bring deep expertise, human empathy, and relentless commitment to every client's financial journey.`
    });

    this.meta.updateTag({
      name: 'keywords',
      content: 'Aadi Fintech Team, Financial Experts, Credit Specialists, Business Strategists, Finance Educators, Industry Veterans, Financial Consultancy Team, Fintech Experts'
    });

  }

    ngOnInit(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // optional smooth scroll
}
}
