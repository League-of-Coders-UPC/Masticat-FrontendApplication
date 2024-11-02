import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';

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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.isLoading = true;
      this.authService.loginToken(token).subscribe(
        () => {
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
