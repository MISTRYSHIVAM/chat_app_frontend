import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    // API_CALL: string = 'https://chat-app-backend-khaki-ten.vercel.app';
    API_CALL: string = 'http://localhost:4444';
    constructor(private http: HttpClient) {}

    registerUser(user: {}) {
        return this.http.post(`${this.API_CALL}/user/register`, user);
    }

    loginUser(user: {}) {
        return this.http.post(`${this.API_CALL}/user/login`, user);
    }

    getAllUsers() {
        return this.http.get(`${this.API_CALL}/user/all`);
    }

    getConversation(userId: any, userIdToSend: any) {
        return this.http.post(`${this.API_CALL}/user/conversation/${userId}`, {
            receiverId: userIdToSend,
        });
    }

    getMessages(conversationId: any) {
        return this.http.get(`${this.API_CALL}/user/message/${conversationId}`);
    }

    sendText(messageData: any) {
        return this.http.post(`${this.API_CALL}/user/message/add`, messageData);
    }

    getUserData(userId: any) {
        return this.http.get(`${this.API_CALL}/user/${userId}`);
    }

    getChat(conId: any) {
        return this.http.get(`${this.API_CALL}/user/message/${conId}`);
    }

    startChat(senderId: string, receiverId: string) {
        return this.http.post(`${this.API_CALL}/user/conversation/create`, {
            senderId,
            receiverId,
        });
    }
}
