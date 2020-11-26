import {validDate} from './helpers';

export default async function postHandler(ctx) {
  let postRequest = ctx.request.body;

  // tslint:disable: no-console
  if (typeof postRequest === 'string') {
    postRequest = JSON.parse(postRequest);
  }

  const [isValid, reason] = validateRequestBody(postRequest);
  if (!isValid) {
    respond400(ctx, reason);
    return;
  }

  // Implement updating one booking at a time first
  // TODO add ability to do multiple inserts/ deletes at once
  if (postRequest.bookings.length > 1) {
    respond400(ctx, 'Can only book one date at a time currently :(');
  }
  if (postRequest.bookings[0].seats.length > 1) {
    respond400(ctx, 'Can only book one seat at a time currently :(');
  }
  const bookingDate = postRequest.bookings[0].date;
  const seatId = postRequest.bookings[0].seats[0].id;
  const name = postRequest.bookings[0].seats[0].name || '';
  const state = postRequest.bookings[0].seats[0].state;

  if (state === '0') {
    try {
      await ctx.state.db.removeBookings(seatId, bookingDate);
      ctx.body = postRequest;
      ctx.status = 201;
    } catch (err) {
      ctx.body = `DB error: ${err.detail}`;
      ctx.status = 500;
      return;
    }
  }
  if (['1', '2'].includes(state)) {
    try {
      await ctx.state.db.postBookings(seatId, bookingDate, name, state);
      ctx.body = postRequest;
      ctx.status = 201;
    } catch (err) {
      // pgp error code 23505
      if (err.detail.includes('already exists')) {
        respond400(
          ctx,
          `Booking exists for seat ${seatId} on date ${bookingDate}`
        );
      } else {
        ctx.body = `DB error: ${err.detail}`;
        ctx.status = 500;
      }
      return;
    }
  }
}

const validateRequestBody = (postRequest) => {
  if (!postRequest.hasOwnProperty('bookings')) {
    return [false, 'Must send bookings object with booking request'];
  }
  postRequest.bookings.forEach((booking) => {
    if (!booking.hasOwnProperty('seats')) {
      return [false, 'Must send seats with booking request'];
    }
    if (!validDate((booking as any).date)) {
      return [
        false,
        `Invalid date ${(booking as any).date}, must be in YYYY-MM-DD`,
      ];
    }
    booking.seats.forEach((seat) => {
      const [isValid, reason] = validateBooking(seat);
      if (!isValid) {
        return [false, `Invalid booking: ${reason}`];
      }
    });
  });
  return [true, ''];
};

const validateBooking = (seats) => {
  if (!['id', 'state'].every((key) => seats.hasOwnProperty(key))) {
    return [false, 'Must have seat id and state in booking request'];
  }
  if (!(seats.state in ['0', '1', '2'])) {
    return [false, 'Must be a valid state: 0, 1 or 2'];
  }
  if (!(seats.state === 1 && !seats.hasOwnProperty('name'))) {
    return [false, 'Name must be included in booking'];
  }
  return [true, ''];
};

const respond400 = (ctx, message) => {
  ctx.body = message;
  ctx.status = 400;
};
