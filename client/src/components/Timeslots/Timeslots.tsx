import Timeslot from "./Timeslot/Timeslot"
import styles from './Timeslots.module.scss'
import { ITimeslot } from "../../interfaces/interfaces"

interface ITimeslotsProp {
    timeslots: ITimeslot[];
    handleBooking: (timeslot: ITimeslot, isRemove: boolean) => void;
    isUpdatePage: boolean;
}

const Timeslots = ({ timeslots, handleBooking, isUpdatePage } : ITimeslotsProp) => {
  return (
    <div className={styles.main}>
        {
            timeslots.map((timeslot: ITimeslot) => 
            <Timeslot
                key={timeslot.id + timeslot.time}
                timeslot={timeslot}
                handleBooking={handleBooking}
                selected={timeslot.selected}
                isUpdatePage={isUpdatePage}
            />
            )
        }
    </div>

  )
}

export default Timeslots