import Timeslot from "./Timeslot/Timeslot"
import styles from './Timeslots.module.scss'
import { ITimeslot } from "../../interfaces/interfaces"

interface ITimeslotsProp {
    timeslots: ITimeslot[];
    handleBooking: (timeslot: ITimeslot, isRemove: boolean) => void;
}

const Timeslots = ({ timeslots, handleBooking } : ITimeslotsProp) => {
  return (
    <div className={styles.main}>
        {
            timeslots.map((timeslot: ITimeslot) => 
            <Timeslot
                key={timeslot.id + timeslot.time}
                timeslot={timeslot}
                handleBooking={handleBooking}
                selected={timeslot.selected}
            />
            )
        }
    </div>

  )
}

export default Timeslots