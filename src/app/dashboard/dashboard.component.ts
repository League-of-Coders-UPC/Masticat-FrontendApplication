import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pet, PetService } from '../pet.service';
import { DeviceService } from '../device.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AddPetDialogComponent } from '../add-pet-dialog/add-pet-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  gifPath: string = '/assets/catcam.gif';
  pets: Pet[] = [];
  devices: any[] = [];

  constructor(
    private petService: PetService,
    private deviceService: DeviceService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadPets();
    this.loadDevices();
  }

  loadPets(): void {
    this.petService.getPets().subscribe(
      (pets) => {
        this.pets = pets;
        console.log('Mascotas cargadas:', this.pets);
      },
      (error) => console.error('Error al cargar mascotas', error)
    );
  }

  loadDevices(): void {
    this.deviceService.getDevices().subscribe(
      (devices) => (this.devices = devices),
      (error) => console.error('Error al cargar dispositivos', error)
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
            console.error('Error al agregar mascota', error);
          }
        );
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  addDevice(): void {
    // Implementar lógica para agregar dispositivo
    console.log('Agregar dispositivo');
  }
}
