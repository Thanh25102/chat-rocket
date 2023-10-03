import {Client, Message, over} from "stompjs";
import SockJS from "sockjs-client/dist/sockjs"

export class Socket {
    stomp: Client;
    userId: string;

    constructor(userId: string) {
        const socketUrl = process.env.SOCKET_URL
        if(!socketUrl) throw new Error("Vui lòng kiểm tra kết nối internet")
        const sock = new SockJS(socketUrl);
        this.stomp = over(sock);
        this.userId = userId;
    }

    on(endpoint: string, callback: (payload: Message) => void) {
        this.stomp.subscribe('/user/' + this.userId +"/"+ endpoint, callback)
    }

    onGlobal(endpoint: string, callback: (payload: Message) => void) {
        this.stomp.subscribe('/chatroom/'+endpoint,callback)
    }
}