import { Injectable } from '@angular/core';
import {Chat} from "../../models/Chat";
import {AuthHttpService} from "../auth-http.service";
import {HubConnection, HubConnectionBuilder} from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})

//  ᓚᘏᗢ It's ok that connection is closing, just try another method
export class ChattingService {

  private hubConnection!: HubConnection;

  url : string = "https://localhost:7200/chat";
  currentChat? : Chat;

  constructor(private authService : AuthHttpService) { }

  private handleError(action: string, err: any){
    console.log(`Error while trying to ${action}. ${err}`);
  }

  public connectToSignalR(){
    let connectionUrl = `${this.url}?access_token=${this.authService.getToken()}`;

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(connectionUrl)
      .build();

    this.hubConnection
      .start()
      .then(() => console.log('Connection has been established'))
      .catch(err => this.handleError('Connect to SignalR server', err));
  }
}
