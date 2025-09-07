<script lang="ts">
	import AddSubject from '$lib/components/subjects/AddSubject.svelte';
	import { subjects } from '$stores/subjects.svelte';
	import * as Alert from '$lib/components/alert';
	import Subject from '$lib/components/subjects/Subject.svelte';
	import { flip } from 'svelte/animate';
	import { slide } from 'svelte/transition';
	import autoAnimate from '@formkit/auto-animate';
</script>

{#if $subjects.length === 0}
	<Alert.Root>
		<Alert.Title>Looks empty!</Alert.Title>
		<Alert.Description>Add your subjects below.</Alert.Description>
	</Alert.Root>
{/if}

<div class="subjects" use:autoAnimate>
	{#each $subjects as { id, name } (id)}
		<div class="">
			<Subject {id} bind:name />
		</div>
	{/each}
</div>

<AddSubject />

<style lang="postcss">
	@reference "$styles";

	.subjects {
		@apply flex flex-col gap-y-2;
	}
</style>
