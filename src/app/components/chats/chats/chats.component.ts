import { Component, OnInit } from '@angular/core';
import {ChatHttpService} from "../../../api/services/chat-http.service";
import {Chat} from "../../../api/models/Chat";

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css']
})
export class ChatsComponent implements OnInit {

  selectedChat? : Chat;
  chats! : Chat[];

  constructor(private chatService : ChatHttpService) { }

  ngOnInit(): void {
    this.chatService.getAll().subscribe(
      (chats) =>{
        this.chats = chats;
      }
    )
  }

  onChatSelected(selected : Chat){
    this.selectedChat = selected;
  }

}
