import {Client, Frame, Message, over} from "stompjs";
import SockJS from "sockjs-client/dist/sockjs"
import MessageModel from "Frontend/generated/com/hillarocket/application/domain/Message";
type Listener = {
    private?: { endpoint: string, callback: (payload: Message) => void }[]
    public?: { endpoint: string, callback: (payload: Message) => void }[]
} | undefined

export class Socket {
    stomp: Client;
    userId: string;
    listener: Listener;

    constructor(userId: string, listener?: Listener, onConnect?: () => void, onDisconnect?: () => void) {
        this.listener = listener;
        const socketUrl = "http://localhost:8080/ws"
        if (!socketUrl) throw new Error("Vui lòng kiểm tra kết nối internet")
        const sock = new SockJS(socketUrl);
        this.stomp = over(sock);
        this.stomp.connect({}, ()=>{
            this.listener?.public?.forEach(({endpoint,callback})=>{
                this.stomp.subscribe('/chatroom/' + endpoint, callback)
            });
            this.listener?.public?.forEach(({endpoint,callback})=>{
                this.stomp.subscribe('/user/' + this.userId + "/" + endpoint, callback)
            });
            const message: MessageModel = {
                conversion: undefined,
                id: undefined,
                messageText: "joined",
                senderName: this.userId,
                time: ""
            }
            this.stomp.send('/public-message',{},JSON.stringify(message))
        }, onDisconnect || this.onError)
        // this.stomp.disconnect(this.onDisconnect, {});
        this.userId = userId;
    }


    onError(e: string | Frame) {
        console.log("Lỗi khi kết nối socket . . .", e)
    }


    onDisconnect() {
        console.log("Kết nối socket thất bại ........")
    }


    on({endpoint, callback}: { endpoint: string, callback: (payload: Message) => void }) {
        console.log("private socket")
        this.stomp.subscribe('/user/' + this.userId + "/" + endpoint, callback)
    }

    onGlobal({endpoint, callback}: { endpoint: string, callback: (payload: Message) => void }) {
        console.log("public socket")
        this.stomp.subscribe('/chatroom/' + endpoint, callback)
    }
}