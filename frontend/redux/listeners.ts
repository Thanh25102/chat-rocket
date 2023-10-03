import {Socket} from "Frontend/redux/socket";
import {chatListener} from "Frontend/redux/feat/chat/chatListener";

const Listeners :((socket:Socket)=>void)[] = [
    chatListener
]
export const startListener = (socket:Socket)=> Listeners.map((callback)=>callback(socket));
