<script lang="ts">
	import { Upload, Download } from '@lucide/svelte';
	import { load, save } from './backup.svelte';
	import { m } from '$lib/paraglide/messages';
</script>

<section>
	<div id="backup-buttons">
		<button onclick={load}>
			<Upload size="32" />
		</button>
		<button onclick={save}>
			<Download size="32" />
		</button>
	</div>

	<p class="mt-2 text-zinc-500">
		{m.settings_backup_desc()}
	</p>
</section>

<style lang="postcss">
	@reference "$styles";

	section {
		@apply my-3;

		#backup-buttons {
			@apply flex h-24 gap-2;

			button {
				@apply flex w-full flex-col items-center justify-center gap-4 rounded-2xl border-1 border-zinc-300 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400;
			}
		}
	}
</style>
