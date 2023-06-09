import db from "../../services/db";

export async function addBookingInDB(user_id: number, timeslots: number[]) {
    const booking = await createBookingInDB(user_id, timeslots);

    return {
        booking_id: booking.booking_id,
        user_id: booking.user_id,
        status: "Added"
    }
}

async function checkTimeSlotsAvailable(timeslots: number[]) {
    for (const timeslot_id of timeslots) {
        const response = await db.query(`
        SELECT slots FROM timeslots WHERE id = '${timeslot_id}';
        `);
        const { slots } = response[0][0];  
        
        if (slots === 0) throw new Error('Timeslot is out of slots');
    }

}

async function decrementTimeslot(timeslot_id: number) {
    await db.query(`
        UPDATE timeslots SET slots = slots-1 WHERE id = '${timeslot_id}'
    `);
}

async function createBookingInDB(user_id: number, timeslots: number[]) {
    await checkTimeSlotsAvailable(timeslots);
    const response = await db.query(`
        INSERT INTO bookings (
            user_id
        )
        VALUES (
            '${user_id}'
        );
        `);

    const insertID = response[0].insertId;

    const response2 = await db.query(`
        SELECT id, user_id FROM bookings WHERE id = '${insertID}'
    `);

    const booking_id = response2[0][0].id;
    const userID = response2[0][0].user_id;

    await processTimeslots(booking_id, timeslots);

    return {
        booking_id,
        user_id: userID,
        timeslots
    }
}

async function processTimeslots(booking_id: number, timeslots: number[]) {
    for (const timeslot_id of timeslots) {
        await db.query(`
        INSERT INTO bookings_timeslots (
            booking_id, timeslot_id
        )
        VALUES (
            '${booking_id}', '${timeslot_id}'
        );
        `);

        await decrementTimeslot(timeslot_id);
    }
}

export async function updateBookingInDB(booking_id : number, timeslots: number[]) {
    const bookings = await db.query(`
        SELECT id FROM bookings WHERE id = '${booking_id}'
    `)

    if (!bookings[0][0]) throw new Error('Booking does not exist');

    // Update all the slot counts for current timeslots in booking
    const timeslot_ids = (await db.query(`
        SELECT timeslot_id FROM bookings_timeslots WHERE booking_id = '${booking_id}';
    `))[0];
    for (const timeslotObj of timeslot_ids) {
        const { timeslot_id } = timeslotObj;
        await db.query(`
            UPDATE timeslots SET slots = slots+1 WHERE id = '${timeslot_id}';
        `)
    }
    

    // Delete previous timeslots before updating
    await db.query(`
    DELETE FROM bookings_timeslots
    WHERE booking_id = '${booking_id}';`); 

    // Delete from bookings table if there are no timeslots
    if (timeslots.length === 0) {
        await db.query(`
            DELETE FROM bookings
            WHERE id = '${booking_id}';
        `)

        return {
            booking_id,
            status: "Deleted"
        }
    }
    await checkTimeSlotsAvailable(timeslots);
    await processTimeslots(booking_id, timeslots);

    return {
        booking_id,
        timeslots,
        status: "Updated"
    }
}

export async function deleteBookingInDB(booking_id: number) {
    return await updateBookingInDB(booking_id, []);
}

export async function getBookingFromDB(user_id: number) {
    const booking_ids = (await db.query(`
        SELECT id FROM bookings WHERE user_id = '${user_id}';`)
    )[0];

    if (booking_ids.length === 0) throw new Error('User has no bookings');

    let bookings = [];

    for (const booking of booking_ids) {
        const booking_id = booking.id;
        const timeslotsObjects = (await db.query(`
            SELECT timeslot_id FROM bookings_timeslots 
            WHERE booking_id = '${booking_id}'
        `))[0];

        let timeslots_timings = [];
        let facility_id = 0;
        for (const timeslotObj of timeslotsObjects) {
            const { timeslot_id } = timeslotObj;
            const timing = await db.query(`
                SELECT id, start_time, end_time, facility_id, slots FROM timeslots
                WHERE id = '${timeslot_id}';
            `);

            const { id, start_time, end_time, slots} = timing[0][0];
            facility_id = timing[0][0].facility_id
            timeslots_timings.push({
                id,
                start_time,
                end_time,
                slots          
            });
        }

        const facilityData = (await db.query(`
                SELECT name FROM facilities
                WHERE id = '${facility_id}';
        `))[0][0];

        const { name } = facilityData;

        bookings.push({
            id: booking_id,
            facility_id,
            facilityName: name,
            timeslots: timeslots_timings
        })
    }

    return bookings;
}

export async function getTimeslotsByBookingIDFromDB(booking_id : number, client_user_id: number) {
    const timeslot_ids = (await db.query(`
        SELECT timeslot_id FROM bookings_timeslots WHERE booking_id = '${booking_id}';
    `))[0];

    const timeslots = [];

    for (const timeslotObj of timeslot_ids) {
        const { timeslot_id } = timeslotObj;

        const timeslotsData = (await db.query(`
            SELECT id, start_time, end_time, facility_id, slots FROM timeslots 
            WHERE id = '${timeslot_id}';
        `))[0][0];

        let isBooked = false;
        
        const userData = (await db.query(`
        SELECT user_id FROM bookings WHERE id = '${booking_id}';
        `))[0][0];

        if (userData) {
            const { user_id } = userData;
            isBooked = (user_id === client_user_id);
        }

        timeslots.push({
            ...timeslotsData,
            isBooked
        });
    }

    return timeslots;
}