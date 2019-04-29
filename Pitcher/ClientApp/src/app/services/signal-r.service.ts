import { Injectable, Inject } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ChartModel } from '../interfaces/ichart-model';
import { Subject } from 'rxjs'; 

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor(@Inject('BASE_URL') baseUrl: string) {}

  public data: Subject<ChartModel[]> = new Subject<ChartModel[]>();

  private hubConnection: signalR.HubConnection;

  public startConnection = () => {
    this.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44341/chart')
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection started'))
      .catch(err => {
        console.log('Error while starting connection: ');
        console.log(err)
      })
  }

  public addTransferChartDataListener = () => {
    this.hubConnection.on('transferchartdata', (data) => {
      this.data.next(data);
      console.log(data);
    });
  }
}
