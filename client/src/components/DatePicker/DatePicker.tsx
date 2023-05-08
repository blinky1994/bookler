import ReactDatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

interface IDatePickerProps {
    selected: Date;
    onChange: (date: Date) => void,
    enabledDates: Date[];
    className: string;
}


const DatePicker = ({selected, className, onChange, enabledDates, ...rest} : IDatePickerProps) => {
    return (
        <div>
             <ReactDatePicker 
                selected={selected}
                onChange={onChange}
                includeDates={enabledDates}
                className={className}
                {...rest}
             />
        </div>
       
    )
}

export default DatePicker