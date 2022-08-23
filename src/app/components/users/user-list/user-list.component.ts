import { Component, OnInit } from '@angular/core';
import {UserHttpService} from "../../../api/services/user-http.service";
import {User} from "../../../api/models/User";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users! : User[];

  constructor(private userService : UserHttpService) { }

  ngOnInit(): void {
     this.userService.getAllUsers().subscribe(users => {
       this.users = users;
     });
  }

  onSend(user : User){

  }
}
