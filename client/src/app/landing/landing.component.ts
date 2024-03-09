import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../search/search.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterOutlet, SearchComponent, CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  marketingView: boolean;

  ngOnInit(): void {
    this.marketingView = true;
  }
}
