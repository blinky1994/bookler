import styles from './MyBookingCard.module.scss'
import { useState } from 'react'

const MyBookingCard = ({ booking, handleModalOpen } : any) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { booking_id, facilityName, timeslots } = booking;

    // TODO:
    // Fetch and format the time slots
    // Create a ModalUpdateBooking

  return (
    <div onClick={handleModalOpen} className={styles.main}>
        <div className={styles.topSection}>
            <h3>{facilityName}</h3>
            <span>{booking.date}</span>
        </div>
        <div className={styles.bottomSection}>
            <div className={styles.timeslots}>
                {
                    ['1000-1100', '1100-1200'].map((time: any, idx: number) => 
                        <span key={time + idx}>{time}</span>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default MyBookingCard