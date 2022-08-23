import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Message} from "../models/Message";

@Injectable({
  providedIn: 'root'
})
export class MessageHttpService {

  url : string = "https://localhost:7200/api/message";

  constructor(private httpClient : HttpClient) { }

  getMessagesForChat(chatId : number, skip : number, take : number) : Observable<Message[]>{
    const requestUrl = `${this.url}/${chatId}/${skip}/${take}`;
    return this.httpClient.get<Message[]>(requestUrl);
  }
}
