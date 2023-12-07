import MainLayout from 'Frontend/views/MainLayout.js';
import {lazy} from 'react';
import {createBrowserRouter, RouteObject} from 'react-router-dom';
import LoginView from "Frontend/views/login/LoginView";
import {AuthControl} from "Frontend/views/AuthControl";
import {UserManagement} from "Frontend/views/admin/user/UserManagement";
import RegisterView from "Frontend/views/register/RegisterView";
import MainAdmin from "Frontend/views/admin/MainAdmin";
import ChatReact from "Frontend/views/chat/ChatReact";
import {LoginGoogleView} from "Frontend/views/login-google/LoginGoogle";

const TodoView = lazy(async () => import('Frontend/views/todo/TodoView.js'));
const ChatNormal = lazy(async () => import('Frontend/views/chat/ChatGPT/ChatNormal'));
const ChatStreaming = lazy(async () => import('Frontend/views/chat/ChatGPT/ChatStreaming'));

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
            {path: '/chat-bot-normal', element: <ChatNormal/>, handle: {icon: 'list-alt-solid', title: 'ChatGPT'}},
            {path: '/chat-bot-streaming', element: <ChatStreaming/>, handle: {icon: 'list-alt-solid', title: 'ChatGPT'}},
            {path: '/chat-user', element: <ChatReact/>, handle: {icon: 'list-alt-solid', title: 'ChatChit'}},
        ],
    },
    {
        element: (
            <AuthControl>
                <MainAdmin/>
            </AuthControl>
        ),
        handle: {icon: 'null', title: 'Main'},
        children: [
            {path: '/admin', element: <TodoView/>, handle: {icon: 'list-alt-solid', title: 'Todo'}},
            {path: '/admin/user', element: <UserManagement/>, handle: {icon: 'list-alt-solid', title: 'User Mangement'}}
        ],
    },
    {path: '/login', element: <LoginView/>},
    // {path: '/login', element: <LoginGoogleView/>},
    {path: '/register', element: <RegisterView/>},
];

const router = createBrowserRouter([...routes]);
export default router;
