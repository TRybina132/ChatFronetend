import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./components/layout/layout.component";
import {NgModule} from "@angular/core";
import {AuthGuard} from "./guards/auth.guard";
import {ChatComponent} from "./components/chats/chat/chat.component";

const routes : Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'chats', pathMatch: 'full' },
      { path: 'chats', loadChildren:() => import('./components/chats/chats.module').then(m => m.ChatsModule),canActivate: [AuthGuard] },
      { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)},
      { path: 'users', loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule), canActivate: [AuthGuard]},
      { path: 'chat/:id', component: ChatComponent, canActivate: [AuthGuard] },
      { path: 'dashboard', loadChildren: () => import('./components/dashboard/dashboard.module').then(m => m.DashboardModule), canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
