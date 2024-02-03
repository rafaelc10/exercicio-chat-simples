import { KeyboardEvent, useEffect, useRef, useState } from "react"
import { useUserContext } from "../contexts/UserContext"
import { ChatItem } from "./ChatItem"

export const Chat = () => {
    const userCtx = useUserContext()

    const [userInput, setUserInput] = useState('');
    const [botInput, setBotInput] = useState('');

    const chatArea = useRef<HTMLDivElement>(null);

    const handleAddMessage = (e: KeyboardEvent<HTMLInputElement>, user: string | undefined, inputSource: 'user' | 'bot') => {
        const inputVal = inputSource === 'user' ? userInput : botInput;

        if (e.key === 'Enter' && userCtx?.userInfos.user !== undefined && userCtx.userInfos.isLogged && inputVal.trim() !== '') {
            userCtx?.dispatch({
                type: "add",
                payload: {
                    messageList: [
                        {
                            message: user === userCtx.userInfos.user ? userInput : botInput,
                            username: user ?? ''
                        }
                    ]
                }

            })
            user === userCtx.userInfos.user ? setUserInput('') : setBotInput('')
        }
    }

    useEffect(() => {
        if(chatArea.current) {
            chatArea.current.scrollTop = chatArea.current.scrollHeight; 
        }
    }, [userCtx?.userInfos.messageList])

    return (
        <div className="flex flex-col border-gray-300 border rounded-sm">
            <div ref={chatArea} className="h-96 p-4 flex flex-col gap-4 overflow-auto">
                {
                    userCtx?.userInfos.messageList.map((message, key) => (
                        <ChatItem messageItem={message} key={key} />
                    ))
                }
            </div>
            <input onChange={(e) => setUserInput(e.target.value)} value={userInput} onKeyUp={(e) => {handleAddMessage(e, userCtx?.userInfos.user, 'user')}} placeholder={`${userCtx?.userInfos.user} digite uma mensagem (e aperte enter)`} className="border-gray-300 border bg-transparent py-2 px-3" type="text" />
            <input onKeyUp={(e) => handleAddMessage(e, 'bot', 'bot')} onChange={(e) => setBotInput(e.target.value)} value={botInput} placeholder="bot, digite uma mensagem (e aperte enter)" className="border-gray-300 border bg-transparent py-2 px-3" type="text" />
            <button className="py-2" onClick={() => userCtx?.dispatch({ type: 'clear', payload: { isLogged: false, user: '', messageList: [] } })}>Sair</button>
        </div>
    )
}