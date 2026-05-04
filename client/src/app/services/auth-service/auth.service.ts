import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string = "";

  constructor(private http: HttpClient) { }

  login(credentials: {email: string, password: string}) : Observable<any> {
    // TODO: Implement safer alternative to using localStorage
    return this.http.post<{ token: string }>(`${this.authUrl}/login`, credentials).pipe(
      tap(response => localStorage.setItem('jwt-token', response.token))
    );
  }

  logout() : void {
    // TODO: Implement safer alternative to using localStorage
    localStorage.removeItem('jwt-token');
  }

  getToken() : string | null {
    // TODO: Implement safer alternative to using localStorage
    return localStorage.getItem('jwt-token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}
