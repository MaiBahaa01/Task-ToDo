import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Observable } from 'rxjs';
import { LoginData } from '../Model View/login-data';
import { RegistrationData } from '../Model View/registration-data';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url= "Account";

  constructor(
    private httpService: HttpService
  ) { }
//Logs in a user and returns an observable of the token.
  login(data: LoginData): Observable<{token: string}> {
    return this.httpService.post<{token: string}>(`${this.url}/login`, data);
  }
  //Registers a new user and returns an observable of the response.
  registration(data: RegistrationData): Observable<string> {
    return this.httpService.post<string>(`${this.url}/register`, data)
  }

}
