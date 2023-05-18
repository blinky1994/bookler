import express from 'express'
import { 
    getFacilities,
    getFacility,
    getFacilityTimeSlots,
    getFacilityTimeSlotsByBookingID,
    getCategories
} from './facilities.controller.js'

export const facilitiesRouter = express.Router();

facilitiesRouter.get('/', getFacilities);
facilitiesRouter.get('/:category_id', getFacilities);
facilitiesRouter.get('/facility/:facility_id', getFacility);
facilitiesRouter.get('/facility/:facility_id/:user_id/timeslots', getFacilityTimeSlots);
facilitiesRouter.get('/facility/:facility_id/:user_id/:booking_id/timeslots', getFacilityTimeSlotsByBookingID);
facilitiesRouter.get('/categories/all', getCategories);
