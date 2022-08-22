import { NgModule } from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import { ChatsComponent } from './chats/chats.component';
import {RouterModule, Routes} from "@angular/router";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatListModule} from "@angular/material/list";
import { ChatComponent } from './chat/chat.component';
import { MessageComponent } from './message/message.component';
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import { MessageDeleteDialogComponent } from './message-delete-dialog/message-delete-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";

const routes : Routes =[
  {path: '', component: ChatsComponent}
]

@NgModule({
  declarations: [
    ChatsComponent,
    ChatComponent,
    MessageComponent,
    MessageDeleteDialogComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        MatGridListModule,
        MatListModule,
        MatInputModule,
        FormsModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule
    ],
  providers: [Location]
})
export class ChatsModule { }
