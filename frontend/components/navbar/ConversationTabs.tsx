import React from "react";
import {useAppDispatch, useAppSelector} from "Frontend/redux/hooks";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import {Tabs} from "@hilla/react-components/Tabs";
import {Tab} from "@hilla/react-components/Tab";
import {NavLink} from "react-router-dom";
import {NavItem} from "Frontend/components/navbar/NavItem";
import ConversationMessage from "Frontend/generated/com/hillarocket/application/dto/ConversationMessage";

type Props = {
    conversations: ConversationMessage[]
}
export const ConversationTabs: React.FC<Props> = ({conversations}) => {
    const dispatch = useAppDispatch();

    const getConversationById = async (id?: string) => {
        if (!id) return;
        dispatch(ChatThunks.getCurrentConversation(id));
    }

    return <Tabs slot="drawer" orientation="vertical">
        {
            conversations.map((c) =>
                <Tab key={c.conversationId}>
                    <NavLink to={"/chat-user"} tabIndex={-1} className="flex justify-between gap-x-6 py-3"
                             onClick={() => getConversationById(c.conversationId)}>
                        <NavItem conversation={c}
                                 isOnline={true}/>
                    </NavLink>
                </Tab>
            )
        }
    </Tabs>
}