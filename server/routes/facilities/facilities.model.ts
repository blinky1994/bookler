import db from "../../services/db";

export async function getFacilitiesFromDB(cat_id : number | undefined) {
    const facilitiesData = 
    cat_id === undefined ?
    await db.query(`
        SELECT * FROM facilities;
    `)
    :
    await db.query(`
        SELECT * FROM facilities
        WHERE category_id = '${cat_id}';
`   );

    if (!facilitiesData[0].length) throw new Error('No facilities found in this category');

    const facilities = [];

    for (const data of facilitiesData[0]) {
        const { id, name, description, category_id, image_url } = data;
    
        const categoryData = await db.query(`
            SELECT name FROM categories
            WHERE id = '${category_id}';
        `)
    
        const categoryName = categoryData[0][0].name;
        facilities.push({
            name,
            category: categoryName,
            category_id,
            id,
            description,
            image_url
        })
    }
   
    return facilities;
}

export async function getFacilityFromDB(facility_id: number) {
    const facilityData = await db.query(`
        SELECT * FROM facilities
        WHERE facilities.id = '${facility_id}';
`   );

    if (!facilityData[0][0]) throw new Error('No facility found');

    const { id, category_id, name, description, image_url } = facilityData[0][0];

    const categoryName = (await db.query(`
        SELECT name FROM categories WHERE id = '${category_id}'
    `))[0][0].name;


    return {
        name,
        category: categoryName,
        category_id,
        id,
        description,
        image_url
    };
}

export async function getFacilityTimeSlotsFromDB(facility_id: number, client_user_id: number) {
    const timeslotsData = await db.query(`
        SELECT id, start_time, end_time, slots FROM timeslots
        WHERE facility_id = '${facility_id}'
    `);

    if (!timeslotsData[0].length) throw new Error('No timeslots found');

    const timeslots = [];

    for (const data of timeslotsData[0]) {
        const { id, start_time, end_time, slots } = data;

        const date = (new Date(start_time));

        let isBooked = false;

        const bookingData = (await db.query(`
        SELECT booking_id FROM bookings_timeslots WHERE timeslot_id = '${id}';
        `))[0][0];

        if (bookingData) {
            const { booking_id } = bookingData;
            const userData = (await db.query(`
                SELECT user_id FROM bookings WHERE id = '${booking_id}';
            `))[0][0];

            if (userData) {
                const { user_id } = userData;
                isBooked = (user_id === client_user_id);
            }
        }

        timeslots.push({
            id,
            date,
            start_time, 
            end_time,
            slots,
            isBooked
        })
    }
    return timeslots;
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
