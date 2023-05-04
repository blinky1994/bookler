export interface ITimeslot {
    start_time: Date;
    end_time: Date;
    isBooked: boolean;
}

export interface IFacility {
    id: number;
    image_url: string;
    name: string;
    category: string;
    category_id: number;
    description: string;
    timeslots: ITimeslot[]
}

export interface ICategory {
    id: number;
    name: string;
}
  