<script lang="ts">
	import { subjects } from '$stores/subjects.svelte';
</script>

{#each $subjects as { id, name }}
	<option value={id}>{name}</option>
{/each}
