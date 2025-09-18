<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	function reset() {
		const c = confirm(m.settings_danger_reset_all_warn());
		if (c) {
			window.localStorage.clear();
			location.href = '/';
		}
	}
</script>

<section>
	<div class="info">
		<h4>{m.settings_danger_reset_all_head()}</h4>
		<p>{m.settings_danger_reset_all_desc()}</p>
	</div>
	<button onclick={reset}>{m.settings_danger_reset_all_btn()}</button>
</section>

<style lang="postcss">
	@reference "$styles";

	section {
		@apply my-3 flex items-center justify-between;

		.info {
			@apply flex max-w-lg flex-col gap-1;

			h4 {
				@apply text-xl font-medium;
			}

			p {
				@apply text-sm font-normal text-zinc-400 dark:text-zinc-600;
			}
		}

		button {
			@apply rounded-xl border-2 border-red-400 bg-red-500 px-2 py-1 text-white hover:bg-red-600 dark:border-red-500 dark:bg-red-600 dark:hover:bg-red-700;
		}
	}
</style>
