import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import {TextField} from "@hilla/react-components/TextField";
import {Button} from "@hilla/react-components/Button";
import {FC, useEffect, useState} from "react";
import {UserTabs} from "Frontend/components/navbar/UserTabs";
import {ConversationTabs} from "Frontend/components/navbar/ConversationTabs";
import User from "Frontend/generated/com/hillarocket/application/domain/User";
import useDebounce from "Frontend/hooks/useDebounce";
import {ChatEndpoint, UserEndpoint} from "Frontend/generated/endpoints";
import useDidUpdate from "Frontend/hooks/useDidUpdate";
import ConversationMessage from "Frontend/generated/com/hillarocket/application/dto/ConversationMessage";
import {Tabs} from "@hilla/react-components/Tabs";
import {Tab} from "@hilla/react-components/Tab";

type Props = {
    onClose?: () => void
}
export const NavigationSearch: FC<Props> = ({onClose}) => {

    const [users, setUsers] = useState<User[]>([]);
    const [conversations, setConversations] = useState<ConversationMessage[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const debouncedTerm = useDebounce(searchValue);

    useEffect(() => {
        UserEndpoint.searchUser(debouncedTerm).then(res => setUsers(res || []))
        ChatEndpoint.getConversationGroupByName(debouncedTerm).then(res => setConversations(res || []))
    }, [debouncedTerm])

    const [value, setValue] = useState(0);

    const selectedChanged = (e: any) => {
        setValue(e.detail.value);
    };

    return <div>
        <HorizontalLayout className="flex justify-center space-x-4">
            <TextField
                placeholder="Search..."
                className="rounded-md w-3/5"
                onValueChanged={e => setSearchValue(e.detail.value)}
            />
            <Button className={"w-1/4"} onClick={onClose}>Close</Button>
        </HorizontalLayout>
        <Tabs selected={value} onSelectedChanged={selectedChanged}>
            <Tab id="group">
                <span>Groups</span>
                <span {...{theme: 'badge small contrast'}} style={badgeStyle}>{conversations.length}</span>
            </Tab>
            <Tab id="user">
                <span>Users</span>
                <span {...{theme: 'badge small contrast'}} style={badgeStyle}>{users.length}</span>
            </Tab>
        </Tabs>
        <div>
            {value === 0 && <ConversationTabs conversations={conversations}/>}
            {value === 1 && <UserTabs users={users}/>}
        </div>
    </div>
}
const badgeStyle = {
    marginInlineStart: 'var(--lumo-space-xs)',
};