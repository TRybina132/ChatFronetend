import { Component, OnInit } from '@angular/core';
import {UserHttpService} from "../../../api/services/user-http.service";
import {User} from "../../../api/models/User";
import {ChattingService} from "../../../api/services/chatting/chatting.service";
import {MessagingHttpService} from "../../../api/services/messaging-http.service";
import {ChatHttpService} from "../../../api/services/chat-http.service";
import {AuthHttpService} from "../../../api/services/auth-http.service";
import {Chat} from "../../../api/models/Chat";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users! : User[];

  constructor(
              private router : Router,
              private userService : UserHttpService,
              private chatService : ChatHttpService,
              private chattingService : ChattingService,
              private authService : AuthHttpService) { }

  ngOnInit(): void {
     this.userService.getAllUsers().subscribe(users => {
       this.users = users;
     });
  }

  onSelected(user : User){
    this.chatService.getPrivateChat(this.authService.getUserId(), user.id).subscribe((chat) =>{
      this.chattingService.currentChat = chat;
      this.router.navigate(["/chats"]);
    });
  }
}
