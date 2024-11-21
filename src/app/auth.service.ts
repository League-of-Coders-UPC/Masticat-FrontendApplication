import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { StorageService } from './storage.service';
import { AuthStateService } from './services/auth-state-service.service';
import { Router } from '@angular/router';

interface RegisterResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private authStateService: AuthStateService // Inyectamos el AuthStateService
  ) { }

  login(username: string, password: string,isLoading: boolean): Observable<any> {
    const payload = {
      username,
      password
    }
    isLoading = true;
    return this.http.post<any>(this.apiUrl + "/token/", payload);
  }

  register(firstName: string, lastName: string, username: string, email: string, password: string, phoneNumber: string, birthDate: string): Observable<any> {
    const payload = {
      username,
      email,
      password,
      role: 'admin', 
      first_name: firstName,
      last_name: lastName,
      birth_date: birthDate,
      phone_number: phoneNumber,
      image_url: 'https://photosnow.org/wp-content/uploads/2024/04/no-dp-mood-off_9.jpg', 
    };

    return this.http.post<any>(this.apiUrl + "/signup/", payload);
  }

  logout(): void {
    this.storageService.removeItem('token');
    localStorage.removeItem('token');
    this.authStateService.clearUser();
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getItem('token');
  }

  loginToken(token: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/user-details/?user_id=" + token);
  }

}
