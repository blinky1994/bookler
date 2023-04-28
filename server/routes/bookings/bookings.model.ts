import db from "../../services/db";

export async function addBookingInDB(user_id: number) {
    const booking = await createBookingInDB(user_id);

    return {
        booking_id: booking.booking_id,
        user_id: booking.user_id
    }
}

async function createBookingInDB(user_id: number) {
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
        SELECT id, user_id FROM bookings WHERE id = ${insertID}
    `

    const response2 = await db.query(sql);
    const booking_id = response2[0][0].id;
    const userID = response2[0][0].user_id;

    console.log({booking_id, userID});
    return {
        booking_id,
        user_id: userID
    }
}