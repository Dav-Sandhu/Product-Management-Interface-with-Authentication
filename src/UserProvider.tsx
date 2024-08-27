import {
    createContext,
    useContext,
    useState,
    ReactNode,
    Dispatch,
    SetStateAction
} from "react"

type UserState = {
    firstName: string,
    lastName: string,
    userName: string,
    password: string
}

type UserProviderProps = {
    children: ReactNode
}

type UserContextType = {
    userInfo: UserState,
    setUserInfo: Dispatch<SetStateAction<UserState>>
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUserInfo = () => {
    return useContext(UserContext)
}

const UserProvider = ({ children }: UserProviderProps) => {    

    const [userInfo, setUserInfo] = useState<UserState>({
        firstName: "",
        lastName: "",
        userName: "",
        password: ""
    })

    return(
        <UserContext.Provider value={{
            userInfo: userInfo, 
            setUserInfo: setUserInfo
        }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider