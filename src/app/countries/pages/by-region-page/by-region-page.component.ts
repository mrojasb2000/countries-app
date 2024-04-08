import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interfaces';
import { CountryService } from '../../services/country.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent {
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

  searchByRegion(term: string): void {
    this.isLoading = true;
    console.log({term});
    this.countrySubscription = this.countryService.searchByRegion(term).subscribe(countries => {
      this.isLoading = false;
      this._countries = countries
    });
  }
}
