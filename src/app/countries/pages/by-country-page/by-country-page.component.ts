import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {
  private _countries: Country[] = [];
  public isLoading: boolean = false;
  constructor(private countryService: CountryService) { }

  get countries(): Country[] {
    return [...this._countries];
  }

  searchByCountry(term: string): void {
    this.isLoading = true;
    console.log({term});
    this.countryService.searchByCountry(term)
      .subscribe(countries => {
        this.isLoading = false;
        this._countries = countries
      });
  }
}
