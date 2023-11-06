import {AppLayout} from '@hilla/react-components/AppLayout.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder';
import {Suspense, useEffect, useState} from 'react';
import {Navigate, NavLink, Outlet, useNavigate} from 'react-router-dom';
import css from './MainLayout.module.css';
import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {Avatar} from "@hilla/react-components/Avatar";
import {Button} from "@hilla/react-components/Button";
import {logout} from "@hilla/frontend";
import {Tabs} from "@hilla/react-components/Tabs";
import {Tab} from "@hilla/react-components/Tab";
import {AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";
import {useRouteMetadata} from "Frontend/utils/routing";
import {AuthThunks} from "Frontend/redux/feat/auth/authThunks";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import {NavItem} from "Frontend/components/navbar/NavItem";
import {NavSearch} from "Frontend/components/navbar/NavSearch";
import {UserEndpoint} from "Frontend/generated/endpoints";
import {UserTabs} from "Frontend/components/navbar/UserTabs";

export default function MainLayout() {
    const currentTitle = useRouteMetadata()?.title ?? 'My App';

    const user = useAppSelector(AuthSelectors.getCurrentUser());
    const users = useAppSelector(AuthSelectors.getAllUsers());
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    if (!user) return <Navigate to={"/login"} replace/>;

    useEffect(() => {
        dispatch(AuthThunks.getAllUsers());
    }, []);


    return (
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
                <UserTabs userId={user.id} users={users}/>
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
                        <Button onClick={() => navigate("/logout")}>Sign in</Button>
                    )}
                    <Button onClick={() => navigate("/login")}>Sign in</Button>
                </footer>
            </div>

            <Suspense fallback={<Placeholder/>}>
                <Outlet/>
            </Suspense>
        </AppLayout>
    );
}
