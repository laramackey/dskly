export default async function getHandler(ctx) {
  const bookings = await ctx.state.db.getBookings();
  ctx.body = {
    bookings: [
      {
        date: '2020-11-26',
        seats: bookings,
      },
    ],
  };
  ctx.state = 200;
}
