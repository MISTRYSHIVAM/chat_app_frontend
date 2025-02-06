import {
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnInit,
    ViewChild,
} from '@angular/core';
import { UserService } from '../service/user-service/user.service';
import { SocketService } from '../service/socket-service/socket.service';
import { map } from 'rxjs';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnChanges, OnInit {
    @Input() conversationId: string = '';
    // @Input() sender: any = { _id: '', userName: '' };
    @Input() currentUserData: any = {};
    @Input() sendToUserData: any = {};
    messages: any = [];
    constructor(
        private apiService: UserService,
        private socketService: SocketService,
        private scrollbar: ElementRef
    ) {}

    ngOnInit(): void {
        // console.log(this.scrollbar.nativeElement.scrollHeight);
        // console.log(this.scrollbar.nativeElement.scrollTop);
        this.socketService.receiveMessage().subscribe(
            (res) => {
                // console.log(res);
                this.messages.push(res);
                this.scrollbar.nativeElement.scrollTop =
                    this.scrollbar.nativeElement.scrollHeight;
            },
            (err) => {
                console.log(err);
            }
        );
        // this.socketService.receiveMessage().pipe(
        //     map((data: any) => {
        //         this.messages.push(data);
        //         console.log(data);
        //     })
        // );
    }

    ngOnChanges(): void {
        // alert(this.conversationId);
        // console.log(this.currentUserData?.userName);
        // console.log(this.sendToUserData?.userName);
        this.apiService.getMessages(this.conversationId).subscribe(
            (res: any) => {
                // console.log(res);
                if (res.statusCode == 200) {
                    this.messages = res.messageData;
                    // console.log(this.messages[0].createdAt);
                    this.scrollbar.nativeElement.scrollTop =
                        this.scrollbar.nativeElement.scrollHeight;
                }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    textMessage = '';
    sendMessage() {
        this.socketService.sendMessage({
            conversationId: this.conversationId,
            sender: this.currentUserData,
            sendTo: this.sendToUserData,
            text: this.textMessage,
        });
        // console.log(this.scrollbar.nativeElement.scrollTop);
        // console.log(this.scrollbar.nativeElement.scrollHeight);
        this.apiService
            .sendText({
                conversationId: this.conversationId,
                sender: this.currentUserData.id,
                text: this.textMessage,
            })
            .subscribe(
                (res: any) => {
                    if (res.statusCode == 200) {
                        this.messages.push(res.messageData);
                        this.scrollbar.nativeElement.scrollTop =
                            this.scrollbar.nativeElement.scrollHeight;
                        // console.log(this.messages);
                        this.textMessage = '';
                    } else {
                        console.log(res);
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
    }
    getTime(timeInfo: Date): string {
        let date = new Date(timeInfo);
        console.log('render');
        return date.getHours() + ' : ' + date.getMinutes();
    }

    uniqueMessgae(index: number, message: any): string {
        return message?._id;
    }
}
