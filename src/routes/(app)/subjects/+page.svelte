<script lang="ts">
	import AddSubject from '$lib/components/subjects/AddSubject.svelte';
	import { subjects } from '$stores/subjects.svelte';
	import * as Alert from '$lib/components/alert';
	import Subject from '$lib/components/subjects/Subject.svelte';
	import type { Subject as ISubject } from '$stores/subjects.svelte';
	import { dragHandleZone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { m } from '$lib/paraglide/messages';

	const flipDurationMs = 300;

	function handleDndConsider(e: CustomEvent<DndEvent<ISubject>>) {
		subjects.set(e.detail.items);
	}

	function handleDndFinalize(e: CustomEvent<DndEvent<ISubject>>) {
		subjects.set(e.detail.items);
	}
</script>

<svelte:head>
	<title>{m.diary_name()} • {m.nav_subjects()}</title>
</svelte:head>

{#if $subjects.length === 0}
	<Alert.Root>
		<Alert.Title>{m.subjects_no_subjects()}</Alert.Title>
		<Alert.Description>{m.subjects_no_subjects_desc()}</Alert.Description>
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
