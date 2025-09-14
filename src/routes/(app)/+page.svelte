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
</script>

{#if $subjects.length === 0}
	<Alert.Root>
		<Alert.Title>No subjects added</Alert.Title>
		<Alert.Description
			>Add your subjects on <a href="/subjects">this page</a> or
			<a href="/setup/intro">run the setup</a>.</Alert.Description
		>
	</Alert.Root>
{:else}
	{#if $tasklist.length === 0}
		<Alert.Root>
			<Alert.Title>No tasks here yet</Alert.Title>
			<Alert.Description>Add a new task to get started.</Alert.Description>
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
