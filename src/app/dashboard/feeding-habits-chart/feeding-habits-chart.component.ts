import { Component, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Chart, ChartConfiguration, TooltipItem } from 'chart.js/auto';

@Component({
  selector: 'app-feeding-habits-chart',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],
  templateUrl: './feeding-habits-chart.component.html',
  styleUrls: ['./feeding-habits-chart.component.scss']
})
export class FeedingHabitsChartComponent implements AfterViewInit {
  chart!: Chart<'bar', number[], unknown>;

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    const ctx = document.getElementById('feedingChart') as HTMLCanvasElement;

    const config: ChartConfiguration<'bar', number[], unknown> = {
      type: 'bar',
      data: {
        labels: ['1 PM', '2 PM', '3 PM', '4 PM', '5 PM', '6 PM', '7 PM'],
        datasets: [{
          data: [150, 100, 200, 120, 160, 80, 110],
          backgroundColor: '#FCD34D',
          borderRadius: 4,
          barThickness: 30
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#333',
            titleColor: '#fff',
            bodyColor: '#fff',
            callbacks: {
              label: (context: TooltipItem<'bar'>) => `${context.raw}g`
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#666'
            }
          },
          y: {
            border: {
              display: false
            },
            grid: {
              display: false
            }
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }
}
