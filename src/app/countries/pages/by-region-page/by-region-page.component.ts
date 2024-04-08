import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interfaces';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {
  private _countries: Country[] = [];
  public isLoading: boolean = false;

  constructor(private countryService: CountryService) { }

  get countries(): Country[] {
    return [...this._countries];
  }

  searchByRegion(term: string): void {
    this.isLoading = true;
    console.log({term});
    this.countryService.searchByRegion(term).subscribe(countries => {
      this.isLoading = false;
      this._countries = countries
    });
  }
}
