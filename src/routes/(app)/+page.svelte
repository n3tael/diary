<script lang="ts">
	import { tasklist } from '$stores/tasklist.svelte';
	import { subjects } from '$stores/subjects.svelte';
	import * as Alert from '$lib/components/alert';
	import Task from '$lib/components/tasks/Task.svelte';
	import type { Task as ITask } from '$stores/tasklist.svelte';
	import AddTask from '$lib/components/tasks/AddTask.svelte';
	import { dragHandleZone } from 'svelte-dnd-action';
	import { flip } from 'svelte/animate';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { m } from '$lib/paraglide/messages.js';

	const flipDurationMs = 300;

	function handleDndConsider(e: CustomEvent<DndEvent<ITask>>) {
		tasklist.set(e.detail.items);
	}

	function handleDndFinalize(e: CustomEvent<DndEvent<ITask>>) {
		tasklist.set(e.detail.items);
	}

	if (
		browser &&
		!localStorage.getItem('subjects') &&
		!localStorage.getItem('tasklist')
	)
		goto('/setup/introduce');

	let pageTitle = $derived(`${m.diary_name()} • ${m.nav_tasks()} ${$tasklist.length ? `(${$tasklist.filter(s => s.done).length}/${$tasklist.length})` : ''}`);
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

{#if $subjects.length === 0}
	<Alert.Root>
		<Alert.Title>{m.tasks_no_subjects()}</Alert.Title>
		<Alert.Description>{@html m.tasks_no_subjects_desc()}</Alert.Description>
	</Alert.Root>
{:else}
	{#if $tasklist.length === 0}
		<Alert.Root>
			<Alert.Title>{m.tasks_no_tasks()}</Alert.Title>
			<Alert.Description>{m.tasks_no_tasks_desc()}</Alert.Description>
		</Alert.Root>
	{:else}
		<div
			class="tasks"
			use:dragHandleZone={{
				items: $tasklist,
				flipDurationMs,
				dropTargetStyle: {}
			}}
			onconsider={handleDndConsider}
			onfinalize={handleDndFinalize}
		>
			{#each $tasklist as task (task.id)}
				<div animate:flip={{ duration: flipDurationMs }}>
					<Task
						id={task.id}
						bind:text={task.text}
						bind:subjectId={task.subjectId}
						bind:done={task.done}
						bind:date={task.date}
						bind:deadline={task.deadline}
					/>
				</div>
			{/each}
		</div>
	{/if}

	<AddTask />
{/if}

<style lang="postcss">
	@reference "$styles";

	.tasks {
		@apply flex flex-col gap-2;
	}
</style>
