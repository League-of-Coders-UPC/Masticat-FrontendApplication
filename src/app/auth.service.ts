import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { StorageService } from './storage.service';
import { AuthStateService } from './services/auth-state-service.service';
import { jwtDecode } from "jwt-decode";
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

  login(username: string, password: string, router: Router): any {
    const payload = {
      username,
      password
    }
    this.http.post<any>(this.apiUrl + "/token/", payload).subscribe(
      (response) => {
        if (response.access) {
          this.storageService.setItem('token', response.access);
          const decoded: any = jwtDecode(response.access);

          this.http.get<any>(this.apiUrl + "/user-details/?user_id=" + decoded.user_id).subscribe(
            (profileResponse) => {
              this.authStateService.setUser({
                id: profileResponse[0].id,
                token: response.access,
                firstName: profileResponse[0].first_name,
                lastName: profileResponse[0].last_name,
                email: profileResponse[0].user.email,
                birthDate: profileResponse[0].birth_date,
                phoneNumber: profileResponse[0].phone_number,
                imageUrl: profileResponse[0].image_url
              });
              router.navigate(["/dashboard"])
            },
            (error) => {
              console.error('Error en la solicitud del perfil:', error);
            }
          );
        }
      },
      (error) => {
        alert(error.error.detail);
      }
    );
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
    this.authStateService.clearUser();
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getItem('token');
  }

  loginToken(token: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "/user-details/?user_id=" + token);
  }
}
