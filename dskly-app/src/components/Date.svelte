<script>
import { currentDate } from '../stores';

function amendDate(date, number) {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + number);
  return newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
}
</script>

<style>
  .date {
    display:grid;
    grid-template-columns:50px 1fr 50px;
    height:50px;
    max-width:200px;
    align-self:center;
  }

  .left-arrow {
    float: left;
  }
  .right-arrow {
      float: right;
  }
  svg {
    cursor: pointer;
  }
</style>

<div class="date">
  <div class="left-arrow">
    <svg class="left-arrow" width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => currentDate.set(amendDate($currentDate, -1))}>
		<path d="M0.690289 8.03711C0.699078 8.34473 0.813335 8.62598 1.05943 8.85449L7.89732 15.5342C8.09068 15.7275 8.33677 15.833 8.62681 15.833C9.20689 15.833 9.67271 15.376 9.67271 14.7959C9.67271 14.5146 9.55845 14.2422 9.3563 14.04L3.19517 8.0459L9.3563 2.03418C9.54966 1.83203 9.67271 1.56836 9.67271 1.27832C9.67271 0.698242 9.20689 0.241211 8.62681 0.241211C8.33677 0.241211 8.09068 0.34668 7.89732 0.540039L1.05943 7.22852C0.813335 7.46582 0.690289 7.72949 0.690289 8.03711Z" fill="#007EBB"/>
		</svg>
  </div>
  <div>{$currentDate}</div>
  <div class="right-arrow">
    <svg class="right-arrow" width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg" on:click={() => currentDate.set(amendDate($currentDate, 1))}>
		<path d="M9.66692 8.01245C9.65813 7.70483 9.54387 7.42358 9.29778 7.19507L2.45988 0.515381C2.26653 0.322021 2.02043 0.216553 1.73039 0.216553C1.15031 0.216553 0.684494 0.673584 0.684494 1.25366C0.684494 1.53491 0.798752 1.80737 1.0009 2.00952L7.16203 8.00366L1.0009 14.0154C0.807541 14.2175 0.684494 14.4812 0.684494 14.7712C0.684494 15.3513 1.15031 15.8083 1.73039 15.8083C2.02043 15.8083 2.26653 15.7029 2.45988 15.5095L9.29778 8.82104C9.54387 8.58374 9.66692 8.32007 9.66692 8.01245Z" fill="#007EBB"/>
		</svg>
  </div>
</div>