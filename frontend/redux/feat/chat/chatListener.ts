import {Message} from "stompjs";

// export const chatListener = (socket: Socket) => {
//     console.log("now")
//     socket.on("private", (payload) => {
//         const data: { status: "MESSAGE" | "JOIN" } = JSON.parse(payload.body);
//         switch (data.status) {
//             case "JOIN":
//                 break;
//             case "MESSAGE":
//                 break;
//         }
//     })
//     socket.onGlobal("public", (payload) => {
//         console.log("payload: " + JSON.stringify(payload))
//         const data: { status: "MESSAGE" | "JOIN" } = JSON.parse(payload.body);
//         switch (data.status) {
//             case "JOIN":
//                 console.log("ONLINE");
//                 break;
//             case "MESSAGE":
//                 break;
//         }
//     })
// }
export const chatListener = {
    private: [{
        endpoint: "private", callback: (payload: Message) => {
            console.log("onPrivate")
            const data: { status: "MESSAGE" | "JOIN" } = JSON.parse(payload.body);
            switch (data.status) {
                case "JOIN":
                    break;
                case "MESSAGE":
                    break;
            }
        }}
    ],
    public: [{
        endpoint: "public", callback: (payload: Message) => {
            console.log("onPrivate")
            const data: { status: "MESSAGE" | "JOIN" } = JSON.parse(payload.body);
            switch (data.status) {
                case "JOIN":
                    break;
                case "MESSAGE":
                    break;
            }
        }}
    ]

}