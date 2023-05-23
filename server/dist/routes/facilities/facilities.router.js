"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.facilitiesRouter = void 0;
const express_1 = __importDefault(require("express"));
const facilities_controller_js_1 = require("./facilities.controller.js");
exports.facilitiesRouter = express_1.default.Router();
exports.facilitiesRouter.get('/', facilities_controller_js_1.getFacilities);
exports.facilitiesRouter.get('/:category_id', facilities_controller_js_1.getFacilities);
exports.facilitiesRouter.get('/facility/:facility_id', facilities_controller_js_1.getFacility);
exports.facilitiesRouter.get('/facility/:facility_id/:user_id/timeslots', facilities_controller_js_1.getFacilityTimeSlots);
exports.facilitiesRouter.get('/facility/:facility_id/:user_id/:booking_id/timeslots', facilities_controller_js_1.getFacilityTimeSlotsByBookingID);
exports.facilitiesRouter.get('/categories/all', facilities_controller_js_1.getCategories);
