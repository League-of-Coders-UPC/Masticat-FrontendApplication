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
import { jwtDecode } from "jwt-decode";
import { NotificationService } from '../services/notification.service';
import { HabitstionService } from '../services/habits.service';

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
  isLoading = true;

  notifications: any = [];
  habits: any = [];

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
    private petService: PetService,
    private notificationService: NotificationService,
    private habitsService: HabitstionService
  ) { }

  ngOnInit(): void {
    this.authStateService.user$.subscribe(user => {
      this.user = user;
    });

    
    this.getDevices();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDevice']) {
      const prevValue = changes['selectedDevice'].previousValue;
      const currentValue = changes['selectedDevice'].currentValue;
    }
  }

  openNotification(): void {
    const dialogRef = this.dialog.open(NotificationComponent, {
      width: '400px',
      data: { notifications: this.notifications } 
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
    localStorage.removeItem('token');
    this.authStateService.clearUser();
    this.router.navigate(['/login']);
  }

  getHabits(): void {
    this.habits = [];
    if(this.selectedDevice) {
      this.habitsService.getHabits(this.selectedDevice.uuid).subscribe(
        (response: any) => {
          this.habits = response;
          this.isLoading = false;
        }
      );
    } else {
      this.isLoading = false;
    }
  }

  getDevices(): void {
    const decoded: any = jwtDecode(this.user.token);
    this.deviceService.getDevices(decoded.user_id).subscribe(
      (response: any) => {
        //this.devices = response;
        response.forEach((device: any) => {
          this.devices.push({
            uuid: device.id,
            serialNumber: device.serial_number,
            status: device.status,
            pet: {
              uuid: device.pet.id,
              name: device.pet.name,
              userUuid: device.pet.user.id,
              breed: device.pet.breed,
              species: device.pet.species,
              birthdate: device.pet.birth_date,
              weight: device.pet.weight,
              age: device.pet.age,
              imageUrl: device.pet.image_url
            },
            battery: device.battery_quantity,
            food: device.food_quantity / device.food_limit * 100,
            water: device.water_quantity / device.water_limit * 100,
          })
        });
        this.selectedDevice = this.devices[0];
        this.getNotifications();
      }
    );
  }
  getNotifications(): void {
    const decoded: any = jwtDecode(this.user.token);
    this.notificationService.getNotifications(decoded.user_id).subscribe(
      (response: any) => {
        this.notifications = response;
        this.getHabits();
      }
    );
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
        
      ];
  }
  changeDevice(device: any): void {
    this.selectedDevice = device;
    this.showSidebarResponsive = false;
    if(this.selectedDevice.uuid != "") {
      this.getHabits();
    }
  }
  invertShowPopupAddPet(): void {
    this.showPopupAddPet = !this.showPopupAddPet;
  }
  addPet(newPet: any): void{
    this.selectedDevice = {
      uuid: newPet.id,
      serialNumber: newPet.serial_number,
      status: newPet.status,
      pet: {
        uuid: newPet.pet.id,
        name: newPet.pet.name,
        userUuid: newPet.pet.user.id,
        breed: newPet.pet.breed,
        species: newPet.pet.species,
        birthdate: newPet.pet.birth_date,
        weight: newPet.pet.weight,
        age: newPet.pet.age,
        imageUrl: newPet.pet.image_url
      },
      battery: newPet.battery_quantity,
      food: newPet.food_quantity / newPet.food_limit * 100,
      water: newPet.water_quantity / newPet.water_limit * 100,
    }

    this.devices[this.devices.length - 1] = this.selectedDevice;
  }
  
  editPet(updatedPet: any): void {
    this.selectedDevice.pet = updatedPet;
    console.log(updatedPet);
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
    if(this.devices.length !== 0) {
      this.showPopupAddDevice = !this.showPopupAddDevice;
    } else {
      this.showPopupAddDevice = false;
    }
  }

  addDevice(newDevice: any): void{
    this.devices.push(newDevice);
    if(this.devices.length == 1) {
      this.selectedDevice = newDevice;
      this.showPopupAddDevice = true;
    }
  }
  
  openSidebar(): void {
    this.showSidebarResponsive = true;
  }

  closeSidebar(): void {
    this.showSidebarResponsive = false;
  }
}
