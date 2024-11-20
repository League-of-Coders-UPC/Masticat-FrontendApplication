import { Component, Input } from '@angular/core';
import { MatCard, MatCardActions, MatCardContent, MatCardTitle } from "@angular/material/card";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    FormsModule,
    MatButton,
    MatCardContent,
    MatCheckbox,
    MatFormField,
    MatInput,
    MatLabel,
    MatCardActions,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Input() FirstName: string = '';
  @Input() LastName: string = '';
  @Input() email: string = '';
  @Input() password: string = '';
  @Input() confirmPassword: string = '';
  @Input() username: string = '';
  @Input() phoneNumber: string = '';
  @Input() birthDate: string = '';


  isErrorForm: { email?: string; password?: string; confirmPassword?: string; FirstName?: string; LastName?: string; Username?: string; phoneNumber?: string; birthDate?: string} = {};

  constructor(private authService: AuthService, private router: Router) {}

  validateForm(): boolean {
    this.isErrorForm = {}; // Reset errors

    if (!this.FirstName) {
      this.isErrorForm.FirstName = 'First name is required.';
    }

    if (!this.LastName) {
      this.isErrorForm.LastName = 'Last name is required.';
    }

    if (!this.email) {
      this.isErrorForm.email = 'Email is required.';
    } else if (!this.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      this.isErrorForm.email = 'Please enter a valid email.';
    }

    if (!this.password) {
      this.isErrorForm.password = 'Password is required.';
    }

    if (!this.confirmPassword) {
      this.isErrorForm.confirmPassword = 'Repeat password.';
    } else if (this.password !== this.confirmPassword) {
      this.isErrorForm.confirmPassword = 'Passwords do not match.';
    }
    
    if (!this.username) {
      this.isErrorForm.Username = 'Username is required.';
    } else if (this.username.length <= 5) {
      this.isErrorForm.Username = 'Username must be more than 5 characters.';
    }
  
    if (!this.phoneNumber) {
      this.isErrorForm.phoneNumber = 'Phone number is required.';
    } else if (!/^\d{9}$/.test(this.phoneNumber)) {
      this.isErrorForm.phoneNumber = 'Phone number must be 9 digits and contain only numbers.';
    }

    if (!this.birthDate) {
      this.isErrorForm.birthDate = 'Birth Date is required';
    }

    return Object.keys(this.isErrorForm).length === 0;
  }

  onSubmit() {
    console.log(this.birthDate);

    if (this.validateForm()) {
      this.authService.register(this.FirstName, this.LastName, this.username, this.email, this.password, this.phoneNumber, this.birthDate).subscribe(
        () => {
          alert("You have successfully registered.")
          this.router.navigate(['/login']);
        },
        (error) => {
          alert('Registration failed, please try again.');
          console.error('Error during registration:', error);
        }
      );
    }
  }
}
