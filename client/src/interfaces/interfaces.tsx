export interface IBooking {
  id: number;
  facilityName: string;
  date: string;
  time: string
}

export interface ITimeslot {
    id: number;
    date: string;
    time: string;
    facilityName: string;
    isBooked: boolean;
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
  