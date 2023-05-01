import { Request, Response } from "express";
import { getFacilitiesFromDB } from "./facilities.model";

export async function getFacilities(req : Request, res: Response) {
    try {
        const facilities = await getFacilitiesFromDB();
        console.log('Successfully added facilities');
        res.status(200).json({
            facilities
        })
    } catch (err : any) {
        console.log('Error getting facilities: ', err);
        res.status(400).json({
            error: err.toString()
        })
    }
}
