import {FC, useEffect, useState} from "react";
import User from "Frontend/generated/com/hillarocket/application/domain/User";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';

type Props = {
    users?: User[],
    usersSelected?: User[],
    className?: string,
    onAddUser: (user: User) => void,
    onRemoveUser: (id: string) => void
}
export const UsersSelect: FC<Props> = ({users = [], className, usersSelected, onAddUser, onRemoveUser}) => {

    const [checked, setChecked] = useState([0]);

    const handleToggle = (value: number, user: User) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            onAddUser(user)
            newChecked.push(value);
        } else {
            onRemoveUser(user.id || "")
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    return (<List>
            {users.map((user, index) => {
                const labelId = `checkbox-list-label-${user.id}`;
                return (
                    <ListItem
                        key={user.id}
                        secondaryAction={
                            <IconButton edge="end" aria-label="comments">
                                {/*<CommentIcon/>*/}
                            </IconButton>
                        }
                        disablePadding
                    >
                        <ListItemButton role={undefined} onClick={handleToggle(index, user)} dense>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(index) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{'aria-labelledby': labelId}}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={user.fullName}/>
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    )
}