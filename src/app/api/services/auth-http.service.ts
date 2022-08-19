import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Login} from "../models/Login";
import {Observable, tap} from "rxjs";
import {LoginResponse} from "../models/LoginResponse";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  url : string = "https://localhost:7200/api/auth";

  constructor(private httpClient : HttpClient) { }

  login(login : Login) : Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(this.url + "/login", login, this.httpOptions)
      .pipe(tap(response =>{
        this.handleLogin(response, login.username);
      }));
  }

  isAuthorized() : boolean{
    return localStorage.getItem('token') != null
  }

  logout(){
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  private handleLogin(response : LoginResponse, username : string){
    if(response.isSuccessful) {
      localStorage.setItem("token", response.token as string);
      localStorage.setItem("username", username);
    }
  }
}
