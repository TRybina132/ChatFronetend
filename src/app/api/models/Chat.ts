import {User} from "./User";

export class Chat{
  id! : number;
  name! : string;
  users? : User[];
  type! : ChatType
}

export enum ChatType{
  Private, Group
}
