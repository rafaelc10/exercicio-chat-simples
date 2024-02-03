import { Dispatch, ReactNode, createContext, useContext, useReducer } from "react";
import { UserActions, userReducer } from "../reducers/userReducer";
import { UserInfos } from "../types/UserInfos";

type UserContextType = {
    userInfos: UserInfos,
    dispatch: Dispatch<UserActions>;
}


export const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children}: {children: ReactNode}) => {
    const initialState: UserInfos = {
        user: '',
        isLogged: false,
        messageList: []
    }

    const [userInfos, dispatch] = useReducer(userReducer, initialState);

    return (
        <UserContext.Provider value={{userInfos, dispatch}}>
            {children}
        </UserContext.Provider>
    )
}

export const useUserContext = () => useContext(UserContext);