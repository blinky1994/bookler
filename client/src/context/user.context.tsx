import { createContext, useState, Dispatch, SetStateAction, ReactNode, useEffect} from 'react';

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
    const [user, setUser] = useState<IUserAccount | null>(null);

    const fetchUserFromStorage = () => {
        if (!user) {
          const userString = localStorage.getItem('user');
          const userObj = userString ? JSON.parse(userString) : null;
          setUser(userObj);
        }
      }

    useEffect(() => {
        fetchUserFromStorage();
    }, [])
    
    return (
        <UserContext.Provider value={{user, setUser}}>{children}</UserContext.Provider>
    )
}
