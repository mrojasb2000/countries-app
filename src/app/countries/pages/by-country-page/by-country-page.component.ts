import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {
  private _countries: Country[] = [];
  private countrySubscription?: Subscription;
  public isLoading: boolean = false;
  constructor(private countryService: CountryService) { }

  get countries(): Country[] {
    return [...this._countries];
  }

  ngOnDestroy(): void {
    this.countrySubscription?.unsubscribe();
  }

  searchByCountry(term: string): void {
    this.isLoading = true;
    console.log({term});
    this.countrySubscription = this.countryService.searchByCountry(term)
      .subscribe(countries => {
        this.isLoading = false;
        this._countries = countries
      });
  }
}
