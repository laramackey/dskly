<script>
import { apiUrl } from '../stores';
import Modal from './Modal.svelte';
import { createEventDispatcher } from 'svelte';

const dispatch = createEventDispatcher();

export let open;
export let chosenSeat;
export let chosenDate;

let name;

const handleSubmit = async () => {
  // submit form to server
  try {
    const data = {
      bookings: [{ date: chosenDate, seats: [{id: chosenSeat, name: name, state: 1}]}]
    }

    const response = await fetch(
      $apiUrl + '/bookings',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      }
    );

    dispatch('close-modal');

  } catch (error){
    console.error(error);
  }

}

</script>

<style>
  input[type=text]{
    margin-top:0.8rem;
    width:100%;
    border:none;
    border-bottom:1px solid #007EBB;
    outline:none;
    padding:0;
    padding-bottom:8px;
  }

  button {
    background-color:#007EBB;
    border:none;
    border-radius:3px;
    color:#fff;
    padding:0.5rem 1.5rem;
    cursor:pointer;
    transition:background-color 0.3s;
  }

  button:active{
    background-color:#333;
  }
</style>

<Modal on:close-modal {open} {chosenSeat} {chosenDate}>
  <label for='name'>Name</label>
  <input id='name' bind:value={name} type='text' />
  <div><button on:click={handleSubmit}>Book</button></div>
</Modal>