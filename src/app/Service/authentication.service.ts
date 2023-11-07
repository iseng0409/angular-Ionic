import { Injectable } from '@angular/core';
import { Observable, catchError, delay, interval, of, timeout } from 'rxjs';
import { IAuthLoginDto, IAuthResponse } from '../Model/Authentication';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }
  public Login(userdetail: IAuthLoginDto): Observable<IAuthResponse> {
    // the following is fake API
    //the actual Backend API is not required for this coding challenge
    const fakeAuthApiUrl = 'https://userAuthRestAPI.com/Login';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    this.httpClient
      .post(fakeAuthApiUrl, userdetail, httpOptions)
      .pipe(
        // timeout function that specifies interval response e.g. 100ms to 600ms OR 1ms to 6ms
        //to simulate timeout error, the interval response should be between 1-6 milliseconds
        timeout(1 + Math.random() * 6),
        catchError((err: HttpErrorResponse) => {
          console.error(`HTTP Request Failed due to ${err.message}`);
          throw err;
        })
      )
      .subscribe((rsp) => {
        return of(<IAuthResponse>{
          accessToken: '23sdf2323f',
          errorMessage: '',
          isAuthenticated: true,
        });
      });
    return of();
  }
}
