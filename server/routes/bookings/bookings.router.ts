import express from 'express'
import { 
    addBooking,
    updateBooking,
    getBooking,
    cancelBooking
} from './bookings.controller.js'

export const bookingsRouter = express.Router();

bookingsRouter.post('/', addBooking);
bookingsRouter.put('/:booking_id/update', updateBooking);
bookingsRouter.get('/users/:user_id', getBooking);
bookingsRouter.delete('/:booking_id/cancel', cancelBooking);

 