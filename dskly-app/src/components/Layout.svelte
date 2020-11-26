<script>
  import Calendar from './Calendar.svelte';
  import Floorplan from './Floorplan.svelte';
  import Header from './Header.svelte';
</script>

<style>
  :global(body) {
    width: 100vw;
    height: 100vh;
    background-color: #fff;
  }

  .container {
    display:grid;
    grid-template-rows:80px 1fr;
    height:100vh;
  }

  div.wrapper {
    display: grid;
    grid-template-columns: 20vw 1fr;
    grid-gap: 2vw;
  }

  .calendar-column {
    background-color: #e7f2f7;
  }
</style>

<div class='container'>
  <Header />
  <div class="wrapper">
    <div class="calendar-column">
      <Calendar />
    </div>
    <div class="floorplan-column">
      <Floorplan />
    </div>
  </div>
</div>
