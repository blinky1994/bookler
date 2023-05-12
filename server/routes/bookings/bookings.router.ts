import express from 'express'
import { 
    addBooking,
    updateBooking,
    getBooking,
    cancelBooking,
    getTimeslotsByBookingID
} from './bookings.controller.js'

export const bookingsRouter = express.Router();

bookingsRouter.post('/', addBooking);
bookingsRouter.post('/update', updateBooking);
bookingsRouter.get('/users/:user_id', getBooking);
bookingsRouter.delete('/:booking_id/cancel', cancelBooking);
bookingsRouter.get('/timeslots/:booking_id', getTimeslotsByBookingID);