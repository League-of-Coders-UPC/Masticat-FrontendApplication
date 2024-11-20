import { Component, AfterViewInit, Input, OnInit } from '@angular/core';
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
  @Input() habits: any = [];
  // Datos de ejemplo
  usageLogs = [
    { id: '1', time: '2024-11-19T10:00:00Z', quantity: 3 },
    { id: '2', time: '2024-11-19T12:00:00Z', quantity: 2 },
    { id: '3', time: '2024-11-19T13:30:00Z', quantity: 1 },
    { id: '4', time: '2024-11-19T15:00:00Z', quantity: 1 },
    { id: '5', time: '2024-11-19T18:00:00Z', quantity: 4 },
  ];

  ngAfterViewInit(): void {
    this.createChart();
  }

  // Agrupar datos por hora
  groupDataByHour(): { [hour: number]: number } { // Aseguramos que el 'hour' es de tipo 'number'
    const groupedData: { [hour: number]: number } = {};

    this.habits.forEach((log: any) => {
      const date = new Date(log.time);
      const hour = date.getUTCHours(); // Usar UTC para evitar problemas de zona horaria
      groupedData[hour] = (groupedData[hour] || 0) + log.quantity; // Sumar la cantidad
    });

    return groupedData;
  }

  // Filtrar datos para las últimas 5 horas con consumo
  getFilteredData(): { labels: string[], data: number[] } {
    const groupedData = this.groupDataByHour();
    const labels: string[] = [];
    const data: number[] = [];

    let hoursChecked = 0; // Contador para asegurarnos de revisar todas las horas posibles
    let currentHour = new Date().getUTCHours(); // Hora actual en UTC
    let hoursWithConsumption = 0; // Contador de horas con consumo

    // Bucle para encontrar 5 horas con consumo
    while (hoursWithConsumption < 5 && hoursChecked < 24) {
      const hour = (currentHour - hoursChecked + 24) % 24; // Asegurar que las horas no sean negativas

      if (groupedData[hour] !== undefined) {
        labels.unshift(`${hour}:00`); // Agregar la hora al inicio (en orden ascendente)
        data.unshift(groupedData[hour]); // Agregar la cantidad correspondiente
        hoursWithConsumption++;
      }
      hoursChecked++;
    }

    // Asegurarse de que las etiquetas estén en orden ascendente
    labels.sort((a, b) => parseInt(a.split(":")[0]) - parseInt(b.split(":")[0]));
    // Asegurar que los datos coincidan con el orden de las etiquetas
    data.sort((a, b) => {
      const hourA = parseInt(labels[data.indexOf(a)].split(":")[0]);
      const hourB = parseInt(labels[data.indexOf(b)].split(":")[0]);
      return hourA - hourB;
    });

    return { labels, data };
  }

  // Crear el gráfico
  createChart(): void {
    const ctx = document.getElementById('feedingChart') as HTMLCanvasElement;

    // Filtrar los datos de las últimas 5 horas con consumo
    const { labels, data } = this.getFilteredData();

    const config: ChartConfiguration<'bar', number[], unknown> = {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          data: data,
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
              label: (context: TooltipItem<'bar'>) => `${context.raw} uses`
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
