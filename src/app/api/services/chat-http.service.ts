import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Chat} from "../models/Chat";

@Injectable({
  providedIn: 'root'
})
export class ChatHttpService {

  url : string = "https://localhost:7200/api/chat";

  constructor(private httpClient : HttpClient) { }

  getAll() : Observable<Chat[]>{
    return this.httpClient.get<Chat[]>(this.url);
  }

  getForUser(userId : number) : Observable<Chat[]>{
    const requestUrl = `${this.url}/forUser/${userId}`;
    return this.httpClient.get<Chat[]>(requestUrl);
  }

  addUserToChat(chatId : number) : Observable<any>{
    const requestUrl = `${this.url}/addUserToChat`;
    return this.httpClient.post<any>(requestUrl, chatId);
  }

  getChatById(id : number) : Observable<Chat>{
    return this.httpClient.get<Chat>(this.url + `/${id}`);
  }

  getPrivateChat(senderId : number, receiverId : number) : Observable<Chat>{
    const requestUrl = `${this.url}/privateChat/${senderId}/${receiverId}`;
    return this.httpClient.get<Chat>(requestUrl);
  }
}
