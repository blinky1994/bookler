"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookingsRouter = void 0;
const express_1 = __importDefault(require("express"));
const bookings_controller_js_1 = require("./bookings.controller.js");
exports.bookingsRouter = express_1.default.Router();
exports.bookingsRouter.post('/', bookings_controller_js_1.addBooking);
exports.bookingsRouter.post('/update', bookings_controller_js_1.updateBooking);
exports.bookingsRouter.get('/users/:user_id', bookings_controller_js_1.getBooking);
exports.bookingsRouter.delete('/:booking_id/cancel', bookings_controller_js_1.cancelBooking);
exports.bookingsRouter.get('/timeslots/:user_id/:booking_id', bookings_controller_js_1.getTimeslotsByBookingID);
