import {Component, Input, OnInit} from '@angular/core';
import {Message} from "../../../api/models/Message";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  @Input() message?: Message;

  get formatedMessageTime() {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ]

    let currentDate = new Date();
    let dateTime = currentDate
    if (this.message?.sentAt){
      dateTime = new Date(this.message.sentAt)
    }

    let yearStr = '';
    if (currentDate.getFullYear() - currentDate.getFullYear() > 0)
      yearStr = dateTime.getFullYear().toString();

    return `${dateTime.getHours()}:${dateTime.getMinutes()}, ${dateTime.getDate()} ${months[dateTime.getMonth()]} ${yearStr}`
  }

  constructor() { }

  ngOnInit(): void {
  }

}
