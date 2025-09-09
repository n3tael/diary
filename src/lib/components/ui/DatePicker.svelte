<script lang="ts">
	import { Calendar, Minus } from '@lucide/svelte';

	let {
		startDate = $bindable(),
		endDate = $bindable()
	}: { startDate: string; endDate?: string } = $props();

	const setStartDateToday = () =>
		(startDate = new Date().toISOString().split('T')[0]);
</script>

<div class="date-picker">
	<button
		class="icon"
		onclick={setStartDateToday}
		aria-label="Set today as start date"
	>
		<Calendar size="16" />
	</button>
	<input type="date" required bind:value={startDate} />
	<span class="separator">
		<Minus size="16" />
	</span>
	<input
		type="date"
		bind:value={() => endDate, (v) => (endDate = v === '' ? undefined : v)}
	/>
</div>

<style lang="postcss">
	@reference "$styles";

	.date-picker {
		@apply flex w-max items-center gap-2 rounded-md border-2 border-zinc-200 text-sm dark:border-zinc-800;

		.icon {
			@apply rounded-none bg-zinc-200 p-2 dark:bg-zinc-800;
		}

		.separator {
			@apply rounded-md bg-zinc-200 px-2 py-0.5 dark:bg-zinc-800;
		}

		input[type='date'] {
			@apply rounded-md invalid:bg-red-200 focus:outline-0 dark:invalid:bg-red-950;
		}
	}
</style>
