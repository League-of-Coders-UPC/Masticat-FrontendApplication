import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule, DatePipe} from "@angular/common";
import {MatFormField, MatLabel, MatOption, MatSelect} from "@angular/material/select";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {Router} from "@angular/router";
import { AuthStateService } from '../services/auth-state-service.service';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { UserService } from '../services/user.service';
import { jwtDecode } from "jwt-decode";

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
  constructor(private router: Router, private authStateService: AuthStateService, private userService: UserService) {}

  ngOnInit(): void {
    this.authStateService.user$.subscribe(user => {
      this.user = user;
      this.user.birthDate = new Date(this.user.birthDate);
    });
    console.log(this.user);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  getFormatDate(date: Date){
    const day = ("0" + date.getDate()).slice(-2);   // Obtiene el día y agrega un 0 si es necesario
    const month = ("0" + (date.getMonth() + 1)).slice(-2);  // Obtiene el mes (agrega +1 porque los meses empiezan en 0)
    const year = date.getFullYear();

    return  `${year}-${month}-${day}`;
  };

  invertShowPopupModifyUser(): void {
    console.log(1);
    this.showPopupEditUser = !this.showPopupEditUser;
  }

  updatedUser(userEdit: any): void {
    let userEditCopy = userEdit;
    userEditCopy.birthDate = new Date(userEditCopy.birthDate);
    const decoded: any = jwtDecode(userEditCopy.token);

    this.userService.updateUser(userEdit.id, {
      "user_id": decoded.user_id,
      "first_name": userEdit.firstName,
      "last_name": userEdit.lastName,
      "birth_date": this.getFormatDate(userEdit.birthDate),
      "phone_number": userEdit.phoneNumber,
      "image_url": userEdit.imageUrl,
    }).subscribe(
      (response: any) => {
        console.log(response);
        this.authStateService.setUser({
          id: userEditCopy.id,
          token: userEditCopy.token,
          firstName: userEditCopy.firstName,
          lastName: userEditCopy.lastName,
          email: userEditCopy.email,
          birthDate: userEdit.birthDate,
          phoneNumber: userEditCopy.phoneNumber,
          imageUrl: userEditCopy.imageUrl
        });
        this.invertShowPopupModifyUser();
      },
      (error: any) => {

      }
    );
  }
  
}

