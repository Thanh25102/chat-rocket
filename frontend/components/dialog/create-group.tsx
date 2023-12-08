import {ConfirmDialogOpenedChangedEvent} from "@hilla/react-components/ConfirmDialog";
import {TextField} from "@hilla/react-components/TextField";
import React, {useCallback, useEffect, useState} from "react";
import User from "Frontend/generated/com/hillarocket/application/domain/User";
import {UserEndpoint} from "Frontend/generated/endpoints";
import useDebounce from "Frontend/hooks/useDebounce";
import {UsersSelect} from "Frontend/components/dialog/UsersSelect/users-select";
import {Button} from "@hilla/react-components/Button";

import {Dialog} from '@hilla/react-components/Dialog.js';

import {MdOutlineGroupAdd} from "react-icons/md";
import {UsersSelected} from "Frontend/components/dialog/UsersSelected/users-selected";
import {useAppDispatch} from "Frontend/redux/hooks";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";
import {Scroller} from "@hilla/react-components/Scroller";

export const CreateGroup = ({opened = true, openedChanged, handleStatus}: {
    opened: boolean,
    openedChanged: (e: ConfirmDialogOpenedChangedEvent) => void,
    handleStatus: (status: string) => void
}) => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchValue, setSearchValue] = useState("");
    const debouncedTerm = useDebounce(searchValue);

    const dispatch = useAppDispatch();

    useEffect(() => {
        UserEndpoint.searchUser(debouncedTerm).then(res => setUsers(res || []))
    }, [debouncedTerm])

    const [usersSelected, setUsersSelected] = useState<string[]>([]);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setUsersSelected([])
        setOpen(true);
    };

    const handleCreateConversation = () => {
        dispatch(ChatThunks.createConversation({
            name: conversationName,
            userIds: usersSelected
        })).then(handleClose);
    }

    const handleClose = () => {
        setUsersSelected([]);
        setOpen(false);
    }

    useEffect(() => {
        if (!open) setUsersSelected([])
    }, [open]);

    const [conversationName, setConversationName] = useState("");

    const handleUsersSelected = (usersSelected: string[]) => setUsersSelected(usersSelected);

    const getUsersSelected = useCallback(() => {
        return users.filter(u => usersSelected.includes(u.id || ""));
    }, [usersSelected])

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} className={"w-1/4"}>
                <MdOutlineGroupAdd size={"20"}/>
            </Button>
            <Dialog
                opened={open}
                onOpenedChanged={({detail}) => {
                    setOpen(detail.value);
                }}
                footerRenderer={() => (
                    <>
                        <Button onClick={handleClose}>Disagree</Button>
                        <Button onClick={handleCreateConversation}>
                            Agree
                        </Button>
                    </>
                )}
                headerTitle="Create conversation?"
            >
                <div style={{height: "60vh"}} className={"overflow-y-hidden"}>
                    <TextField placeholder={"Enter name or email of user . . .   "} className={"w-full"}
                               onChange={(e) => setSearchValue(e.target.value)}/>
                    <TextField placeholder={"Enter name of conversation . . . "} className={"w-full"}
                               onChange={(e) => setConversationName(e.target.value)}/>
                    <Scroller className="flex h-[90%] " scrollDirection="vertical"
                              style={{
                                  borderBottom: '1px solid var(--lumo-contrast-20pct)',
                                  padding: 'var(--lumo-space-m)',
                              }}>
                        <UsersSelect users={users} setUsersSelected={handleUsersSelected}></UsersSelect>
                        <hr className="border w-[0.5px] h-[100%]"
                            style={{backgroundColor: "var(--lumo-contrast-20pct)"}}></hr>
                        <UsersSelected users={getUsersSelected()}/>
                    </Scroller>
                </div>
            </Dialog>
        </React.Fragment>
    );
}