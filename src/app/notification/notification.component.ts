import { Component, OnInit } from '@angular/core';
import {DatePipe, NgForOf} from "@angular/common";
import {MatCard, MatCardContent} from "@angular/material/card";
import {MatToolbar} from "@angular/material/toolbar";

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
  notifications = [
    { message: 'Dispositivo 1 encendido. Luna recibió su comida.', timestamp: new Date() },
    { message: 'Dispositivo 2 apagado. Charlie terminó de comer.', timestamp: new Date() },
    { message: 'Dispositivo 3 está encendido.', timestamp: new Date() }
  ];

  constructor() { }

  ngOnInit(): void { }
}
