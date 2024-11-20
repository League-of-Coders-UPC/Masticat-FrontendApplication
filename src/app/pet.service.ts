import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Pet {
  user_id: string;
  name: string;
  breed: string;
  species: string;
  birth_date: string;
  weight: number;
  age: number;
  image_url?: string; 
}

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = `${environment.apiUrl}/pets/`;

  constructor(private http: HttpClient) { }

  getPets(userUuid: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl + "/" + userUuid);
  }

  addPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  updatePet(uuid: string, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}${uuid}/`, pet);
  }

  deletePet(uuid: string): Observable<Pet> {
    return this.http.delete<Pet>(`${this.apiUrl}/${uuid}`);
  }
}