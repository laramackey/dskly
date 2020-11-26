<script>
  import Calendar from './Calendar.svelte';
  import Floorplan from './Floorplan.svelte';
  import DatePicker from './DatePicker.svelte';
</script>

<style>
  :global(body) {
    width: 100vw;
    height: 100vh;
  }

  div.wrapper {
    display: grid;
    grid-template-columns: 20vw 1fr;
    height:100%;
  }

  .calendar-column {
    background-color:#fff;
  }
</style>

<div class="wrapper">
  <div class="calendar-column">
    <Calendar />
  </div>
  <div class="floorplan-column">
    <Floorplan />
  </div>
</div>
