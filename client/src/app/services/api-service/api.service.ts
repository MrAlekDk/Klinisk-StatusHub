import { Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';
import { map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../auth-service/auth.service';
import { System } from '../../models/system.model';
import { Contact } from '../../models/contact.model';
import { SystemStatus } from '../../models/system-status.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient,
    private authService: AuthService
  ) { }

  fetchUserData() : Observable<User> {
    return this.http.get<User>(this.apiUrl);
  }

  fetchOrganisationSystems() : Observable<System[]> | null {
    const user: User | null = this.authService.getCurrentUser();
    if(!user) return of([]);

    return this.http
    .get<any[]>(`${this.apiUrl}/organisations/${user.organisationId}`)
    .pipe(
      map(rows => rows.map(row => this.mapSystem(row)))
    );
  }

  private mapSystem(row: any): System {
  return {
    id: row.id,
    name: row.name,
    link: row.link,
    createdAt: row.created_at,

    // Deserialize nested arrays
    statuses: row.statuses?.map((s: any) => this.mapStatus(s)) ?? [],

    // JSON string → parsed object/array
    contingencyPlan: row.contingency_plan
      ? JSON.parse(row.contingency_plan)
      : [],

    // Nested contacts
    contacts: row.contacts?.map((c: any) => this.mapContact(c)) ?? []
  };
}

private mapStatus(row: any): SystemStatus {
  return {
    id: row.id,
    system_id: row.system_id,
    status: row.status,
    checkedAt: row.checked_at,
    message: row.message
  };
}

private mapContact(row: any): Contact {
  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    email: row.email
  };
}




}
