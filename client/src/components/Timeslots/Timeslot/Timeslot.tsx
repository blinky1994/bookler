import { ITimeslot } from '../../../interfaces/interfaces';
import styles from './Timeslot.module.scss'
import { useState, useEffect } from 'react'

interface ITimeslotProps {
    timeslot: ITimeslot
    handleBooking: (timeslot: ITimeslot, isRemove: boolean) => void;
    selected: boolean;
}

// export interface ITimeslot {
//     id: number;
//     date: string;
//     time: string;
//     isBooked: boolean;
// }

const Timeslot = ({timeslot, handleBooking, selected}: ITimeslotProps) => {
    useEffect(() => {
        if (selected) {
            setIsSelected(selected);
        }
    }, [])

    const [isSelected, setIsSelected] = useState(false);

    const { slots, time } = timeslot;

    const handleClick = () => {
        if (slots === 0) return;
        
        handleBooking(timeslot, isSelected);
        
        setIsSelected(!isSelected);
    }

  return (
        <div onClick={handleClick} 
        className={slots === 0 ? styles.booked : 
            isSelected? styles.selected : styles.default 
        }>
            <span>{time}</span>
            <div className={styles.slots}>
                <span>{slots} slots</span>
            </div>
        </div>
  )
}

export default Timeslot