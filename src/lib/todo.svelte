<script lang="ts">
	import Calendar from './calendar.svelte';

	interface TODO {
		description: string;
		done: boolean;
		id: number;
	}
	const todos = $state<TODO[]>([
		{
			description: 'hello',
			done: true,
			id: 1
		}
	]);

	const regularTodos: any[] = [];

	function isDone() {
		regularTodos.push({ done: true });
	}

	// imperative - how
	// this is quick and easy to think about, but has no safety
	// let regularDone = [];
	// function getDone() {
	// 	regularDone = regularTodos.filter((item) => item.done);
	// }

	// declarative - what
	// this is a little more complicated to think about, but it is safer
	// --- because there's only one place where it's assigned
	// creates a selection of done tasks
	const doneItems = $derived(todos.filter((task) => task.done));

	// all of the frontend development frameworks use something like it
	// it's called the signal pattern

	let id = $state(1);
	let description = $state('');

	function addTodo() {
		id++;
		todos.push({
			description,
			done: false,
			id
		});
	}

	function onclick() {
		console.log('hi from calendar output');
	}
</script>

<div class="controls">
	<label>
		<input type="text" bind:value={description} />
	</label>
	<Calendar businessDay={false} {onclick} on:select={console.log}></Calendar>
	<button on:click={addTodo}>Add</button>
</div>

<div class="todo-lists">
	<h2 class="todo-title">Todo Items</h2>
	{#each todos as item}
		<div class="todo">
			<input type="checkbox" checked={item.done} />
			{item.description}
		</div>
	{/each}

	<h2 class="todo-title">Done</h2>
	{#each doneItems as item}
		<div class="todo todo-done">
			<input type="checkbox" checked={item.done} />
			{item.description}
		</div>
	{/each}
</div>

<style>
	/* add your own styles */
	.todo-title {
		font-family: cursive;
	}

	.todo {
		margin-bottom: 40px;
		border: 1px solid grey;
		border-radius: 4px;
		font-weight: 300;
		font-family: Arial, Helvetica, sans-serif;

		color: white;
		background-color: #333;
	}

	/* target multiple classes to be more specific so that it overwrites styles that are less specific */
	.todo.todo-done {
		color: black;
		background-color: white;
	}

	/* .todo .todo-done targets elements with "todo-done" inside an element with "todo" */
	/* .todo.todo-done targets elements with both "todo" and "todo-done" */

	/* TODO: css targetting lesson */
	/* .todo > .todo-done targets elements with "todo-done" that are directly under "todo" */
	.todo-lists > .todo-done {
		/* bolds the text */
		font-weight: 900;
	}
</style>
