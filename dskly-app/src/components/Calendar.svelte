<script>
import { currentDate } from '../stores';
</script>

<style>
    .wrapper {
      padding:1rem;
    }

    select {
      border:1px solid #007EBB;
      padding:10px;
      width:100%;
      appearance:none;
    }

    input[type=date]{
      width:100%;
      border:1px solid #007EBB;
    }
</style>

<div class="wrapper">
  <select>
    <option>London, UK</option>
    <option>High Wycombe, UK</option>
    <option>Los Angeles, USA</option>
  </select>
  <input class="tabCalendar" type="date" id="start" name="datePicker"
      value="{$currentDate}" on:change={(e) => currentDate.set(e.currentTarget.value)}>
</div>
