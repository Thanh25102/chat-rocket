import React, {FC, useState} from "react";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import {type ConfirmDialogOpenedChangedEvent,} from '@hilla/react-components/ConfirmDialog.js';
import {CreateGroup} from "Frontend/components/dialog/create-group";
import {ConversationTabs} from "Frontend/components/navbar/ConversationTabs";
import {TextField} from "@hilla/react-components/TextField";
import {useAppSelector} from "Frontend/redux/hooks";
import {ChatSelectors} from "Frontend/redux/feat/chat/chatSelectors";

type Props = {
    onFocus?: () => void;
    title?: string;
}
export const NavSearch: FC<Props> = ({title, onFocus}) => {
    const [dialogOpened, setDialogOpened] = useState(true);
    const [status, setStatus] = useState('');
    const conversations = useAppSelector(ChatSelectors.getAllConversation());

    function openedChanged(event: ConfirmDialogOpenedChangedEvent) {
        setDialogOpened(event.detail.value);
        if (event.detail.value) {
            setStatus('');
        }
    }

    return <>
        <HorizontalLayout className="flex justify-center space-x-4">
            <TextField
                placeholder="Search..."
                className="rounded-md w-3/5"
                onFocus={onFocus}
            />
            <CreateGroup openedChanged={openedChanged} handleStatus={setStatus} opened={dialogOpened}/>
        </HorizontalLayout>
        <ConversationTabs conversations={conversations}/>
    </>
}
