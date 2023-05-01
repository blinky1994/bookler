import db from "../../services/db";

export async function addBookingInDB(user_id: number, timeslots: number[]) {
    const booking = await createBookingInDB(user_id, timeslots);

    return {
        booking_id: booking.booking_id,
        user_id: booking.user_id
    }
}

async function createBookingInDB(user_id: number, timeslots: number[]) {
    let sql = `
    INSERT INTO bookings (
        user_id
    )
    VALUES (
        '${user_id}'
    );
    `;

    const response = await db.query(sql);
    const insertID = response[0].insertId;

    sql = `
        SELECT id, user_id FROM bookings WHERE id = '${insertID}'
    `

    const response2 = await db.query(sql);
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
    }
}

export async function updateBookingInDB(booking_id : number, timeslots: number[]) {
    let sql = `
        DELETE FROM bookings_timeslots
        WHERE booking_id = '${booking_id}';
    `;

    await db.query(sql); // Delete previous timeslots before updating

    await processTimeslots(booking_id, timeslots);

    return {
        booking_id,
        timeslots
    }
}

export async function getBookingFromDB(user_id: number) {
    let sql = `
        SELECT id FROM bookings WHERE user_id = '${user_id}';
    `;

    const booking_ids = (await db.query(sql))[0];

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
                SELECT start_time, end_time, facility_id FROM timeslots
                WHERE id = '${timeslot_id}';
            `);

            facility_id = timing[0][0].facility_id
            timeslots_timings.push({
                start_time: timing[0][0].start_time,
                end_time: timing[0][0].end_time
            });
        }

        const facility = await db.query(`
                SELECT details FROM facilities
                WHERE id = '${facility_id}';
            `);
        const facilityParsed = JSON.parse(facility[0][0].details);

        bookings.push({
            booking_id,
            facility: facilityParsed,
            timeslots: timeslots_timings
        })
    }

    return bookings;
}