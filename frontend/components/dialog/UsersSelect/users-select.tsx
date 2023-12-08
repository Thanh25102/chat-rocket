import {FC} from "react";
import User from "Frontend/generated/com/hillarocket/application/domain/User";
import {CheckboxGroup} from "@hilla/react-components/CheckboxGroup";
import {Checkbox} from "@hilla/react-components/Checkbox";

type Props = {
    users?: User[],
    usersSelected?: User[],
    className?: string,
    setUsersSelected: (ids: string[]) => void
}
export const UsersSelect: FC<Props> = ({users = [], className, usersSelected, setUsersSelected}) => {


    return (
        <CheckboxGroup className=" m-0 p-0 w-7/10" theme="vertical"
                       onValueChanged={(event) => setUsersSelected(event.detail.value)}
        >
            {users.map(user => <Checkbox value={user.id} label={user.fullName}/>)}
            <p className={"h-[20px]"}></p>
        </CheckboxGroup>
    )
}