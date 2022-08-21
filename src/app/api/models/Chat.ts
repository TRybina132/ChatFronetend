import {User} from "./User";
import {Message} from "./Message";

export class Chat{
  id! : number;
  name! : string;
  users? : User[];
  type! : ChatType
  messages? : Message[];
}

export enum ChatType{
  Private, Group
}
