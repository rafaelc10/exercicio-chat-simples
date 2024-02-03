import { useState } from "react";
import { useUserContext } from "../contexts/UserContext"

export const Login = () => {
    const userCtx = useUserContext();

    const [nameInput, setNameInput] = useState('');

    const handleBtnLogin = () => {
        if(nameInput && nameInput.toLocaleLowerCase() !== 'bot') {
            userCtx?.dispatch({
                type: 'toggleLogin',
                payload: {
                    isLogged: true,
                    user: nameInput
                }
            })
        }
    }

    return (
        <div className="mt-12">
            <p>Qual seu nome?</p>
            <div className="flex gap-2">
                <input onKeyUp={(e) => e.key === 'Enter' ? handleBtnLogin() : ''} onChange={(e) => setNameInput(e.target.value)} value={nameInput} className="bg-gray-900 border flex-1 border-gray-400 rounded-sm px-3" type="text" />
                <button onClick={handleBtnLogin} className="bg-gray-900 border border-gray-400 px-3 py-2 rounded-sm">Iniciar Chat</button>
            </div>
        </div>
    )
}