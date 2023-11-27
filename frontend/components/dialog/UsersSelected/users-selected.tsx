import {FC} from "react";
import User from "Frontend/generated/com/hillarocket/application/domain/User";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import List from "@mui/material/List";
import {Avatar} from "Frontend/components/avatar/Avatar";

type Props = {
    users?: User[],
    className?: string,
    onRemoveUser: (id: string) => void
}
export const UsersSelected: FC<Props> = ({users = [], className, onRemoveUser}) => {
    return <List className={`${className} px-2 `}>{
        users.map((user) => (
            <HorizontalLayout key={user.id}
                              className={"flex items-center justify-between mt-2 bg-blue-500 bg-opacity-10 rounded-full py-2 mx-4"}>
                <div className={"flex items-center px-2"}>
                    <Avatar
                        names={[user?.fullName || "U"]}
                        size={22}
                    />
                    <p className={"text-xs w-16 ml-1 overflow-hidden whitespace-nowrap text-overflow-ellipsis"}>
                        {user.fullName}
                    </p>
                </div>
            </HorizontalLayout>
        ))
    }</List>
}