import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export interface SearchDate {
    from: NgbDate;
    to: NgbDate
}

export interface SearchHotel {
    location: string;
    dates: string;
    guests: number;
}