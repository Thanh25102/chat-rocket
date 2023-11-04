import {over} from "stompjs";
import SockJS from "sockjs-client/dist/sockjs"
import {listener} from "Frontend/redux/feat/chat/listener";
import {Client} from "@stomp/stompjs";
export const io = (userId: string,dispatch:any) => {
    const socketUrl = "http://localhost:8080/ws"
    if (!socketUrl) throw new Error("Vui lòng kiểm tra kết nối internet")
    const sock = new SockJS(socketUrl);
    const stomp = over(sock);
    stomp.connect({}, () => {
        stomp.subscribe('/chatroom/' + "/public", (payload) => console.log("public call"));
        Object.entries(listener).forEach(([key, value]) => {
            const {endpoint, callback, type} = value
            stomp.subscribe('/user/' + userId + "/" + endpoint, (payload) => callback(JSON.parse(payload.body),dispatch))
        })
        stomp.send('/rocket/public-message', {}, JSON.stringify({}))
    }, () => console.log('Không thể thiết lập kết nối socket'));
    return stomp;
}


