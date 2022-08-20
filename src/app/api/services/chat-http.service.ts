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

  getChatById(id : number) : Observable<Chat>{
    return this.httpClient.get<Chat>(this.url + `/${id}`);
  }
}
