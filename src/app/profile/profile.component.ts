import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule, DatePipe} from "@angular/common";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {Router} from "@angular/router";
import { AuthStateService } from '../services/auth-state-service.service';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    MatSelect,
    MatOption,
    MatIcon,
    MatToolbar,
    MatFormField,
    MatLabel,
    EditUserComponent,
    CommonModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any = null;
  showPopupEditUser: boolean = false;
  constructor(private router: Router, private authStateService: AuthStateService) {}

  ngOnInit(): void {
    this.authStateService.user$.subscribe(user => {
      this.user = user;
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  getFormatDate(date: Date){
    const day = ("0" + date.getDate()).slice(-2);   // Obtiene el día y agrega un 0 si es necesario
    const month = ("0" + (date.getMonth() + 1)).slice(-2);  // Obtiene el mes (agrega +1 porque los meses empiezan en 0)
    const year = date.getFullYear();

    return  `${day}-${month}-${year}`;
  };

  invertShowPopupModifyUser(): void {
    console.log(1);
    this.showPopupEditUser = !this.showPopupEditUser;
  }

  updatedUser(userEdit: any): void {
    let userEditCopy = userEdit;
    userEditCopy.birthDate = new Date(userEditCopy.birthDate);

    this.authStateService.setUser(userEditCopy);
    this.authStateService.user$.subscribe(user => {
      this.user = user;
    });

    this.invertShowPopupModifyUser();
  }

}
