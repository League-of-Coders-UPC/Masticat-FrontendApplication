import { Component, Input } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';

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
export class LoginComponent {
  @Input() username: string = '';
  @Input() password: string = '';
  isErrorForm: { username?: string; password?: string } = {};

  constructor(private authService: AuthService, private router: Router) { }

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
      this.authService.login(this.username, this.password, this.router);
    }
  }
}
