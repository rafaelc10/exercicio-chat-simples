import { useUserContext } from "../contexts/UserContext"
import { MessageType } from "../types/MessageType";

type Props = {
    messageItem: MessageType
}


export const ChatItem = (props: Props) => {
    const userCtx = useUserContext();

    return (
        <div className={`border-gray-300 border max-w-[70%] p-1 bg-[#19181A] rounded-md inline-block ${userCtx?.userInfos.user === props.messageItem.username ? 'self-end text-right' : 'self-start text-left'}`}>
            <strong>{props.messageItem.username}</strong>
            <p className="break-words">{props.messageItem.message}</p>
        </div>
    )
}