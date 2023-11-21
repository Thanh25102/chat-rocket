import {AppLayout} from '@hilla/react-components/AppLayout.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder';
import React, {Suspense, useEffect, useState} from 'react';
import {NavLink, Outlet, useNavigate} from 'react-router-dom';
import css from './MainLayout.module.css';
import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {Avatar} from "@hilla/react-components/Avatar";
import {Button} from "@hilla/react-components/Button";
import {AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";
import {useRouteMetadata} from "Frontend/utils/routing";
import {AuthThunks} from "Frontend/redux/feat/auth/authThunks";
import {NavSearch} from "Frontend/components/navbar/NavSearch";
import {ChatEndpoint, UserEndpoint} from "Frontend/generated/endpoints";
import {UserTabs} from "Frontend/components/navbar/UserTabs";
import {AuthActions} from "Frontend/redux/feat/auth/authSlice";
import UserStatus from "Frontend/generated/com/hillarocket/application/enumration/UserStatus";
import {ConversationTabs} from "Frontend/components/navbar/ConversationTabs";
import Conversation from "Frontend/generated/com/hillarocket/application/domain/Conversation";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import {ChatSelectors} from "Frontend/redux/feat/chat/chatSelectors";

export default function MainLayout() {
    const currentTitle = useRouteMetadata()?.title ?? 'My App';
    const user = useAppSelector(AuthSelectors.getCurrentUser());
    const users = useAppSelector(AuthSelectors.getAllUsers());
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const conversations = useAppSelector(ChatSelectors.getAllConversation());

    useEffect(() => {
        if(!user || !user.id) return;
        dispatch(ChatThunks.getConversationByUserId(user.id))
    }, []);

    useEffect(() => {
        (async () => {
            const user = await UserEndpoint.getAuthenticatedUser()
            if (user) {
                dispatch(AuthActions.setCurrentUser(user))
                dispatch(AuthThunks.getAllUsers());
            } else {
                navigate("/login")
            }
        })()
    }, []);

    const logout = () => {
        if (!user) navigate("/login")
        else
            dispatch(AuthThunks.logout()).then(() => {
                UserEndpoint.send({userId: user.id || "", status: UserStatus.OFFLINE})
                navigate("/login")
            })
    }

    return user ? (
        <AppLayout primarySection="drawer">
            <div slot="drawer" className={css.drawer}>
                <header>
                    <h1 className="text-l m-0">My App</h1>
                    <nav>
                        {user && <NavLink to="/">Hello World</NavLink>}
                        {user && <NavLink to="/about">About</NavLink>}
                        {user && <NavLink to="/chat">Chat</NavLink>}
                    </nav>
                    <NavSearch/>
                </header>
                {/*{user && <UserTabs userId={user?.id} users={users}/>}*/}
                {<ConversationTabs conversations={conversations}/>}
                <footer className="flex flex-col gap-s">
                    {user ? (
                        <>
                            <div className="flex items-center gap-s">
                                <Avatar theme="xsmall" name={user.fullName}/>
                                {user.fullName}
                            </div>
                            <Button onClick={async () => logout()}>Sign out</Button>
                        </>
                    ) : (
                        <Button onClick={logout}>Sign out</Button>
                    )}
                    <Button onClick={() => navigate("/login")}>Sign in</Button>
                </footer>
            </div>
            <Suspense fallback={<Placeholder/>}>
                <Outlet/>
            </Suspense>
        </AppLayout>
    ) : <></>;
}
