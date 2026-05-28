import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authUrl: string = environment.authUrl;
  private currentUser: User | null = null;

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
    return this.http.get<{ authenticated: boolean, user: any }>(`${this.authUrl}/is-authenticated`,
      { withCredentials: true }
    ).pipe(
      tap(response => {
        if(response.authenticated)
        {
          this.currentUser = response.user;
        }
        else{
          this.currentUser = null;
        }
      })
    );
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

}
