import { Injectable, Inject } from '@angular/core';
import * as signalR from "@aspnet/signalr";
import { ChartModel } from '../interfaces/ichart-model';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() {}

  public data: ChartModel[];

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
      this.data = data;
      console.log(data);
    });
  }
}
