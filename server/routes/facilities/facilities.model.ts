import db from "../../services/db";

export async function getFacilitiesFromDB() {

    const timeslots = await db.query(`
        SELECT * FROM timeslots;
    `)

    const facilities = new Map();

    for (const timeslot of timeslots[0]) {
        const { facility_id, start_time, end_time } = timeslot;
         facilities.set(facility_id, [...(facilities.get(facility_id) ?? []), { 
            start_time: start_time,
            end_time: end_time,
         }]);
    }

    const facilitiesArray = [];

    for (const facility of facilities.keys()) {
        const response = (await db.query(`
            SELECT details FROM facilities WHERE id = '${facility}';
        `))[0][0];

    
        const facilityObj = JSON.parse(response.details);
        const { name, description } = facilityObj;
        facilitiesArray.push({
            name,
            description,
            timeslots: facilities.get(facility)
        })
    }

    return facilitiesArray;
}
