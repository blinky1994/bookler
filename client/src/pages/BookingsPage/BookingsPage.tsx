import styles from './BookingsPage.module.scss'
import NavBar from '../../components/NavBar/NavBar'
import MyBookingCard from '../../components/MyBookingCard/MyBookingCard'
import { useState, useEffect, useContext } from 'react'
import { IBooking } from '../../interfaces/interfaces'
import { formatBookings } from '../../utils/formatDateTime'
import axios from 'axios'
import { UserContext } from '../../context/user.context'

const BookingsPage = () => {
    const [bookings, setBookings] = useState<IBooking[]>([]);
    const userContext = useContext(UserContext);
    const user = userContext!.user;

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
        fetchBookings()
    }, [])
    
  return (
    <>
        <NavBar />
        <div className={styles.main}>
            <h2 className={styles.textHeader}>My bookings</h2>
        </div>  
        <div className={styles.bookings}>
                {
                    bookings &&
                    bookings.map((booking: any) => 
                        <MyBookingCard 
                            key={booking.facilityName + booking.id}
                            booking={booking}
                            fetchBookings={fetchBookings}
                        />
                    )
                }
                
        </div>
    </>

  )
}

export default BookingsPage