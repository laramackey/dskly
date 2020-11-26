import {createContext} from 'vm';
import {validDate} from './helpers';

export default async function postHandler(ctx) {
  const postRequest = ctx.request.body;
  if (!postRequest.hasOwnProperty('bookings')) {
    respond400(ctx, 'Must send bookings object with booking request');
    return;
  }
  postRequest.bookings.forEach((booking) => {
    if (!booking.hasOwnProperty('seats')) {
      respond400(ctx, 'Must send seats with booking request');
      return;
    }
    if (!validDate((booking as any).date)) {
      respond400(
        ctx,
        `Invalid date ${(booking as any).date}, must be in YYYY-MM-DD`
      );
      return;
    }
    booking.seats.forEach((seat) => {
      const [isValid, reason] = validateBooking(seat);
      if (!isValid) {
        respond400(ctx, `Invalid booking: ${reason}`);
        return;
      }
    });
  });
  ctx.body = 'success';
  ctx.status = 201;
}

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
