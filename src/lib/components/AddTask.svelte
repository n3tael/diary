<script lang="ts">
	import { Plus, X } from '@lucide/svelte';
	import { tasklist } from '../../stores/tasklist.svelte';
	import SubjectSelectOptions from './SubjectSelectOptions.svelte';
	import DatePicker from './DatePicker.svelte';

	let creating: boolean = $state<boolean>(false);

	let form = $state<HTMLFormElement>();

	let subjectId = $state(0);
	let text = $state('');
	let date = $state('');
	let deadline = $state<string | undefined>(undefined);

	function addTask() {
		let newTask = {
			done: false,
			subjectId,
			text,
			date,
			deadline
		};

		tasklist.update((t) => [...t, newTask]);

		creating = false;
		if (form) form.reset();
	}
</script>

{#if creating}
	<form id="add-task" onsubmit={addTask} bind:this={form}>
		<div class="flex gap-2 sm:flex-row">
			<div class="flex w-full flex-col gap-2 md:flex-row">
				<select class="flex-grow" required={true} bind:value={subjectId}>
					<SubjectSelectOptions />
				</select>
				<DatePicker bind:startDate={date} bind:endDate={deadline} />
			</div>
			<button type="button" class="primary" onclick={() => (creating = false)}>
				<X />
			</button>
		</div>
		<div class="flex gap-2">
			<input
				type="text"
				class="w-full"
				required={true}
				bind:value={text}
				placeholder="Task description..."
			/>
			<button class="primary" type="submit"><Plus /></button>
		</div>
	</form>
{:else}
	<button
		class="primary mt-2 ml-auto flex items-center gap-1 text-sm"
		onclick={() => (creating = true)}
	>
		<Plus size="20" />
		<p>Add new task</p>
	</button>
{/if}

<style lang="postcss">
	@reference "../../app.css";

	#add-task {
		@apply mt-2 flex flex-col gap-2 overflow-x-auto rounded-md border-2 border-dashed border-zinc-300 p-2 dark:border-zinc-800;
	}
</style>
