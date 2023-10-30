import {Client, Frame, Message, over} from "stompjs";
import SockJS from "sockjs-client/dist/sockjs"
import MessageModel from "Frontend/generated/com/hillarocket/application/domain/Message";
import {listener} from "Frontend/redux/feat/chat/listener";

export class Socket {
    stomp: Client;
    userId: string;

    constructor(userId: string, onConnect?: () => void, onDisconnect?: () => void) {
        const socketUrl = "http://localhost:8080/ws"
        if (!socketUrl) throw new Error("Vui lòng kiểm tra kết nối internet")
        const sock = new SockJS(socketUrl);
        this.stomp = over(sock);
        this.stomp.connect({}, () => {
            Object.entries(listener).forEach(([key, value]) => {
                const {endpoint, callback, type} = value
                if (type === "PUBLIC") {
                    this.stomp.subscribe('/chatroom/' + endpoint, (payload) => callback(JSON.parse(payload.body)))
                } else {
                    this.stomp.subscribe('/user/' + this.userId + "/" + endpoint, (payload) => callback(JSON.parse(payload.body)))
                }
            })
            const message: MessageModel = {
                conversion: undefined,
                id: undefined,
                messageText: "joined",
                senderName: this.userId,
                time: ""
            }
            this.stomp.send('/rocket/public-message', {}, JSON.stringify(message))

        }, onDisconnect || this.onError)
        this.userId = userId;
    }


    onError(e: string | Frame) {
        console.log("Lỗi khi kết nối socket . . .", e)
    }

}