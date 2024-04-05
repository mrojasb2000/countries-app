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

  constructor(private countryService: CountryService) { }

  get countries(): Country[] {
    return [...this._countries];
  }

  searchByRegion(term: string): void {
    console.log({term});
    this.countryService.searchByRegion(term).subscribe(countries => this._countries = countries);
  }
}
