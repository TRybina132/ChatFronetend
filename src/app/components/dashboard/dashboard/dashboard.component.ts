import { Component, OnInit } from '@angular/core';
import {ChatHttpService} from "../../../api/services/chat-http.service";
import {ChattingService} from "../../../api/services/chatting/chatting.service";
import {Router} from "@angular/router";
import {Chat} from "../../../api/models/Chat";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chats! : Chat[];

  constructor(
    private chatService : ChatHttpService,
    private router : Router) { }

  ngOnInit(): void {
    this.chatService.getAll().subscribe((chats) =>
      this.chats = chats);
  }

  onSelected(chat : Chat){
    this.chatService.addUserToChat(chat.id).subscribe(() =>{
      this.router.navigate(["/chats"]);
    });
  }
}
