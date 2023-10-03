import {Socket} from "Frontend/redux/socket";

export const chatListener = (socket :Socket)=>{
    socket.on("private",(payload)=>{
        const data:{status:"MESSAGE"|"JOIN"} = JSON.parse(payload.body);
        switch (data.status) {
            case "JOIN":break;
            case "MESSAGE":break;
        }
    })
    socket.onGlobal("public",(payload)=>{
        const data:{status:"MESSAGE"|"JOIN"} = JSON.parse(payload.body);
        switch (data.status) {
            case "JOIN":break;
            case "MESSAGE":break;
        }
    })
}