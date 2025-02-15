import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./site/navbar/navbar.component";
import { FooterComponent } from './site/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent , FooterComponent , CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular17';
  hideCommon: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const currentUrl = this.router.url; // URL فعلی
      if (currentUrl.includes('/auth') || currentUrl.includes('/teacher-form') || currentUrl.includes('/profile') || currentUrl.includes('/not-found')|| currentUrl.includes('/access-denied')) {
        this.hideCommon = true;
      } else {
        this.hideCommon = false;
      }
    });
  }
}
