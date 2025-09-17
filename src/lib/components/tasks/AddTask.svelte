<script lang="ts">
	import { Plus, X } from '@lucide/svelte';
	import { tasklist } from '$stores/tasklist.svelte';
	import SubjectSelectOptions from '$lib/components/tasks/SubjectSelectOptions.svelte';
	import DatePicker from '$lib/components/ui/DatePicker.svelte';
	import generateId from '$utils/generateId';
	import { m } from '$lib/paraglide/messages';

	// show task creation form when there are no tasks
	let creating: boolean = $state<boolean>($tasklist.length === 0);

	let form = $state<HTMLFormElement>();

	let subjectId = $state(0);
	let text = $state('');
	let date = $state('');
	let deadline = $state<string | undefined>(undefined);

	function addTask() {
		tasklist.update((ts) => [
			...ts,
			{
				id: generateId(ts.map((t) => t.id)),
				done: false,
				subjectId,
				text,
				date,
				deadline
			}
		]);

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
				placeholder={m.add_task_desc_placeholder()}
			/>
			<button class="primary" type="submit"><Plus /></button>
		</div>
	</form>
{:else}
	<button class="add-task" onclick={() => (creating = true)}>
		<Plus size="24" strokeWidth="1" />
	</button>
{/if}

<style lang="postcss">
	@reference "$styles";

	#add-task {
		@apply flex flex-col gap-2 overflow-x-auto rounded-xl border-1 border-zinc-200 p-2 dark:border-zinc-800;
	}

	button.add-task {
		background-color: oklch(from var(--color-accent) l c h / 25%);
		@apply mx-auto appearance-none rounded-full p-2;
	}
</style>
