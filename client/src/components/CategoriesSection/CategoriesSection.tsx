import { useContext, useEffect, useState } from 'react';
import styles from './CategoriesSection.module.scss';
import CategoryCard from './CategoryCard/CategoryCard';
import axios from 'axios';
import { ICategory } from '../../context/categories.context';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3001/facilities/categories');
        const { categories } = response.data;
        setCategories(categories)
        console.log('fetched: ', categories);
      } catch (err: any) {
        console.log('Error logging in: ', err.response.data.error);
      }
    }
    fetchCategories();
  }, [])

  return (
    <div className={styles.main}>
        <h2>Select a facility</h2>
        <div className={styles.cardsSection}>
          {
                categories.length && 
                categories.map((categoryObj: ICategory, idx) => 
                <CategoryCard 
                  key={categoryObj.name + idx}
                  id={categoryObj.id}
                  name={categoryObj.name}
                />)
            }
            
        </div>
    </div>
  )
}

export default CategoriesSection