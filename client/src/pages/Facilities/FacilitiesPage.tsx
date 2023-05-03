import styles from './FacilitiesPage.module.scss'
import NavBar from '../../components/NavBar/NavBar'
import FacilitiesSection from '../../components/FacilitiesSection/FacilitiesSection'
const FacilitiesPage = () => {
  return (
    <div className={styles.main}>
      <NavBar />
      <FacilitiesSection />
    </div>
  )
}

export default FacilitiesPage