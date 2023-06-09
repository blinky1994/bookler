import { useEffect, useState } from 'react';
import styles from './FacilitiesSection.module.scss';
import FacilityCard from './FacilityCard/FacilityCard';
import axios from 'axios';
import { IFacility } from '../../interfaces/interfaces';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const FacilitiesSection = () => {
  const [facilities, setFacilities] = useState<IFacility[]>([]);
  const { category_id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchfacilities() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || ''}/api/facilities/${category_id}`);
        const { facilities } = response.data;
        setFacilities(facilities)
      } catch (err: any) {
        console.log('Error fetching facilities: ', err.response.data.error);
      }
    }
    fetchfacilities();
    // eslint-disable-next-line
  }, [])

  const handleClickToHome = (e: React.MouseEvent<HTMLDivElement>) => {
    navigate('/');
  } 

  return (
    <div className={styles.main}>
        <div className={styles.breadcrumb}>
            <h2 onClick={handleClickToHome} className={styles.allFacilitiesText}>All Facilities</h2>
            <h2>&#707;</h2>
            {
                facilities.length ? 
                <h2 className={styles.facilityText}>{facilities[0].category}</h2> :
                <h2>No available facilities</h2>
            }
        </div>

        <div className={styles.cardsSection}>
          {
                facilities.length > 0 && 
                facilities.map((facilityObj: IFacility, idx) => {
                    return <FacilityCard 
                    key={facilityObj.name + idx}
                    {...facilityObj}
                  />
                }
)
            }
            
        </div>
    </div>
  )
}

export default FacilitiesSection