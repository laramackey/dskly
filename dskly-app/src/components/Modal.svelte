<script>
export let open;

import { createEventDispatcher } from 'svelte';
const dispatch = createEventDispatcher();

const handleCloseModal = (e) => {
  dispatch('close-modal');
}

</script>

<style>
  .modal-overlay {
    display:flex;
    align-items:center;
    justify-content:center;
    position:absolute;
    top:0px;
    left:0px;
    right:0px;
    bottom:0px;
    background-color:rgba(0, 0, 0, 0.3);
  }

  .modal-inner {
    position: relative;
    width: 40%;
    height: 200px;
    background-color: #fff;
  }

  .modal-title {
    font-size: 18px;
    text-align: center;
    border-bottom: 1px solid #E6F2F8;
    padding: 1rem;
  }

  .modal-content-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-content {
    width: 80%;
    margin-top: 1rem;
  }

  .modal-close {
    position: absolute;
    top: 10px;
    right: 10px;
    height: 20px;
    width: 20px;
    cursor:pointer;
  }
</style>

<div class='modal-overlay'  style={open ? 'display:flex;' : 'display:none;'}>
  <div class='modal-inner'>
    <div class='modal-title'>
      Make a booking
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 12 13" class="modal-close" on:click={handleCloseModal}>
        <path fill="#007EBB" d="M.46973 11.1719c-.29883.2988-.30762.8086 0 1.1162.29883.3076.80859.2988 1.11621 0l4.5-4.5088 4.50876 4.5088c.2989.2988.8086.3076 1.1074 0 .3165-.3076.3077-.8174 0-1.1162L7.20215 6.66309l4.49995-4.5c.3077-.29883.3165-.81739 0-1.11621-.2988-.30762-.8085-.29883-1.1074 0L6.08594 5.55566l-4.5-4.50878c-.30762-.29883-.81738-.30762-1.11621 0-.30762.29882-.29883.81738 0 1.11621l4.5 4.5-4.5 4.50881z"/>
      </svg>
    </div>
    <div class='modal-content-wrapper'>
      <div class='modal-content'>
        <slot></slot>
      </div>
    </div>
  </div>
</div>