import Button, { buttonStyle } from '../../../Button/Button'
import styles from './UpdateConfirmSection.module.scss'
import { IBookedTimeSlot } from '../../../../interfaces/interfaces'
import axios from 'axios'

const UpdateConfirmSection = ({date, setCurrentPage, booking_id, confirmedBookings} : any) => {

    const handleConfirmButton = () => {
        async function updateBooking() {
            try {
              const timeslot_ids = confirmedBookings.map((booking : IBookedTimeSlot) => booking.timeslot.id);
              const timeslot_ids_set = new Set(timeslot_ids);
              const response = await axios.post('http://localhost:3001/bookings/update', {
                booking_id,
                timeslots: Array.from(timeslot_ids_set)
              });

              setCurrentPage('updateSuccess');
  
              console.log('Updating booking: ', response.data);
            } catch (err: any) {
              console.log('Failed to update booking, ', err.reponse ? err.response.data.error : err);
            }
          }
  
          updateBooking();
    }
  
    const handleBackButton = () => {
        setCurrentPage('update');
    }
  
    return (
        <div className={styles.main}>
        <h1>Confirm update booking?</h1>

        <div className={styles.detailsSection}>
            <h2>Basketball Court A</h2>

            <hr></hr>
            <div className={styles.dateTimeSection}>
                <div className={styles.detail}>
                    <h3>Date</h3>
                    <span className={styles.detailText}>{date}</span>
                </div>

                <div className={styles.detail}>
                    <h3>Updated times</h3>
                    <div className={styles.timeslotsSection}>
                        {
                            confirmedBookings.map((booking: IBookedTimeSlot, idx: number) => 
                                <span 
                                    key={booking.id + booking.facilityName + idx}
                                    className={styles.detailText}
                                >{booking.time}</span>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
        <div className={styles.buttonsSection}>
                <Button onClick={handleConfirmButton} buttonStyle={buttonStyle.fill}>Confirm</Button>
                <Button onClick={handleBackButton} buttonStyle={buttonStyle.stroke}>Back</Button>
        </div>
    </div>
    )  
}

export default UpdateConfirmSection;