import {
  AfterContentChecked, AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input, OnChanges,
  OnInit,
  SimpleChange, SimpleChanges,
  ViewChild
} from '@angular/core';
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
export class ChatComponent implements OnInit, OnChanges, AfterViewChecked{

  private messagesTakeCount: number = 20;

  skip: number = 0;
  messageText : string = "";
  hasReadToEnd: boolean = false;
  scrolledToBottom: boolean = false;

  @Input() chat! : Chat;
  @ViewChild('messagesContainer') viewportRef?: ElementRef;

  private _changeDetectionRef: ChangeDetectorRef;

  constructor(
    private location : Location,
    private chatService : ChatHttpService,
    private chattingService : ChattingService,
    public authService : AuthHttpService,
    private changeDetectionRef: ChangeDetectorRef,
    private messageService : MessageHttpService) {
        this._changeDetectionRef = changeDetectionRef;
        this.loadMessages();
      }

  get scrollHeight(): number {
    return this.viewportRef?.nativeElement.scrollHeight;
  }

  get scrollTop(): number {
    return this.viewportRef?.nativeElement.scrollTop;
  }

  private setScrollTop(currentScrollTop: number): void {
    if(this.viewportRef != null)
      this.viewportRef.nativeElement.scrollTop = currentScrollTop;
  }

  private loadMessages(){
    if(this.chat?.id != undefined){
      this.messageService.getMessagesForChat(this.chat.id, this.skip, this.messagesTakeCount)
        .subscribe(messages =>{
            let preScrollHeight = this.scrollHeight;
            const length : number = messages.length;

            if(length != 0)
              this.chat.messages?.unshift(...messages.reverse());
            else if(length == 0){
              this.chat.messages = messages;
            }

            this._changeDetectionRef.detectChanges();
            let postScrollHeight = this.scrollHeight;

            if(preScrollHeight != postScrollHeight){
              let delta = ( postScrollHeight - preScrollHeight);
              this.setScrollTop(delta);
            }

            if(length < this.messagesTakeCount)
              this.hasReadToEnd = true;

            this.skip+= length;
          }
        );
    }
  }

  ngOnInit(): void {
     this.chattingService.currentChat = this.chat;
     this.chat.messages = [];
     this.chattingService.connectToSignalR();

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
        this.messageText = "";
    }
  }

  // use menu!

  onGetMessage(message : Message){
    this.chat.messages?.push(message);
    this.changeDetectionRef.detectChanges();
    this.setScrollTop(this.scrollHeight);
  }

  ngAfterViewChecked() {
    if (!this.scrolledToBottom && this.chat?.messages?.length != 0){
      this.setScrollTop(this.scrollHeight);
      this.scrolledToBottom = true;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.scrolledToBottom = false;
    this.hasReadToEnd = false;
    console.log("on change");
    this.skip = this.chat.messages?.length ?? 0;
    this.loadMessages();
  }
}
