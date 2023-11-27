import {FC, useCallback} from "react";
import {useAppSelector} from "Frontend/redux/hooks";
import {AuthSelectors} from "Frontend/redux/feat/auth/authSelectors";
import ConversationMessage from "Frontend/generated/com/hillarocket/application/dto/ConversationMessage";
import {Avatar} from "Frontend/components/avatar/Avatar";

type Props = {
    fullName?: string;
    message?: string;
    isOnline?: boolean;
    conversation?: ConversationMessage;
}
export const NavItem: FC<Props> = ({fullName, message, isOnline, conversation}) => {

    const user = useAppSelector(AuthSelectors.getCurrentUser());
    if (!user) return <></>

    if (!conversation) {
        return <div className="flex items-center min-w-0 gap-x-4 ">
            <div className="relative">
                <Avatar names={[fullName || "U"]} size={28}
                        isOnline={isOnline}/>
                <span
                    style={{zIndex: 1000}}
                    className={`absolute -bottom-1 -right-1 block h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-green' : 'bg-yellow-500'} border-2 border-white`}/>
            </div>
            <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900 truncate">{fullName}</p>
            </div>
        </div>
    }

    const handleConversationName = useCallback(() => {
        if (conversation.conversionType === "GROUP")
            return conversation.conversationName || conversation.users?.map(user => user.fullName).join(", ")
        const member = conversation.users?.find(u => u.id !== user.id);
        return member?.fullName || "Người dùng rocket";
    }, [conversation, user])

    const handleNewestMessage = useCallback(() => {
        if (conversation.messages?.length === 0) return "";
        const newestMsg = conversation.messages[conversation.messages.length - 1]
        return (user.id === newestMsg?.senderId) ? `Bạn: ${newestMsg.messageText}` : `${newestMsg?.senderName} ${newestMsg?.messageText}`
    }, [conversation, user]);

    return <div className="flex items-center min-w-0 gap-x-4 ">
        <div className="relative">
            {conversation?.conversionType === "GROUP" ?
                <Avatar names={conversation.users.map(user => user.fullName || "")} size={28} isOnline={true}/> :
                <Avatar names={[conversation.users.find(u => u.id !== user.id)?.fullName || ""]} size={28}
                        isOnline={true}/>
            }
            <span
                style={{zIndex: 1000}}
                className={`absolute -bottom-1 -right-1 block h-2.5 w-2.5 rounded-full ${isOnline ? 'bg-green' : 'bg-yellow-500'} border-2 border-white`}/>
        </div>

        <div className="min-w-0 flex-auto">
            <p className="text-sm font-semibold leading-6 text-gray-900 truncate">{handleConversationName()}</p>
            <p className="text-xs leading-5 text-gray-600 font-normal truncate">{handleNewestMessage()}</p>
        </div>
    </div>
}
