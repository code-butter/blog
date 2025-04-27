<script lang="ts">

	let { date } = $props();

	const months: { [key: string]: string } = {
		'01': 'Jan',
		'02': 'Feb',
		'03': 'Mar',
		'04': 'Apr',
		'05': 'May',
		'06': 'Jun',
		'07': 'Jul',
		'08': 'Aug',
		'09': 'Sep',
		'10': 'Oct',
		'11': 'Nov',
		'12': 'Dec'
	};

	let month =  $state('');
	let day = $state('');
	let year = $state('');

	$effect(() => {
		const parts = date.split('-');
		year = parts[0];
		month = months[parts[1]];
		day = parts[2];
	})
</script>

<div class="article-date">
	<div class="month">{month}</div>
	<div class="day">{day}</div>
	<div class="year">{year}</div>
</div>

<style lang="scss">
  .article-date {
    font-size: 80%;
    border-radius: 0.25em;
    border: 1px solid var(--fg-color);
    width: 64px;
    text-align: center;
    margin-right: 1em;
    .month {
      background-color: var(--accent-color);
      padding: 3px 0;
      border-radius: 0.25em;
    }
    .day {
      font-size: 200%;
      border-bottom: 1px solid var(--fg-color);
      font-weight: bold;
    }
  }
</style>