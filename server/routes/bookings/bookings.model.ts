import db from "../../services/db";

export async function addBookingInDB(user_id: number, timeslots: number[]) {
    const booking = await createBookingInDB(user_id, timeslots);

    return {
        booking_id: booking.booking_id,
        user_id: booking.user_id,
        booking_timeslot_id: booking.booking_timeslot_id
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

    async function processTimeslots(timeslots: number[]) {
        let insertID = 0;
        for (const timeslot_id of timeslots) {
            const response = await db.query(`
            INSERT INTO bookings_timeslots (
                booking_id, timeslot_id
            )
            VALUES (
                '${booking_id}', '${timeslot_id}'
            );
            `);

            if (!insertID) {
                insertID = response[0].insertId;
            }
        }

        return insertID;
    }

    const booking_timeslot_id = await processTimeslots(timeslots);

    sql = `
        UPDATE bookings
        SET booking_timeslot_id = '${booking_timeslot_id}'
        WHERE id = '${booking_id}'
    `;

    await db.query(sql);

    return {
        booking_id,
        user_id: userID,
        booking_timeslot_id
    }
}