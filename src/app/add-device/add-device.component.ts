import { DeviceService } from './../services/device.service';
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
  selector: 'app-add-device',
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
  templateUrl: './add-device.component.html',
  styleUrl: './add-device.component.scss'
})
export class AddDeviceComponent {
  @Output() invertShowPopupAddDevice = new EventEmitter<void>();
  @Output() addDevice = new EventEmitter<any>();

  device = {
    uuid: '',
    serialNumber: "",
    status: '',
    petUuid: '',
    battery: 0,
    food: 0,
    water: 0,
  };


  isErrorForm: any = {};

  constructor(private authService: AuthService, private router: Router, private deviceService: DeviceService) { }

  validateForm(): boolean {
    this.isErrorForm = {};

    if (!this.device.serialNumber) {
      this.isErrorForm.serialNumber = 'Number of serie is required.';
    }

    if (!this.device.status) {
      this.isErrorForm.status = 'Status is required.';
    }

    return Object.keys(this.isErrorForm).length === 0;
  }

  onSubmit(): void {
    if(this.validateForm()) {
      /*
      this.deviceService.addDevice(this.device).subscribe(
        (response: any) => {
          
        },
        (error: any) => {

        }
      );
    */
      this.addDevice.emit(this.device);
      this.invertShowPopupAddDevice.emit();
    }

  }

}
