import { PetService } from './../pet.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { MatOption, MatSelect, MatSelectModule, MatSelectTrigger } from '@angular/material/select';

@Component({
  selector: 'app-add-pet',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule,
    MatSelect,
    MatOption,
    MatSelectTrigger,
    MatSelectModule, 
    FormsModule, 
    ReactiveFormsModule
  ],
  templateUrl: './add-pet.component.html',
  styleUrl: './add-pet.component.scss'
})
export class AddPetComponent {
  @Output() invertShowPopupAddPet = new EventEmitter<void>();
  @Output() addPet = new EventEmitter<any>();

  pet = {
    uuid: "",
    name: '',
    userUuid: '',
    breed: '',
    species: '',
    birthdate: "2000-01-01",
    weight: 1,
    age: 1,
    imageUrl: ''
  };

  speciesList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  breedList: string[] = ['Dog', 'Cat'];

  isErrorForm: any = {};

  constructor(private authService: AuthService, private router: Router, private PetService: PetService) { }

  validateForm(): boolean {
    this.isErrorForm = {};

    if (!this.pet.name) {
      this.isErrorForm.name = 'Name is required.';
    }

    if (!this.pet.breed) {
      this.isErrorForm.breed = 'Breed is required.';
    }

    if (!this.pet.species) {
      this.isErrorForm.species = 'At least one species must be selected.';
    }

    if (this.pet.weight == 0) {
      this.isErrorForm.weight = 'Weight is required.';
    }

    if (this.pet.age == 0) {
      this.isErrorForm.age = 'Age is required.';
    }

    if (!this.pet.imageUrl) {
      this.isErrorForm.imageUrl = 'Image URL is required.';
    }

    return Object.keys(this.isErrorForm).length === 0;
  }

  onSubmit(): void {
    if(this.validateForm()) {
      /*
      this.PetService.addPet(this.pet).subscribe(
        (response: any) => {
          
        },
        (error: any) => {

        }
      );
    */
      this.addPet.emit(this.pet);
      this.invertShowPopupAddPet.emit();
    }

  }

}
