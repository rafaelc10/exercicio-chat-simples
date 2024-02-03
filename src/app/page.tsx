"use client"
import { Chat } from "./components/Chat"
import { Header } from "./components/Header"
import { Login } from "./components/Login"
import { UserProvider, useUserContext } from "./contexts/UserContext"


const App = () => {
  const userCtx = useUserContext();

  return (
    <div className="container max-w-xl mx-auto">
      <Header />
      {!userCtx?.userInfos.isLogged && <Login />}
      {userCtx?.userInfos.isLogged && <Chat />}
    </div>
  )
}

const Page = () => {
  return (
    <UserProvider>
      <App />
    </UserProvider>
  )
}

export default Page