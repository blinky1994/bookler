import { Request, Response } from "express";
import { 
    getFacilitiesFromDB, 
    getFacilityFromDB, 
    getCategoriesFromDB, 
    getFacilityTimeSlotsFromDB } 
from "./facilities.model";

export async function getFacilities(req: Request, res: Response) {
    try {
        const { category_id } = req.params;
        const facilities = await getFacilitiesFromDB(category_id === undefined ? category_id : parseInt(category_id, 10));
        console.log('Successfully retrieved facilities');
        res.status(200).json({
            facilities
        })
    } catch (err : any) {
        console.log('Error retrieving facilities: ', err);
        res.status(400).json({
            error: err.toString()
        })
    }
}

export async function getFacility(req: Request, res: Response) {
    try {
        const { facility_id } = req.params;
        const facility = await getFacilityFromDB(parseInt(facility_id, 10));
        console.log('Successfully retrieved facility');
        res.status(200).json({
            facility
        })
    } catch (err : any) {
        console.log('Error retrieving facility: ', err);
        res.status(400).json({
            error: err.toString()
        })
    }
}


export async function getFacilityTimeSlots(req: Request, res: Response) {
    try {
        const { facility_id } = req.params;
        const timeslots = await getFacilityTimeSlotsFromDB(parseInt(facility_id, 10));
        console.log('Successfully retrieved timeslots');
        res.status(200).json({
            timeslots
        })
    } catch (err : any) {
        console.log('Error retrieving timeslots: ', err);
        res.status(400).json({
            error: err.toString()
        })
    }
}

export async function getCategories(req: Request, res: Response) {
    try {
        const categories = await getCategoriesFromDB();
        console.log('Successfully retrieved categories');
        res.status(200).json({
            categories
        })
    } catch (err : any) {
        console.log('Error retrieving categories: ', err);
        res.status(400).json({
            error: err.toString()
        })
    }
}
