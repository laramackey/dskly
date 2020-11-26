import {validDate} from './helpers';

export default async function getHandler(ctx) {
  const date = ctx.query.date || '';
  if (!validDate(date)) {
    ctx.body = `Invalid date ${date}, must be in YYYY-MM-DD`;
    ctx.status = 404;
    return;
  }
  const bookings = await ctx.state.db.getBookings(date);
  ctx.body = {
    bookings: [
      {
        date,
        seats: bookings,
      },
    ],
  };
  ctx.status = 200;
}
