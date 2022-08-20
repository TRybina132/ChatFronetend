import {Chat} from "./Chat";

export class User{
  id! : number;
  username! : string;
  firstName! : string;
  lastName! : string;
  chats?: Chat[];
}
