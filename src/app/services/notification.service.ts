import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.apiUrl}/notifications`;

  constructor(private http: HttpClient) { }

  getNotifications(id: string): Observable<any> {

    return this.http.get<any>(this.apiUrl + "/?user_id=" + id);
    return this.http.get<any>(this.apiUrl + "/");

  }
}
