import {AppLayout} from '@hilla/react-components/AppLayout.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder';
import React, {Suspense, useEffect, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import css from './MainLayout.module.css';
import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {Avatar} from "@hilla/react-components/Avatar";
import {AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";
import {useRouteMetadata} from "Frontend/utils/routing";
import {AuthThunks} from "Frontend/redux/feat/auth/authThunks";
import {NavSearch} from "Frontend/components/navbar/NavSearch";
import {UserEndpoint} from "Frontend/generated/endpoints";
import {AuthActions} from "Frontend/redux/feat/auth/authSlice";
import UserStatus from "Frontend/generated/com/hillarocket/application/enumration/UserStatus";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import {NavigationSearch} from "Frontend/components/navigation/NavigationSearch";
import {DrawerToggle} from "@hilla/react-components/DrawerToggle";
import {MenuBar} from "@hilla/react-components/MenuBar";
import {createRoot} from "react-dom/client";
import {Img} from "react-image";

export default function MainLayout() {
    const currentTitle = useRouteMetadata()?.title ?? 'My App';
    const user = useAppSelector(AuthSelectors.getCurrentUser());
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [searchState, setSearchState] = useState(false);

    useEffect(() => {
        if (!user || !user.id) return;
        dispatch(ChatThunks.getConversationByUserId(user.id)).then(() => console.log("ceheck"))
    }, [user, user?.id]);

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

    const menuComponent = (component: React.ReactNode) => {
        const container = document.createElement('div');
        createRoot(container).render(component);
        return container;
    }
    const menuBarItems = [
        {
            component: menuComponent(
                <Avatar/>
            ),
            children: [
                {
                    text: 'Profile',
                },
                {
                    text: 'Settings',
                },
                {
                    text: 'Help',
                },
                {
                    text: 'Sign out',
                },
            ],
        },
    ];
    return user ? (
        <AppLayout primarySection="drawer">
            <DrawerToggle slot="navbar"></DrawerToggle>
            <h1 slot="navbar">MyApp</h1>
            <div slot="navbar" className={"w-full flex mr-4 justify-end items-end"}>
                <MenuBar items={menuBarItems} theme="tertiary-inline"/>;
            </div>
            <div slot="drawer" className={`${css.drawer}`}>
                <Img src={"images/logo.png"}/>
                <div className="mt-2">
                    {searchState ? <NavigationSearch onClose={() => setSearchState(false)}/> :
                        <NavSearch onFocus={() => setSearchState(true)}/>}
                </div>
                <footer className="flex flex-col gap-s">
                </footer>
            </div>
            <Suspense fallback={<Placeholder/>}>
                <Outlet/>
            </Suspense>
        </AppLayout>
    ) : <></>;
}
