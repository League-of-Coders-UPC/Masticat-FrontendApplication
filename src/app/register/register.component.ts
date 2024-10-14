import { Component, Input } from '@angular/core';
import {MatCard, MatCardActions, MatCardContent, MatCardTitle} from "@angular/material/card";
import { FormsModule } from "@angular/forms";
import { MatButton } from "@angular/material/button";
import { MatCheckbox } from "@angular/material/checkbox";
import { MatFormField, MatLabel } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { AuthService } from "../auth.service";
import { Router } from "@angular/router";

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
    MatCardActions
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  FirstName: string = '';
  LastName: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

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
