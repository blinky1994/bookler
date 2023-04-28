import { Request, Response } from "express";
import { addBookingInDB } from "./bookings.model";

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
    const { booking_id } = req.params;
    res.send({
        message: 'updateBooking',
        booking_id: booking_id
    })
}

export async function getBooking(req : Request, res: Response) {
    const { user_id } = req.params;
    res.send({
        message: 'getBooking',
        booking_id: user_id
    })
}

export async function cancelBooking(req : Request, res: Response) {
    const { booking_id } = req.params;
    res.send({
        message: 'cancelBooking',
        booking_id: booking_id
    })
}