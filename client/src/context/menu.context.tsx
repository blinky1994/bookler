import { createContext, useState, Dispatch, SetStateAction, ReactNode} from 'react';

interface IMenuContext {
    menu: boolean;
    setMenu: Dispatch<SetStateAction<boolean>>;
}

const initialValue = {
    menu: false,
    setMenu: () => {}
}

export const MenuContext = createContext<IMenuContext>(initialValue);

interface IMenuContextProviderProps {
    children: ReactNode;
  }

export const MenuContextProvider : React.FC<IMenuContextProviderProps> = ({ children }) => {
    const [menu, setMenu] = useState<boolean>(false);
    
    return (
        <MenuContext.Provider value={{menu, setMenu}}>{children}</MenuContext.Provider>
    )
}
