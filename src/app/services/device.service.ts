import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Device {
  id: string;
  pet_id: string;
  serial_number: string;
  status: string;
  food_percentage: number;
  water_percentage: number;
  battery_percentage: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = `${environment.apiUrl}/devices/`;

  constructor(private http: HttpClient) { }

  getDevices(token: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + "?user_id=" + token);
  }

  addDevice(device: Device): Observable<Device> {
    return this.http.post<Device>(this.apiUrl, device);
  }

  updateDevice(uuid: number, device: Device): Observable<Device> {
    return this.http.put<Device>(`${this.apiUrl}/${uuid}`, device);
  }

  deleteDevice(uuid: number): Observable<Device> {
    return this.http.delete<Device>(`${this.apiUrl}/${uuid}`);
  }
}
