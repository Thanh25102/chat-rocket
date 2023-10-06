import {Client, Frame, Message, over} from "stompjs";
import SockJS from "sockjs-client/dist/sockjs"

export class Socket {
    stomp: Client;
    userId: string;


    constructor(userId: string, onConnect?: () => void, onDisconnect?: () => void) {
        const socketUrl = "http://localhost:8080/ws"
        if (!socketUrl) throw new Error("Vui lòng kiểm tra kết nối internet")
        const sock = new SockJS(socketUrl);

        this.stomp = over(sock);
        this.stomp.connect({}, onConnect || this.onConnect, onDisconnect || this.onError)
        this.stomp.disconnect(this.onDisconnect, {});
        this.userId = userId;
    }

    onError(e: string | Frame) {
        console.log("Lỗi khi kết nối socket . . .", e)
    }

    onConnect() {
        console.log("Kết nối socket thành công ........")
    }

    onDisconnect() {
        console.log("Kết nối socket thất bại ........")
    }

    on(endpoint: string, callback: (payload: Message) => void) {
        this.stomp.subscribe('/user/' + this.userId + "/" + endpoint, callback)
    }

    onGlobal(endpoint: string, callback: (payload: Message) => void) {
        this.stomp.subscribe('/chatroom/' + endpoint, callback)
    }
}