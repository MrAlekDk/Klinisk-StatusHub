import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl = environment.authUrl;

  constructor(private http: HttpClient) { }

  login(credentials: {username: string, password: string}) : Observable<any> {
    return this.http.post(`${this.authUrl}/login`, credentials, {
      withCredentials: true
    });
  }

  logout() : Observable<any> {
    return this.http.post(`${this.authUrl}/logout`, {
      withCredentials: true
    });
  }

  isAuthenticated(): Observable<any> {
    return this.http.get<boolean>(`${this.authUrl}/is-authenticated`, {
      withCredentials: true
    });
  }

}
