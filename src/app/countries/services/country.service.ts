import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, map } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl:string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchByAlphaCode( term: string): Observable<Country | null> {
    return this.searchByTerm(term, 'alpha').pipe(
      map( countries => countries.length > 0 ? countries[0]: null),
      catchError( () => of(null))
    )
  }

  searchByCapital( term: string): Observable<Country[]> {
    return this.searchByTerm(term, 'capital');
  }

  searchByCountry( term: string): Observable<Country[]> {
    return this.searchByTerm(term, 'name');
  }

  searchByRegion( term: string): Observable<Country[]> {
    return this.searchByTerm(term, 'region');
  }



  private searchByTerm(term: string, objectType: string): Observable<Country[]> {
    const url = `${this.apiUrl}/${objectType}/${term}`;
    return this.http.get<Country[]>(url).pipe( catchError( error => of([]) ) )
  }

}
