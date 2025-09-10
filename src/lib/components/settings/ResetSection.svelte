<script lang="ts">
	function reset() {
        const c = confirm("Are you sure to reset all data?")
        if (c) {
            window.localStorage.clear();
            location.href = '/';
        }
    }
</script>

<section>
	<div class="info">
		<h4>Reset all data</h4>
		<p>That include tasks, subjects, settings. Make sure you have backup before continue.</p>
	</div>
	<button onclick={reset}>Reset</button>
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
			@apply bg-red-500 dark:bg-red-600 text-white rounded-xl px-2 py-1 border-2 border-red-400 dark:border-red-500 hover:bg-red-600 dark:hover:bg-red-700;
		}
	}
</style>
