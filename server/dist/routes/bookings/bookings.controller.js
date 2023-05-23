"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeslotsByBookingID = exports.cancelBooking = exports.getBooking = exports.updateBooking = exports.addBooking = void 0;
const bookings_model_1 = require("./bookings.model");
function addBooking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user_id, timeslots } = req.body;
        try {
            const booking = yield (0, bookings_model_1.addBookingInDB)(user_id, timeslots);
            console.log('Successfully added booking');
            res.status(200).json({
                booking
            });
        }
        catch (err) {
            console.log('Error adding booking: ', err);
            res.status(400).json({
                error: err.toString()
            });
        }
    });
}
exports.addBooking = addBooking;
function updateBooking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { booking_id, timeslots } = req.body;
        try {
            const booking = yield (0, bookings_model_1.updateBookingInDB)(booking_id, timeslots);
            console.log('Successfully updated booking');
            res.status(200).json({
                booking
            });
        }
        catch (err) {
            console.log('Error updating booking: ', err);
            res.status(400).json({
                error: err.toString()
            });
        }
    });
}
exports.updateBooking = updateBooking;
function getBooking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { user_id } = req.params;
        try {
            const bookings = yield (0, bookings_model_1.getBookingFromDB)(parseInt(user_id, 10));
            console.log('Successfully retrieved booking');
            res.status(200).json({
                bookings
            });
        }
        catch (err) {
            console.log('Error retrieving booking: ', err);
            res.status(400).json({
                error: err.toString()
            });
        }
    });
}
exports.getBooking = getBooking;
function cancelBooking(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { booking_id } = req.params;
        try {
            const booking = yield (0, bookings_model_1.deleteBookingInDB)(parseInt(booking_id, 10));
            console.log('Successfully retrieved booking');
            res.status(200).json({
                booking
            });
        }
        catch (err) {
            console.log('Error retrieving booking: ', err);
            res.status(400).json({
                error: err.toString()
            });
        }
    });
}
exports.cancelBooking = cancelBooking;
function getTimeslotsByBookingID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { booking_id, user_id } = req.params;
        try {
            const timeslots = yield (0, bookings_model_1.getTimeslotsByBookingIDFromDB)(parseInt(booking_id, 10), parseInt(user_id, 10));
            console.log('Successfully retrieved timeslots by booking id');
            res.status(200).json({
                timeslots
            });
        }
        catch (err) {
            console.log('Error retrieving timeslots by booking id: ', err);
            res.status(400).json({
                error: err.toString()
            });
        }
    });
}
exports.getTimeslotsByBookingID = getTimeslotsByBookingID;
