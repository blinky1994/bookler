import express from 'express'
import { 
    getFacilities
} from './facilities.controller.js'

export const facilitiesRouter = express.Router();

facilitiesRouter.get('/', getFacilities);
