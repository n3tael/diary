<script lang="ts">
	import { subjects } from '../../stores/subjects.svelte';
</script>

{#each $subjects as subject, i}
	<option value={i}>{subject}</option>
{/each}
