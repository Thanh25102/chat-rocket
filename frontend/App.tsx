import router from 'Frontend/routes.js';
import {RouterProvider} from 'react-router-dom';
import {Provider} from "react-redux";
import {store} from "Frontend/redux/store";
import "./main.css";
import {io} from "Frontend/stomp";
import {useEffect} from "react";
import { WebSocket } from 'ws';

export default function App() {
    useEffect(() => {
        const socket = io()
        socket.activate()
        socket.onConnect = (frame)=>{
            console.log('Connected: ' + frame);
        }
        socket.onWebSocketError = (error) => {
            console.error('Error with websocket', error);
        };
        socket.onStompError = (frame) => {
            console.error('Broker reported error: ' + frame.headers['message']);
            console.error('Additional details: ' + frame.body);
        };
    }, []);
    return (
        <Provider store={store}>
            <RouterProvider router={router}/>
        </Provider>
    );
}
