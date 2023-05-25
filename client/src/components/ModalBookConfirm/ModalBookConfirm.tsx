import styles from './ModalBookConfirm.module.scss'
import Button, { buttonStyle } from '../Button/Button';
import { IBookedTimeSlot, IBooking } from '../../interfaces/interfaces';
import { useEffect, useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { IUserAccount } from '../../context/user.context';
import { ReactComponent as Icon_Tick } from '../Icons/Icon_Tick.svg'
import { useNavigate } from 'react-router-dom';

interface IModalConfirmProps {
    handleModalOpen: () => void;
    bookings: IBookedTimeSlot[];
    user: IUserAccount | null;
}

interface IModalConfirmPageProps extends IModalConfirmProps {
    setCurrentPage: Dispatch<SetStateAction<1 | 2>>;
}

const BookConfirmPageOne = ({handleModalOpen, bookings, user, setCurrentPage} : IModalConfirmPageProps) => {
    const handleConfirmButton = () => {
        async function makeBooking() {
            try {
                const userData = {
                    user_id: user!.id,
                    timeslots: bookings.map(booking => booking.id)
                }
                await axios.post(`${process.env.REACT_APP_API_URL || ''}/api/bookings`, userData);
                setCurrentPage(2);
            } catch (err: any) {
                console.log('Error making a booking', err.response.data.error)
            }
        }

        makeBooking();
    }

    return (
        <div className={styles.pageOneSection}>
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
                            bookings.map((booking, idx) => 
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
                <Button onClick={handleModalOpen} buttonStyle={buttonStyle.stroke}>Cancel</Button>
        </div>
    </div>
    )  
}

const BookConfirmPageTwo = ({handleModalOpen} : IModalConfirmPageProps) => {
    const navigate = useNavigate();

    const handleHomeButton = () => {
        navigate('/');
    }

    const handleMyBookingsButton = () => {
        navigate('/bookings');
    }

    const handleStayOnPage = () => {
        handleModalOpen();
        navigate(0);
    }

    return (
        <div className={styles.pageTwoSection}>
        <div className={styles.headerSection}>
            <div className={styles.iconTick}>
                <Icon_Tick />
            </div>
            <h1>Booking is successful</h1>
        </div> 


        <div className={styles.buttonsSection}>
                <Button onClick={handleMyBookingsButton} buttonStyle={buttonStyle.fill}>My Bookings</Button>
                <Button onClick={handleHomeButton} buttonStyle={buttonStyle.stroke}>Return Home</Button>
                <Button onClick={handleStayOnPage} buttonStyle={buttonStyle.stroke}>Stay On Page</Button>
        </div>
    </div>
    )  
}


const ModalBookConfirm = ({handleModalOpen, bookings, user} : IModalConfirmProps) => {
    const [currentPage, setCurrentPage]  = useState<1|2>(1);
  return (
        <div className={styles.main}>
            <div className={styles.container}>
                {
                    currentPage === 1 ?
                    <BookConfirmPageOne 
                    handleModalOpen={handleModalOpen} 
                    bookings={bookings}
                    setCurrentPage={setCurrentPage}
                    user={user}
                    />
                    :
                    <BookConfirmPageTwo 
                    handleModalOpen={handleModalOpen} 
                    bookings={bookings} 
                    setCurrentPage={setCurrentPage}
                    user={user}
                    />
                }

               
            </div>
            <div className={styles.skim}></div>
        </div>
  )
}

export default ModalBookConfirm