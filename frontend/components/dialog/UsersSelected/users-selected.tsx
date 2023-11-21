import {FC} from "react";
import User from "Frontend/generated/com/hillarocket/application/domain/User";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import {Avatar} from "@hilla/react-components/Avatar";
import List from "@mui/material/List";

type Props = {
    users?: User[],
    className?: string,
    onRemoveUser: (id: string) => void
}
export const UsersSelected: FC<Props> = ({users = [], className, onRemoveUser}) => {
    return <List className={`${className} min-w-full max-w-full`}>{
        users.map((user) => (
            <HorizontalLayout
                className={"flex items-center justify-between mt-2 bg-blue-500 bg-opacity-10 rounded-full py-2"}>
                <div className={"flex items-center"}>
                    <Avatar
                        name={`${user.fullName}`}
                        theme={"xsmall"}
                    />
                    <p className={"text-xs w-16 overflow-hidden whitespace-nowrap text-overflow-ellipsis"}>
                        {user.fullName}
                    </p>
                </div>
            </HorizontalLayout>
        ))
    }</List>
}