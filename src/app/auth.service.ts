import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) { }

  login(email: string, password: string): Observable<any> {
    // For now, we'll just return a mock successful login
    return of({ token: 'mock-jwt-token' }).pipe(
      tap(response => {
        this.storageService.setItem('token', response.token);
      })
    );
  }

  logout(): void {
    this.storageService.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.storageService.getItem('token');
  }
}