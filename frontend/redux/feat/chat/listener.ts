import {Message} from "stompjs";

function createFunc<T>(endpoint: string, callback: (t:T) => void,type:"PUBLIC"|"PRIVATE" = "PRIVATE") {
    return {
        endpoint,
        callback,
        type
    }
}


export const listener = {
    sendMessage: createFunc<Message>("private", (payload) => {
        console.log("subscribe send message")
    }),
    userJoined: createFunc<Message>("public",(payload)=>{
        console.log("user joined")
    },"PUBLIC")
}
