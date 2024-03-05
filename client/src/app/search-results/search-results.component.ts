import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { SearchService } from './search.service';
import { Hotel } from '../interfaces/hotel';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.css'
})
export class SearchResultsComponent implements OnInit {
  results: [Hotel];
  constructor(private activeRoute: ActivatedRoute, private searchService: SearchService) {}

  getHotels() {
    this.activeRoute.queryParams.subscribe((searchParams: Params) => {
      // using service send request to DB based on searchParams
      console.log(searchParams);
    });
  }

  ngOnInit(): void {
    this.getHotels();
  }
}
