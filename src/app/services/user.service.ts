import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface User {
  "user_id": string;
  "first_name": string;
  "last_name": string;
  "birth_date": string;
  "phone_number": string;
  "image_url": string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = `${environment.apiUrl}/user-details`;

  constructor(private http: HttpClient) { }

  updateUser(id: string, user: User): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}/`, user);
  }


}
