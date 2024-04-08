import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interfaces';
import { CountryService } from '../../services/country.service';
import { Subscription } from 'rxjs';

type Region = 'Africa'|'America'|'Asia'|'Europe'|'Oceania'

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {
  private _countries: Country[] = [];
  private countrySubscription?: Subscription;
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa','America','Asia','Europe','Oceania']

  constructor(private countryService: CountryService) { }

  get countries(): Country[] {
    return [...this._countries];
  }

  ngOnDestroy(): void {
    this.countrySubscription?.unsubscribe();
  }

  searchByRegion(term: string): void {
    this.isLoading = true;
    this.countrySubscription = this.countryService.searchByRegion(term).subscribe(countries => {
      this.isLoading = false;
      this._countries = countries
    });
  }
}
