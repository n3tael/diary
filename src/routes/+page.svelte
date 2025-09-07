<script lang="ts">
	import { tasklist } from '$stores/tasklist.svelte';
	import { subjects } from '$stores/subjects.svelte';
	import * as Alert from '$lib/components/alert';
	import Task from '$lib/components/tasks/Task.svelte';
	import AddTask from '$lib/components/tasks/AddTask.svelte';
	import { autoAnimate } from '@formkit/auto-animate';
</script>

{#if $subjects.length === 0}
	<Alert.Root>
		<Alert.Title>Hello!</Alert.Title>
		<Alert.Description>
			To get started, add all your subjects on <a href="/subjects"
				>the subjects page</a
			> and then you can add your tasks.
		</Alert.Description>
	</Alert.Root>
{:else}
	{#if $tasklist.length === 0}
		<Alert.Root>
			<Alert.Title>Looks empty!</Alert.Title>
			<Alert.Description>Add first task below.</Alert.Description>
		</Alert.Root>
	{:else}
		<div class="tasks" use:autoAnimate>
			{#each $tasklist as task, taskId (taskId)}
				<Task
					{taskId}
					bind:text={task.text}
					bind:subjectId={task.subjectId}
					bind:done={task.done}
					bind:date={task.date}
					bind:deadline={task.deadline}
				/>
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
