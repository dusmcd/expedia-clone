import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../interfaces/hotel';
import { SearchHotel } from '../interfaces/search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  getHotels(queryParams: SearchHotel) {
    return this.http.get<Hotel[]>(`http://localhost:8080/api/hotels?location=${queryParams.location}&dates=${queryParams.dates}&guests=${queryParams.guests}`);
  }
}
