<script lang="ts">
	import AddSubject from '$lib/components/AddSubject.svelte';
	import { subjects } from '../../stores/subjects.svelte';
	import * as Alert from '$lib/components/alert';
	import Subject from '$lib/components/Subject.svelte';
</script>

{#if $subjects.length === 0}
	<Alert.Root>
		<Alert.Title>Looks empty!</Alert.Title>
		<Alert.Description>Add your subjects below.</Alert.Description>
	</Alert.Root>
{/if}
<!-- <div class="subjects">
	{#each $subjects as subject}
		<Subject bind:subject />
	{/each}
	<AddSubject />
</div> -->
<table>
  	<thead>
    	<tr>
			<th align="left">Name</th>
			<th align="right">Actions</th>
		</tr>
	</thead>
	<tbody>
		{#each $subjects as subject}
			<Subject {subject} />
		{/each}
	</tbody>
</table>


<style lang="postcss">
	@reference "../../app.css";

	table :global {
		thead {
			@apply border-b-1 border-zinc-300;
		}

		th, td {
			@apply px-0.5 py-1.5;
		}
	}
</style>
