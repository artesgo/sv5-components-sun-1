<script lang="ts">
	import './utility.css';
	import { createEventDispatcher } from 'svelte';
	import type { CalendarConfig } from './calendar.config';

	let { businessDay, ...props }: CalendarConfig = $props();

	let day = $state(1);

	let month = $state(new Date().getMonth() + 1);
	const monthLabel = $derived(
		['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][month - 1]
	);
	let year = $state(new Date().getFullYear());
	let open = $state(false);

	let weekLabels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

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
	}

	const dispatch = createEventDispatcher();

	function select(d: number) {
		// update the state variable so that it can be used in other places
		day = d;

		const dayOfWeekSelected = new Date(year, month - 1, day).getDay();
		// if saturday / sunday, don't dispatch
		if (businessDay && (dayOfWeekSelected === 0 || dayOfWeekSelected === 6)) {
			return;
		}
		// if not businessDay config, do dispatch
		dispatch('select', { day, month, year, monthLabel });
	}

	/**
	 * return the day of the week label from the day passed in
	 * @param day
	 */
	function getDayOfWeek(d: number) {
		const dayOfWeekSelected = new Date(year, month - 1, d).getDay();
		return weekLabels[dayOfWeekSelected];
	}
</script>

<button on:click={toggle} {...props}>
	{year}-{month}-{day}
</button>

<dialog {open}>
	<!-- button that goes to the previous month -->
	<!-- this next line should show the selected day, not just 1 for day -->
	<!-- introduce a new variable to track which day is selected -->
	<div class="centered">{monthLabel} {day}, {year}</div>
	<!-- button that goes to the next month -->
	<div class="grid">
		{#each weekLabels as label}
			<div class="centered" aria-hidden="true">
				<!-- 'monday', slice turns it into ['m', 'o', 'n' ... ] -->
				{label.slice(0, 3)}
			</div>

			<div class="sr-only">
				{label}
			</div>
		{/each}
		{#each days as d}
			{@const currentMonth = d > 0}
			<div class:day={currentMonth}>
				{#if currentMonth}
					<!-- TODO: forbid clicking of saturday / sunday if businessDay is true -->
					<!-- it should not be a button for sat/sun -->
					<button class="calendar-day" class:selected={day === d} on:click={() => select(d)}>
						<!-- apply some hidden text for the blind / hard of sight users -->
						<div class="sr-only">{getDayOfWeek(d)}, {monthLabel}</div>
						{d}
					</button>
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
		font-size: 10px;
		transition: 0.5s;
	}

	/* .calendar-day.selected, */
	.calendar-day.selected:focus,
	.calendar-day.selected {
		background: #0cf;
	}

	.calendar-day:focus {
		background: #fc0;
		font-size: 16px;
	}

	.calendar-day:hover {
		background: #f0c;
		font-size: 16px;
	}
</style>
