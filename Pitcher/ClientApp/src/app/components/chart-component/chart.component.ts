import { Component, OnInit, Inject } from '@angular/core';
import { SignalRService } from 'src/app/services/signal-r.service';
import { HttpClient } from '@angular/common/http';
import { ChartModel } from 'src/app/interfaces/ichart-model';

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(
    public http: HttpClient,
    public signalRService: SignalRService
  ) { }

  public chartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };
  public chartLabels: string[] = ['Real time data for the chart'];
  public chartType: string = 'bar';
  public chartLegend: boolean = true;
  public colors: any[] = [{ backgroundColor: '#5491DA' }, { backgroundColor: '#E74C3C' }, { backgroundColor: '#82E0AA' }, { backgroundColor: '#E5E7E9' }]
  public data: ChartModel[];

  ngOnInit() {
    this.signalRService.startConnection();
    this.signalRService.addTransferChartDataListener();
    this.startHttpRequest();
  }

  private startHttpRequest = () => {
    this.http.get('https://localhost:44341/api/chart')
      .subscribe(res => {
        console.log(res);
      })
  }

}
