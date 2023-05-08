import { ITimeslot } from '../../../interfaces/interfaces';
import styles from './Timeslot.module.scss'
import { useState } from 'react'

interface ITimeslotProps {
    timeslot: ITimeslot
    handleBooking: (timeslot: ITimeslot, isRemove: boolean) => void;
}

// export interface ITimeslot {
//     id: number;
//     date: string;
//     time: string;
//     isBooked: boolean;
// }

const Timeslot = ({timeslot, handleBooking}: ITimeslotProps) => {
    const [isSelected, setIsSelected] = useState(false);

    const { isBooked, time } = timeslot;

    const handleClick = () => {
        if (isBooked) return;
        
        handleBooking(timeslot, isSelected);
        
        setIsSelected(!isSelected);
    }

  return (
        <div onClick={handleClick} 
        className={isBooked ? styles.booked : 
            isSelected? styles.selected : styles.default 
        }>
            <span>{time}</span>
        </div>
  )
}

export default Timeslot