import styles from './MyBookingCard.module.scss'
import { useState } from 'react'
import { ITimeslot } from '../../interfaces/interfaces';
// export interface IBooking {
//     id: number;
//     facilityName: string;
//     date: string;
//     timeslots: ITimeslot[];
// }

const MyBookingCard = ({ booking, handleModalOpen } : any) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { id, facilityName, date, timeslots } = booking;
    console.log(date);
    // TODO:
    // Create a ModalUpdateBooking

  return (
    <div onClick={handleModalOpen} className={styles.main}>
        <div className={styles.topSection}>
            <h3>{facilityName}</h3>
            <span>{date}</span>
        </div>
        <div className={styles.bottomSection}>
            <div className={styles.timeslots}>
                {
                    timeslots.map((timeslot: ITimeslot) => 
                        <span key={timeslot.id}>{timeslot.time}</span>
                    )
                }
            </div>
        </div>
    </div>
  )
}

export default MyBookingCard