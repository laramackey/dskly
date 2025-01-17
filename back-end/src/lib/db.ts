import {Next} from 'koa';
import * as pgp from 'pg-promise';

export function addDb() {
  return async (ctx, next: Next) => {
    ctx.state.db = createDb(ctx.state.metrics);
    return await next();
  };
}

let connection;
const getConnection = () => {
  if (!connection) {
    connection = pgp()({
      user: 'postgres',
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST || 'localhost',
    });
  }
  return connection;
};

const createDb = (db = getConnection()) => {
  return {
    getBookings: async function getBookings(date): Promise<any> {
      const query = `
                  SELECT seat_id as id, booking_name as name, booking_state as state
                  FROM bookings
                  WHERE booking_date = $<date>;
                  `;
      return await db.any(query, {date});
    },
    postBookings: async function postBookings(
      seatId,
      date,
      name,
      state
    ): Promise<any> {
      const query = `
                    INSERT INTO bookings VALUES ($<seatId>, $<date>, $<name>, $<state>);
                    `;
      return await db.any(query, {seatId, date, name, state});
    },
    removeBookings: async function removeBookings(seatId, date): Promise<any> {
      const query = `
                    DELETE FROM bookings
                    WHERE seat_id = $<seatId>
                    AND booking_date = $<date>
                    ;
                    `;
      return await db.any(query, {seatId, date});
    },
  };
};
