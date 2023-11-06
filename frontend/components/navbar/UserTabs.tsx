import {FC, useEffect, useState} from "react";
import {Tabs} from "@hilla/react-components/Tabs";
import {Tab} from "@hilla/react-components/Tab";
import {NavLink} from "react-router-dom";
import {NavItem} from "Frontend/components/navbar/NavItem";
import User from "Frontend/generated/com/hillarocket/application/domain/User";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import {useAppDispatch} from "Frontend/redux/hooks";
import {UserEndpoint} from "Frontend/generated/endpoints";

type Props = {
    users?: User[];
    userId?: string;
}
export const UserTabs: FC<Props> = ({users = [], userId}) => {
    const dispatch = useAppDispatch();
    if (!userId) return <></>

    const getConversationByUserId = async (id?: string) => {
        if (!id || !userId) return;
        dispatch(ChatThunks.getConversationByUserIds({u1: id, u2: userId}));
    }

    const [usersOnline, setUsersOnline] = useState<string[]>([]);

    console.log("usersOnline: ", usersOnline)
    useEffect(() => {
        const onlineFlux = UserEndpoint.join()
            .onNext(userId => setUsersOnline(prev => [...prev, userId]));
        return () => onlineFlux.cancel()
    }, []);

    return <Tabs slot="drawer" orientation="vertical">
        {
            users.map((u) => (userId !== u.id) &&
                <Tab key={u.id}>
                    <NavLink to={"/chat-user"} tabIndex={-1} className="flex justify-between gap-x-6 py-3"
                             onClick={() => getConversationByUserId(u.id)}>
                        <NavItem fullName={u.fullName} message={u.email}
                                 isOnline={usersOnline.find(id => u.id === id) !== undefined}/>
                    </NavLink>
                </Tab>
            )
        }
    </Tabs>
}
