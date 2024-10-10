import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pet, PetService } from '../pet.service';
import { AuthService } from '../auth.service';
import {Router, RouterLink} from '@angular/router';
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
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  gifPath: string = '/assets/catcam.gif';
  pets: Pet[] = [];

  // Aquí se inicializa el array de dispositivos
  devices: any[] = [
    { name: 'Device 1', id: 'h1h1h1h1h1' },
    { name: 'Device 2', id: 'h2h2h2h2h2' }
  ];

  constructor(
    private petService: PetService,
    private dialog: MatDialog,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadPets();
    // Como ya tenemos los dispositivos definidos en el componente, no necesitamos cargar nada aquí
  }

  loadPets(): void {
    this.petService.getPets().subscribe(
      pets => this.pets = pets,
      error => console.error('Error al cargar mascotas', error)
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
    // Aquí podrías agregar la lógica para agregar más dispositivos
    console.log('Agregar dispositivo');
  }
}
