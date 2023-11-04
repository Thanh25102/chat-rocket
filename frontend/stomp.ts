import {Client} from "@stomp/stompjs";
import SockJS from "sockjs-client/dist/sockjs";
import {over} from "stompjs";

export const io = () => {
    console.log("open connection")
    const client =  new Client({
        brokerURL: 'ws://localhost:8080/ws',
        debug: function (str) {
            console.log(str);
        },
        // reconnectDelay: 10000,
        // heartbeatIncoming: 4000,
        // heartbeatOutgoing: 4000,
        // onConnect:()=>{
        //     client.subscribe('/chatroom/' + "/public", (payload) => console.log("public call"));
        //     client.publish({destination: '/rocket/public-message', body: JSON.stringify({})})
        // }
    });
    return client;
}