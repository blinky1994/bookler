import db from "../../services/db";

export async function getFacilitiesFromDB(category_id : number | undefined) {
    const timeslots = 
    category_id === undefined ?
    await db.query(`
        SELECT * FROM timeslots;
    `)
    :
    await db.query(`
        SELECT * FROM timeslots JOIN facilities 
        ON facilities.id = timeslots.facility_id 
        WHERE facilities.category_id = ${category_id};
`   );

    if (!timeslots[0].length) throw new Error('No available facilities');

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
            SELECT id, details, category_id, image_url FROM facilities WHERE id = '${facility}';
        `))[0][0];
    
        const { id, category_id, details, image_url } = response;
        const facilityObj = JSON.parse(details);

        const { name, description } = facilityObj;

        const category = (await db.query(`
            SELECT name FROM categories WHERE id = '${category_id}'
        `))[0][0];

        facilitiesArray.push({
            name,
            category: category.name,
            category_id,
            id,
            description,
            timeslots: facilities.get(facility),
            image_url
        })
    }

    return facilitiesArray;
}

export async function getFacilityFromDB(facility_id: number) {
    const timeAndFacilitiesData = await db.query(`
        SELECT * FROM timeslots JOIN facilities 
        ON facilities.id = timeslots.facility_id 
        WHERE facilities.id = '${facility_id}';
`   );

    if (!timeAndFacilitiesData[0].length) throw new Error('No facility found');

    const timeslotsArray = [];
    for (const data of timeAndFacilitiesData[0]) {
        const { id, start_time, end_time } = data;

        const bookedTimeSlots = await db.query(`
            SELECT id FROM bookings_timeslots WHERE timeslot_id = '${id}';
        `);

        timeslotsArray.push({
            start_time: start_time,
            end_time: end_time,
            isBooked: bookedTimeSlots[0].length > 0
        })
    }

    const { id, category_id, details, image_url } = timeAndFacilitiesData[0][0];
    const facilityObj = JSON.parse(details);

    const { name, description } = facilityObj;

    const category = (await db.query(`
        SELECT name FROM categories WHERE id = '${category_id}'
    `))[0][0];


    return {
        name,
        category: category.name,
        category_id,
        id,
        description,
        timeslots: timeslotsArray,
        image_url
    };
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
