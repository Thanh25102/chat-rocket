import MainLayout from 'Frontend/views/MainLayout.js';
import {lazy} from 'react';
import {createBrowserRouter, RouteObject} from 'react-router-dom';
import LoginView from "Frontend/views/login/LoginView";
import {AuthControl} from "Frontend/views/AuthControl";
import {UserManagement} from "Frontend/views/admin/user/UserManagement";
import RegisterView from "Frontend/views/register/RegisterView";
import MainAdmin from "Frontend/views/admin/MainAdmin";

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
            {path: '/chat-user', element: <ChatView/>, handle: {icon: 'list-alt-solid', title: 'ChatChit'}},
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
    {path: '/register', element: <RegisterView/>},
];

const router = createBrowserRouter([...routes]);
export default router;
