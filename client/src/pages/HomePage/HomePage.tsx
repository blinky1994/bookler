import styles from './HomePage.module.scss';
import SideMenu from '../../components/SideMenu/SideMenu';
import NavBar from '../../components/NavBar/NavBar';
import FacilitiesSection from '../../components/FacilitiesSection/FacilitiesSection';
import { useContext } from 'react';
import { MenuContext } from '../../context/menu.context';

const HomePage = () => {
  return (
    <div className={styles.main}>
      <SideMenu />
      <NavBar />
      <FacilitiesSection />
    </div>
  )
}

export default HomePage