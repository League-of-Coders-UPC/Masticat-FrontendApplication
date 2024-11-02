import { AuthStateService } from './../services/auth-state-service.service';
import { DeviceService } from './../services/device.service';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { AddPetDialogComponent } from '../add-pet-dialog/add-pet-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import {NotificationComponent} from "../notification/notification.component";
import {FeedingHabitsChartComponent} from "./feeding-habits-chart/feeding-habits-chart.component";
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    RouterLink,
    FeedingHabitsChartComponent,
    SidebarComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  gifPath: string = '/assets/catcam.gif';
  pets: any[] = [];
  devices: any[] = [];
  selectedDevice: any = {};
  user: any = null;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private deviceService: DeviceService,
    private authStateService: AuthStateService
  ) { }

  ngOnInit(): void {
    this.authStateService.user$.subscribe(user => {
      this.user = user;
    });

    this.pets = [
      {
        name: 'Luna',
        age: 5,
        weight: 4.5
      }
    ];
    
    this.getDevices();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDevice']) {
      const prevValue = changes['selectedDevice'].previousValue;
      const currentValue = changes['selectedDevice'].currentValue;
      console.log('Objeto cambiado:', prevValue, '->', currentValue);
    }
  }

  openNotification(): void {
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Notificación cerrada con resultado:', result);
      }
    });
  }

  openAddPetDialog(): void {
    const dialogRef = this.dialog.open(AddPetDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.pets.push(result);
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addDevice(): void {
    console.log('Agregar dispositivo');
  }

  getDevices(): void {
    /*
      this.deviceService.getDevices("token").subscribe(
        (response: any) => {
          this.devices = response;
        }
      );
    */

    this.devices = [
      { uuid: '1', petUuid: '1', serialNumber: 'h1h1h1h1h1', status: 'Online', battery: 10, food: 40, water: 90, userId: 1},
      { uuid: '2', petUuid: '2', serialNumber: 'h2h2h2h2h2', status: 'Online', battery: 10, food: 40, water: 90, userId: 1},
    ];

    this.selectedDevice = this.devices[0];
  }

  changeDevice(device: any): void {
    this.selectedDevice = device;
  }
}
