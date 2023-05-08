import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface IDatePickerProps {
    selected: Date;
    onChange: (date: Date) => void,
    enabledDates: Date[]
}


const DatePicker = ({selected, onChange, enabledDates, ...rest} : IDatePickerProps) => {
    return (
        <div>
             <ReactDatePicker 
                selected={selected}
                onChange={onChange}
                includeDates={enabledDates}
                {...rest}
             />
        </div>
       
    )
}

export default DatePicker