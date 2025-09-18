<script lang="ts">
	import { setTheme, theme } from 'mode-watcher';
	import { themes } from '$lib/themes';
	import { customAccentColor } from '$stores/custom-accent';
	import Tooltip from '$lib/components/ui/Tooltip.svelte';
	import { m } from '$lib/paraglide/messages';
	import { browser } from '$app/environment';

	let customAccentColorInput: HTMLInputElement;
</script>

<div class="flex gap-1">
	{#each themes as color}
		<Tooltip
			tip={m[`settings_personalization_accent_color_${color}`]()}
			class={['color', theme.current === color ? 'active' : null]}
			onclick={() => {
				setTheme(color);
				if (color === 'custom') customAccentColorInput.click();
			}}
			style={color !== 'custom'
				? `background-color:var(--color-accent-${color})`
				: `background-color:${$customAccentColor}`}
		></Tooltip>
	{/each}
	{#if browser}
		<input
			bind:this={customAccentColorInput}
			type="color"
			class="hidden"
			bind:value={$customAccentColor}
		/>
	{/if}
</div>

<style lang="postcss">
	@reference '$styles';

	:global {
		button.color {
			@apply rounded-full p-3 transition-none;

			&.active {
				@apply dark:border-dark outline-accent border-2 border-zinc-100 px-2.5 py-2 outline-2;
			}
		}
	}
</style>
