import { Component, Inject, Input, OnInit } from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  standalone: true,
  imports: [
    DatePipe,
    MatCardContent,
    MatCard,
    MatToolbar,
    NgForOf
  ],
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notifications1 = [
    { message: 'Dispositivo 1 encendido. Luna recibió su comida.', timestamp: new Date() },
    { message: 'Dispositivo 2 apagado. Charlie terminó de comer.', timestamp: new Date() },
    { message: 'Dispositivo 3 está encendido.', timestamp: new Date() }
  ];
  notifications: any = []; 

  constructor(@Inject(MAT_DIALOG_DATA) public data: { notifications: any[] }) {
    this.notifications = this.data.notifications
  }

  ngOnInit(): void { 
  }
}
