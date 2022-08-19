import { Component, OnInit } from '@angular/core';
import {AuthHttpService} from "../../../api/services/auth-http.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService : AuthHttpService,
              private router : Router) { }

  ngOnInit(): void {
  }

  onLogout(){
    this.authService.logout();
    console.log(this.authService.isAuthorized());
    this.router.navigate(["/login"]);
  }
}
