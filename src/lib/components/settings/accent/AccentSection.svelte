<script lang="ts">
	import { setTheme, theme } from 'mode-watcher';
	import { themes } from '$lib/themes';
</script>

<section>
	<div class="info">
		<h4>Accent color</h4>
		<p>Defines the accent color for UI elements</p>
	</div>
	<div class="flex gap-1">
		{#each themes as color}
			<button
				class={[theme.current === color ? 'active' : null]}
				onclick={() => setTheme(color)}
				style={`background-color:var(--color-accent-${color})`}
				aria-label={color}
			>
			</button>
		{/each}
	</div>
</section>

<style lang="postcss">
	@reference "$styles";

	section {
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
			@apply rounded-full p-3;

			&.active {
				@apply p-1;
				&::after {
					@apply flex items-center transition-all;
					content: url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22currentColor%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20class%3D%22lucide%20lucide-check-icon%20lucide-check%22%3E%3Cpath%20d%3D%22M20%206%209%2017l-5-5%22%2F%3E%3C%2Fsvg%3E');
				}
			}
		}
	}
</style>
