<script>
    let n = new Date();
	let y = n.getFullYear();
	let m = n.getMonth() + 1;
	let d = n.getDate();
</script>

<style>

</style>


<div id="myCalendarWrapper">
  Calendar to be inserted here :)

    <label for="start">Calendar:</label>
    <input type="date" id="start" name="datePicker"
        value="{y}-{m}-{d}">
</div>
