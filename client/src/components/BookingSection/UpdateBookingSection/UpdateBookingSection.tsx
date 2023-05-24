import styles from './UpdateBookingSection.module.scss'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { UserContext } from '../../../context/user.context'
import { IFacility, ITimeslot, IBookedTimeSlot } from '../../../interfaces/interfaces'
import axios from 'axios'
import Button, { buttonStyle } from '../../../components/Button/Button'
import { formatTimeData, getDateString, filterTimeslotsByDate } from '../../../utils/formatDateTime'
import Timeslots from '../../../components/Timeslots/Timeslots'

const UpdateBookingSection = ({ facility_id, booking_id, handleModalOpen, setConfirmedBookings, setCurrentPage } : any) => {
    const [facility, setFacility] = useState<IFacility>();
    const [timeslots, setTimeslots] = useState<ITimeslot[]>([]);
    const [hasUpdatedBookings, setHasUpdatedBookings] = useState<boolean>(false);

    const [date, setDate] = useState<string>([]);

    const [bookings, setBookings] = useState<IBookedTimeSlot[]>([]);

    const [errorMessage, setErrorMessage] = useState('');

    const userContext = useContext(UserContext);
    const user = userContext!.user;


    async function fetchTimeslots() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/facilities/facility/${facility_id}/${user!.id}/${booking_id}/timeslots`);

            const { timeslots } = response.data;
            let dateTime = '';
            for (const timeslot of timeslots) {
              if (timeslot.isBooked) {
                dateTime = timeslot.start_time;
              }
            }
            if (!dateTime) {
              dateTime = timeslots[0].start_time;
            } else {
              console.log(getDateString(dateTime));
              setDate(getDateString(dateTime));
            }
           
            if (facility) {
              console.log({dateTime});
              const filteredTimeSlots = filterTimeslotsByDate(new Date(dateTime), timeslots);
              const formattedTimeSlots = formatTimeData(filteredTimeSlots, facility!.name);
              setTimeslots(formattedTimeSlots);

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
          const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/facilities/facility/${facility_id}`);
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

        setConfirmedBookings(bookings);
        setCurrentPage('updateConfirm');    
      }

      const handleDeleteButton = () => {
        setErrorMessage('');
        setCurrentPage('deleteConfirm');
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