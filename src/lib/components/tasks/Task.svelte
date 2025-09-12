<script lang="ts">
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import { tasklist, type Task } from '$stores/tasklist.svelte';
	import { subjects } from '$stores/subjects.svelte';
	import { Pencil, X, Calendar, Minus, GripVertical } from '@lucide/svelte';
	import { dragHandle } from 'svelte-dnd-action';
	import SubjectSelectOptions from '$lib/components/tasks/SubjectSelectOptions.svelte';
	import DatePicker from '$lib/components/ui/DatePicker.svelte';
	import Checkbox from '$lib/components/ui/Checkbox.svelte';
	import Tooltip from '$lib/components/ui/Tooltip.svelte';

	let {
		id,
		subjectId = $bindable(),
		text = $bindable(),
		done = $bindable(),
		date = $bindable(),
		deadline = $bindable()
	}: Task = $props();

	let editing: boolean = $state<boolean>(false);

	function removeTask(id: number) {
		tasklist.update((ts) => {
			ts.splice(
				ts.findIndex((t) => t.id === id),
				1
			);
			return ts;
		});
	}

	const formatDate = (date: Date): string =>
		Intl.DateTimeFormat(navigator.language, {
			day: '2-digit',
			month: 'long'
		}).format(date);
</script>

<div class={['task', done ? 'done' : null, editing ? 'editing' : null]}>
	<div class="flex w-full items-center gap-2">
		<Checkbox disabled={editing} bind:checked={done} />
		{#if editing}
			<select bind:value={subjectId}>
				<SubjectSelectOptions />
			</select>
		{:else}
			<p class="font-medium">
				{$subjects.find((s) => s.id === subjectId)?.name || '?'}
			</p>
		{/if}
		<div class="ml-auto flex gap-1">
			<button
				class="px-1 text-zinc-500"
				use:dragHandle
				ondrag={() => (editing = false)}
			>
				<GripVertical size="16" />
			</button>
			{#if !done}
				<Tooltip
					class={['primary', editing ? 'active' : null]}
					onclick={() => (editing = !editing)}
					tip="Edit"
				>
					<Pencil size="16" />
				</Tooltip>
			{/if}
			<Tooltip class="primary" onclick={() => removeTask(id)} tip="Remove">
				<X size="16" />
			</Tooltip>
		</div>
	</div>
	{#if editing}
		<input type="text" bind:value={text} placeholder="Description" />
		<DatePicker bind:startDate={date} bind:endDate={deadline} />
	{:else}
		<p>{@html DOMPurify.sanitize(marked.parse(text) as string)}</p>
		<div class="footer">
			<Calendar size="16" strokeWidth="1" />
			<p>{formatDate(new Date(date))}</p>
			{#if deadline}
				<Minus size="16" strokeWidth="1" />
				<p>{formatDate(new Date(deadline))}</p>
				{#if !done}
					{@const days_remain =
						(new Date(deadline).getTime() - new Date().getTime()) /
						(1000 * 60 * 60 * 24)}
					{#if days_remain <= 3}
						<span
							class={[
								'warning',
								days_remain > 2
									? 'blue'
									: days_remain > 1
										? 'yellow'
										: days_remain > 0
											? 'red'
											: 'red-bright'
							]}
						>
							{days_remain > 0
								? `${Math.ceil(days_remain)} days left`
								: days_remain > -1
									? 'less than a day left'
									: 'expired'}
						</span>
					{/if}
				{/if}
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	@reference "$styles";

	.task {
		@apply dark:bg-dark flex flex-col gap-1 rounded-xl border-1 border-zinc-200 bg-white p-2 pl-3 transition-opacity dark:border-zinc-800;

		&.done {
			@apply opacity-30;
		}

		&.editing :global {
			.active {
				background-color: oklch(from var(--color-accent) l c h / 50%);
				border-color: transparent;
			}
		}

		.footer {
			@apply flex items-center gap-1 text-sm font-light text-zinc-400;

			.warning {
				@apply rounded-xl px-1.5 text-xs text-black dark:text-white;

				&.blue {
					background-color: oklch(from var(--color-accent) l c h / 25%);
				}

				&.yellow {
					background-color: oklch(from var(--color-yellow-400) l c h / 25%);
				}

				&.red {
					background-color: oklch(from var(--color-accent-red) l c h / 25%);
				}

				&.red-bright {
					background-color: oklch(from var(--color-accent-red) l c h / 50%);
				}
			}
		}
	}
</style>
