import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchService } from './search.service';
import { Hotel } from '../interfaces/hotel';
import { SearchHotel } from '../interfaces/search';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
  results: Hotel[];

  constructor(private activeRoute: ActivatedRoute, private searchService: SearchService) {}

  getHotels() {
    this.activeRoute.queryParams.subscribe((searchParams: Params) => {
      // using service send request to DB based on searchParams
      this.searchService.getHotels(searchParams as SearchHotel).subscribe(data => {
        this.results = data;
      });
    });
  }

  ngOnInit(): void {
    this.getHotels();
  }
}
