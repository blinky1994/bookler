import styles from './UpdateBookingSection.module.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context/user.context'
import { IFacility, ITimeslot, IBookedTimeSlot } from '../../../interfaces/interfaces'
import axios from 'axios'
import Button, { buttonStyle } from '../../../components/Button/Button'
import { formatTimeData, getDateString, filterTimeslotsByDate } from '../../../utils/formatDateTime'
import Timeslots from '../../../components/Timeslots/Timeslots'
import { useNavigate } from 'react-router-dom'

const UpdateBookingSection = ({ facility_id, booking_id, handleModalOpen } : any) => {
    const [facility, setFacility] = useState<IFacility>();
    const [timeslots, setTimeslots] = useState<ITimeslot[]>([]);
    const [bookedTimeslots, setBookedTimeslots] = useState<ITimeslot[]>([]);
    const [hasUpdatedBookings, setHasUpdatedBookings] = useState<boolean>(false);

    const [date, setDate] = useState<string>([]);

    const [bookings, setBookings] = useState<IBookedTimeSlot[]>([]);

    const [errorMessage, setErrorMessage] = useState('');

    const userContext = useContext(UserContext);
    const user = userContext!.user;

    const navigate = useNavigate();

    async function fetchTimeslots() {
        try {
            const response = await axios.get(`http://localhost:3001/facilities/facility/${facility_id}/${user!.id}/timeslots`);

            const { timeslots } = response.data;
            const dateTime = timeslots[0].start_time;
            setDate(getDateString(dateTime));
            if (facility) {
              console.log({dateTime});
              const filteredTimeSlots = filterTimeslotsByDate(new Date(dateTime), timeslots);
              const formattedTimeSlots = formatTimeData(filteredTimeSlots, facility!.name);
              setTimeslots(formattedTimeSlots);
              setBookedTimeslots(formattedTimeSlots.filter(timeslot => timeslot.slots === 0));

              if (!hasUpdatedBookings) {
                updateCurrentBookings(formatTimeData(timeslots, facility!.name));
                setHasUpdatedBookings(true);
              }
            } 
          } catch (err: any) {
            console.log('Error fetching timeslots: ', err.response ? err.response.data.error : err);
          }
      }

      async function fetchFacility() {
        try {
          const response = await axios.get(`http://localhost:3001/facilities/facility/${facility_id}`);
          const { facility } = response.data;
          setFacility(facility);
        } catch (err: any) {
          console.log('Error fetching facility: ', err.response ? err.response.data.error : err);
        }
      }

      function updateCurrentBookings(formattedTimeSlots: any) {
        let newBookings = [...bookings];
         for (const timeslot of formattedTimeSlots) {
          if (timeslot.selected) {
            newBookings = createBooking(timeslot, newBookings);
          }
         }

         setBookings(newBookings);
      } 

  
      useEffect(() => {
        fetchFacility();
        // eslint-disable-next-line
      }, [])


        useEffect(() => {
          fetchTimeslots();
        // eslint-disable-next-line
      }, [facility])

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

        if (!bookings.length) {
          setErrorMessage('Please select one or more timeslots');
          return;
        }

        async function updateBooking() {
          try {
            
            const timeslot_ids = bookings.map((booking : IBookedTimeSlot) => booking.timeslot.id);
            const timeslot_ids_set = new Set(timeslot_ids);
            const response = await axios.post('http://localhost:3001/bookings/update', {
              booking_id,
              timeslots: Array.from(timeslot_ids_set)
            });

            handleModalOpen();
            navigate(0);
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
            navigate(0);
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


  return (
    <>
    <div className={styles.main}>
    <hr></hr>
        <div className={styles.dateHeader}>
          <h3>Date</h3>
          <span>{date}</span>
        </div>
        <hr></hr>
        <div className={styles.timeslotsHeader}>
          <h3>Time slots</h3>
            {
              timeslots &&
              <Timeslots isUpdatePage={true} handleBooking={handleBooking} timeslots={timeslots}/>
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
          (bookedTimeslots.length > 0 && bookedTimeslots.length === timeslots.length) ?
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