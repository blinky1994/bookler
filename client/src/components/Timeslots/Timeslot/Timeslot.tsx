import styles from './Timeslot.module.scss'
import { useState } from 'react'

interface ITimeslotProps {
    id: number;
    time: string;
    isBooked: boolean;
}

const Timeslot = ({id, time, isBooked}: ITimeslotProps) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleClick = () => {
        if (isBooked) return;
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