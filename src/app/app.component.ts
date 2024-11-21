import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { jwtDecode } from "jwt-decode";
import { AuthStateService } from './services/auth-state-service.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Masticat-FrontendApplication';
  isLoading = false;

  constructor(private authService: AuthService, private authStateService: AuthStateService) {}

  ngOnInit(): void {
    const token: any = localStorage.getItem('token');
    console.log(token);

    if (token) {
      const decoded: any = jwtDecode(token);
      this.isLoading = true;
      this.authService.loginToken(decoded.user_id).subscribe(
        (response) => {
          this.authStateService.setUser({
              id: response[0].id,
              token: token,
              firstName: response[0].first_name,
              lastName: response[0].last_name,
              email: response[0].user.email,
              birthDate: response[0].birth_date,
              phoneNumber: response[0].phone_number,
              imageUrl: response[0].image_url
            });
          this.isLoading = false;
          
        },
        () => {
          this.isLoading = false;
          localStorage.removeItem('token');
        }
      );
    }
  }
}
