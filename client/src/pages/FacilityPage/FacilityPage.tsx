import styles from './FacilityPage.module.scss'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { IFacility, ITimeslot, IBooking } from '../../interfaces/interfaces'
import axios from 'axios'
import NavBar from '../../components/NavBar/NavBar'
import { ReactComponent as IconLeftArrow } from '../../components/Icons/Icon_LeftArrow.svg'
import Button, { buttonStyle } from '../../components/Button/Button'
import { useNavigate } from 'react-router-dom'
import DatePicker from '../../components/DatePicker/DatePicker'
import { formatTimeData, getDatesInISOString, filterTimeslotsByDate } from '../../utils/formatDateTime'
import Timeslots from '../../components/Timeslots/Timeslots'

const FacilityPage = () => {
    const [facility, setFacility] = useState<IFacility>();
    const { facility_id } = useParams();
    const [timeslots, setTimeslots] = useState<ITimeslot[]>([]);

    const [selectedDate, setSelectedDate] = useState<Date>();
    const [dates, setDates] = useState<string[]>([]);

    const [bookings, setBookings] = useState<IBooking[]>([]);

    const navigate = useNavigate();
  

    async function fetchTimeslots() {
      try {
          const response = await axios.get(`http://localhost:3001/facilities/facility/${facility_id}/timeslots`);
          const { timeslots } = response.data;
          setDates(getDatesInISOString(timeslots));
          if (selectedDate) {
            const filteredTimeSlots = filterTimeslotsByDate(selectedDate, timeslots);
            setTimeslots(formatTimeData(filteredTimeSlots, facility!.name));
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
      // eslint-disable-next-line
    }, [selectedDate])
    
    const handleDateChange = (date: Date) => {
      setSelectedDate(date);
    }

    useEffect(() => {
      console.log(bookings);
    }, [bookings])
    

    const handleBooking = (timeslot: ITimeslot, isRemove : boolean) => {
    //   export interface ITimeslot {
    //     id: number;
    //     date: string;
    //     time: string;
    //     facilityName: string;
    //     isBooked: boolean;
    // }
    
      // export interface iBooking {
      //   id: number[];
      //   facility: string;
      //   date: Date;
      //   time: string[]
      // }

      if (isRemove) {
        console.log('remove');
        setBookings(bookings!.filter(booking => booking.id !== timeslot.id))
      } 
      else {
        console.log('add');
        const { id, facilityName, date, time } = timeslot;
        const newBookings = [...bookings, {
          id,
          facilityName,
          date,
          time
        }];

        setBookings(newBookings)
      }

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
            <hr></hr>
                <div className={styles.dateHeader}>
                  <h3>Date</h3>
                    {
                    selectedDate && 
                    <DatePicker 
                    key={datePickerKey}
                    className={styles.datePicker}
                    selected={selectedDate} 
                    onChange={handleDateChange} 
                    enabledDates={enabledDates()}/>
                  }
                </div>
                <hr></hr>
                <div className={styles.timeslotsHeader}>
                  <h3>Time slots</h3>
                    {
                      timeslots &&
                      <Timeslots handleBooking={handleBooking} timeslots={timeslots}/>
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