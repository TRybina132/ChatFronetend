import { Component, OnInit } from '@angular/core';
import {ChatHttpService} from "../../../api/services/chat-http.service";
import {Chat} from "../../../api/models/Chat";
import {AuthHttpService} from "../../../api/services/auth-http.service";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  selectedChat? : Chat;
  chats! : Chat[];

  constructor(
    private chatService : ChatHttpService,
    private authService : AuthHttpService) { }

  ngOnInit(): void {
    this.chatService.getForUser(this.authService.getUserId()).subscribe(
      (chats) => {
        this.chats = chats;
      }
    )
  }

  onChatSelected(selected : Chat){
    this.selectedChat = selected;
  }

}
