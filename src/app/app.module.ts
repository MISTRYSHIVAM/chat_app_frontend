import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { CoversationComponent } from './coversation/coversation.component';
import { ChatComponent } from './chat/chat.component';
import { RegistrationComponent } from './registration/registration.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule } from 'ngx-socket-io';
const socketCongif = {
    url: 'http://localhost:5555',
};
@NgModule({
    declarations: [
        AppComponent,
        PageNotFoundComponent,
        LoginComponent,
        CoversationComponent,
        ChatComponent,
        RegistrationComponent,
        WelcomeComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
        SocketIoModule.forRoot(socketCongif),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
