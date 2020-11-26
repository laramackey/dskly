import {createContext} from 'vm';
import {validDate} from './helpers';

export default async function postHandler(ctx) {
  const postRequest = ctx.request.body;
  const [isValid, reason] = validateRequestBody(postRequest);
  if (!isValid) {
    respond400(ctx, reason);
    return;
  }

  // Implement updating one booking at a time first
  if (postRequest.bookings.length > 1) {
    respond400(ctx, 'Can only book one date at a time currently :(');
  }
  if (postRequest.bookings[0].seats.length > 1) {
    respond400(ctx, 'Can only book one seat at a time currently :(');
  }
  const bookingDate = postRequest.bookings[0].date;
  const seatId = postRequest.bookings[0].seats[0].id;
  const name = postRequest.bookings[0].seats[0].name;
  const state = postRequest.bookings[0].seats[0].state;
  try {
    await ctx.state.db.postBookings(seatId, bookingDate, name, state);

    ctx.body = postRequest;
    ctx.status = 201;
  } catch (err) {
    // tslint:disable-next-line: no-console
    console.log(err);
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
  if (!['id', 'state', 'name'].every((key) => seats.hasOwnProperty(key))) {
    return [false, 'Must have id, state, and name in booking request'];
  }
  if (!(seats.state in ['0', '1', '2'])) {
    return [false, 'Must be a valid state: 0, 1 or 2'];
  }
  return [true, ''];
};

const respond400 = (ctx, message) => {
  ctx.body = message;
  ctx.status = 400;
};
