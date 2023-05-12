import styles from './ModalUpdateBooking.module.scss'
import { IBooking } from '../../interfaces/interfaces'
import UpdateBookingSection from '../BookingSection/UpdateBookingSection/UpdateBookingSection';
interface ModalUpdateBookingProps {
    booking: IBooking;    
}

// export interface IBooking {
//     id: number;
//     facilityName: string;
//     date: string;
//     timeslots: ITimeslot[];
// }

const ModalUpdateBooking = ({ booking } : ModalUpdateBookingProps) => {
    const { id, facilityName, facility_id, date, timeslots } = booking;

  return (
    <div className={styles.main}>
        <div className={styles.container}>  
            <h2>{facilityName}</h2>
            <UpdateBookingSection facility_id={facility_id} />
        </div>
        <div className={styles.skim}></div>
    </div>
  )
}

export default ModalUpdateBooking