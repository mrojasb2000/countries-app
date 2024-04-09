import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map, tap } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl:string = 'https://restcountries.com/v3.1';

  public cacheStore: CacheStore = {
    byCapital: { term: '', countries: [] },
    byCountry: { term: '', countries: [] },
    byRegion: { region: '', countries: [] },
  }

  constructor(private http: HttpClient) {
    this.loadFromLocalStorag();
  }

  private saveToLocalStorage():void {
    localStorage.setItem('cacheStore', JSON.stringify( this.cacheStore ));
  }

  private loadFromLocalStorag(): void {
      if ( !localStorage.getItem('cacheStore') ) return;
      this.cacheStore = JSON.parse( localStorage.getItem('cacheStore')! );
  }

  searchByAlphaCode( term: string): Observable<Country | null> {
    return this.getCountriesRequest(term, 'alpha').pipe(
      map( countries => countries.length > 0 ? countries[0]: null),
      catchError( () => of(null))
    )
  }

  searchByCapital( term: string): Observable<Country[]> {
    return this.getCountriesRequest(term, 'capital')
      .pipe(
        tap( countries => this.cacheStore.byCapital = { term, countries }),
        tap ( () => this.saveToLocalStorage() )
      )
  }

  searchByCountry( term: string): Observable<Country[]> {
    return this.getCountriesRequest(term, 'name')
      .pipe(
        tap( countries => this.cacheStore.byCountry = { term, countries }),
        tap ( () => this.saveToLocalStorage() )
      )
  }

  searchByRegion( region: Region): Observable<Country[]> {
    return this.getCountriesRequest(region, 'region')
      .pipe(
        tap( countries => this.cacheStore.byRegion = { region, countries }),
        tap ( () => this.saveToLocalStorage() )
      )
  }

  private getCountriesRequest(term: string, objectType: string): Observable<Country[]> {
    const url = `${this.apiUrl}/${objectType}/${term}`;
    return this.http.get<Country[]>(url).pipe( catchError( error => of([]) ) )
  }

}
