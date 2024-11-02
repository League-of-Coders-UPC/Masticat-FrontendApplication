import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface User { 
  token: string; 
  firstName: string; 
  lastName: string; 
  email: string; 
  birthDate: Date; 
  phoneNumber: string; 
  imageUrl : string
}

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  // Definimos el estado del usuario como un BehaviorSubject
  private userSubject = new BehaviorSubject<User | null>(null);
  
  // Exponemos el observable para que otros componentes puedan suscribirse a él
  user$: Observable<User | null> = this.userSubject.asObservable();

  // Método para actualizar el estado del usuario
  setUser(user: User): void {
    this.userSubject.next(user);
  }

  // Método para limpiar el estado del usuario (p.ej., en logout)
  clearUser(): void {
    this.userSubject.next(null);
  }
}
