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
exports.getCategories = exports.getFacilityTimeSlotsByBookingID = exports.getFacilityTimeSlots = exports.getFacility = exports.getFacilities = void 0;
const facilities_model_1 = require("./facilities.model");
function getFacilities(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { category_id } = req.params;
            const facilities = yield (0, facilities_model_1.getFacilitiesFromDB)(category_id === undefined ? category_id : parseInt(category_id, 10));
            console.log('Successfully retrieved facilities');
            res.status(200).json({
                facilities
            });
        }
        catch (err) {
            console.log('Error retrieving facilities: ', err);
            res.status(400).json({
                error: err.toString()
            });
        }
    });
}
exports.getFacilities = getFacilities;
function getFacility(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { facility_id } = req.params;
            const facility = yield (0, facilities_model_1.getFacilityFromDB)(parseInt(facility_id, 10));
            console.log('Successfully retrieved facility');
            res.status(200).json({
                facility
            });
        }
        catch (err) {
            console.log('Error retrieving facility: ', err);
            res.status(400).json({
                error: err.toString()
            });
        }
    });
}
exports.getFacility = getFacility;
function getFacilityTimeSlots(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { facility_id, user_id } = req.params;
            const timeslots = yield (0, facilities_model_1.getFacilityTimeSlotsFromDB)(parseInt(facility_id, 10), parseInt(user_id, 10));
            console.log('Successfully retrieved timeslots');
            res.status(200).json({
                timeslots
            });
        }
        catch (err) {
            console.log('Error retrieving timeslots: ', err);
            res.status(400).json({
                error: err.toString()
            });
        }
    });
}
exports.getFacilityTimeSlots = getFacilityTimeSlots;
function getFacilityTimeSlotsByBookingID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { facility_id, user_id, booking_id } = req.params;
            const timeslots = yield (0, facilities_model_1.getFacilityTimeSlotsByBookingIDFromDB)(parseInt(facility_id, 10), parseInt(user_id, 10), parseInt(booking_id, 10));
            console.log('Successfully retrieved timeslots');
            res.status(200).json({
                timeslots
            });
        }
        catch (err) {
            console.log('Error retrieving timeslots: ', err);
            res.status(400).json({
                error: err.toString()
            });
        }
    });
}
exports.getFacilityTimeSlotsByBookingID = getFacilityTimeSlotsByBookingID;
function getCategories(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const categories = yield (0, facilities_model_1.getCategoriesFromDB)();
            console.log('Successfully retrieved categories');
            res.status(200).json({
                categories
            });
        }
        catch (err) {
            console.log('Error retrieving categories: ', err);
            res.status(400).json({
                error: err.toString()
            });
        }
    });
}
exports.getCategories = getCategories;
