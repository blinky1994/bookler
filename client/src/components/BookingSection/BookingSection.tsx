import styles from './BookingSection.module.scss'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../context/user.context'
import { IFacility, ITimeslot, IBookedTimeSlot } from '../../interfaces/interfaces'
import axios from 'axios'
import Button, { buttonStyle } from '../../components/Button/Button'
import DatePicker from '../../components/DatePicker/DatePicker'
import { formatTimeData, getDatesInISOString, filterTimeslotsByDate } from '../../utils/formatDateTime'
import Timeslots from '../../components/Timeslots/Timeslots'
import ModalBookConfirm from '../../components/ModalBookConfirm/ModalBookConfirm'

const BookingSection = ({ facility_id } : any) => {
    const [facility, setFacility] = useState<IFacility>();
    const [timeslots, setTimeslots] = useState<ITimeslot[]>([]);
    const [bookedTimeslots, setBookedTimeslots] = useState<ITimeslot[]>([]);

    const [selectedDate, setSelectedDate] = useState<Date>();
    const [dates, setDates] = useState<string[]>([]);

    const [bookings, setBookings] = useState<IBookedTimeSlot[]>([]);

    const [modalOpen, setModalOpen] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    const userContext = useContext(UserContext);
    const user = userContext!.user;

    async function fetchTimeslots() {
        try {
          const response = await axios.get(`${process.env.REACT_APP_API_URL || ''}/api/facilities/facility/${facility_id}/${user!.id}/timeslots`);
          const { timeslots } = response.data;
          
            setDates(getDatesInISOString(timeslots));
            if (facility && selectedDate) {
              const filteredTimeSlots = filterTimeslotsByDate(selectedDate, timeslots);
              const formattedTimeSlots = formatTimeData(filteredTimeSlots, facility!.name)
              setTimeslots(formattedTimeSlots);
              setBookedTimeslots(formattedTimeSlots.filter(timeslot => timeslot.slots === 0));
            } 
          } catch (err: any) {
            console.error('Error fetching timeslots: ', err.response.data.error);
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
            const response = await axios.get(`${process.env.REACT_APP_API_URL || ''}/api/facilities/facility/${facility_id}`);
     
            const { facility } = response.data;
            setFacility(facility);
          } catch (err: any) {
            console.log('Error fetching facility: ', err.response.data.error);
          }
        }
        fetchFacility();
        fetchTimeslots();
        // eslint-disable-next-line
      }, [])

      useEffect(() => {
        async function fetchFacility() {
          try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL || ''}/api/facilities/facility/${facility_id}`);
     
            const { facility } = response.data;
            setFacility(facility);
          } catch (err: any) {
            console.log('Error fetching facility: ', err.response.data.error);
          }
        }
        fetchFacility();
        fetchTimeslots();
        // eslint-disable-next-line
      }, [user])
  
      useEffect(() => {
  
        fetchTimeslots();
   
        setBookings([]);
        // eslint-disable-next-line
      }, [selectedDate])
      
      useEffect(() => {
          const disableScrolling = (modalOpen: boolean) => {
            const html = document.querySelector('html');
            if (html) {
              html.style.overflow = modalOpen ? 'hidden' : 'auto';
            }
          }
    
          disableScrolling(modalOpen);
      }, [modalOpen])
      
      const handleDateChange = (date: Date) => {
        setSelectedDate(date);
      }

      const handleBooking = (timeslot: ITimeslot, isRemove : boolean) => {
        setErrorMessage('');
  
        if (isRemove) {
          setBookings(bookings!.filter(booking => booking.id !== timeslot.id))
        } 
        else {
          const { id, facilityName, date, time } = timeslot;
          const newBookings = [...bookings, {
            id,
            facilityName,
            date,
            time,
            timeslot
          }];

          setBookings(newBookings)
        }
  
      }
  
      const handleBookButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        setErrorMessage('');
  
        if (!bookings.length) {
          setErrorMessage('Please select one or more timeslots');
          return;
        }
  
        handleModalOpen();
      }
  
      const handleModalOpen = () => {
        setModalOpen(!modalOpen);
      }
  
      const enabledDates = () => {
        return dates.map((date: string) => new Date(date));
      };
  
      const datePickerKey = dates.map((date: string) => date.split('')).join(',');

  return (
    <>
    <div className={styles.main}>


    {
      user ? 
<>
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
              <Timeslots isUpdatePage={false} handleBooking={handleBooking} timeslots={timeslots}/>
            }
        </div>
        {
          errorMessage &&
          <div className={styles.errorMessage}>
              <span>{errorMessage}</span>
          </div>
          
        }

        {
          (bookedTimeslots.length === timeslots.length) ?
            <div className={styles.bookButtonDisabled}>
            <Button buttonStyle={buttonStyle.fill}>Not Available</Button>
            </div>
          :
            <div className={styles.bookButton}>
            <Button onClick={handleBookButton} buttonStyle={buttonStyle.fill}>Book</Button>
            </div>
        }
      </>
      :
      <div className={styles.loginMessage}>

      <Link to={'/login'}>
        <span className={styles.logInLink}>Log in</span>
      </Link>
      <span> to book</span>
      </div>

    }
    

      </div>
    {
        modalOpen && 
        <ModalBookConfirm 
        handleModalOpen={handleModalOpen} 
        bookings={bookings} 
        user={user} />
    }
    </>
  )
}

export default BookingSection