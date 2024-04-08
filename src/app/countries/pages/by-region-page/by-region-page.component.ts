import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interfaces';
import { CountryService } from '../../services/country.service';
import { Subscription } from 'rxjs';
import { Region } from '../../interfaces/region.type';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrl: './by-region-page.component.css'
})
export class ByRegionPageComponent implements OnInit {
  private _countries: Country[] = [];
  private countrySubscription?: Subscription;
  public isLoading: boolean = false;
  public regions: Region[] = ['Africa','America','Asia','Europe','Oceania'];
  public selectedRegion?: Region;

  constructor(private countryService: CountryService) { }

  get countries(): Country[] {
    return [...this._countries];
  }

  ngOnInit(): void {
    this._countries = this.countryService.cacheStore.byRegion.countries;
    this.selectedRegion = this.countryService.cacheStore.byRegion.region;
  }

  ngOnDestroy(): void {
    this.countrySubscription?.unsubscribe();
  }

  searchByRegion(region: Region): void {
    this.isLoading = true;
    this.selectedRegion = region;
    this.countrySubscription = this.countryService.searchByRegion(region).subscribe(countries => {
      this.isLoading = false;
      this._countries = countries
    });
  }
}
