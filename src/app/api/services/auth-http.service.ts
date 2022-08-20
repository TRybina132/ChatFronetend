import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Login} from "../models/Login";
import {Observable, tap} from "rxjs";
import {LoginResponse} from "../models/LoginResponse";
import {JwtHelperService} from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {

  url : string = "https://localhost:7200/api/auth";

  constructor(private httpClient : HttpClient,
              private jwtHelper: JwtHelperService) { }

  login(login : Login) : Observable<LoginResponse>{
    return this.httpClient.post<LoginResponse>(this.url + "/login", login)
      .pipe(tap(response =>{
        this.handleLogin(response, login.username);
      }));
  }

  isAuthorized() : boolean{
    const token = localStorage.getItem('token');
    return token != null && !this.jwtHelper.isTokenExpired(token);
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
