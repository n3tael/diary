<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { ArrowLeft, ArrowRight, Check } from '@lucide/svelte';

	let { children } = $props();

	const stages = ['intro', 'appearance', 'subjects', 'done'];
	const currentStage = $derived(page.url.pathname.split('/')[2]);
	const currentStageIndex = $derived(
		stages.findIndex((s) => currentStage === s)
	);
</script>

<div class="setup">
	{@render children()}

	<div class="flex gap-2">
		{#if currentStage === 'done'}
			<button
				class="next"
				onclick={() => {
					localStorage.setItem('setupComplete', 'true');
					goto('/');
				}}
			>
				<Check />
			</button>
		{:else}
			{#if currentStage !== 'intro'}
				<button
					class="prev"
					onclick={() => goto(`/setup/${stages[currentStageIndex - 1]}`)}
					data-sveltekit-preload-code="eager"><ArrowLeft /></button
				>
			{/if}
			<button
				class="next"
				onclick={() => goto(`/setup/${stages[currentStageIndex + 1]}`)}
				data-sveltekit-preload-code="eager"><ArrowRight /></button
			>
		{/if}
	</div>
</div>

<style lang="postcss">
	@reference "$styles";

	.setup {
		@apply absolute top-0 right-0 bottom-0 left-0 mx-4 flex max-w-128 flex-col items-center justify-center gap-4 min-[34rem]:mx-auto;
	}

	.prev {
		@apply rounded-full border-1 border-zinc-200 p-2 hover:border-zinc-300 dark:border-zinc-800 dark:text-white dark:hover:border-zinc-700;
	}

	.next {
		background-color: oklch(from var(--color-accent) l c h / 25%);
		@apply rounded-full p-2 transition-colors not-dark:text-black;

		&:hover {
			background-color: oklch(from var(--color-accent) l c h / 50%);
		}
	}
</style>
