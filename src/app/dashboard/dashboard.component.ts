import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pet, PetService } from '../pet.service';
import { DeviceService } from '../device.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AddPetDialogComponent } from '../add-pet-dialog/add-pet-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { PetListComponent } from '../pet-list/pet-list.component';
import { DeviceListComponent } from '../device-list/device-list.component';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    PetListComponent,
    DeviceListComponent,
    MatMenuModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  pets: Pet[] = [];
  devices: any[] = [];

  constructor(
    private petService: PetService,
    private deviceService: DeviceService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPets();
    this.loadDevices();
  }

  loadPets(): void {
    this.petService.getPets().subscribe(
      pets => this.pets = pets,
      error => console.error('Error loading pets', error)
    );
  }

  loadDevices(): void {
    this.deviceService.getDevices().subscribe(
      devices => this.devices = devices,
      error => console.error('Error loading devices', error)
    );
  }

  openAddPetDialog(): void {
    const dialogRef = this.dialog.open(AddPetDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.petService.addPet(result).subscribe(
          () => {
            this.loadPets();
          },
          (error) => {
            console.error('Error adding pet', error);
          }
        );
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
