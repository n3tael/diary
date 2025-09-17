<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { setMode, userPrefersMode } from 'mode-watcher';
</script>

<section>
	<div class="info">
		<h4>{m.settings_personalization_section_theme_head()}</h4>
		<p>{m.settings_personalization_section_theme_desc()}</p>
	</div>
    <select bind:value={() => userPrefersMode.current, (l) => setMode(l)}>
        <option value="light">{m.settings_personalization_section_theme_light()}</option>
        <option value="dark">{m.settings_personalization_section_theme_dark()}</option>
        <option value="system">{m.settings_personalization_section_theme_system()}</option>
    </select>
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
