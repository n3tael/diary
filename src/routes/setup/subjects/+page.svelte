<script lang="ts">
	import { X } from '@lucide/svelte';
	import { subjects } from '$stores/subjects.svelte';
	import generateId from '$utils/generateId';
	import { m } from '$lib/paraglide/messages';

	let addInput: HTMLInputElement;

	function removeSubject(i: number) {
		subjects.update((s) => {
			s.splice(i, 1);
			return s;
		});
	}

	function handleBackspace(e: KeyboardEvent) {
		if (
			e.code === 'Backspace' &&
			!e.ctrlKey &&
			addInput.value === '' &&
			$subjects.length > 0
		) {
			e.preventDefault();
			addInput.value = $subjects[$subjects.length - 1].name;
			removeSubject($subjects.length - 1);
		}
	}

	function handleAdd(e: SubmitEvent) {
		e.preventDefault();
		if (addInput.value === '') return;

		subjects.update((s) => [
			...s,
			{
				id: generateId(s.map((subject) => subject.id)),
				name: addInput.value
			}
		]);

		addInput.value = '';
	}
</script>

<h1>{m.setup_subjects_head()}</h1>
<p>{m.setup_subjects_desc()}</p>

<ul class="subjects-input">
	{#each $subjects as subject, i}
		<li class="subject">
			<span>{subject.name}</span>
			<button class="p-1" onclick={() => removeSubject(i)}
				><X size="16" /></button
			>
		</li>
	{/each}
	<form onsubmit={handleAdd} class="contents">
		<input
			type="text"
			bind:this={addInput}
			placeholder={m.setup_subjects_input_placeholder()}
			onkeydown={handleBackspace}
		/>
	</form>
</ul>

<style lang="postcss">
	@reference '$styles';

	.subjects-input {
		@apply mx-0 flex max-h-64 w-full flex-wrap items-center gap-2 overflow-y-auto rounded-xl bg-zinc-100 px-2 py-2 dark:bg-zinc-900;

		.subject {
			@apply flex items-center gap-2 rounded-md bg-zinc-200 px-2 py-1 dark:bg-zinc-950;
		}

		input[type='text'] {
			@apply w-full min-w-32 flex-1 border-0! bg-[unset]! p-0!;
		}
	}
</style>
