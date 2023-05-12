import styles from './ModalUpdateBooking.module.scss'
import { IBooking } from '../../interfaces/interfaces'
import UpdateBookingSection from '../BookingSection/UpdateBookingSection/UpdateBookingSection';
import { useEffect } from 'react';
import { Dispatch, SetStateAction } from 'react';

interface ModalUpdateBookingProps {
    booking: IBooking;    
    handleModalOpen: () => void;
}

// export interface IBooking {
//     id: number;
//     facilityName: string;
//     date: string;
//     timeslots: ITimeslot[];
// }

const ModalUpdateBooking = ({ booking, handleModalOpen } : ModalUpdateBookingProps) => {
    const { id, facilityName, facility_id, date, timeslots } = booking;

  return (
    <div className={styles.main}>
        <div className={styles.container}>  
            <h2>{facilityName}</h2>
            <UpdateBookingSection facility_id={facility_id} booking_id={id} handleModalOpen={handleModalOpen} />
        </div>
        <div className={styles.skim}></div>
    </div>
  )
}

export default ModalUpdateBooking