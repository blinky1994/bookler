import { createContext, useState, Dispatch, SetStateAction, ReactNode} from 'react';

export interface IUserAccount {
    id: string;
    email: string;
}

interface IUserContext {
    user: IUserAccount | null;
    setUser: Dispatch<SetStateAction<IUserAccount | null>>;
}

const initialValue = {
    id: '',
    email: ''
}

export const UserContext = createContext<IUserContext | null>(null);

interface IUserContextProviderProps {
    children: ReactNode;
  }

export const UserContextProvider : React.FC<IUserContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<IUserAccount | null>(null);
    
    return (
        <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
    )
}
