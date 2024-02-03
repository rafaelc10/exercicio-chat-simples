import { UserInfos } from "../types/UserInfos";
import { MessageType } from "../types/MessageType";

type addAction = {
    type: 'add';
    payload: {
        messageList: MessageType[];
    }
}

type toggleLogged = {
    type: 'toggleLogin';
    payload: {
        user: string,
        isLogged: boolean;
    }
}

type clearAction = {
    type: 'clear',
    payload: {
        user: string;
        isLogged: boolean;
        messageList: MessageType[];
    }
}

export type UserActions = addAction | toggleLogged | clearAction;

export const userReducer = (userInfo: UserInfos, action: UserActions) => {
    switch (action.type) {
        case 'add':
            return {
                ...userInfo, messageList: [
                    ...userInfo.messageList,
                    ...action.payload.messageList
                ]
            };
        case 'toggleLogin':
            return { ...userInfo, user: action.payload.user, isLogged: action.payload.isLogged }
        case 'clear':
            return {...userInfo, user: '', isLogged: false, messageList: []}
        default:
            return userInfo
    }
}