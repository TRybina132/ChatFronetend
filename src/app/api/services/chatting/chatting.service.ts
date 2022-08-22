import {Injectable} from '@angular/core';
import {Chat} from "../../models/Chat";
import {AuthHttpService} from "../auth-http.service";
import {HttpTransportType, HubConnection, HubConnectionBuilder, LogLevel} from "@microsoft/signalr";
import {MessagingHttpService} from "../messaging-http.service";
import {Message} from "../../models/Message";
import {MessageSendModel} from "../../models/MessageSendModel";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChattingService {

private hubConnection!: HubConnection;

  url : string = "https://localhost:7200/hubs/messages";
  currentChat! : Chat;
  connectionUrl! : string;
  getMessages$ : Subject<Message> = new Subject<Message>();

  constructor(
    private authService : AuthHttpService,
    private messagingService : MessagingHttpService)
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

  private listenForMessages(){
    this.hubConnection.on('receive', (message) =>{
      this.getMessages$.next(message);
    });
  }

  public connectToSignalR(){
    this.hubConnection
      .start()
      .then(
        () => {
          console.log('Connection started!');

          this.messagingService.addUserToChat(this.currentChat);

          this.hubConnection.send("joinChat", this.currentChat?.name, this.authService.getUsername() as string);
          this.hubConnection.send("sendMessage", "Hello world");
        });

    this.hubConnection.on('receiveMessage', (message: string) => {
      console.log(message);
    });

    this.hubConnection.on('userJoined', (message) => {
      console.log(message);
    });

    this.listenForMessages();
  }

  sendMessage(message : MessageSendModel){
    this.messagingService.sendMessageToChat(message);
  }
}
