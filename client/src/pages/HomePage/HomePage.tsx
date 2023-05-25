import styles from './HomePage.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import CategoriesSection from '../../components/CategoriesSection/CategoriesSection';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';


const HomePage = () => {
  return (
    <div className={styles.main}>
      <NavBar />
      <CategoriesSection />
    </div>
  )
}

export default HomePage