<script lang="ts">
	import { Calendar, Minus } from '@lucide/svelte';

	let {
		startDate = $bindable(),
		endDate = $bindable()
	}: { startDate: Date; endDate?: Date } = $props();
</script>

<div class="date-picker">
	<span class="icon">
		<Calendar size="16" />
	</span>
	<input type="date" required bind:value={startDate} />
	<span class="separator">
		<Minus size="16" />
	</span>
	<input type="date" bind:value={endDate} />
</div>

<style lang="postcss">
	@reference "../../app.css";

	.date-picker {
		@apply flex w-max items-center gap-2 rounded-md border-2 border-zinc-300 text-sm dark:border-zinc-800;

		.icon {
			@apply bg-zinc-300 p-2 dark:bg-zinc-800;
		}

		.separator {
			@apply rounded-md bg-zinc-300 px-2 py-0.5 dark:bg-zinc-800;
		}

		input[type='date'] {
			@apply rounded-md invalid:bg-red-200 focus:outline-0 dark:invalid:bg-red-950;
		}
	}
</style>
