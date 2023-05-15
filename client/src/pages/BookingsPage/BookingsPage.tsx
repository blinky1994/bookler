import styles from './BookingsPage.module.scss'
import NavBar from '../../components/NavBar/NavBar'
import MyBookingCard from '../../components/MyBookingCard/MyBookingCard'
import { useState, useEffect, useContext } from 'react'
import { IBooking } from '../../interfaces/interfaces'
import { formatBookings } from '../../utils/formatDateTime'
import axios from 'axios'
import { UserContext } from '../../context/user.context'
import { useNavigate } from 'react-router-dom'

const BookingsPage = () => {
    const [bookings, setBookings] = useState<IBooking[]>([]);
    const userContext = useContext(UserContext);
    const user = userContext!.user;
    const navigate = useNavigate();

    async function fetchBookings() {
        try {
            const response = await axios.get(`http://localhost:3001/bookings/users/${user!.id}`);
            const { bookings } = response.data;
            const formattedBookings = formatBookings(bookings);
            setBookings(formattedBookings);
          } catch (err: any) {
            console.log('Error fetching bookings: ', err.response.data.error);
          }
      }

    useEffect(() => {
      console.log('called')
        fetchBookings()
    }, [])
    
    const handleViewFacilities = () => {
      navigate('/');
    }

  return (
    <>
        <NavBar />
        <div className={styles.main}>
            <h2 className={styles.textHeader}>My bookings</h2>
        </div>  
        <div className={styles.bookings}>
                {
                    bookings.length > 0 ?
                    bookings.map((booking: any) => 
                        <MyBookingCard 
                            key={booking.facilityName + booking.id}
                            booking={booking}
                            fetchBookings={fetchBookings}
                        />
                    )
                    :
                    <h2 className={styles.noBookingsMessage}>You have no bookings. Click <span onClick={handleViewFacilities}>here</span> to view facilities</h2>
                }
                
        </div>
    </>

  )
}

export default BookingsPage