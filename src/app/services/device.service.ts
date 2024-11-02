import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Device {
  uuid: string;
  petUuid: string;
  serialNumber: string;
  status: string;
  battery: number;
  food: number;
  water: number;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private apiUrl = `${environment.apiUrl}/devices`;

  constructor(private http: HttpClient) { }

  getDevices(token: string): Observable<Device[]> {
    return this.http.get<Device[]>(this.apiUrl + "/" + token);
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
