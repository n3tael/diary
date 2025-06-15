<script lang="ts">
	import { Pencil, X } from '@lucide/svelte';
	import { subjects } from '../../stores/subjects.svelte';
	import { tasklist } from '../../stores/tasklist.svelte';

	let { subject = $bindable() }: { subject: string } = $props();
	let editing: boolean = $state<boolean>(false);

	function removeSubject(subject: string) {
		let subjectTasks = $tasklist.filter(
			(t) => t.subjectId === $subjects.indexOf(subject)
		);

		if (subjectTasks.length !== 0) {
			const d: boolean = confirm(
				'This subject has assignments, are you sure you want to delete it? This will delete the tasks with this subject as well.'
			);
			if (!d) return;

			subjectTasks.forEach((t) => $tasklist.splice($tasklist.indexOf(t), 1));
			$tasklist = $tasklist;
		}

		$subjects.splice($subjects.indexOf(subject), 1);
		$subjects = $subjects;
	}
</script>

<div class={['subject', editing ? 'editing' : null]}>
	{#if editing}
		<input type="text" bind:value={subject} placeholder="Subject name..." />
	{:else}
		<p>{subject}</p>
	{/if}
	<div class="ml-auto flex">
		<button
			class={['p-1', editing ? 'active' : null]}
			onclick={() => (editing = !editing)}
		>
			<Pencil size="16" />
		</button>
		<button onclick={() => removeSubject(subject)}><X /></button>
	</div>
</div>

<style lang="postcss">
	@reference "../../app.css";

	.subject {
		@apply flex items-center justify-between gap-2 rounded-md border-2 border-zinc-300 p-2 pl-3 dark:border-zinc-800;

		&.editing {
			button.active {
				@apply bg-amber-400 text-black;
			}

			input[type='text'] {
				@apply w-full rounded-none border-0 border-b-2 px-0;
			}
		}
	}
</style>
