import { NgModule } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { ChatsComponent } from './chats/chats.component';
import {RouterModule, Routes} from "@angular/router";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';

const routes : Routes =[
  {path: '', component: ChatsComponent}
]

@NgModule({
  declarations: [
    ChatsComponent,
    ChatComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatGridListModule,
    MatListModule
  ],
  providers: [Location]
})
export class ChatsModule { }
