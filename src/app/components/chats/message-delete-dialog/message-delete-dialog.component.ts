import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Chat} from "../../../api/models/Chat";
import {Message} from "../../../api/models/Message";
import {MessageComponent} from "../message/message.component";

@Component({
  selector: 'app-message-delete-dialog',
  templateUrl: './message-delete-dialog.component.html',
  styleUrls: ['./message-delete-dialog.component.css']
})
export class MessageDeleteDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) private message : Message,
    public dialog : MatDialogRef<MessageComponent>) { }

  ngOnInit(): void {
  }

  onDeleteForAll(){
  }

  onDeleteForUser(){
  }
}
