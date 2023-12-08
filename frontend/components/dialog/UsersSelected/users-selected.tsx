import {FC} from "react";
import User from "Frontend/generated/com/hillarocket/application/domain/User";
import {HorizontalLayout} from "@hilla/react-components/HorizontalLayout";
import {Avatar} from "Frontend/components/avatar/Avatar";

type Props = {
    users?: User[],
    className?: string,
}
export const UsersSelected: FC<Props> = ({users = [], className, }) => {
    return <div className={`${className} px-2 w-3/10 mb-8 flex flex-1 flex-col`} style={{alignItems:"center"}}>{
        users.map((user) => (
            <HorizontalLayout key={user.id}
                              className={"flex items-center justify-between mb-2 bg-blue-500 bg-opacity-10 rounded-full py-1 mx-auto w-4/5"}>
                <div className={"flex items-center px-2 w-full"}>
                    <Avatar
                        names={[user?.fullName || "U"]}
                        size={22}
                    />
                    <p className={"text-xs ml-1 truncate"} style={{}}>
                        {user.fullName}
                    </p>
                </div>
            </HorizontalLayout>
        ))
    }
        <div className={"h-[4px]"}></div>
    </div>
}