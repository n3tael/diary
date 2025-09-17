<script lang="ts">
	import AccentSection from '$lib/components/settings/AccentSection.svelte';
	import LanguageSection from '$lib/components/settings/LanguageSection.svelte';
	import BackupSection from '$lib/components/settings/BackupSection.svelte';
	import ResetSection from '$lib/components/settings/ResetSection.svelte';
	import BuildInfoSection from '$lib/components/settings/BuildInfoSection.svelte';
	import { m } from '$lib/paraglide/messages';
	import ThemeSection from '$lib/components/settings/ThemeSection.svelte';
</script>

<svelte:head>
	<title>{m.diary_name()} • {m.nav_settings()}</title>
</svelte:head>

<h2 class="section-name">{m.settings_personalization_section()}</h2>
<ThemeSection />
<AccentSection />
<LanguageSection />

<h2 class="section-name">{m.settings_backup_section()}</h2>
<BackupSection />

<h2 class="section-name">{m.settings_danger_section()}</h2>
<ResetSection />

<hr />
<BuildInfoSection />

<style lang="postcss">
	@reference "$styles";

	.section-name {
		@apply border-b-1 border-zinc-300 pb-1 text-2xl font-medium dark:border-zinc-800;
	}

	hr {
		@apply border-zinc-300 dark:border-zinc-800;
	}
</style>
