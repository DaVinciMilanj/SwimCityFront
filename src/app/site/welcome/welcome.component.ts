import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from "../navbar/navbar.component";
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { AboutComponent } from "../about/about.component";
import { TeachersComponent } from "../teachers/teachers.component";
import { PoolSectionComponent } from "../pool-section/pool-section.component";
import { AboutSectionComponent } from "../about-section/about-section.component";
import { PublicPoolSectionComponent } from "../public-pool-section/public-pool-section.component";


@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, HeaderComponent, AboutComponent, TeachersComponent, PoolSectionComponent, AboutSectionComponent, PublicPoolSectionComponent],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent {

  constructor(public authService: AuthService) {}

  logout(): void {
    this.authService.logout();
    
  }
}


