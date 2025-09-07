<script lang="ts">
	import AccentSection from '$lib/components/settings/accent/AccentSection.svelte';
	import BackupSection from '$lib/components/settings/BackupSection.svelte';
	import BuildInfoSection from '$lib/components/settings/BuildInfoSection.svelte';
</script>

<h2 class="section-name">Personalization</h2>
<AccentSection />

<h2 class="section-name">Backup</h2>
<BackupSection />
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
