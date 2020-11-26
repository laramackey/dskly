<script>
export let open;
export let chosenSeat;
export let chosenDate;
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
    width:40%;
    height:200px;
    background-color:#fff;
  }

  .modal-title {
    font-size:18px;
    text-align:center;
    border-bottom:1px solid #E6F2F8;
    padding:1rem;
  }

  .modal-content-wrapper {
    display:flex;
    justify-content:center;
    align-items:center;
  }

  .modal-content {
    width:80%;
    margin-top:1rem;
  }
</style>

<div class='modal-overlay' style={open ? 'display:flex;' : 'display:none;'}>
  <div class='modal-inner'>
    <div class='modal-title'>
      Make a booking
    </div>
    <div class='modal-content-wrapper'>
      <div class='modal-content'>
        <slot></slot>
      </div>
    </div>
  </div>
</div>