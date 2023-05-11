import styles from './BookingsPage.module.scss'
import NavBar from '../../components/NavBar/NavBar'
import MyBookingCard from '../../components/MyBookingCard/MyBookingCard'
import { useState, useEffect, useContext } from 'react'
import { IBooking } from '../../interfaces/interfaces'
import { formatTimeData, getDatesInISOString, filterTimeslotsByDate } from '../../utils/formatDateTime'
import axios from 'axios'
import { UserContext } from '../../context/user.context'

const BookingsPage = () => {
    const [bookings, setBookings] = useState<any[]>([]);
    const userContext = useContext(UserContext);
    const user = userContext!.user;

    //     {
    //         "booking_id": 112,
    //         "facilityName": "Basketball Court 1",
    //         "timeslots": [
    //             {
    //                 "start_time": "2023-05-01T08:00:00.000Z",
    //                 "end_time": "2023-05-01T09:00:00.000Z"
    //             }
    //         ]
    //     }

    // export interface IBooking {
    //     id: number;
    //     facilityName: string;
    //     date: string;
    //     time: string
    //   }

    // export interface ITimeslot {
    //     id: number;
    //     date: string;
    //     time: string;
    //     facilityName: string;
    //     slots: number;
    // }

    async function fetchBookings() {
        try {
            const response = await axios.get(`http://localhost:3001/bookings/users/${user!.id}`);
            console.log(response);
            const { bookings } = response.data;
            setBookings(bookings);
            //TODO Create inteface for bookingData
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

            <div className={styles.bookings}>
                {
                    bookings &&
                    bookings.map((booking: any) => 
                        <MyBookingCard 
                            key={booking.id + booking.name}
                            booking={booking}
                        />
                    )
                }
                
            </div>
        </div>  
    </>

  )
}

export default BookingsPage