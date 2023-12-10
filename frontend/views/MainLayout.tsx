import {AppLayout} from '@hilla/react-components/AppLayout.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder';
import React, {Suspense, useCallback, useEffect, useState} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import css from './MainLayout.module.css';
import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";
import {useRouteMetadata} from "Frontend/utils/routing";
import {AuthThunks} from "Frontend/redux/feat/auth/authThunks";
import {NavSearch} from "Frontend/components/navbar/NavSearch";
import {ChatEndpoint2, UserEndpoint} from "Frontend/generated/endpoints";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import {NavigationSearch} from "Frontend/components/navigation/NavigationSearch";
import {DrawerToggle} from "@hilla/react-components/DrawerToggle";
import {MenuBar} from "@hilla/react-components/MenuBar";
import {createRoot} from "react-dom/client";
import {Img} from "react-image";
import {ChatActions} from "Frontend/redux/feat/chat/chatSlice";
import {MenuBarItem} from "@vaadin/menu-bar/src/vaadin-menu-bar";
import {Avatar} from "Frontend/components/avatar/Avatar";
import {AuthActions} from "Frontend/redux/feat/auth/authSlice";
import Role from "Frontend/generated/com/hillarocket/application/domain/Role";

type EventType = {
    id: string,
    text: string,
    handle: () => void;
}
const iconStyle: React.CSSProperties = {
    boxSizing: 'border-box',
    marginInlineEnd: 'var(--lumo-space-m)',
    marginInlineStart: 'var(--lumo-space-xs)',
    padding: 'var(--lumo-space-xs)',
};
const h1Style = {
    fontSize: 'var(--lumo-font-size-l)',
    margin: 0,
};
const menuComponent = (component: React.ReactNode) => {
    const container = document.createElement('div');
    createRoot(container).render(component);
    return container;
}

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

    const menuBarItems = useCallback(() => {
        console.log("admin", user?.role)
        return (user?.role === Role.ADMIN) ? [
            {
                component: menuComponent(
                    <div style={{cursor: "pointer"}}>
                        <Avatar names={[user?.fullName || "UK"]} size={32}/>
                    </div>
                ),
                children: [
                    {
                        id: "ADMIN",
                        text: 'Admin page',
                        handle: () => navigate("/admin")
                    },
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
                        id: 'SIGN_OUT',
                        text: 'Sign out',
                        handle: () => dispatch(AuthThunks.logout()).then(() => navigate('/login'))
                    },
                ],
            }
        ] : [
            {
                component: menuComponent(
                    <div style={{cursor: "pointer"}}>
                        <Avatar names={[user?.fullName || "UK"]} size={32}/>
                    </div>
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
                        id: 'SIGN_OUT',
                        text: 'Sign out',
                        handle: () => dispatch(AuthThunks.logout()).then(() => navigate('/login'))
                    },
                ],
            }
        ]
    }, [user]);

    useEffect(() => {
        if (!user || !user.id) return;
        const flux = ChatEndpoint2.join(user?.id)
        flux.onNext(message => message && dispatch(ChatActions.sendMessage(message)))
        return () => {
            flux.cancel()
        };
    }, [user, user?.id]);

    const handleSelectedItem = (event: MenuBarItem & EventType) => {
        if (event.id && event.handle) event.handle()
    }

    if (!user) return <></>
    return (
        <AppLayout primarySection="drawer">
            <DrawerToggle slot="navbar"></DrawerToggle>
            <h1 slot="navbar">MyApp</h1>
            <div slot="navbar" className={"w-full flex mr-4 justify-end items-end"}>
                <MenuBar items={menuBarItems()} theme="tertiary-inline"
                         onItemSelected={(event) => handleSelectedItem(event.detail.value as any)}/>;
            </div>
            <div slot="drawer" className={`${css.drawer}`}
                 style={{height: "100vh", backgroundColor: "hsl(214, 100%, 98%)"}}>
                <div className={"flex align-middle mx-0 my-2 mb-4"} style={{cursor: "pointer"}}>
                    <Img src={"images/logo.png"} onClick={() => navigate("/")}
                         style={{width: "40%",}}/>
                    <h1 className={"text-lg md:text-xl lg:text-2xl font-semibold text-center text-gray-800 hover:text-gray-600 transition duration-300 ease-in-out"}
                        style={{lineHeight: "80px"}}>ChatRocket</h1>
                </div>
                <div className="mt-2">
                    {searchState ? <NavigationSearch onClose={() => setSearchState(false)}/> :
                        <NavSearch onFocus={() => setSearchState(true)}/>}
                </div>
            </div>
            <Suspense fallback={<Placeholder/>}>
                <Outlet/>
            </Suspense>
        </AppLayout>
    )
}
