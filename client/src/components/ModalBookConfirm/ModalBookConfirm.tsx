import styles from './ModalBookConfirm.module.scss'
import Button, { buttonStyle } from '../Button/Button';
import { IBooking } from '../../interfaces/interfaces';

const timeslots = ['1500 - 1600', '1600 - 1700', '1700 - 1800'];

interface IModalConfirmProps {
    handleModalOpen: () => void;
    bookings: IBooking[]
}

const ModalBookConfirm = ({handleModalOpen, bookings} : IModalConfirmProps) => {
  return (
    <>
        <div className={styles.main}>
            <div className={styles.container}>
                <h1>Confirm Booking?</h1>

                <div className={styles.detailsSection}>
                    <h2>Basketball Court A</h2>

                    <hr></hr>
                    <div className={styles.dateTimeSection}>
                        <div className={styles.detail}>
                            <h3>Date</h3>
                            <span className={styles.detailText}>{bookings[0].date}</span>
                        </div>

                        <div className={styles.detail}>
                            <h3>Selected times</h3>
                            <div className={styles.timeslotsSection}>
                                {
                                    bookings.map(booking => 
                                        <span className={styles.detailText}>{booking.time}</span>
                                    )
                                }
                            </div>
    
                        </div>
                    </div>
                </div>
                <div className={styles.buttonsSection}>
                        <Button buttonStyle={buttonStyle.fill}>Confirm</Button>
                        <Button onClick={handleModalOpen} buttonStyle={buttonStyle.stroke}>Cancel</Button>
                    </div>
               
            </div>
            <div onClick={handleModalOpen} className={styles.skim}></div>
        </div>
    </>

  )
}

export default ModalBookConfirm