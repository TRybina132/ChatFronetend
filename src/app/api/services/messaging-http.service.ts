import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Chat} from "../models/Chat";
import {Observable} from "rxjs";
import {MessageSendModel} from "../models/MessageSendModel";
import {Message} from "../models/Message";

@Injectable({
  providedIn: 'root'
})
export class MessagingHttpService {

  url : string = "https://localhost:7200/api/messaging";

  constructor(private httpClient : HttpClient) { }

  addUserToChat(chat : Chat){
    return this.httpClient.post<any>(this.url + "/joinChat", chat)
      .subscribe();
  }

  sendMessageToChat(message : MessageSendModel){
    this.httpClient.post<any>(this.url + "/sendToChat", message)
      .subscribe();
  }

  deleteMessage(message : Message) : Observable<Message>{
    const requestUrl = `${this.url}/${message.id}`;
    return this.httpClient.delete<Message>(requestUrl);
  }
}
