<script lang="ts">
	import AccentColors from '../AccentColors.svelte';
</script>

<section>
	<div class="info">
		<h4>Accent color</h4>
		<p>Defines the accent color for UI elements</p>
	</div>
	<AccentColors />
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
	}
</style>
