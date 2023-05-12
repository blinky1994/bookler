import styles from './UpdateBookingSection.module.scss'
import { useParams, Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context/user.context'
import { IFacility, ITimeslot, IBookedTimeSlot, IBooking } from '../../../interfaces/interfaces'
import axios from 'axios'
import Button, { buttonStyle } from '../../../components/Button/Button'
import DatePicker from '../../../components/DatePicker/DatePicker'
import { formatTimeData, getDatesInISOString, filterTimeslotsByDate } from '../../../utils/formatDateTime'
import Timeslots from '../../../components/Timeslots/Timeslots'
import { useNavigate } from 'react-router-dom'

const UpdateBookingSection = ({ facility_id, booking_id, handleModalOpen } : any) => {
    const [facility, setFacility] = useState<IFacility>();
    const [timeslots, setTimeslots] = useState<ITimeslot[]>([]);
    const [bookedTimeslots, setBookedTimeslots] = useState<ITimeslot[]>([]);

    const [selectedDate, setSelectedDate] = useState<Date>();
    const [dates, setDates] = useState<string[]>([]);

    const [bookings, setBookings] = useState<IBookedTimeSlot[]>([]);

    const [errorMessage, setErrorMessage] = useState('');

    const userContext = useContext(UserContext);
    const user = userContext!.user;

    const navigate = useNavigate();

    async function fetchTimeslots() {
        try {
            const response = await axios.get(`http://localhost:3001/facilities/facility/${facility_id}/${user!.id}/timeslots`);
            const { timeslots } = response.data;
            setDates(getDatesInISOString(timeslots));
            if (selectedDate && facility) {
              const filteredTimeSlots = filterTimeslotsByDate(selectedDate, timeslots);
              const formattedTimeSlots = formatTimeData(filteredTimeSlots, facility!.name)
              setTimeslots(formattedTimeSlots);
              setBookedTimeslots(formattedTimeSlots.filter(timeslot => timeslot.slots === 0));
            } 
          } catch (err: any) {
            console.log('Error fetching timeslots: ', err.response ? err.response.data.error : err);
          }
      }

      async function fetchFacility() {
        try {
          const response = await axios.get(`http://localhost:3001/facilities/facility/${facility_id}`);
          const { facility } = response.data;
          setFacility(facility)
        } catch (err: any) {
          console.log('Error fetching facility: ', err.response ? err.response.data.error : err);
        }
      }
  
      useEffect(() => {
        if (dates[0] && !selectedDate) {
          setSelectedDate(new Date(dates[0]));
        }
        
      }, [dates, selectedDate])
  
      useEffect(() => {
        fetchFacility();
        fetchTimeslots();
        // eslint-disable-next-line
      }, [])

      useEffect(() => {
        fetchTimeslots();
        // eslint-disable-next-line
      }, [selectedDate])

      useEffect(() => {
        console.log(bookings);
      }, [bookings])
      
      
      const handleDateChange = (date: Date) => {
        setSelectedDate(date);
      }
  
  
      const handleBooking = (timeslot: ITimeslot, isRemove : boolean) => {
        setErrorMessage('');
        if (isRemove) {
          setBookings(bookings!.filter(booking => booking.id !== timeslot.id))
        } 
        else {
          setBookings(createBooking(timeslot, bookings))
        }
      }

      const createBooking = (timeslot: ITimeslot, bookings:IBookedTimeSlot[]) => {
        const { id, facilityName, date, time } = timeslot;
        return [...bookings, {
          id,
          facilityName,
          date,
          time,
          timeslot
        }];
      }
  
      const handleUpdateButton = (e: React.MouseEvent<HTMLButtonElement>) => {
        setErrorMessage('');

        async function updateBooking() {
          try {
            const timeslot_ids = bookings.map((booking : IBookedTimeSlot) => booking.timeslot.id);
            console.log({timeslot_ids});
            const response = await axios.post('http://localhost:3001/bookings/update', {
              booking_id,
              timeslots: timeslot_ids
            });

            handleModalOpen();
            navigate('/bookings');
            console.log('Updating booking: ', response.data);
          } catch (err: any) {
            console.log('Failed to update booking, ', err.reponse ? err.response.data.error : err);
          }
        }

        updateBooking();
      }

      const handleDeleteButton = () => {
        setErrorMessage('');

        async function deleteBooking() {
          try {
            const response = await axios.post('http://localhost:3001/bookings/update', {
              booking_id,
              timeslots: []
            });
            handleModalOpen();
            navigate('/bookings');
            console.log('Deleted booking: ', response.data);
          } catch (err: any) {
            console.log('Failed to update booking, ', err.reponse ? err.response.data.error : err);
          }
        }

        deleteBooking();
      }

      const handleCancelButton = () => {
        handleModalOpen();
      }

      const enabledDates = () => {
        return dates.map((date: string) => new Date(date));
      };
  
      const datePickerKey = dates.map((date: string) => date.split('')).join(',');

  return (
    <>
    <div className={styles.main}>
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
        {
          errorMessage &&
          <div className={styles.errorMessage}>
              <span>{errorMessage}</span>
          </div>
        }
    <hr></hr>
        {
          user ? 
          bookedTimeslots.length === timeslots.length ?
            <div className={styles.bookButtonDisabled}>
            <Button buttonStyle={buttonStyle.fill}>Not Available</Button>
            </div>
          :
            <div className={styles.buttonSection}>
                 <Button onClick={handleUpdateButton} buttonStyle={buttonStyle.fill}>Update booking</Button>
                 <div className={styles.deleteButton}>
                  <Button onClick={handleDeleteButton} buttonStyle={buttonStyle.delete}>Delete booking</Button>
                 </div>

                 <Button onClick={handleCancelButton} buttonStyle={buttonStyle.stroke}>Cancel</Button>
            </div>
          :
          <div className={styles.loginMessage}>

              <Link to={'/login'}>
                <span className={styles.logInLink}>Log in</span>
              </Link>
              <span> to book</span>
          </div>

        }
    </div>
    </>
  )
}

export default UpdateBookingSection