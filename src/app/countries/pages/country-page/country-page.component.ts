import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interfaces';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styleUrl: './country-page.component.css'
})
export class CountryPageComponent implements OnInit{

  public country?: Country;
  private _tranlateCodes:string[] = [
    'ara',
    'bre',
    'ces',
    'cym',
    'deu',
    'est',
    'fin',
    'fra',
    'hrv',
    'hun',
    'jpn',
    'kor',
    'nld',
    'per',
    'pol',
    'por',
    'rus',
    'slk',
    'spa',
    'srp',
    'swe',
    'tur',
    'urd',
    'zho',
  ];

  constructor(
    private activateRouter: ActivatedRoute,
    private router: Router,
    private countryService: CountryService ){}

  ngOnInit(): void {
    this.activateRouter.params.pipe(
      switchMap( ({ id }) => this.countryService.searchByAlphaCode( id ))
    ).subscribe( country => {
      if (!country) {
        return this.router.navigateByUrl('');
      }
      return this.country = country;
    } );
  }

  get translateCodes(){
    return [...this._tranlateCodes];
  }
}
