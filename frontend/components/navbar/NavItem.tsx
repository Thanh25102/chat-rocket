import {FC} from "react";
import {Avatar} from "@hilla/react-components/Avatar";

type Props = {
    fullName?: string;
    message?: string;
    isOnline?: boolean;
}
export const NavItem: FC<Props> = ({fullName, message, isOnline}) => {
    return <div className="flex items-center min-w-0 gap-x-4 ">
        <div className="relative">
            <Avatar img="http://localhost:8080/images/user.png"/>
            <span
                className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ${isOnline ? 'bg-green' : 'bg-yellow-500'} border-2 border-white`}/>
        </div>
        <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900">{fullName}</p>
            <p className="mt-1 truncate text-xs leading-5 text-gray-500">{message}</p>
        </div>
    </div>
}
