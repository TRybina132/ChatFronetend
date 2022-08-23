import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/User";

@Injectable({
  providedIn: 'root'
})
export class UserHttpService {

  url : string = "https://localhost:7200/api/user";

  constructor(private httpClient : HttpClient) { }

  getAllUsers() : Observable<User[]>{
    return this.httpClient.get<User[]>(this.url);
  }
}
