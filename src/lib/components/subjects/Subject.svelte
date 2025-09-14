<script lang="ts">
	import { GripVertical, Pencil, X } from '@lucide/svelte';
	import { subjects } from '$stores/subjects.svelte';
	import { tasklist } from '$stores/tasklist.svelte';
	import { dragHandle } from 'svelte-dnd-action';
	import { fly } from 'svelte/transition';
	import Tooltip from '$lib/components/ui/Tooltip.svelte';

	let { id, name = $bindable() }: { id: number; name: string } = $props();
	let editing: boolean = $state<boolean>(false);

	function removeSubject(id: number) {
		const subject = $subjects.find((s) => s.id === id);

		if (!subject) throw new Error('no subject found');

		let subjectTasks = $tasklist.filter((t) => t.subjectId === subject.id);

		if (subjectTasks.length > 0) {
			const d: boolean = confirm(
				'This subject has assignments, are you sure you want to delete it? This will delete the tasks with this subject as well.'
			);
			if (!d) return;

			subjectTasks.forEach((st) =>
				tasklist.update((t) => {
					t.splice(t.indexOf(st), 1);
					return t;
				})
			);
		}

		subjects.update((s) => {
			s.splice(s.indexOf(subject), 1);
			return s;
		});
	}
</script>

<div class="subject">
	<div class="info">
		{#if !editing}
			<span
				in:fly={{ duration: 200, delay: 200, y: -10 }}
				out:fly={{ duration: 200, y: -10 }}>{name}</span
			>
		{:else}
			<input
				class="mr-2.5 w-full border-0! bg-zinc-100! dark:bg-zinc-900!"
				type="text"
				bind:value={name}
				placeholder="Name"
				in:fly={{ duration: 200, delay: 200, y: 10 }}
				out:fly={{ duration: 200, y: 10 }}
				maxlength="64"
			/>
		{/if}
	</div>
	<div class="actions">
		<button class="text-zinc-500" use:dragHandle>
			<GripVertical size="16" />
		</button>
		<Tooltip
			class={editing ? 'active' : null}
			onclick={() => (editing = !editing)}
			tip="Edit"
		>
			<Pencil size="16" />
		</Tooltip>
		<Tooltip onclick={() => removeSubject(id)} tip="Remove">
			<X size="16" />
		</Tooltip>
	</div>
</div>

<style lang="postcss">
	@reference "$styles";

	.subject {
		@apply dark:bg-dark flex items-center justify-between rounded-xl border-1 border-zinc-300 bg-white pl-1 dark:border-zinc-800;

		.info {
			@apply grid w-full;

			span {
				@apply ml-2;
			}

			span,
			input {
				@apply col-[1/2] row-[1/2];
			}
		}

		.actions :global {
			@apply flex gap-1 p-2;

			button {
				@apply p-1 rounded-md hover:bg-zinc-300 dark:hover:bg-zinc-800 transition-colors;

				&.active {
					background-color: oklch(from var(--color-accent) l c h / 50%);
				}
			}
		}
	}
</style>
