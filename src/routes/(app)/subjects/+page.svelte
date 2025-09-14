<script lang="ts">
	import AddSubject from '$lib/components/subjects/AddSubject.svelte';
	import { subjects } from '$stores/subjects.svelte';
	import * as Alert from '$lib/components/alert';
	import Subject from '$lib/components/subjects/Subject.svelte';
	import type { Subject as ISubject } from '$stores/subjects.svelte';
	import { dragHandleZone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';

	const flipDurationMs = 300;

	function handleDndConsider(e: CustomEvent<DndEvent<ISubject>>) {
		subjects.set(e.detail.items);
	}

	function handleDndFinalize(e: CustomEvent<DndEvent<ISubject>>) {
		subjects.set(e.detail.items);
	}
</script>

{#if $subjects.length === 0}
	<Alert.Root>
		<Alert.Title>Your subject list is empty</Alert.Title>
		<Alert.Description
			>Add your subjects below to continue use app.</Alert.Description
		>
	</Alert.Root>
{/if}

<div
	class="subjects"
	use:dragHandleZone={{ items: $subjects, flipDurationMs, dropTargetStyle: {} }}
	onconsider={handleDndConsider}
	onfinalize={handleDndFinalize}
>
	{#each $subjects as { id, name } (id)}
		<div animate:flip={{ duration: flipDurationMs }}>
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
