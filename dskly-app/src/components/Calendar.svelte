<script>

import { currentDate } from '../stores';

let n = new Date();
let y = n.getFullYear();
let m = n.getMonth() + 1;
let d = n.getDate();


let date_value;

currentDate.subscribe(value => {
  date_value = value
});


</script>

<style>

</style>

<div id="myCalendarWrapper">
  Calendar to be inserted here :)

  <label for="start">Calendar:</label>
  <input type="date" id="start" name="datePicker"
      value="{y}-{m}-{d}" on:change={(e) => currentDate.set(e.currentTarget.value)}>
</div>
