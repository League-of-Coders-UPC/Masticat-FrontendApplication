import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabitstionService {
  private apiUrl = `${environment.apiUrl}/usage-logs`;

  constructor(private http: HttpClient) { }

  getHabits(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/");

    return this.http.get<any>(this.apiUrl + "/?user_id=" + id + "/");
  }
}
