// import { useContext } from 'react';
// import styles from './CategoriesSection.module.scss';
// import CategoryCard from './CategoryCard/CategoryCard';

// const CategoriesSection = () => {
//   const { categories } = useContext(CategoriesContext);
//   console.log(categories);
//   return (
//     <div className={styles.main}>
//         <h2>Select a facility</h2>
//         <div className={styles.cardsSection}>
//             {
//                 categories.map((categoryObj, idx) => 
//                 <CategoryCard 
//                   key={categoryObj.name + idx}
//                   id={categoryObj.id}
//                   name={categoryObj.name}
//                 />)
//             }
            
//         </div>
//     </div>
//   )
// }

// export default CategoriesSection