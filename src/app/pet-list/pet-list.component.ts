import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pet, PetService } from '../pet.service';
import { EditPetDialogComponent } from '../edit-pet-dialog/edit-pet-dialog.component';

import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule
  ],
  templateUrl: './pet-list.component.html',
  styleUrl: './pet-list.component.scss',
})
export class PetListComponent {
  @Input() pets: Pet[] = [];

  constructor(private petService: PetService, private dialog: MatDialog) {}

  editPet(pet: Pet): void {
    const dialogRef = this.dialog.open(EditPetDialogComponent, {
      data: { ...pet }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.petService.updatePet(pet.id, result).subscribe(
          () => {
            const index = this.pets.findIndex((p) => p.id === pet.id);
            if (index !== -1) {
              this.pets[index] = { ...pet, ...result };
            }
          },
          (error) => {
            console.error('Error updating pet', error);
          }
        );
      }
    });
  }

  deletePet(id: number): void {
    if (confirm('Are you sure you want to delete this pet?')) {
      this.petService.deletePet(id).subscribe(
        () => {
          this.pets = this.pets.filter((pet) => pet.id !== id);
        },
        (error) => {
          console.error('Error deleting pet', error);
        }
      );
    }
  }
}
