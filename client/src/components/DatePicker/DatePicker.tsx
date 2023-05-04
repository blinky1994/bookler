import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useState } from 'react'

export interface DatePickerProps {
    disabledDates: Date[]
}

const DatePicker = (dateSettings: DatePickerProps) => {
    const [startDate, setStartDate] = useState<Date | null>(new Date(Date.now()));
    const { disabledDates } = dateSettings;

    return (
        <div>
             <ReactDatePicker 
                selected={startDate} 
                onChange={(date) => setStartDate(date)}
                excludeDates={disabledDates}
             />
        </div>
       
    )
}

export default DatePicker