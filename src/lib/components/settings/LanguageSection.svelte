<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import LanguageSelect from '$lib/components/ui/LanguageSelect.svelte';
</script>

<section>
	<div class="info">
		<h4>{m.settings_personalization_language_head()}</h4>
		<p>{m.settings_personalization_language_desc()}</p>
	</div>
	<LanguageSelect />
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
