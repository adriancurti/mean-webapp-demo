import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { User } from '../models/user';
import { Socket } from 'ngx-socket-io';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly endpoint = `${environment.apiURL}/Users`;

  constructor(private http: HttpClient, private socket: Socket) { }

  access_token: string = '';
  processing: boolean = false;

  checkAccessToken(): void {
    if (typeof (Storage) !== "undefined") {
      this.access_token = localStorage.getItem("access_token") ? localStorage.getItem("access_token") : '';
    }
  }

  setAccessToken(access_token: string): void {
    this.access_token = access_token;
    if (typeof (Storage) !== "undefined") {
      localStorage.setItem("access_token", this.access_token);
    }
  }

  getAccessToken(): Observable<string> {
    return of(this.access_token);
  }

  login(user: User): Observable<any> {
    this.processing = true;
    let url = `${this.endpoint}/login`;
    return this.http.post(url, user, httpOptions)
      .pipe(
        tap(_ => this.log(`User connected! Username: ${user.username}`)),
        catchError(this.handleError<any>('login'))
      );
  }

  logout() {
    if (typeof (Storage) !== "undefined") {
      localStorage.removeItem("access_token");
    }

    this.processing = true;
    let url = `${this.endpoint}/logout?access_token=${this.access_token}`;
    return this.http.post(url, null, httpOptions)
      .pipe(
        tap(_ => this.log(`User disconnected!`)),
        catchError(this.handleError<any>('logout'))
      );
  }

  public isAuthenticated(): boolean {
    return this.access_token !== '';
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
