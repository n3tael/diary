<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages';
	import { ArrowLeft, ArrowRight, Check } from '@lucide/svelte';
	import { cubicOut } from 'svelte/easing';
	import { Tween } from 'svelte/motion';
	import { fade } from 'svelte/transition';

	let { children } = $props();

	const stages = ['intro', 'appearance', 'subjects', 'done'];
	const currentStageIndex = $derived(
		stages.findIndex((s) => page.route.id?.split('/')[2] === s)
	);

	let progress = Tween.of(() => currentStageIndex, { easing: cubicOut });
</script>

<div class="setup">
	{#if currentStageIndex !== 0}
		<p in:fade>{m.setup_steps({ current: currentStageIndex, total: stages.length - 1 })}</p>
		<progress in:fade class="rounded-full h-1 accent-accent" value={progress.current} max={stages.length-1}></progress>
	{/if}
	
	<div class="step">
	{@render children()}
	</div>
	
	<div class="flex gap-2">
		{#if currentStageIndex === stages.length - 1}
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
			{#if currentStageIndex !== 0}
				<a class="prev" href={`/setup/${stages[currentStageIndex - 1]}`} data-sveltekit-preload-code="eager"><ArrowLeft /></a>
			{/if}
			<a class="next" href={`/setup/${stages[currentStageIndex + 1]}`} data-sveltekit-preload-code="eager"><ArrowRight /></a>
		{/if}
	</div>
</div>

<style lang="postcss">
	@reference "$styles";

	.setup {
		@apply absolute top-0 right-0 bottom-0 left-0 mx-4 flex max-w-128 flex-col items-center justify-center gap-4 min-[34rem]:mx-auto;
	
		progress {
			@apply bg-zinc-100 dark:bg-zinc-900;

			&::-webkit-progress-value,
			&::-moz-progress-bar { 
				@apply bg-accent transition-colors;
			}
		}

		.step {
			@apply h-96 flex flex-col gap-y-4 justify-center items-center;
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
	}
</style>
