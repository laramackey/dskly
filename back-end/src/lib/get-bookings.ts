import * as dayjs from 'dayjs';
export default async function getHandler(ctx) {
  const date = ctx.query.date || '';
  if (!validDate(date)) {
    ctx.body = `Invalid date ${date}, must be in YYYY-MM-DD`;
    ctx.state = 404;
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
  ctx.state = 200;
}

const validDate = (date) => {
  return dayjs(date, 'YYYY-MM-DD').format('YYYY-MM-DD') === date;
};
