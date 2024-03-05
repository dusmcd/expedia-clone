import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { LandingComponent } from './landing/landing.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, LandingComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'client';
}
