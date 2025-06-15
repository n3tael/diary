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
			<p>{$subjects[subjectId] || '?'}</p>
		{/if}
		<div class="ml-auto flex">
			{#if !done}
				<button
					class={['p-1', editing ? 'active' : null]}
					onclick={() => (editing = !editing)}><Pencil size="16" /></button
				>
			{/if}
			<button class="p-1" onclick={() => removeTask(taskId)}>
				<X size="16" />
			</button>
		</div>
	</div>
	{#if editing}
		<input type="text" bind:value={text} placeholder="Task description..." />
		<DatePicker bind:startDate={date} bind:endDate={deadline} />
	{:else}
		<p>{@html DOMPurify.sanitize(marked.parse(text) as string)}</p>
		<div class="flex items-center gap-1 text-sm text-zinc-400">
			<Calendar size="16" />
			<p>{formatDate(new Date(date))}</p>
			{#if deadline}
				<Minus size="16" />
				<p>{formatDate(new Date(deadline))}</p>
			{/if}
		</div>
	{/if}
</div>

<style lang="postcss">
	@reference "../../app.css";

	.task {
		@apply flex flex-col gap-1 rounded-md border-2 border-zinc-300 p-2 pl-3 transition-opacity dark:border-zinc-800;

		&.done {
			@apply opacity-30;
		}

		&.editing {
			button.active {
				@apply bg-amber-400 text-black;
			}
		}
	}
</style>
