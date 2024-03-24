<script lang="ts">
	export let id = 'id';
	export let label = 'placeholder';
</script>

<label for={id}>{label}</label>
<input {id} type="text" placeholder="hello" />
