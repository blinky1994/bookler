export interface IBookingData {
    id: number;
    facility_id: number;
    facilityName: string;
    timeslots: ITimeslotData[]
}

export interface ITimeslotData {
    start_time: string;
    end_time: string;
}
  

export interface IBookedTimeSlot {
  id: number;
  facilityName: string;
  date: string;
  time: string;
  timeslot: ITimeslot;
}

export interface IBooking {
    id: number;
    facility_id: number;
    facilityName: string;
    date: string;
    timeslots: ITimeslot[];
}
  
export interface ITimeslot {
    id: number;
    date: string;
    time: string;
    start_time: string;
    end_time: string;
    facilityName: string;
    slots: number;
    selected: boolean;
}

export interface IFacility {
    id: number;
    image_url: string;
    name: string;
    category: string;
    category_id: number;
    description: string;
}

export interface ICategory {
    id: number;
    name: string;
}
  