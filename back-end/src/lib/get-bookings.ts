import {validDate} from './helpers';

export default async function getHandler(ctx) {
  const date = ctx.query.date || '';
  if (!validDate(date)) {
    ctx.body = `Invalid date ${date}, must be in YYYY-MM-DD`;
    ctx.status = 404;
    return;
  }
  const seats = await ctx.state.db.getBookings(date);
  const countBooked = seats.reduce((n, seat) => {
    return n + (seat.state === 1);
  }, 0);
  const countBlocked = seats.reduce((n, seat) => {
    return n + (seat.state === 2);
  }, 0);
  ctx.body = {
    bookings: [
      {
        date,
        seats,
        countBooked,
        countBlocked,
      },
    ],
  };
  ctx.status = 200;
}
