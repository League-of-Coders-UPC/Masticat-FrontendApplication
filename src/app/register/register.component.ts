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
  isErrorForm: { email?: string; password?: string; confirmPassword?: string; FirstName?: string; LastName?: string } = {};

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

    return Object.keys(this.isErrorForm).length === 0;
  }

  onSubmit() {
    if (this.validateForm()) {
      this.authService.register(this.FirstName, this.LastName, this.email, this.password).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Error during registration:', error);
          alert('Registration failed, please try again.');
        }
      );
    }
  }
}
