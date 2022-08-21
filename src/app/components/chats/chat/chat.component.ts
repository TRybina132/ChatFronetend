import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Chat} from "../../../api/models/Chat";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {ChatHttpService} from "../../../api/services/chat-http.service";
import {ChattingService} from "../../../api/services/chatting/chatting.service";
import {Observable, tap} from "rxjs";
import {Message} from "../../../api/models/Message";
import {MessageSendModel} from "../../../api/models/MessageSendModel";
import {AuthHttpService} from "../../../api/services/auth-http.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messageText : string = "";

  @Input() chat! : Chat;

  constructor(
    private route : ActivatedRoute,
    private location : Location,
    private chatService : ChatHttpService,
    private chattingService : ChattingService,
    public authService : AuthHttpService,
    private changeDetectionRef: ChangeDetectorRef) {
      }

  private getChat() : Observable<Chat>{
    const id = Number(this.route.snapshot.paramMap.get('id'));
    return  this.chatService.getChatById(id).pipe(
      tap((chat) => this.chat = chat));
  }

  ngOnInit(): void {
    if(this.chat == null)
      this.getChat().subscribe(() => {
        this.chattingService.currentChat = this.chat;
        this.chattingService.connectToSignalR();
      });

    this.chattingService.getMessages$.subscribe(message =>{
      this.onGetMessage(message);
    })
  }

  onSend(messageText : string){
    if(this.chat != undefined && messageText.trim()){
      const sentAt = new Date();

      let message : MessageSendModel = new MessageSendModel();
        message.text = messageText;
        message.chatId = this.chat.id;
        message.chatName = this.chat.name;
        message.sentAt = sentAt;
        message.senderId = this.authService.getUserId();

        this.chattingService.sendMessage(message);
    }
  }

  onGetMessage(message : Message){
    this.chat.messages?.push(message);
    this.changeDetectionRef.detectChanges();
  }

  goBack(){
    this.location.back();
  }
}
