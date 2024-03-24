<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	// import type { CalendarConfig } from './calendar.config';

	let { businessDay, ...props } = $props();
	// export let businessDay: boolean;
	// and the ...props

	let day = $state(1);

	let month = $state(new Date().getMonth() + 1);
	let year = $state(new Date().getFullYear());
	let open = $state(false);

	// get the first day of the month, and give us which day of the week it is
	const dayOfTheWeek = $derived(new Date(year, month - 1, 1).getDay());
	// get the last day of the month, and give us the number
	const daysInMonth = $derived(new Date(year, month, 0).getDate());

	// let days = new Array(30).fill(0).map((_, i) => i));
	const days = $derived(
		new Array(dayOfTheWeek + daysInMonth).fill(0).map((_, i) => i - dayOfTheWeek + 1)
	);

	function toggle() {
		open = !open;
		console.log(dayOfTheWeek);
		console.log(daysInMonth);
	}

	const dispatch = createEventDispatcher();
	function select(day: number) {
		dispatch('select', { day, month, year });
	}
</script>

<button on:click={toggle} {...props}>
	{year}-{month}-{day}
</button>

<dialog {open}>
	<!-- button that goes to the previous month -->
	<!-- this next line should show the selected day, not just 1 for day -->
	<!-- introduce a new variable to track which day is selected -->
	{year}-{month}-{day}
	<!-- button that goes to the next month -->
	<div class="grid">
		{#each days as d}
			{@const currentMonth = d > 0}
			<div class:day={currentMonth}>
				{#if currentMonth}
					<button class="calendar-day" on:click={() => select(d)}>{d}</button>
				{/if}
			</div>
		{/each}
	</div>
</dialog>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}

	.day {
		border: 1px solid;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 48px;
		height: 32px;
		margin: 1px;
		border-radius: 2px;
		box-shadow: 4px 4px 4px black;
	}

	.calendar-day {
		background: none;
		border: none;
		width: 100%;
		height: 100%;
	}
</style>
