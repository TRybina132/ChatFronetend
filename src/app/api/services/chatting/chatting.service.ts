import {Injectable} from '@angular/core';
import {Chat} from "../../models/Chat";
import {AuthHttpService} from "../auth-http.service";
import {HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";

@Injectable({
  providedIn: 'root'
})
export class ChattingService {

private hubConnection!: HubConnection;

  url : string = "https://localhost:7200/hubs/messages";
  currentChat? : Chat;
  connectionUrl! : string;

  constructor(private authService : AuthHttpService)
  {
    this.connectionUrl = `${this.url}?access_token=${this.authService.getToken()}`;

    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.connectionUrl, {
        skipNegotiation: true,
        transport: HttpTransportType.WebSockets
      })
      .build();
  }

  private handleError(action: string, err: any){
    console.log(`Error while trying to ${action}. ${err}`);
  }

  public connectToSignalR(){

    this.hubConnection
      .start()
      .then(() => console.log('Connection started!'))

    this.hubConnection.on('sendMessage', (message: string) => {
      console.log(message);
    });
  }
}
