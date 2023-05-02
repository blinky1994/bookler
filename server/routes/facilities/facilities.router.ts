import express from 'express'
import { 
    getFacilities,
    getCategories
} from './facilities.controller.js'

export const facilitiesRouter = express.Router();

facilitiesRouter.get('/', getFacilities);
facilitiesRouter.get('/categories', getCategories);
