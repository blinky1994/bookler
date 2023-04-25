import styles from './HomePage.module.scss';
import SideMenu from '../../components/SideMenu/SideMenu';
import NavBar from '../../components/NavBar/NavBar';
import FacilitiesSection from '../../components/FacilitiesSection/FacilitiesSection';

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