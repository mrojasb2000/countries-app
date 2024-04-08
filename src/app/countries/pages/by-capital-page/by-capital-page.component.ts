import { Component } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css'
})
export class ByCapitalPageComponent {

  private _countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countryService: CountryService) { }

  get countries(): Country[] {
    return [...this._countries];
  }

  searchByCapital(term: string): void {
    this.isLoading = true;
    this.countryService.searchByCapital(term)
      .subscribe(countries => {
        this._countries = countries
        this.isLoading = false;
      });
  }
}
