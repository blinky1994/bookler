import styles from './FacilityPage.module.scss'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { IFacility } from '../../context/categories.context'
import axios from 'axios'
import NavBar from '../../components/NavBar/NavBar'
import { ReactComponent as IconLeftArrow } from '../../components/Icons/Icon_LeftArrow.svg'
import Button, { buttonStyle } from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import DatePicker from '../../components/DatePicker/DatePicker'
import { ITimeslot } from '../../context/categories.context'
import { formatTime, formatDate } from '../../utils/formatDateTime'
const FacilityPage = () => {
    const [facility, setFacility] = useState<IFacility>();
    const { facility_id } = useParams();
    const [timeslots, setTimeslots] = useState<ITimeslot[]>([]);
    const [dates, setDates] = useState<Date[]>([]);

    const navigate = useNavigate();
  
    useEffect(() => {
      async function fetchFacility() {
        try {
          const response = await axios.get(`http://localhost:3001/facilities/facility/${facility_id}`);
          const { facility } = response.data;
          setFacility(facility)
        //   console.log('fetched: ', facility);
        } catch (err: any) {
          console.log('Error fetching facility: ', err.response.data.error);
        }
      }
      fetchFacility();

      async function fetchTimeslots() {
        
        try {
            const response = await axios.get(`http://localhost:3001/facilities/facility/${facility_id}/timeslots`);
            const { timeslots } = response.data;
            console.log(typeof timeslots[0].start_time);
            setTimeslots(formatTime(timeslots));

            // setDates(formatDate(timeslots));
          } catch (err: any) {
            console.log('Error fetching timeslots: ', err.response.data.error);
          }
      }

      fetchTimeslots();
      // eslint-disable-next-line
    }, [])

    const handleBookButton = (e: React.MouseEvent<HTMLButtonElement>) => {

    }

    const handleClick = () => {
        navigate(`/facilities/${facility?.category_id}`);
    }

    const disabledDates = [
            new Date('2023-05-05'),
            new Date('2023-05-06'),
            new Date('2023-05-10'),
    ];

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
            <div className={styles.bookingSection}>
                <h3>Select time slots</h3>
                <div className={styles.datePicker}><DatePicker disabledDates={disabledDates} /></div>
                <div className={styles.timeslotsSection}>
                    {
                        timeslots &&
                        timeslots.map((timeslot: ITimeslot) => {
                            return timeslot.isBooked ?
                            //TODO: Create component for timeslots: Show booked, unbooked UI
                             <span>Booked: {timeslot.time}</span> : 
                             <span>Available: {timeslot.time}</span>
                        } )
                    }
                </div>
                <div className={styles.bookButton}>
                    <Button onClick={handleBookButton} buttonStyle={buttonStyle.fill}>Book</Button>
                </div>
            </div>
        </div>
        :
        <h1>No facility found</h1>
    }
    </>
   
  )
}

export default FacilityPage