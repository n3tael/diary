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

<tr class="subject">
	<td align="left">
		{#if editing}
			<input type="text" bind:value={subject} placeholder="Name" />
		{:else}
			{subject}
		{/if}
	</td>
	<td class="actions" align="right">
		<button
			class={editing ? 'active' : null}
			onclick={() => (editing = !editing)}
		>
			<Pencil size="16" />
		</button>
		<button onclick={() => removeSubject(subject)}><X size="16" /></button>
	</td>
</tr>

<style lang="postcss">
	@reference "../../app.css";

	.subject {
		input[type='text'] {
			@apply w-full rounded-none border-0 border-b-1 p-0;
		}

		.actions {
			button {
				@apply p-1;

				&.active {
					background-color: oklch(from var(--color-accent) l c h / 50%);
					@apply text-black;
				}
			}
		}
	}
</style>
