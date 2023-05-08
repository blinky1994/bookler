import Timeslot from "./Timeslot/Timeslot"
import styles from './Timeslots.module.scss'

import { ITimeslot } from "../../context/categories.context"

interface ITimeslotsProp {
    timeslots: ITimeslot[]
}

const Timeslots = ({ timeslots } : ITimeslotsProp) => {
  return (
    <div className={styles.main}>
        {
            timeslots.map((timeslot: ITimeslot) => 
            <Timeslot
                key={timeslot.id + timeslot.time}
                id={timeslot.id}
                time={timeslot.time}
                isBooked={timeslot.isBooked}
            />
        )
        }
    </div>

  )
}

export default Timeslots