import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; 
// import { NavbarComponent } from '../../../navbar/navbar.component';

@Component({
  selector: 'app-about',
  imports: [RouterModule, ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {


  ngOnInit(): void {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // optional smooth scroll
}

  
}
