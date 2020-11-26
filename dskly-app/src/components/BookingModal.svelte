<script>
import Modal from './Modal.svelte';

export let open;
export let chosenSeat;
export let chosenDate;

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

<Modal {open} {chosenSeat} {chosenDate}>
  <label for='name'>Name</label>
  <input id='name' type='text' />
  <div><button>Book</button></div>
</Modal>