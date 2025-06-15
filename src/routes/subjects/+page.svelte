<script lang="ts">
	import AddSubject from '$lib/components/AddSubject.svelte';
	import { subjects } from '../../stores/subjects.svelte';
	import * as Alert from '$lib/components/alert';
	import Subject from '$lib/components/Subject.svelte';
</script>

<h1 class="mb-4">Subjects</h1>
{#if $subjects.length === 0}
	<Alert.Root>
		<Alert.Title>Looks empty!</Alert.Title>
		<Alert.Description>Add your subjects below.</Alert.Description>
	</Alert.Root>
{/if}
<div class="subjects">
	{#each $subjects as subject}
		<Subject bind:subject />
	{/each}
	<AddSubject />
</div>

<style lang="postcss">
	@reference "../../app.css";

	.subjects {
		@apply grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3;
	}
</style>
