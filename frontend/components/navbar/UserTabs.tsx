import {FC, useEffect, useState} from "react";
import {Tabs} from "@hilla/react-components/Tabs";
import {Tab} from "@hilla/react-components/Tab";
import {NavLink} from "react-router-dom";
import {NavItem} from "Frontend/components/navbar/NavItem";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {UserEndpoint} from "Frontend/generated/endpoints";
import OnlineEvent from "Frontend/generated/com/hillarocket/application/dto/OnlineEvent";
import {AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";
import User from "Frontend/generated/com/hillarocket/application/domain/User";
import UserStatus from "Frontend/generated/com/hillarocket/application/enumration/UserStatus";

type Props = {
    users?: User[];
}
export const UserTabs: FC<Props> = ({users = []}) => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(AuthSelectors.getCurrentUser());
    if (!user?.id) return <></>

    const getConversationByUserId = async (id?: string) => {
        if (!id || !user?.id) return;
        dispatch(ChatThunks.getConversationByUserIds({u1: id, u2: user?.id}));
    }

    const [usersOnline, setUsersOnline] = useState<string[]>([]);

    const handleUserOnline = (event: OnlineEvent) => {
        if (event.status === UserStatus.ONLINE) setUsersOnline(prev => [...prev, event.userId])
        if (event.status === UserStatus.OFFLINE) setUsersOnline(prev => prev.filter(id => id !== event.userId))
    }

    useEffect(() => {
        UserEndpoint.findUsersOnline()
            .then(usersId => setUsersOnline(usersId || []));

        const onlineFlux = UserEndpoint.join()
            .onNext(event => handleUserOnline(event));

        return () => {
            onlineFlux.cancel()
        }
    }, []);

    return <Tabs slot="drawer" orientation="vertical">
        {
            users.map((u) => (user?.id !== u.id) &&
                <Tab key={u.id}>
                    <NavLink to={"/chat-user"} tabIndex={-1} className="flex justify-between gap-x-6 py-3 "
                             onClick={() => getConversationByUserId(u.id)}>
                        <NavItem fullName={u.fullName} message={u.email}
                                 isOnline={usersOnline.find(id => u.id === id) !== undefined}/>
                    </NavLink>
                </Tab>
            )
        }
    </Tabs>
}
