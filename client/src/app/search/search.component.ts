import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchResultsComponent } from '../search-results/search-results.component';
import { Router } from '@angular/router';
import { SearchDate } from '../interfaces/search';


@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, NgbDatepickerModule, SearchResultsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})

export class SearchComponent {
  private today: Date = new Date(Date.now());
  searchForm = new FormGroup({
    location: new FormControl(""),
    dates: new FormControl<SearchDate>({ year: this.today.getFullYear(), month: this.today.getMonth() + 1, day: this.today.getDate() }),
    guests: new FormControl("")
  });

  constructor(private router: Router) {}

  

  private formatDate(dateObj: SearchDate): string {
    const date = new Date(dateObj.year, dateObj.month - 1, dateObj.day);
    return date.toDateString();
  }

  handleSubmit() {
    // route to search results screen passing the search parameters to results component
    const location = this.searchForm.value.location;
    const dates = this.formatDate(this.searchForm.value.dates as SearchDate);
    const guests = this.searchForm.value.guests;
    this.router.navigateByUrl(`/Hotel-Search?location=${location}&dates=${dates}&guests=${guests}`);
  }


}
