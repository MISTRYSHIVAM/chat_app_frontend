import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CoversationComponent } from './coversation/coversation.component';
import { ChatComponent } from './chat/chat.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
    {
        path: '',
        component: WelcomeComponent,
    },
    {
        path: 'reg',
        component: RegistrationComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'conversation',
        component: CoversationComponent,
    },
    // {
    //     path: 'conversation/chat/:cid',
    //     component: ChatComponent,
    // },
    {
        path: '**',
        component: PageNotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
