import { createContext, useState, useEffect, Dispatch, SetStateAction, ReactNode} from 'react';
import axios from 'axios';

interface ICategoriesContext {
    categories: ICategories;
    setCategories: Dispatch<SetStateAction<ICategories>>;
}

export interface ITimeslot {
    start_time: Date;
    end_time: Date;
    isBooked: boolean;
}

export interface IFacility {
    name: string;
    category: string;
    description: string;
    timeslots: ITimeslot[]
}

export interface ICategory {
    category: string;
    facilities: IFacility[]
}

type ICategories = ICategory[];
  

const initialValue = {
    categories: [],
    setCategories: () => {}
}

export const CategoriesContext = createContext<ICategoriesContext>(initialValue);

interface ICategoriesContextProviderProps {
    children: ReactNode;
}

export const CategoriesContextProvider : React.FC<ICategoriesContextProviderProps> = ({ children }) => {
    const [categories, setCategories] = useState<ICategories>([]);

    useEffect(() => {
      async function fetchCategories() {
        try {
            const categories = (await axios.get('http://localhost:3001/facilities/categories')).data;
            setCategories(categories);
            console.log('Set category:', categories);
        } catch(err) {
            console.log('Error fetching categories: ', err);
        }
      }
      
      fetchCategories();

    }, [])
    
    
    return (
        <CategoriesContext.Provider value={{categories, setCategories}}>{children}</CategoriesContext.Provider>
    )
}
