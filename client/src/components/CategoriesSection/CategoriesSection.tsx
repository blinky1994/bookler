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
        const response = await axios.get('http://localhost:3001/facilities/categories/all');
        const { categories } = response.data;
        setCategories(categories)
      } catch (err: any) {
        console.log('Error fetching categories: ', err.response.data.error);
      }
    }
    fetchCategories();
  }, [])

  return (
    <div className={styles.main}>
        <h2>All Facilities</h2>
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