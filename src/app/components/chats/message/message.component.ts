import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../api/models/Message";
import {Chat} from "../../../api/models/Chat";
import {MatDialog} from "@angular/material/dialog";
import {MessageDeleteDialogComponent} from "../message-delete-dialog/message-delete-dialog.component";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message?: Message;
  @Input() chat? : Chat;

  constructor(private matDialog : MatDialog) { }

  ngOnInit(): void {
  }

  onDelete(){
    const dialog = this.matDialog.open(MessageDeleteDialogComponent,{
      data: this.message
    });
  }

  onEdit(){

  }

  onReply(){

  }

}
