import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Message} from "../../../api/models/Message";
import {MessageComponent} from "../message/message.component";
import {MessagingHttpService} from "../../../api/services/messaging-http.service";

@Component({
  selector: 'app-message-delete-dialog',
  templateUrl: './message-delete-dialog.component.html',
  styleUrls: ['./message-delete-dialog.component.css']
})
export class MessageDeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private data : Message,
    private messagingService : MessagingHttpService,
    public dialogRef : MatDialogRef<MessageComponent>) { }

  ngOnInit(): void {}

  onDeleteForAll(){
    this.messagingService.deleteMessage(this.data)
      .subscribe(() => this.dialogRef.close(false));
  }

  onDeleteForUser(){
    this.dialogRef.close(true);
  }
}
