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
  selector: 'app-edit-user',
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
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.scss'
})
export class EditUserComponent {
  @Output() invertShowPopupModifyUser = new EventEmitter<void>();
  @Output() updatedUser = new EventEmitter<any>();

  @Input() selectedUser: any;

  user = {
    token: '',
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    phoneNumber: "",
    imageUrl: "",
  };

  speciesList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  breedList: string[] = ['Dog', 'Cat'];

  isErrorForm: any = {};

  constructor(private authService: AuthService, private router: Router, private PetService: PetService) { }

  ngOnInit() {
    if (this.selectedUser) {
      this.user = { ...this.selectedUser }; 
      this.user.birthDate = this.getFormatDate(new Date(this.user.birthDate));
    }
  }
  validateForm(): boolean {
    this.isErrorForm = {};

    if (!this.user.firstName) {
      this.isErrorForm.name = 'First Name is required.';
    }

    if (!this.user.lastName) {
      this.isErrorForm.breed = 'Last Name is required.';
    }

    if (!this.user.email) {
      this.isErrorForm.email = 'Email is required.';
    } else if (!this.user.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      this.isErrorForm.email = 'Email is not valid.';
    }

    if (!this.user.birthDate) {
      this.isErrorForm.birthDate = 'Birth Date is required';
    }


    if (!this.user.phoneNumber) {
      this.isErrorForm.phoneNumber = 'Phone Number is required.';
    }

    if (!this.user.imageUrl) {
      this.isErrorForm.imageUrl = 'Image URL is required.';
    }

    return Object.keys(this.isErrorForm).length === 0;
  }

  getFormatDate(date: Date){
    const day = ("0" + date.getDate()).slice(-2);   // Obtiene el día y agrega un 0 si es necesario
    const month = ("0" + (date.getMonth() + 1)).slice(-2);  // Obtiene el mes (agrega +1 porque los meses empiezan en 0)
    const year = date.getFullYear();

    return  `${year}-${month}-${day}`;
  };


  onSubmit(): void {
    if(this.validateForm()) {
      /*
        this.PetService.updatePet(this.pet.uuid, this.pet).subscribe(
          (response: any) => {
            
          },
          (error: any) => {

          }
        );
      */
      this.updatedUser.emit(this.user);
    }
  }

}
