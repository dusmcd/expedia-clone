import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
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
    dates: new FormControl(),
    guests: new FormControl("")
  });

  calendar = inject(NgbCalendar);
  formatter = inject(NgbDateParserFormatter);
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null = this.calendar.getToday();
  toDate: NgbDate | null = this.calendar.getNext(this.calendar.getToday(), "d", 3);

  constructor(private router: Router) {}

  

  private formatDate(dateObj: SearchDate) {
    const fromDate = new Date(dateObj.from.year, dateObj.from.month - 1, dateObj.from.day);
    const toDate = new Date(dateObj.to.year, dateObj.to.month - 1, dateObj.to.day);
    return { from: fromDate.toDateString(), to: toDate.toDateString() };
  }

  handleSubmit() {
    this.searchForm.setValue({ 
      location: this.searchForm.value.location as string, 
      guests: this.searchForm.value.guests as string,
      dates: { from: this.fromDate, to: this.toDate }
    })
    // route to search results screen passing the search parameters to results component
    const location = this.searchForm.value.location;
    const dates = this.formatDate(this.searchForm.value.dates as SearchDate);
    const guests = this.searchForm.value.guests;
    this.router.navigateByUrl(`/Hotel-Search?location=${location}&fromDate=${dates.from}&toDate=${dates.to}&guests=${guests}`);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}


}
