import { ITimeslot } from "../context/categories.context";

export function formatTime(timeslots: any): ITimeslot[] {
    return timeslots.map((timeslot: any) => {
        const { id, start_time, end_time, isBooked } = timeslot;

        return {
            id,
            date: getDateString(start_time),
            time: getStartEndTime(start_time, end_time),
            isBooked
        }
    })
}

function getStartEndTime(start_time: string, end_time: string) {
    const start_time_string = getTimeString(start_time);
    const end_time_string = getTimeString(end_time);
    return `${start_time_string} - ${end_time_string}`
}

function getTimeString(time: string) {
    const datetime = new Date(time);
    const timeString = datetime.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit', 
        minute: '2-digit'}
    );
    return timeString;  
}

function getDateString(time: string) {
    return time.substring(0, 10);
}

export function formatDate(timeslots: ITimeslot) {
    //TODO
}