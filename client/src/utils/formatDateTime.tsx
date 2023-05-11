import { ITimeslot } from "../interfaces/interfaces";

export function formatTimeData(timeslots: any, facilityName: string): ITimeslot[] {
    return timeslots.map((timeslot: any) => {
        const { id, start_time, end_time, slots } = timeslot;

        return {
            id,
            facilityName,
            date: getDateString(start_time),
            time: getStartEndTime(start_time, end_time),
            slots
        }
    })
}

export function filterTimeslotsByDate(date: Date, timeslots: any) {
    return timeslots.filter((obj: any) => {
        const currentDate = obj.start_time.substring(0, 10);
        const desiredDate = date.toISOString().substring(0, 10);
        return currentDate === desiredDate;
    })
}

export function getDatesInISOString(timeslots: any) : string[] {
    const datesMap : IDatesMap = {};

    interface IDatesMap {
        [key: string] : boolean;
    }

    for (const timeslot of timeslots) {
        datesMap[timeslot.date] = true;
    }

    const dates : string[] = [];

    for (const date in datesMap) {
        const isoDateString = date.substring(0, 10);
        dates.push(isoDateString);
    }
    return dates;
}

function getStartEndTime(start_time: string, end_time: string) {
    const start_time_string = getTimeString(start_time);
    const end_time_string = getTimeString(end_time);
    return `${start_time_string} - ${end_time_string}`
}

function getTimeString(time: string) {
    const timeString = new Date(time).toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit', 
        minute: '2-digit'}
    );
    return timeString;  
}

function getDateString(time: string) {
    return time.substring(0, 10);
}

