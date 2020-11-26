<script>
    let n =  new Date();
	let y = n.getFullYear();
	let m = n.getMonth() + 1;
	let d = n.getDate();
</script>

<div class="DatePicker">
    <label for="start">Calendar:</label>

    <input type="date" id="start" name="datePicker"
       value="{y}-{m}-{d}">
</div>