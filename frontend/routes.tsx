import MainLayout from 'Frontend/views/MainLayout.js';
import {lazy} from 'react';
import {createBrowserRouter, RouteObject} from 'react-router-dom';
import LoginView from "Frontend/views/auth/login/LoginView";
import {AuthControl} from "Frontend/views/AuthControl";
import {UserManagement} from "Frontend/views/admin/user/UserManagement";
import RegisterView from "Frontend/views/auth/register/RegisterView";
import SendCodeView from "Frontend/views/auth/code/SendCodeView";
import MainAdmin from "Frontend/views/admin/MainAdmin";
import AuthLayout from "Frontend/views/AuthLayout";
import IdentifyAccount from "Frontend/views/auth/account/IdentifyAccount";
import RecoverOption from "Frontend/views/auth/option/RecoverOption";
import ChangePassword from "Frontend/views/auth/password/ChangePassword";

const TodoView = lazy(async () => import('Frontend/views/todo/TodoView.js'));
const ChatNormal = lazy(async () => import('Frontend/views/chat/ChatGPT/ChatNormal'));
const ChatStreaming = lazy(async () => import('Frontend/views/chat/ChatGPT/ChatStreaming'));
const ChatChit = lazy(async () => import('Frontend/views/chat/ChatChit'));

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
            {path: '/chat-user', element: <ChatChit/>, handle: {icon: 'list-alt-solid', title: 'ChatChit'}},
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
    {
        element: (
            <AuthLayout/>
        ),
        handle: {icon: 'null', title: 'Authentication'},
        children: [
            {path: '/login', element: <LoginView/>},
            {path: '/register', element: <RegisterView/>},
            {path: '/recover/code', element: <SendCodeView/>},
            {path: '/recover/password', element: <ChangePassword/>},
            {path: '/login/identify', element: <IdentifyAccount/>},
            {path: '/login/recover/option', element: <RecoverOption/>},
        ],
    },
];

const router = createBrowserRouter([...routes]);
export default router;
