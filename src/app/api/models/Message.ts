import {User} from "./User";

export class Message{
  id! : number;
  senderId! : number;
  chatId! : number;
  sentAt! : Date;
  text! : string;
  senderName! : string;
  sender? : User;
}
