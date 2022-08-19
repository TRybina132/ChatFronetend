import {RouterModule, Routes} from "@angular/router";
import {LayoutComponent} from "./components/layout/layout.component";
import {NgModule} from "@angular/core";

const routes : Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: 'chats', pathMatch: 'full' },
      { path: 'chats', loadChildren:() => import('./components/chats/chats.module').then(m => m.ChatsModule) },
      { path: 'login', loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
