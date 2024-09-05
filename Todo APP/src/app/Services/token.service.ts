import { Injectable } from '@angular/core';
import {jwtDecode} from 'jwt-decode';


@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() {}
  //Stores the JWT token in session storage.
  setToken(token: string): void {
    sessionStorage.setItem('u_t', token);
  }
  //Retrieves the JWT token from session storage.
  getToken(): string | null {
    return sessionStorage.getItem('u_t');
  }
  //Checks if a JWT token exists in session storage.
  checkToken(): boolean {
      return sessionStorage.getItem('u_t') ? true : false;
  }
//Extracts the user ID from the JWT token.
  getUserIdFromToken(): number | null {
    const token = sessionStorage.getItem('u_t');
    if (token) {
      try {
        const decodedToken: any = jwtDecode (token);
        return decodedToken.nameid as number;
      }
      catch (error) {
        return null;
      }
    }

    return null;
  }
  //Clears the JWT token from session storage.
  clearToken(){
    return sessionStorage.removeItem('u_t');
  }

}
