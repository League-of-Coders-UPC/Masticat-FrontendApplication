import { Component, Input } from '@angular/core';
import { Device } from '../services/device.service';

import {MatGridListModule} from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-device-list',
  standalone: true,
  imports: [
    MatGridListModule,
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    NgForOf
  ],
  templateUrl: './device-list.component.html',
  styleUrl: './device-list.component.scss'
})
export class DeviceListComponent {
  @Input() devices: Device[] = [];
}
