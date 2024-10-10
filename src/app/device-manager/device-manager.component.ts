import { Component, OnInit } from '@angular/core';
import { DeviceService } from '../device.service';

@Component({
  selector: 'app-device-manager',
  templateUrl: './device-manager.component.html',
  standalone: true,
  styleUrls: ['./device-manager.component.scss']
})
export class DeviceManagerComponent implements OnInit {
  devices: any[] = [];

  constructor(private deviceService: DeviceService) {}

  ngOnInit(): void {
    this.loadDevices();
  }

  loadDevices(): void {
    this.deviceService.getDevices().subscribe(
      (devices) => {
        this.devices = devices;
      },
      (error) => {
        console.error('Error al cargar dispositivos', error);
      }
    );
  }

  addDevice(): void {
    console.log('Agregar nuevo dispositivo');
  }
}
