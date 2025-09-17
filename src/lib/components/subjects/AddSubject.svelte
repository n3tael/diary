<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import { subjects } from '$stores/subjects.svelte';
	import generateId from '$utils/generateId';
	import { m } from '$lib/paraglide/messages';

	function addSubject() {
		subjects.update((s) => [
			...s,
			{
				id: generateId(s.map((subject) => subject.id)),
				name: m.new_subject_name()
			}
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
