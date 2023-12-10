import React, {FC, useCallback, useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import {Tabs} from "@hilla/react-components/Tabs";
import {Tab} from "@hilla/react-components/Tab";
import {NavLink} from "react-router-dom";
import {NavItem} from "Frontend/components/navbar/NavItem";
import ConversationMessage from "Frontend/generated/com/hillarocket/application/dto/ConversationMessage";
import {UserEndpoint} from "Frontend/generated/endpoints";
import OnlineEvent from "Frontend/generated/com/hillarocket/application/dto/OnlineEvent";
import UserStatus from "Frontend/generated/com/hillarocket/application/enumration/UserStatus";
import {AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";
import ConversionType from "Frontend/generated/com/hillarocket/application/enumration/ConversionType";

type Props = {
    conversations?: ConversationMessage[]
}
export const ConversationTabs: FC<Props> = ({conversations = []}) => {
    const dispatch = useAppDispatch();
    const curUser = useAppSelector(AuthSelectors.getCurrentUser());

    const getConversationById = async (id?: string) => {
        if (!id) return;
        dispatch(ChatThunks.getCurrentConversation(id));
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

        return () => onlineFlux.cancel()
    }, []);

    const handleConversationOnline = useCallback((conversation: ConversationMessage) => {
        return conversation.users.find(user => user.id !== curUser?.id && usersOnline.includes(user?.id || "")) !== undefined
    }, [usersOnline])

    return <Tabs slot="drawer" orientation="vertical">
        <Tab key={"/chat-bot-streaming"}>
            <NavLink to={"/chat-bot-streaming"} tabIndex={-1} className="flex justify-between gap-x-6 py-3">
                <NavItem conversation={{
                    conversationId: "chat-gpt-key",
                    messages: [],
                    conversationName: "ChatRocket bot support",
                    users: [{fullName: "AI Support"}],
                    conversionType: ConversionType.SINGLE,
                }} isOnline={true}/>
            </NavLink>
        </Tab>
        {
            conversations.map((c) =>
                <Tab key={c.conversationId}>
                    <NavLink to={"/chat-user"} tabIndex={-1} className="flex justify-between gap-x-6 py-3"
                             onClick={() => getConversationById(c.conversationId)}>
                        <NavItem conversation={c}
                                 isOnline={handleConversationOnline(c)}/>
                    </NavLink>
                </Tab>
            )
        }
    </Tabs>
}