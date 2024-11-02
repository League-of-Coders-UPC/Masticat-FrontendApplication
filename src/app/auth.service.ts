import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { StorageService } from './storage.service';
import { AuthStateService } from './services/auth-state-service.service';

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

  login(email: string, password: string): Observable<any> {
    return of({ token: 'mock-jwt-token' }).pipe(
      tap(response => {
        this.storageService.setItem('token', response.token);
        // Actualizamos el estado del usuario en el AuthStateService
        this.authStateService.setUser({ token: "ABC", firstName: "Diego", lastName: "Gonzales", email: "dgon@gmail.com", birthDate: new Date("2000-10-05"), phoneNumber: "999999999", imageUrl: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"});
      })
    );
  }

  register(firstName: string, lastName: string, email: string, password: string): Observable<any> {
    return of({ success: true }).pipe(
      tap(() => {
        //this.authStateService.setUser({ firstName, lastName, email });
      })
    );
  }

  logout(): void {
    this.storageService.removeItem('token');
    this.authStateService.clearUser();
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getItem('token');
  }

  loginToken(token: string): Observable<any> {
    return of({ token: 'mock-jwt-token' }).pipe(
      tap(response => {
        this.authStateService.setUser({ token: "ABC", firstName: "Diego", lastName: "Gonzales", email: "dgon@gmail.com", birthDate: new Date("2000-10-05"), phoneNumber: "999999999", imageUrl: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://fdczvxmwwjwpwbeeqcth.supabase.co/storage/v1/object/public/images/50dab922-5d48-4c6b-8725-7fd0755d9334/3a3f2d35-8167-4708-9ef0-bdaa980989f9.png"});
      })
    );
  }
}
