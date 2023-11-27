import {ConfirmDialogOpenedChangedEvent} from "@hilla/react-components/ConfirmDialog";
import {TextField} from "@hilla/react-components/TextField";
import React, {useEffect, useState} from "react";
import User from "Frontend/generated/com/hillarocket/application/domain/User";
import {UserEndpoint} from "Frontend/generated/endpoints";
import useDebounce from "Frontend/hooks/useDebounce";
import {UsersSelect} from "Frontend/components/dialog/UsersSelect/users-select";
import {Button} from "@hilla/react-components/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import {MdOutlineGroupAdd} from "react-icons/md";
import {UsersSelected} from "Frontend/components/dialog/UsersSelected/users-selected";
import {useAppDispatch} from "Frontend/redux/hooks";
import {ChatThunks} from "Frontend/redux/feat/chat/chatThunks";

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

    const [usersSelected, setUsersSelected] = useState<User[]>([]);

    const handleAddUserSelected = (user: User) => {
        setUsersSelected(prev => [...prev, user])
    }

    const handleRemoveUserSelected = (id: String) => {
        setUsersSelected(prev => [...prev.filter(u => u.id !== id)])
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setUsersSelected([])
        setOpen(true);
    };

    const handleCreateConversation = () => {
        dispatch(ChatThunks.createConversation({
            name: conversationName,
            userIds: usersSelected.map(u => u.id)
        })).then(() => {
            setUsersSelected([]);
            handleClose();
        });
    }

    const handleClose = () => {
        setUsersSelected([])
        setOpen(false);
    };
    const [conversationName, setConversationName] = useState("");

    return (
        <React.Fragment>
            <Button onClick={handleClickOpen} className={"w-1/4"}>
                <MdOutlineGroupAdd size={"20"}/>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Create conversation?"}
                </DialogTitle>
                <DialogContent>
                    <TextField placeholder={"Enter name or email of user . . . "} className={"w-full"}
                               onChange={(e) => setSearchValue(e.target.value)}/>
                    <TextField placeholder={"Enter name of conversation . . . "} className={"w-full"}
                               onChange={(e) => setConversationName(e.target.value)}/>
                    <div className="flex">
                        <UsersSelect users={users} className={""} onAddUser={handleAddUserSelected}
                                     onRemoveUser={handleRemoveUserSelected}></UsersSelect>
                        <UsersSelected onRemoveUser={handleRemoveUserSelected} users={usersSelected}
                                       className={"border rounded-l"}></UsersSelected>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Disagree</Button>
                    <Button onClick={handleCreateConversation}>
                        Agree
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}