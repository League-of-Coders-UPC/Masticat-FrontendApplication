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
import { AuthStateService } from '../services/auth-state-service.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-edit-pet',
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
  templateUrl: './edit-pet.component.html',
  styleUrl: './edit-pet.component.scss'
})
export class EditPetComponent {
  @Output() invertShowPopupEditPet = new EventEmitter<void>();
  @Output() editPet = new EventEmitter<any>();
  @Input() selectedPet: any;

  user: any = null;

  pet = {
    uuid: '',
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

  constructor(private authService: AuthService, private router: Router, private PetService: PetService, private authStateService: AuthStateService) { }

  ngOnInit() {
    if (this.selectedPet) {
      this.pet = { ...this.selectedPet }; 
    }

    this.authStateService.user$.subscribe(user => {
      this.user = user;
    });
  }
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

    if (this.pet.weight == 0 || this.pet.weight == null) {
      this.isErrorForm.weight = 'Weight is required.';
    }

    if (this.pet.age == 0 || this.pet.age == null) {
      this.isErrorForm.age = 'Age is required.';
    }

    if (!this.pet.imageUrl) {
      this.isErrorForm.imageUrl = 'Image URL is required.';
    }

    return Object.keys(this.isErrorForm).length === 0;
  }

  onSubmit(): void {
    if(this.validateForm()) {
      const decoded: any = jwtDecode(this.user.token);

      this.PetService.updatePet(this.pet.uuid, {
        "user_id": decoded.user_id,
        "name": this.pet.name,
        "breed": this.pet.breed,
        "species": this.pet.species,
        "birth_date": this.pet.birthdate,
        "weight": this.pet.weight,
        "age": this.pet.age,
        "image_url": this.pet.imageUrl
      }).subscribe(
        (response: any) => {
          this.editPet.emit(this.pet);
          this.invertShowPopupEditPet.emit();
        },
        (error: any) => {
          alert(error)
        }
      );
    }

  }

}
