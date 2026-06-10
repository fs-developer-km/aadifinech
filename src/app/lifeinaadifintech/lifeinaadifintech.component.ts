import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Dynamic attributes and loops

interface Photo {
  url: string;
  alt: string;
  category: 'internship' | 'walk' | 'group';
  title: string;
  description: string;
}

@Component({
  selector: 'app-lifeinaadifintech',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './lifeinaadifintech.component.html',
  styleUrl: './lifeinaadifintech.component.css'
})
export class LifeinaadifintechComponent {
  selectedCategory: string = 'all';


  photos: Photo[] = [
    {
      url: 'img/team/new111.jpeg',
      alt: 'Internship Training',
      category: 'internship',
      title: 'Mentorship & Training',
      description: 'Preparing the next generation of fintech experts with real-world exposure.'
    },
    {
      url: 'img/team/new222.jpeg',
      alt: 'Interns Presentation',
      category: 'internship',
      title: 'Intern Showcase',
      description: 'Our brilliant interns presenting their digital finance innovations.'
    },
    {
      url: 'img/team/new333.jpeg',
      alt: 'Interns Presentation',
      category: 'internship',
      title: 'Intern Showcase',
      description: 'Our brilliant interns presenting their digital finance innovations.'
    },
    {
      url: 'img/team/new444.jpeg',
      alt: 'Interns Presentation',
      category: 'internship',
      title: 'Intern Showcase',
      description: 'Our brilliant interns presenting their digital finance innovations.'
    },
    {
      url: 'img/team/new555.jpeg',
      alt: 'Interns Presentation',
      category: 'internship',
      title: 'Intern Showcase',
      description: 'Our brilliant interns presenting their digital finance innovations.'
    },
    {
      url: 'img/team/DSC00312.jpg',
      alt: 'Team Walking together',
      category: 'walk',
      title: 'Team Walk & Talk',
      description: 'Daily walking syncs for brainstorming and casual discussions.'
    },
  
    {
      url: 'img/team/DSC00323.jpg',
      alt: 'Office Group Photo',
      category: 'group',
      title: 'Fintech Milestones',
      description: 'Celebrating achievements and office festivals as one big family.'
    },
    {
      url: 'img/team/DSC00353.jpg',
      alt: 'Team Outing',
      category: 'group',
      title: 'Team Outings & Fun',
      description: 'Building memories together during our annual retreat.'
    },
    {
      url: 'img/team/team111.jpg',
      alt: 'Team Outing',
      category: 'group',
      title: 'Team Outings & Fun',
      description: 'Building memories together during our annual retreat.'
    }
  ];

  // Filters logic
  get filteredPhotos(): Photo[] {
    if (this.selectedCategory === 'all') {
      return this.photos;
    }
    return this.photos.filter(photo => photo.category === this.selectedCategory);
  }

  setCategory(category: string): void {
    this.selectedCategory = category;
  }
}