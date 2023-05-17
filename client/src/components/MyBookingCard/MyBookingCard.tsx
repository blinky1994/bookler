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


interface IMapTimeSlots {
    [key: string]  : string[];
}

const MyBookingCard = ({ booking } : any) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [dates, setDates] = useState<string[]>([]);
    const [dateTimeMap, setDateTimeMap] = useState<IMapTimeSlots>();
    const { id, facilityName, date, timeslots } = booking;

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    }
    const mapTimeslots = (timeslots: ITimeslot[]) : IMapTimeSlots => {
        let map : IMapTimeSlots = {};
        
        for (const timeslot of timeslots) {
            map[timeslot.date] = [...(map[timeslot.date] || []), timeslot.time]
        }

        return map;
    }

    useEffect(() => {
      const map = mapTimeslots(timeslots);
      setDateTimeMap(map);
      setDates(Object.keys(map));
    }, [])
    
    
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
            </div>
            <div className={styles.bottomSection}>
                {
                    dates.length && dateTimeMap &&
                    dates.map((date: string, idx: number) => 
                        <div className={styles.dateTimeSection} key={date + idx}>
                            <span className={styles.date}>{date}:</span>
                            <div className={styles.timeslots}>
                            {
                                dateTimeMap[date].map((dateTime, idx) =>
                                    <span key={date + dateTime + idx} className={styles.time}>
                                        {dateTime}
                                    </span>    
                                )
                            }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
        {
            modalOpen && <ModalUpdateBooking booking={booking} handleModalOpen={handleModalOpen}/>
        }
    </>
  )
}

export default MyBookingCard