import {ChangeDetectorRef, Component, ElementRef, Input, OnInit, SimpleChange, ViewChild} from '@angular/core';
import {Chat} from "../../../api/models/Chat";
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {ChatHttpService} from "../../../api/services/chat-http.service";
import {ChattingService} from "../../../api/services/chatting/chatting.service";
import {Observable, tap} from "rxjs";
import {Message} from "../../../api/models/Message";
import {MessageSendModel} from "../../../api/models/MessageSendModel";
import {AuthHttpService} from "../../../api/services/auth-http.service";
import {MessageHttpService} from "../../../api/services/message-http.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private messagesCount: number = 20;

  skip: number = 0;
  messageText : string = "";
  hasReadToEnd: boolean = false;
  scrolledToBottom: boolean = false;

  @Input() chat! : Chat;
  @ViewChild('messagesContainer') viewportRef!: ElementRef;

  private _changeDetectionRef: ChangeDetectorRef;

  constructor(
    private route : ActivatedRoute,
    private location : Location,
    private chatService : ChatHttpService,
    private chattingService : ChattingService,
    public authService : AuthHttpService,
    private changeDetectionRef: ChangeDetectorRef,
    private messageService : MessageHttpService) {
        this._changeDetectionRef = changeDetectionRef;
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

  ngOnChanges(changes : SimpleChange){
    // this.scrolledToBottom = false;
    // this.hasReadToEnd = false;
    // this.chat.messages = [];
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
