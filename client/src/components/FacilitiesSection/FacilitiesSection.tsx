import styles from './FacilitiesSection.module.scss';
import FacilityCard from './FacilityCard/FacilityCard';

const facilities = [
    `Basketball Courts`,
    `Tennis Courts`,
    `Running Tracks`,
    `Gyms`,
    `Swimming Pools`,
    `Soccer Fields`,

]

const FacilitiesSection = () => {
  return (
    <div className={styles.main}>
        <h2>Select a facility</h2>
        <div className={styles.cardsSection}>
            {
                facilities.map((facility, idx) => 
                <FacilityCard 
                  key={facility+idx}
                  name={facility} 
                />)
            }
            
        </div>
    </div>
  )
}

export default FacilitiesSection