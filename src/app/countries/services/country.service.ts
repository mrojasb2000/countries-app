import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl:string = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  searchCapital( term: string): Observable<Country[]> {
    return this.searchByTerm(term, 'capital');
  }

  searchCountry( term: string): Observable<Country[]> {
    return this.searchByTerm(term, 'name');
  }

  private searchByTerm(term: string, objectType: string): Observable<Country[]> {
    const url = `${this.apiUrl}/${objectType}/${term}`;
    return this.http.get<Country[]>(url).pipe( catchError( error => of([]) ) )
  }

}
