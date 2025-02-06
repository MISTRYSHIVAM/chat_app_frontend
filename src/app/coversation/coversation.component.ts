import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user-service/user.service';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from '../service/socket-service/socket.service';

@Component({
    selector: 'app-coversation',
    templateUrl: './coversation.component.html',
    styleUrls: ['./coversation.component.css'],
})
export class CoversationComponent implements OnInit {
    constructor(
        private apiService: UserService,
        private router: ActivatedRoute,
        private socketSerivce: SocketService
    ) {}
    allUsers: any = [];
    conversations: any = [];
    userData: any = {
        id: '',
        userName: '',
    };
    chatData: any = [];
    hasConversation: boolean = false;
    showBtn: boolean = false;
    messageToViewer: string = 'Select one of your friend to start chat.';
    currentConversation: string = '';
    onlineUsers: any = [];
    ngOnInit(): void {
        this.router.queryParams.subscribe((params) => {
            // console.log(params);
            this.userData = {
                id: params['id'],
                userName: params['userName'],
            };
        });

        this.socketSerivce.getOnlineUsers().subscribe(
            (res: any) => {
                this.onlineUsers = res.filter(
                    (user: any) => user.user.id !== this.userData.id
                );
                // console.log(res);
            },
            (err) => {}
        );

        this.socketSerivce.goOnline(this.userData);

        // this.apiService.getConversation(this.userData.id).subscribe(
        //     (response: any) => {
        //         this.conversations = response?.conversationData;
        //         // console.log(this.conversations);
        //     },
        //     (error) => {
        //         console.log(error);
        //     }
        // );

        this.apiService.getAllUsers().subscribe(
            (res: any) => {
                // console.log(res);
                this.allUsers = res.users.filter(
                    (user: any) => user.userName != this.userData.userName
                );
            },
            (err) => {
                console.log(err);
            }
        );
    }
    // getChat(chatid: string) {
    //     // alert(chatid);
    //     this.apiService.getChat(chatid).subscribe(
    //         (response: any) => {
    //             console.log(response);
    //             this.chatData = response?.messageData;
    //         },
    //         (error) => {
    //             console.log(error);
    //         }
    //     );
    // }

    sendToUserData: any = {};
    getConversation(userIdToSend: any) {
        // alert(userIdToSend.userName);
        this.sendToUserData = userIdToSend;
        this.apiService
            .getConversation(this.userData.id, userIdToSend._id)
            .subscribe(
                (res: any) => {
                    if (res.hasStartedConversation) {
                        this.hasConversation = true;
                        // console.log(res.conversationData[0]._id);
                        this.currentConversation = res.conversationData[0]._id;
                    } else if (!res.hasStartedConversation) {
                        this.hasConversation = false;
                        this.showBtn = true;
                        this.messageToViewer = `Want to start conversation with ${userIdToSend.userName} `;
                    } else {
                        alert(res.message);
                    }
                    // console.log(res);
                },
                (err) => {
                    console.log(err);
                }
            );
    }
    startConversation() {
        // alert(this.sendToUserData?.userName);

        this.apiService
            .startChat(this.userData.id, this.sendToUserData._id)
            .subscribe(
                (res: any) => {
                    // console.log(res);
                    if (res.statusCode == 201) {
                        this.currentConversation = res.conversationData?._id;
                        this.hasConversation = true;
                    }
                },
                (err) => {
                    console.log(err);
                }
            );
    }
}
