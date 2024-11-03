import { PetService } from './../pet.service';
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
import { AddPetComponent } from '../add-pet/add-pet.component';
import { EditPetComponent } from '../edit-pet/edit-pet.component';
import { AddDeviceComponent } from '../add-device/add-device.component';

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
    SidebarComponent,
    AddPetComponent,
    EditPetComponent,
    AddDeviceComponent
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
  selectedPet: any = {};

  showPopupAddPet: boolean = false;
  showPopupEditPet: boolean = false;
  showPopupAddDevice: boolean = false;
  showSidebarResponsive: boolean = false;

  constructor(
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router,
    private deviceService: DeviceService,
    private authStateService: AuthStateService,
    private petService: PetService
  ) { }

  ngOnInit(): void {
    this.authStateService.user$.subscribe(user => {
      this.user = user;
    });

    
    this.getDevices();
    this.getPets();
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

  getDevices(): void {
    /*
      this.deviceService.getDevices("token").subscribe(
        (response: any) => {
          this.devices = response;
        }
      );
    */

    this.devices = [
      { uuid: '1', petUuid: '1', serialNumber: 'h1h1h1h1h1', status: 'Online', battery: 10, food: 40, water: 90},
      { uuid: '2', petUuid: '2', serialNumber: 'h2h2h2h2h2', status: 'Online', battery: 50, food: 30, water: 40},
    ];

    this.selectedDevice = this.devices[0];
  }
  getPets(): void {
    /*
      this.petService.getPets("token").subscribe(
        (response: any) => {
          this.pets = response;
        }
      );
    */

      this.pets = [
        { uuid: '1', userUuid: '1', name: 'Luna', breed: 'Dog', species: 'Mushroom', birthdate: "2020-10-10", weight: 5, age: 3, imageUrl: "1"},
        { uuid: '2', userUuid: '1', name: 'Clara', breed: 'Cat', species: 'Mushroom', birthdate: "2021-10-15", weight: 4, age: 3, imageUrl: "1"},
      ];
  }
  changeDevice(device: any): void {
    this.selectedDevice = device;
    this.showSidebarResponsive = false;
  }
  invertShowPopupAddPet(): void {
    this.showPopupAddPet = !this.showPopupAddPet;
  }
  addPet(newPet: any): void{
    this.pets.push(newPet);
  }
  
  editPet(updatedPet: any): void {
    const index = this.pets.findIndex(pet => pet.uuid === updatedPet.uuid);
    console.log(updatedPet, index);

    if (index !== -1) {
      this.pets[index] = updatedPet;
    }
  }
  invertShowPopupEditPet(): void {
    this.showPopupEditPet = !this.showPopupEditPet;
    this.selectedPet = {};
  }

  selectEditPet(pet: any): void {
    this.selectedPet = pet;
    this.showPopupEditPet = true;
  }

  invertShowPopupAddDevice(): void {
    this.showPopupAddDevice = !this.showPopupAddDevice;
  }

  addDevice(newDevice: any): void{
    this.devices.push(newDevice);
  }
  
  openSidebar(): void {
    this.showSidebarResponsive = true;
  }

  closeSidebar(): void {
    this.showSidebarResponsive = false;
  }
}
