import styles from './MyBookingCard.module.scss'
import { useEffect, useState } from 'react'
import { ITimeslot } from '../../interfaces/interfaces';
import ModalUpdateBooking from '../ModalUpdateBooking/ModalUpdateBooking';
// export interface IBooking {
//     id: number;
//     facilityName: string;
//     date: string;
//     timeslots: ITimeslot[];
// }

const MyBookingCard = ({ booking } : any) => {
    const [modalOpen, setModalOpen] = useState(false);
    const { id, facilityName, date, timeslots } = booking;

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    }
    
  return (
    <>
        <div onClick={handleModalOpen} className={styles.main}>
            <div className={styles.bookingID}>
                <span>ID: {booking.id}</span>
            </div>
            <hr></hr>
            <div className={styles.topSection}>
                <h3>{facilityName}
                </h3>
                <span>{date}</span>
            </div>
            <div className={styles.bottomSection}>
                <div className={styles.timeslots}>
                    {
                        timeslots.map((timeslot: ITimeslot, idx: number) => 
                            <span key={timeslot.id + idx + timeslot.start_time}>{timeslot.time}</span>
                        )
                    }
                </div>
            </div>
        </div>
        {
            modalOpen && <ModalUpdateBooking booking={booking} handleModalOpen={handleModalOpen}/>
        }
    </>
  )
}

export default MyBookingCard