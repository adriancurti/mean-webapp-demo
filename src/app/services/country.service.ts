import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Country } from '../models/country';
import { AuthService } from './auth.service';
import { Socket } from 'ngx-socket-io';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private readonly endpoint = `${environment.apiURL}/Countries`;

  access_token: string = '';
  processing: boolean = false;

  constructor(private http: HttpClient, private socket: Socket, private authService: AuthService) { }

  getCountries(): Observable<Country[]> {
    this.authService.getAccessToken().subscribe(access_token => this.access_token = access_token);
    
    this.processing = true;
    let url = `${this.endpoint}?access_token=${this.access_token}`;
    return this.http.get<Country[]>(url)
      .pipe(
        tap(_ => this.log('fetched Countries')),
        catchError(this.handleError('getCountries', []))
      );
  }

  updateCountry(country: Country): Observable<any> {
    this.authService.getAccessToken().subscribe(access_token => this.access_token = access_token);

    this.processing = true;
    let url = `${this.endpoint}/${country.id}?access_token=${this.access_token}`;
    return this.http.put(url, country, httpOptions)
      .pipe(
        tap(_ => this.log(`The data has been updated! Country: ${country.name} -> Population: ${country.value}`)),
        catchError(this.handleError<any>('updateCountry'))
      );
  }

  public isProcessing(): boolean {
    return this.processing;
  }

  private log(message: string) {
    this.processing = false;
    console.log(message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.log(`${operation} failed: Unauthenticated user!`);
      return of(result as T);
    };
  }
}
