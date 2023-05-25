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
exports.getCategoriesFromDB = exports.getFacilityTimeSlotsByBookingIDFromDB = exports.getFacilityTimeSlotsFromDB = exports.getFacilityFromDB = exports.getFacilitiesFromDB = void 0;
const db_1 = __importDefault(require("../../services/db"));
function getFacilitiesFromDB(cat_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const facilitiesData = cat_id === undefined ?
            yield db_1.default.query(`
        SELECT * FROM facilities;
    `)
            :
                yield db_1.default.query(`
        SELECT * FROM facilities
        WHERE category_id = '${cat_id}';
`);
        if (!facilitiesData[0].length)
            throw new Error('No facilities found in this category');
        const facilities = [];
        for (const data of facilitiesData[0]) {
            const { id, name, description, category_id, image_url } = data;
            const categoryData = yield db_1.default.query(`
            SELECT name FROM categories
            WHERE id = '${category_id}';
        `);
            const categoryName = categoryData[0][0].name;
            facilities.push({
                name,
                category: categoryName,
                category_id,
                id,
                description,
                image_url
            });
        }
        return facilities;
    });
}
exports.getFacilitiesFromDB = getFacilitiesFromDB;
function getFacilityFromDB(facility_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const facilityData = yield db_1.default.query(`
        SELECT * FROM facilities
        WHERE facilities.id = '${facility_id}';
`);
        if (!facilityData[0][0])
            throw new Error('No facility found');
        const { id, category_id, name, description, image_url } = facilityData[0][0];
        const categoryName = (yield db_1.default.query(`
        SELECT name FROM categories WHERE id = '${category_id}'
    `))[0][0].name;
        return {
            name,
            category: categoryName,
            category_id,
            id,
            description,
            image_url
        };
    });
}
exports.getFacilityFromDB = getFacilityFromDB;
function getFacilityTimeSlotsFromDB(facility_id, client_user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const timeslotsData = yield db_1.default.query(`
        SELECT id, start_time, end_time, slots FROM timeslots
        WHERE facility_id = '${facility_id}'
    `);
        if (!timeslotsData[0].length)
            throw new Error('No timeslots found');
        const timeslots = [];
        for (const data of timeslotsData[0]) {
            const { id, start_time, end_time, slots } = data;
            const date = (new Date(start_time));
            let isBooked = false;
            const bookingData = (yield db_1.default.query(`
        SELECT booking_id FROM bookings_timeslots WHERE timeslot_id = '${id}';
        `))[0][0];
            if (bookingData) {
                const { booking_id } = bookingData;
                const userData = (yield db_1.default.query(`
                SELECT user_id FROM bookings WHERE id = '${booking_id}';
            `))[0][0];
                if (userData) {
                    const { user_id } = userData;
                    isBooked = (user_id === client_user_id);
                }
            }
            timeslots.push({
                id,
                date,
                start_time,
                end_time,
                slots,
                isBooked
            });
        }
        return timeslots;
    });
}
exports.getFacilityTimeSlotsFromDB = getFacilityTimeSlotsFromDB;
function getFacilityTimeSlotsByBookingIDFromDB(facility_id, client_user_id, booking_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const timeslotsData = yield db_1.default.query(`
        SELECT id, start_time, end_time, slots FROM timeslots
        WHERE facility_id = '${facility_id}'
    `);
        if (!timeslotsData[0].length)
            throw new Error('No timeslots found');
        const timeslots = [];
        for (const data of timeslotsData[0]) {
            const { id, start_time, end_time, slots } = data;
            const date = (new Date(start_time));
            let isBooked = false;
            const bookingData = (yield db_1.default.query(`
        SELECT booking_id FROM bookings_timeslots WHERE timeslot_id = '${id}' 
        AND booking_id = '${booking_id}'
        ;
        `))[0][0];
            if (bookingData) {
                const { booking_id } = bookingData;
                const userData = (yield db_1.default.query(`
                SELECT user_id FROM bookings WHERE id = '${booking_id}';
            `))[0][0];
                if (userData) {
                    const { user_id } = userData;
                    isBooked = (user_id === client_user_id);
                }
            }
            timeslots.push({
                id,
                date,
                start_time,
                end_time,
                slots,
                isBooked
            });
        }
        return timeslots;
    });
}
exports.getFacilityTimeSlotsByBookingIDFromDB = getFacilityTimeSlotsByBookingIDFromDB;
function getCategoriesFromDB() {
    return __awaiter(this, void 0, void 0, function* () {
        const categories = yield db_1.default.query(`
        SELECT id, name, image_url FROM categories;
    `);
        const categoriesMapped = categories[0].map((categoryObj) => {
            return {
                id: categoryObj.id,
                name: categoryObj.name,
                image_url: categoryObj.image_url
            };
        });
        return categoriesMapped;
    });
}
exports.getCategoriesFromDB = getCategoriesFromDB;
