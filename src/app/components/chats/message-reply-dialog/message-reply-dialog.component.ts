import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageComponent} from "../message/message.component";
import {ChattingService} from "../../../api/services/chatting/chatting.service";
import {Message} from "../../../api/models/Message";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ChatHttpService} from "../../../api/services/chat-http.service";
import {AuthHttpService} from "../../../api/services/auth-http.service";
import {MessageSendModel} from "../../../api/models/MessageSendModel";
import {Router} from "@angular/router";

@Component({
  selector: 'app-message-reply-dialog',
  templateUrl: './message-reply-dialog.component.html',
  styleUrls: ['./message-reply-dialog.component.css']
})
export class MessageReplyDialogComponent implements OnInit {

  form = new FormGroup({
    text : new FormControl("", Validators.min(1))
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) private data : Message,
    @Inject(FormBuilder) private formBuilder : FormBuilder,
    private dialogRef : MatDialogRef<MessageComponent>,
    private chatService : ChatHttpService,
    private chattingService : ChattingService,
    private authService : AuthHttpService,
    private router : Router) {
  }

  ngOnInit(): void {
  }

  onReply(){
    if(!this.form.valid)
      return;

    if(!(this.form.dirty)) {
      this.dialogRef.close(false);
    }

    this.chatService.getPrivateChat(this.authService.getUserId(), this.data.senderId).subscribe(chat =>{
      let message : MessageSendModel = {
        text: this.form.value.text ?? "",
        senderId: this.authService.getUserId(),
        sentAt: new Date(),
        chatId: chat.id,
        chatName: chat.name
      };

      this.chattingService.sendMessage(message);
      this.dialogRef.close(true);
    });
  }

  onCancel(){
    this.dialogRef.close(false);
  }
}
