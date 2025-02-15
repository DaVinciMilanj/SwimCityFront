import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';



@Component({
  selector: 'app-about-section',
  standalone: true,
  imports: [RouterLink ,RouterModule],
  templateUrl: './about-section.component.html',
  styleUrl: './about-section.component.css'
})
export class AboutSectionComponent {
  
}
