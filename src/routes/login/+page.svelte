<script>
	import { user } from '$lib/stores/user.svelte';

	let email = '';
	let password = '';
</script>

{#if user().data}
	<div>
		Hello, {user().data?.name}
	</div>
{:else}
	<form>
		<h1>Login or register</h1>
		<input type="email" placeholder="Email" bind:value={email} />
		<input type="password" placeholder="Password" bind:value={password} />
		<button type="button" on:click={() => user().login(email, password)}>Login</button>
		<button type="button" on:click={() => user().register(email, password)}>Register</button>
	</form>
{/if}

<style>
	form {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 100dvh;

		gap: 0.25rem;
		/* max-width: 600px; */
	}

	input {
		background-color: #333;
		padding: 8px 20px;
	}
</style>
