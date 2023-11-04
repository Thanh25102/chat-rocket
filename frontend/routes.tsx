import MainLayout from 'Frontend/views/MainLayout.js';
import {lazy} from 'react';
import {createBrowserRouter, RouteObject} from 'react-router-dom';
import LoginView from "Frontend/views/login/LoginView";
import {AuthControl} from "Frontend/views/AuthControl";

const TodoView = lazy(async () => import('Frontend/views/todo/TodoView.js'));
const ChatView = lazy(async () => import('Frontend/views/chat/ChatChit'));
const ChatGPT = lazy(async () => import('Frontend/views/chat/ChatGPT.js'));

export const routes: readonly RouteObject[] = [
    {
        element: (
            <AuthControl>
                <MainLayout/>
            </AuthControl>
        ),
        handle: {icon: 'null', title: 'Main'},
        children: [
            {path: '/', element: <TodoView/>, handle: {icon: 'list-alt-solid', title: 'Todo'}},
            {path: '/chat-bot', element: <ChatGPT/>, handle: {icon: 'list-alt-solid', title: 'ChatGPT'}},
            {path: '/chat-user', element: <ChatView/>, handle: {icon: 'list-alt-solid', title: 'ChatChit'}}
        ],
    },
    {path: '/login', element: <LoginView/>},
];

const router = createBrowserRouter([...routes]);
export default router;
