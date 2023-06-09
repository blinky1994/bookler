import { Request, Response } from "express";
import { 
    addBookingInDB, 
    updateBookingInDB, 
    getBookingFromDB, 
    deleteBookingInDB,
    getTimeslotsByBookingIDFromDB
} from "./bookings.model";

export async function addBooking(req : Request, res: Response) {
    const { user_id, timeslots } = req.body;
    try {
        const booking = await addBookingInDB(user_id, timeslots);
        console.log('Successfully added booking');
        res.status(200).json({
            booking
        })
    } catch (err : any) {
        console.log('Error adding booking: ', err);
        res.status(400).json({
            error: err.toString()
        })
    }
}

export async function updateBooking(req : Request, res: Response) {
    const { booking_id, timeslots } = req.body;
    try {
        const booking = await updateBookingInDB(booking_id, timeslots);
        console.log('Successfully updated booking');
        res.status(200).json({
            booking
        })
    } catch (err : any) {
        console.log('Error updating booking: ', err);
        res.status(400).json({
            error: err.toString()
        })
    }
}

export async function getBooking(req : Request, res: Response) {
    const { user_id } = req.params;
    try {
        const bookings = await getBookingFromDB(parseInt(user_id, 10));
        console.log('Successfully retrieved booking');
        res.status(200).json({
            bookings
        })
    } catch (err : any) {
        console.log('Error retrieving booking: ', err);
        res.status(400).json({
            error: err.toString()
        })
    }
}

export async function cancelBooking(req : Request, res: Response) {
    const { booking_id } = req.params;
    try {
        const booking = await deleteBookingInDB(parseInt(booking_id, 10));
        console.log('Successfully retrieved booking');
        res.status(200).json({
            booking
        })
    } catch (err : any) {
        console.log('Error retrieving booking: ', err);
        res.status(400).json({
            error: err.toString()
        })
    }
}

export async function getTimeslotsByBookingID(req: Request, res: Response) {
    const { booking_id, user_id } = req.params;
    try {
        const timeslots = await getTimeslotsByBookingIDFromDB(
            parseInt(booking_id, 10),
            parseInt(user_id, 10)
        );
        console.log('Successfully retrieved timeslots by booking id');
        res.status(200).json({
            timeslots
        })
    } catch (err : any) {
        console.log('Error retrieving timeslots by booking id: ', err);
        res.status(400).json({
            error: err.toString()
        })
    }
}