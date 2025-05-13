<script lang="ts">

	interface Props {
		date: Date
	}

	let { date }: Props = $props();
	

	let month =  $state('');
	let day = $state('');
	let year = $state('');

	$effect(() => {
		year = date.getFullYear().toString();
		month = date.toLocaleString('en-us', { month: 'short' });
		day = date.getDate().toString();
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