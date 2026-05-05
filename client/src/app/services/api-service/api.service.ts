import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = "";

  constructor(private http: HttpClient) { }

  fetchUserData() : Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }
}
