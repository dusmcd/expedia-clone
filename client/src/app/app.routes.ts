import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { SearchResultsComponent } from './search-results/search-results.component';

export const routes: Routes = [
    { path: "", component: LandingComponent, children: [
        { path: "Hotel-Search", component: SearchResultsComponent }
    ]},
];
