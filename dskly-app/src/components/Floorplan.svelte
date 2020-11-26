<script>
import Date from './Date.svelte';

const State = {
  Available: 0,
  Booked: 1,
  Blocked: 2
}

const bookings = [
  {
    date: '2020-11-26',
    seats: [
      {
        id: 0,
        state: State.Available,
        name: null
      },
      {
        id: 1,
        state: State.Booked,
        name: 'Jack'
      },
      {
        id: 2,
        state: State.Blocked,
        name: null
      },
      {
        id: 3,
        state: State.Available,
        name: null
      },
      {
        id: 4,
        state: State.Available,
        name: null
      },
      {
        id: 5,
        state: State.Available,
        name: null
      },
    ]
  }
];

const getBookingsByDate = (response, date) => {
  const bookings = response.find(b => b.date === date);
  return bookings.seats;
}

const getSeatAvailability = (seats, seatId) => {
  const seat = seats.find(s => s.id === seatId);
  return seat ? Object.keys(State)[seat.state].toLocaleLowerCase() : 'available';
}

const seats = getBookingsByDate(bookings, '2020-11-26');

</script>

<style>
  .wrapper {
    display: grid;
    justify-items:center;
    grid-template-rows:100px 1fr;
    height:100%;
    background-color:#EEE;
  }

  .office {
    display:flex;
    justify-content:center;
  }

  circle {
    stroke-width:5px;
  }

  circle.available {
    stroke: green;
  }

  circle.booked {
    stroke: purple;
    fill:purple;
  }

  circle.blocked {
    stroke: red;
    fill:red;
  }

</style>

<div class='wrapper'>
  <Date />
  <div class='office'>
    <svg xmlns="http://www.w3.org/2000/svg" width="185px" height="309px" fill="none" viewBox="0 0 185 309">
      <circle cx="19" cy="257" r="16.5" class={getSeatAvailability(seats, 0)} />
      <circle cx="19" cy="154" r="16.5" class={getSeatAvailability(seats, 1)} />
      <circle cx="166" cy="154" r="16.5" class={getSeatAvailability(seats, 2)} />
      <circle cx="166" cy="50" r="16.5" class={getSeatAvailability(seats, 3)} />
      <circle cx="19" cy="50" r="16.5" class={getSeatAvailability(seats, 4)} />
      <circle cx="166" cy="259" r="16.5" class={getSeatAvailability(seats, 5)} />
      <path fill="#000" d="M42 208h101v101H42zM42 104h101v101H42zM42 0h101v101H42z"/>
    </svg>
  </div>
</div>