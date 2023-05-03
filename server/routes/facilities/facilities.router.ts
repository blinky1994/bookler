import express from 'express'
import { 
    getFacilities,
    getFacility,
    getCategories
} from './facilities.controller.js'

export const facilitiesRouter = express.Router();

facilitiesRouter.get('/', getFacilities);
facilitiesRouter.get('/:category_id', getFacilities);
facilitiesRouter.get('/facility/:facility_id', getFacility);
facilitiesRouter.get('/categories/all', getCategories);
