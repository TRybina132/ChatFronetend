import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MessageComponent} from "../message/message.component";
import {MessagingHttpService} from "../../../api/services/messaging-http.service";
import {Message} from "../../../api/models/Message";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-message-edit-dialog',
  templateUrl: './message-edit-dialog.component.html',
  styleUrls: ['./message-edit-dialog.component.css']
})
export class MessageEditDialogComponent implements OnInit {

  form = new FormGroup({
      text : new FormControl(this.data.text, Validators.min(1))
    });

  constructor(
    private dialogRef : MatDialogRef<MessageComponent>,
    private messagingService : MessagingHttpService,
    @Inject(MAT_DIALOG_DATA) private data : Message,
    @Inject(FormBuilder) private formBuilder : FormBuilder) {}

  ngOnInit(): void {
  }

  onUpdate(){
    if(!this.form.valid)
      return;

    if(!(this.form.dirty)) {
      this.dialogRef.close(false);
    }

    this.data.text = this.form.value.text!;
    this.messagingService.updateMessage(this.data).subscribe(() =>{
      this.dialogRef.close(true);
    });
  }

  onCancel(){
    this.dialogRef.close(false);
  }
}
