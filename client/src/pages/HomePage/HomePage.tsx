import styles from './HomePage.module.scss';
import NavBar from '../../components/NavBar/NavBar';
import CategoriesSection from '../../components/CategoriesSection/CategoriesSection';
import { useContext } from 'react';
import { UserContext } from '../../context/user.context';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const value = useContext(UserContext);
  const user = value!.user;

  return (
    <div className={styles.main}>
      <NavBar />
      <CategoriesSection />
      <div className={styles.message}>
        {
          !user &&
          <span>
            Click
            <Link to={'/login'}>
              <span className={styles.logInLink}> HERE </span>
            </Link>
            to log in 
        </span>

        }

      </div>

    </div>
  )
}

export default HomePage