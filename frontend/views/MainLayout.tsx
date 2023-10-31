import {AppLayout} from '@hilla/react-components/AppLayout.js';
import {DrawerToggle} from '@hilla/react-components/DrawerToggle.js';
import Placeholder from 'Frontend/components/placeholder/Placeholder';
import {Suspense, useEffect} from 'react';
import {Navigate, NavLink, Outlet, useNavigate} from 'react-router-dom';
import css from './MainLayout.module.css';
import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {Avatar} from "@hilla/react-components/Avatar";
import {Button} from "@hilla/react-components/Button";
import {logout} from "@hilla/frontend";
import {Tabs} from "@hilla/react-components/Tabs";
import {Tab} from "@hilla/react-components/Tab";
import {Icon} from "@hilla/react-components/Icon";
import {AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";
import {useRouteMetadata} from "Frontend/utils/routing";
import {AuthThunks} from "Frontend/redux/feat/auth/authThunks";

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
                </header>
                <Tabs slot="drawer" orientation="vertical">
                    {
                        users.map((user) =>
                            <Tab key={user.id}>
                                <NavLink to={"/chat-user/" + user.id} tabIndex={-1}>
                                    <Icon icon="vaadin:cart"/>
                                    <span>{user.fullName}</span>
                                </NavLink>
                            </Tab>
                        )
                    }
                </Tabs>
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

            <div style={{display: "flex", alignItems: "center", height: "10vh"}}>
                <DrawerToggle slot="navbar" aria-label="Menu toggle"></DrawerToggle>
                <h2 slot="navbar" className="text-l m-0">
                    {currentTitle}
                </h2>
            </div>
            <Suspense fallback={<Placeholder/>}>
                <Outlet/>
            </Suspense>
        </AppLayout>
    );
}
