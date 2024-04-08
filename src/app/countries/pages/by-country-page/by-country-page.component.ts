import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent implements OnInit {
  private _countries: Country[] = [];
  private countrySubscription?: Subscription;
  public isLoading: boolean = false;
  public initialValue: string = '';

  constructor(private countryService: CountryService) { }

  get countries(): Country[] {
    return [...this._countries];
  }

  ngOnInit(): void {
    this._countries = this.countryService.cacheStore.byCountry.countries;
    this.initialValue = this.countryService.cacheStore.byCountry.term;
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
