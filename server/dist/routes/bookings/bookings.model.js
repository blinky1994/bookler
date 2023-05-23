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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTimeslotsByBookingIDFromDB = exports.getBookingFromDB = exports.deleteBookingInDB = exports.updateBookingInDB = exports.addBookingInDB = void 0;
const db_1 = __importDefault(require("../../services/db"));
function addBookingInDB(user_id, timeslots) {
    return __awaiter(this, void 0, void 0, function* () {
        const booking = yield createBookingInDB(user_id, timeslots);
        return {
            booking_id: booking.booking_id,
            user_id: booking.user_id,
            status: "Added"
        };
    });
}
exports.addBookingInDB = addBookingInDB;
function checkTimeSlotsAvailable(timeslots) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const timeslot_id of timeslots) {
            const response = yield db_1.default.query(`
        SELECT slots FROM timeslots WHERE id = '${timeslot_id}';
        `);
            const { slots } = response[0][0];
            if (slots === 0)
                throw new Error('Timeslot is out of slots');
        }
    });
}
function decrementTimeslot(timeslot_id) {
    return __awaiter(this, void 0, void 0, function* () {
        yield db_1.default.query(`
        UPDATE timeslots SET slots = slots-1 WHERE id = '${timeslot_id}'
    `);
    });
}
function createBookingInDB(user_id, timeslots) {
    return __awaiter(this, void 0, void 0, function* () {
        yield checkTimeSlotsAvailable(timeslots);
        const response = yield db_1.default.query(`
        INSERT INTO bookings (
            user_id
        )
        VALUES (
            '${user_id}'
        );
        `);
        const insertID = response[0].insertId;
        const response2 = yield db_1.default.query(`
        SELECT id, user_id FROM bookings WHERE id = '${insertID}'
    `);
        const booking_id = response2[0][0].id;
        const userID = response2[0][0].user_id;
        yield processTimeslots(booking_id, timeslots);
        return {
            booking_id,
            user_id: userID,
            timeslots
        };
    });
}
function processTimeslots(booking_id, timeslots) {
    return __awaiter(this, void 0, void 0, function* () {
        for (const timeslot_id of timeslots) {
            yield db_1.default.query(`
        INSERT INTO bookings_timeslots (
            booking_id, timeslot_id
        )
        VALUES (
            '${booking_id}', '${timeslot_id}'
        );
        `);
            yield decrementTimeslot(timeslot_id);
        }
    });
}
function updateBookingInDB(booking_id, timeslots) {
    return __awaiter(this, void 0, void 0, function* () {
        const bookings = yield db_1.default.query(`
        SELECT id FROM bookings WHERE id = '${booking_id}'
    `);
        if (!bookings[0][0])
            throw new Error('Booking does not exist');
        // Update all the slot counts for current timeslots in booking
        const timeslot_ids = (yield db_1.default.query(`
        SELECT timeslot_id FROM bookings_timeslots WHERE booking_id = '${booking_id}';
    `))[0];
        for (const timeslotObj of timeslot_ids) {
            const { timeslot_id } = timeslotObj;
            yield db_1.default.query(`
            UPDATE timeslots SET slots = slots+1 WHERE id = '${timeslot_id}';
        `);
        }
        // Delete previous timeslots before updating
        yield db_1.default.query(`
    DELETE FROM bookings_timeslots
    WHERE booking_id = '${booking_id}';`);
        // Delete from bookings table if there are no timeslots
        if (timeslots.length === 0) {
            yield db_1.default.query(`
            DELETE FROM bookings
            WHERE id = '${booking_id}';
        `);
            return {
                booking_id,
                status: "Deleted"
            };
        }
        yield checkTimeSlotsAvailable(timeslots);
        yield processTimeslots(booking_id, timeslots);
        return {
            booking_id,
            timeslots,
            status: "Updated"
        };
    });
}
exports.updateBookingInDB = updateBookingInDB;
function deleteBookingInDB(booking_id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield updateBookingInDB(booking_id, []);
    });
}
exports.deleteBookingInDB = deleteBookingInDB;
function getBookingFromDB(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const booking_ids = (yield db_1.default.query(`
        SELECT id FROM bookings WHERE user_id = '${user_id}';`))[0];
        if (booking_ids.length === 0)
            throw new Error('User has no bookings');
        let bookings = [];
        for (const booking of booking_ids) {
            const booking_id = booking.id;
            const timeslotsObjects = (yield db_1.default.query(`
            SELECT timeslot_id FROM bookings_timeslots 
            WHERE booking_id = '${booking_id}'
        `))[0];
            let timeslots_timings = [];
            let facility_id = 0;
            for (const timeslotObj of timeslotsObjects) {
                const { timeslot_id } = timeslotObj;
                const timing = yield db_1.default.query(`
                SELECT id, start_time, end_time, facility_id, slots FROM timeslots
                WHERE id = '${timeslot_id}';
            `);
                const { id, start_time, end_time, slots } = timing[0][0];
                facility_id = timing[0][0].facility_id;
                timeslots_timings.push({
                    id,
                    start_time,
                    end_time,
                    slots
                });
            }
            const facilityData = (yield db_1.default.query(`
                SELECT name FROM facilities
                WHERE id = '${facility_id}';
        `))[0][0];
            const { name } = facilityData;
            bookings.push({
                id: booking_id,
                facility_id,
                facilityName: name,
                timeslots: timeslots_timings
            });
        }
        return bookings;
    });
}
exports.getBookingFromDB = getBookingFromDB;
function getTimeslotsByBookingIDFromDB(booking_id, client_user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const timeslot_ids = (yield db_1.default.query(`
        SELECT timeslot_id FROM bookings_timeslots WHERE booking_id = '${booking_id}';
    `))[0];
        const timeslots = [];
        for (const timeslotObj of timeslot_ids) {
            const { timeslot_id } = timeslotObj;
            const timeslotsData = (yield db_1.default.query(`
            SELECT id, start_time, end_time, facility_id, slots FROM timeslots 
            WHERE id = '${timeslot_id}';
        `))[0][0];
            let isBooked = false;
            const userData = (yield db_1.default.query(`
        SELECT user_id FROM bookings WHERE id = '${booking_id}';
        `))[0][0];
            if (userData) {
                const { user_id } = userData;
                isBooked = (user_id === client_user_id);
            }
            timeslots.push(Object.assign(Object.assign({}, timeslotsData), { isBooked }));
        }
        return timeslots;
    });
}
exports.getTimeslotsByBookingIDFromDB = getTimeslotsByBookingIDFromDB;
