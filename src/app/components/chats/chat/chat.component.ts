import {Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../../api/models/Chat";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {ChatHttpService} from "../../../api/services/chat-http.service";
import {ChattingService} from "../../../api/services/chatting/chatting.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chat! : Chat;

  constructor(
    private route : ActivatedRoute,
    private location : Location,
    private chatService : ChatHttpService,
    private chattingService : ChattingService) { }

  private getChat(){
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.chatService.getChatById(id).subscribe(
      (chat) => this.chat = chat);
  }

  ngOnInit(): void {
    if(this.chat == null)
      this.getChat();

    this.chattingService.currentChat = this.chat;
    this.chattingService.connectToSignalR();
  }

  goBack(){
    this.location.back();
  }
}
