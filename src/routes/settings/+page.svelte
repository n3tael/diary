<script lang="ts">
	import BackupSection from '$lib/components/settings/BackupSection.svelte';

</script>

<h2 class="section-name">Backup</h2>
<BackupSection />

<style lang="postcss">
	@reference "$styles";

	.section-name {
		@apply pb-1 border-b-1 border-zinc-300 font-medium text-2xl;
	}
</style>
