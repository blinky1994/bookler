import styles from './FacilityPage.module.scss'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { IFacility } from '../../interfaces/interfaces'
import axios from 'axios'
import NavBar from '../../components/NavBar/NavBar'
import { ReactComponent as IconLeftArrow } from '../../components/Icons/Icon_LeftArrow.svg'
import { useNavigate } from 'react-router-dom'
import BookingSection from '../../components/BookingSection/BookingSection'
import { UserContext } from '../../context/user.context'
import { useContext} from 'react'

const FacilityPage = () => {
    const [facility, setFacility] = useState<IFacility>();
    const { facility_id } = useParams();

    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/facilities/${facility?.category_id}`);
    }

    useEffect(() => {
      async function fetchFacility() {
        try {
          const response = await axios.get(`api/facilities/facility/${facility_id}`);
          const { facility } = response.data;
          setFacility(facility)
        } catch (err: any) {
          console.log('Error fetching facility: ', err.response.data.error);
        }
      }
      fetchFacility();
      // eslint-disable-next-line
    }, [])

  return (
    <>
    <NavBar />

    {
        facility ? 
        <div className={styles.main}>
            <div className={styles.titleSection}>
                <IconLeftArrow onClick={handleClick} className={styles.leftArrowIcon} />
                <h1>{facility.name}</h1>
            </div>
            <img className={styles.facilityImage} src={facility.image_url} alt={facility.category}></img>
            <p className={styles.facilityDescription}>{facility.description}</p>
        </div>
        :
        <h1>No facility found</h1>
    }
    <BookingSection facility_id={facility_id} />
    </>
   
  )
}

export default FacilityPage