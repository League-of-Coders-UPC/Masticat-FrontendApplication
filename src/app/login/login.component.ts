import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../services/auth-state-service.service';
import { StorageService } from '../storage.service';
import { jwtDecode } from "jwt-decode";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Input() username: string = '';
  @Input() password: string = '';
  isErrorForm: { username?: string; password?: string } = {};
  user: any = null;
  isLoading: boolean = false;
  constructor(private authService: AuthService, private router: Router, private authStateService: AuthStateService, private storageService: StorageService) { }

  ngOnInit() {
    this.authStateService.user$.subscribe(user => {
      this.user = user;
      if(user?.token != "") {
        this.router.navigate(["/dashboard"]);
      }
    });
  }

  validateForm(): boolean {
    this.isErrorForm = {};

    if (!this.username) {
      this.isErrorForm.username = 'Username is required.';
    } else if (this.username.length < 5) {
      this.isErrorForm.username = 'Username must be greater than 5 characters.';
    }

    if (!this.password) {
      this.isErrorForm.password = 'Password is required.';
    }

    return Object.keys(this.isErrorForm).length === 0;
  }

  onSubmit(): void {
    
    if (this.validateForm()) {
      if(this.isLoading) {
        return;
      }
      this.isLoading = true;
      this.authService.login(this.username, this.password, this.isLoading).subscribe(
        (response) => {
          if (response.access) {
            this.storageService.setItem('token', response.access);
            const decoded: any = jwtDecode(response.access);
  
            this.authService.loginToken(decoded.user_id).subscribe(
              (profileResponse) => {
                this.authStateService.setUser({
                  id: profileResponse[0].id,
                  token: response.access,
                  firstName: profileResponse[0].first_name,
                  lastName: profileResponse[0].last_name,
                  email: profileResponse[0].user.email,
                  birthDate: profileResponse[0].birth_date,
                  phoneNumber: profileResponse[0].phone_number,
                  imageUrl: profileResponse[0].image_url
                });
                this.router.navigate(["/dashboard"])
              },
              (error) => {
                this.isLoading = false;
                console.error('Error en la solicitud del perfil:', error);
              }
            );
          }
        },
        (error) => {
          alert(error.error.detail);
        }
      );
    }
  }
}
