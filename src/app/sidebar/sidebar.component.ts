import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})

export class SidebarComponent implements OnInit{
  @Input() devices!: any[];
  @Input() selectedDevice!: any;
  @Output() changeDevice = new EventEmitter<void>();

  ngOnInit() {
    console.log(this.selectedDevice);
  }

}
