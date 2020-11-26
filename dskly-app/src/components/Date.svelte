<script>
import { currentDate } from '../stores';

let date_value;

const date = currentDate.subscribe(value => {
  date_value = value
});

</script>

<style>
  .date {
    display:grid;
    grid-template-columns:50px 1fr 50px;
    height:50px;
    max-width:200px;
    align-self:center;
  }
</style>

<div class="date">
  <div class="left-arrow"></div>
  <div>{date_value}</div>
  <div class="right-arrow"></div>
</div>