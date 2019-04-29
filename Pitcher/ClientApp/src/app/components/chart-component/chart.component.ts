import { Component, OnInit, Inject } from '@angular/core';
import { SignalRService } from 'src/app/services/signal-r.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-chart-component',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  constructor(
    public http: HttpClient,
    public signalRService: SignalRService,
    @Inject('BASE_URL') baseUrl: string) { }

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
