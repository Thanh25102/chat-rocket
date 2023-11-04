import {ChatActions} from "Frontend/redux/feat/chat/chatSlice";
import MessageSender from "Frontend/generated/com/hillarocket/application/dto/MessageSender";

function on(endpoint: string, callback: (payload: any, dispatch: any) => void, type: "PUBLIC" | "PRIVATE" = "PRIVATE") {
    return {
        endpoint,
        callback,
        type
    }
}

export const listener = {
    sendMessage: on("chat", (payload: MessageSender, dispatch) => {
        dispatch(ChatActions.receiveMessage(payload))
    }),
}

