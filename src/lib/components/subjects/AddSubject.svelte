<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import { subjects } from '$stores/subjects.svelte';

	function addSubject() {
		subjects.update((s) => [
			...s,
			{ id: (s[s.length - 1]?.id || 0) + 1, name: 'New subject' }
		]);
	}
</script>

<button id="add-subject" onclick={() => addSubject()}>
	<Plus size="24" strokeWidth="1" />
</button>

<style lang="postcss">
	@reference "$styles";

	#add-subject {
		background-color: oklch(from var(--color-accent) l c h / 25%);
		@apply mx-auto appearance-none rounded-full p-2;
	}
</style>
