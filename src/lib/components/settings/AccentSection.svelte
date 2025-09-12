<script lang="ts">
	import { setTheme, theme } from 'mode-watcher';
	import { themes } from '$lib/themes';
	import { customAccentColor } from '$stores/custom-accent';
	import Tooltip from '$lib/components/ui/Tooltip.svelte';

	let customAccentColorInput: HTMLInputElement;
</script>

<section>
	<div class="info">
		<h4>Accent color</h4>
		<p>Defines the accent color for UI elements</p>
	</div>
	<div class="flex gap-1">
		{#each themes as color}
			<!-- svelte-ignore a11y_consider_explicit_label -->
			<Tooltip
				tip={color}
				class={theme.current === color ? 'active' : null}
				onclick={() => {
					setTheme(color);
					if (color === 'custom') customAccentColorInput.click();
				}}
				style={color !== 'custom'
					? `background-color:var(--color-accent-${color})`
					: `background-color:${$customAccentColor}`}
			></Tooltip>
		{/each}
		<input
			bind:this={customAccentColorInput}
			type="color"
			class="hidden"
			onclick={() => setTheme('custom')}
			bind:value={$customAccentColor}
		/>
	</div>
</section>

<style lang="postcss">
	@reference "$styles";

	section :global {
		@apply my-3 flex items-center justify-between;

		.info {
			@apply flex flex-col gap-1;

			h4 {
				@apply text-xl font-medium;
			}

			p {
				@apply text-sm font-normal text-zinc-400 dark:text-zinc-600;
			}
		}

		button {
			@apply rounded-full p-3 transition-none;

			&.active {
				@apply dark:border-dark outline-accent border-2 border-white px-2.5 py-2 outline-2;
			}
		}
	}
</style>
