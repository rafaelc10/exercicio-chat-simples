import { MessageType } from "./MessageType";

export type UserInfos = {
    user: string;
    isLogged: boolean;
    messageList: MessageType[];
}