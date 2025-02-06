import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
    providedIn: 'root',
})
export class SocketService {
    constructor(private socket: Socket) {}

    goOnline(user: {}) {
        return this.socket.emit('addUser', user);
    }

    getOnlineUsers() {
        return this.socket.fromEvent('onlineUser');
    }

    sendMessage(messageData: any) {
        return this.socket.emit('privateMessage', messageData);
    }

    receiveMessage() {
        return this.socket.fromEvent('receiveMessage');
    }
}
