import { useNavigate } from 'react-router-dom'
import Button, { buttonStyle } from '../../../Button/Button'
import styles from './DeleteConfirmSection.module.scss'
import { IBookedTimeSlot } from '../../../../interfaces/interfaces'
import axios from 'axios'

const DeleteConfirmSection = ({date, setCurrentPage, booking_id, booking} : any) => {
    const { timeslots } = booking;

    const handleConfirmButton = () => {
        async function deleteBooking() {
            try {
              const response = await axios.post(`${process.env.REACT_APP_API_URL || ''}/api/bookings/update`, {
                booking_id,
                timeslots: []
              });
              setCurrentPage('deleteSuccess');
              console.log('Deleted booking: ', response.data);
            } catch (err: any) {
              console.log('Failed to update booking, ', err.reponse ? err.response.data.error : err);
            }
          }
  
        deleteBooking();
    }
  
    const handleBackButton = () => {
        setCurrentPage('update');
    }
  
    return (
        <div className={styles.main}>
        <h1>Confirm delete booking?</h1>

        <div className={styles.detailsSection}>
            <h2>Basketball Court A</h2>

            <hr></hr>
            <div className={styles.dateTimeSection}>
                <div className={styles.detail}>
                    <h3>Date</h3>
                    <span className={styles.detailText}>{date}</span>
                </div>

                <div className={styles.detail}>
                    <h3>Currently booked times</h3>
                    <div className={styles.timeslotsSection}>
                        {
                            timeslots.map((timeslot: IBookedTimeSlot, idx: number) => 
                                <span 
                                    key={timeslot.id + idx}
                                    className={styles.detailText}
                                >{timeslot.time}</span>
                            )
                        }
                    </div>

                </div>
            </div>
        </div>
        <div className={styles.buttonsSection}>
                <Button onClick={handleConfirmButton} buttonStyle={buttonStyle.delete}>Confirm</Button>
                <Button onClick={handleBackButton} buttonStyle={buttonStyle.stroke}>Back</Button>
        </div>
    </div>
    )  
}

export default DeleteConfirmSection;