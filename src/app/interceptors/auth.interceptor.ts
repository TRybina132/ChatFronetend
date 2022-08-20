import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthHttpService} from "../api/services/auth-http.service";

//  ᓚᘏᗢ Similar to middleware in asp.net, proceed requests

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService : AuthHttpService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.authService.isAuthorized())
    {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Accept'       : 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
    }
    else {
      request = request.clone({
        setHeaders: {

          'Accept': 'application/json'
        }
      });
    }
    return next.handle(request);
  }
}
