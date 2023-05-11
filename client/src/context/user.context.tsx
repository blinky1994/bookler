import { createContext, useState, Dispatch, SetStateAction, ReactNode} from 'react';

export interface IUserAccount {
    id: string;
    email: string;
}

interface IUserContext {
    user: IUserAccount | null;
    setUser: Dispatch<SetStateAction<IUserAccount | null>>;
}


export const UserContext = createContext<IUserContext | null>(null);

interface IUserContextProviderProps {
    children: ReactNode;
  }

export const UserContextProvider : React.FC<IUserContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUserAccount | null>({
        id: '74',
        email: "ivanchenyifan@hotmail.com"
    });
    
    return (
        <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
    )
}
