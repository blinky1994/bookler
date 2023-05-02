import { Request, Response } from "express";
import { getFacilitiesFromDB, getCategoriesMapWithFacilities } from "./facilities.model";

export async function getFacilities(req : Request, res: Response) {
    try {
        const facilities = await getFacilitiesFromDB();
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

export async function getCategories(req : Request, res: Response) {
    try {
        const categories = await getCategoriesMapWithFacilities();
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
