import db from "../../services/db";

export async function getFacilitiesFromDB() {
    const timeslots = await db.query(`
        SELECT * FROM timeslots;
    `)

    const facilities = new Map();

    for (const timeslot of timeslots[0]) {
        const { id, facility_id, start_time, end_time } = timeslot;

        const bookedTimeSlots = await db.query(`
            SELECT id FROM bookings_timeslots WHERE timeslot_id = '${id}';
        `);

         facilities.set(facility_id, [...(facilities.get(facility_id) ?? []), { 
            start_time: start_time,
            end_time: end_time,
            isBooked: bookedTimeSlots[0].length > 0
         }]);
    }

    const facilitiesArray = [];

    for (const facility of facilities.keys()) {
        const response = (await db.query(`
            SELECT details, category_id FROM facilities WHERE id = '${facility}';
        `))[0][0];
    
        const { category_id, details } = response
        const facilityObj = JSON.parse(details);

        const { name, description } = facilityObj;

        const category = (await db.query(`
            SELECT name FROM categories WHERE id = '${category_id}'
        `))[0][0];

        facilitiesArray.push({
            name,
            category: category.name,
            category_id,
            description,
            timeslots: facilities.get(facility)
        })
    }

    return facilitiesArray;
}

export async function getCategoriesFromDB() {
    const categories = await db.query(`
        SELECT id, name FROM categories;
    `)

    interface ICategory {
        id: number;
        name: string;
    }

    const categoriesMapped = categories[0].map((categoryObj : ICategory) => {
        return {
            id: categoryObj.id,
            name: categoryObj.name
        }
    });

    return categoriesMapped;
}
