<script lang="ts">
	import { Pencil, X, Calendar, Minus } from '@lucide/svelte';
	import { marked } from 'marked';
	import DOMPurify from 'dompurify';
	import { tasklist, type Task } from '../../stores/tasklist.svelte';
	import { subjects } from '../../stores/subjects.svelte';
	import SubjectSelectOptions from './SubjectSelectOptions.svelte';
	import DatePicker from './DatePicker.svelte';

	let {
		taskId,
		subjectId = $bindable(),
		text = $bindable(),
		done = $bindable(),
		date = $bindable(),
		deadline = $bindable()
	}: { taskId: number } & Task = $props();
	let editing: boolean = $state<boolean>(false);

	function removeTask(taskId: number) {
		$tasklist.splice(taskId, 1);
		$tasklist = $tasklist;
	}

	const formatDate = (date: Date): string =>
		Intl.DateTimeFormat(navigator.language, {
			day: '2-digit',
			month: 'long'
		}).format(date);
</script>

<div class={['task', done ? 'done' : null, editing ? 'editing' : null]}>
	<div class="flex w-full items-center gap-2">
		<input type="checkbox" disabled={editing} bind:checked={done} />
		{#if editing}
			<select bind:value={subjectId}>
				<SubjectSelectOptions />
			</select>
		{:else}
			<p class="font-medium">{$subjects[subjectId] || '?'}</p>
		{/if}
		<div class="ml-auto flex gap-1">
			{#if !done}
				<button
					class={['primary', 'p-1', editing ? 'active' : null]}
					onclick={() => (editing = !editing)}><Pencil size="16" /></button
				>
			{/if}
			<button class="primary p-1" onclick={() => removeTask(taskId)}>
				<X size="16" />
			</button>
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
					{@const days_remain = (new Date(deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)}
					{#if days_remain <= 3}
						<span class={["warning", days_remain > 2 ? 'blue' : days_remain > 1 ? 'yellow' : days_remain > 0 ? 'red' : 'red-bright']}>{days_remain > 0 ? `${Math.round(days_remain)} days left` : days_remain > -1 ? 'less than a day left' : 'expired'}</span>
					{/if}
				{/if}
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	@reference "../../app.css";

	.task {
		@apply flex flex-col gap-1 rounded-xl border-1 border-zinc-200 p-2 pl-3 transition-opacity dark:border-zinc-800;

		&.done {
			@apply opacity-30;
		}

		&.editing {
			button.active {
				@apply bg-zinc-300 text-black;
			}
		}

		.footer {
			@apply flex items-center gap-1 text-sm text-zinc-400 font-light;

			.warning {
				@apply px-1.5 rounded-xl text-xs text-black dark:text-white;

				&.blue {
					background-color: oklch(from var(--color-accent) l c h / 50%);
				}

				&.yellow {
					background-color: oklch(from var(--color-yellow-400) l c h / 50%);
				}

				&.red {
					background-color: oklch(from var(--color-accent-red) l c h / 50%);
				}

				&.red-bright {
					background-color: oklch(from var(--color-accent-red) l c h / 75%);
				}
			}
		}
	}
</style>
