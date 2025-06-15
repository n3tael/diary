<script lang="ts">
	import { Plus } from '@lucide/svelte';
	import { subjects } from '../../stores/subjects.svelte';

	let form = $state<HTMLFormElement>();
	let newSubjectName: string = $state<string>('');

	function addSubject() {
		if (newSubjectName.length !== 0) {
			subjects.update((s) => [...s, newSubjectName]);

			if (form) form.reset();
		}
	}
</script>

<form id="add-subjects" onsubmit={addSubject} bind:this={form}>
	<input
		type="text"
		class="w-full"
		bind:value={newSubjectName}
		placeholder="New subject..."
	/>
	<button class="primary" type="submit"><Plus /></button>
</form>

<style lang="postcss">
	@reference "../../app.css";

	#add-subjects {
		@apply flex flex-row gap-2 rounded-md border-2 border-dashed border-zinc-300 p-2 dark:border-zinc-800;
	}
</style>
