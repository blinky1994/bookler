import styles from './ModalUpdateBooking.module.scss'
import { IBooking, IBookedTimeSlot } from '../../interfaces/interfaces'
import UpdateBookingSection from '../BookingSection/UpdateBookingSection/UpdateBookingSection';
import { useState, useEffect } from 'react';
import UpdateConfirmSection from './UpdateSections/UpdateConfirmSection/UpdateConfirmSection';
import UpdateSuccessSection from './UpdateSections/UpdateSuccessSection/UpdateSuccessSection';
import DeleteConfirmSection from './UpdateSections/DeleteConfirmSection/DeleteConfirmSection';
import DeleteSuccessSection from './UpdateSections/DeleteSuccessSection/DeleteSuccessSection';

const ModalUpdateBooking = ({ booking, handleModalOpen } : any) => {
    const { id, facilityName, facility_id, date, timeslots } = booking;
    const [confirmedBookings, setConfirmedBookings] = useState<IBookedTimeSlot[]>([]);
    const [currentPage, setCurrentPage] = 
    useState<
    'update'|'updateConfirm'|'deleteConfirm'|'updateSuccess'|'deleteSuccess'
    >('update');

    useEffect(() => {
      console.log({currentPage});
  
    }, [currentPage])
    

    const renderUpdatePages = () => {
      if (currentPage === 'update') {
        return <>
        <h2>{facilityName}</h2>
        <UpdateBookingSection 
          facility_id={facility_id} 
          booking_id={id} 
          handleModalOpen={handleModalOpen} 
          setConfirmedBookings={setConfirmedBookings}
          setCurrentPage={setCurrentPage}
        />
        </>
      } else if (currentPage === 'updateConfirm') {
        return <UpdateConfirmSection 
          date={date}
          booking_id={id}
          setCurrentPage={setCurrentPage}
          confirmedBookings={confirmedBookings}
        />;
      } else if (currentPage === 'updateSuccess') {
        return <UpdateSuccessSection
          handleModalOpen={handleModalOpen} 
        />;
      } else if (currentPage === 'deleteConfirm') {
        return <DeleteConfirmSection 
          date={date}
          booking_id={id}
          setCurrentPage={setCurrentPage}
          booking={booking}
        />;
      } else if (currentPage === 'deleteSuccess') {
        return <DeleteSuccessSection 
          handleModalOpen={handleModalOpen} 
        />;
      }
    }

  return (
    <div className={styles.main}>
        <div className={styles.container}> 
            {
              renderUpdatePages()
            }
        </div>
        <div className={styles.skim}></div>
    </div>
  )
}

export default ModalUpdateBooking