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
import { formatTime, getDatesInISOString, filterTimeslotsByDate } from '../../utils/formatDateTime'

const FacilityPage = () => {
    const [facility, setFacility] = useState<IFacility>();
    const { facility_id } = useParams();
    const [timeslots, setTimeslots] = useState<ITimeslot[]>([]);

    const [selectedDate, setSelectedDate] = useState<Date>();
    const [dates, setDates] = useState<string[]>([]);

    const navigate = useNavigate();
  

    async function fetchTimeslots() {
      try {
          const response = await axios.get(`http://localhost:3001/facilities/facility/${facility_id}/timeslots`);
          const { timeslots } = response.data;
          setDates(getDatesInISOString(timeslots));
          if (selectedDate) {
            const filteredTimeSlots = filterTimeslotsByDate(selectedDate, timeslots);
            setTimeslots(formatTime(filteredTimeSlots));
          } 
        } catch (err: any) {
          console.log('Error fetching timeslots: ', err.response.data.error);
        }
    }

    useEffect(() => {
      if (dates[0] && !selectedDate) {
        setSelectedDate(new Date(dates[0]));
      }
      
    }, [dates, selectedDate])

    useEffect(() => {
      async function fetchFacility() {
        try {
          const response = await axios.get(`http://localhost:3001/facilities/facility/${facility_id}`);
          const { facility } = response.data;
          setFacility(facility)
        } catch (err: any) {
          console.log('Error fetching facility: ', err.response.data.error);
        }
      }
      fetchFacility();
      fetchTimeslots();
      // eslint-disable-next-line
    }, [])

    useEffect(() => {
      fetchTimeslots();
    }, [selectedDate])
    
    const handleDateChange = (date: Date) => {
      setSelectedDate(date);
    }

    const handleBookButton = (e: React.MouseEvent<HTMLButtonElement>) => {

    }

    const handleClick = () => {
        navigate(`/facilities/${facility?.category_id}`);
    }

    const enabledDates = () => {
      return dates.map((date: string) => new Date(date));
    };

    const datePickerKey = dates.map((date: string) => date.split('')).join(',');

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
                {
                  selectedDate && 
                  <div className={styles.datePicker}>
                  <DatePicker 
                  key={datePickerKey}
                  selected={selectedDate} 
                  onChange={handleDateChange} 
                  enabledDates={enabledDates()}/>
                </div>
                }

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