import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export interface SearchDate {
    from: NgbDate;
    to: NgbDate
}

export interface SearchHotel {
    location: string;
    fromDate: string;
    toDate: string;
    guests: number;
}