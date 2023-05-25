import { useEffect, useState } from 'react';
import styles from './CategoriesSection.module.scss';
import CategoryCard from './CategoryCard/CategoryCard';
import axios from 'axios';
import { ICategory } from '../../interfaces/interfaces';

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || ''}/api/facilities/categories/all`);
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
                categories.length > 0 && 
                categories.map((categoryObj: ICategory, idx) => 
                <CategoryCard 
                  key={categoryObj.name + idx}
                  {...categoryObj}
                />)
            }
            
        </div>
    </div>
  )
}

export default CategoriesSection