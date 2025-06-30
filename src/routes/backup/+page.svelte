<script lang="ts">
	import { Toaster, toast } from 'svelte-sonner';
	import { tasklist, type Task } from '../../stores/tasklist.svelte';
	import { subjects } from '../../stores/subjects.svelte';
	import { Upload, Download } from '@lucide/svelte';
	import * as z from 'zod/v4';
	import { mode } from 'mode-watcher';

	function load() {
		const i = document.createElement('input');
		i.type = 'file';
		i.accept = 'application/json';
		i.click();

		i.addEventListener('change', () => {
			if (!i.files || !i.files[0]) {
				toast.error('No file selected');
				return;
			}

			if (i.files[0].type !== 'application/json') {
				toast.error('File type not supported');
				return;
			}

			const reader = new FileReader();

			reader.onload = () => {
				if (typeof reader.result !== 'string') return;

				const scheme = z.object({
					tasklist: z.array(
						z.object({
							subjectId: z.number(),
							text: z.string(),
							done: z.boolean(),
							date: z.iso.date(),
							deadline: z.iso.date().optional()
						})
					),
					subjects: z.array(z.string())
				});

				let backup;

				try {
					backup = scheme.parse(JSON.parse(reader.result));
				} catch (error) {
					if (error instanceof z.ZodError) {
						toast.error('Invalid backup file');
					}
					return;
				}

				$tasklist = backup.tasklist;
				$subjects = backup.subjects;

				toast.success('Backup imported success');
			};

			reader.readAsText(i.files[0]);
		});
	}

	function save() {
		const settings = {
			tasklist: $tasklist,
			subjects: $subjects
		};

		const exportJSONstring = JSON.stringify(settings);
		const blob = new Blob([exportJSONstring], { type: 'application/json' });
		const blobURL = URL.createObjectURL(blob);

		const a = document.createElement('a');
		a.className = 'govno';
		a.href = blobURL;
		a.download = 'diary-backup.json';
		a.click();

		URL.revokeObjectURL(blobURL);
	}
</script>

<h1 class="mb-4">Backup</h1>
<div id="backup-buttons">
	<button onclick={load}>
		<Upload size="32" />
		<span>Import</span>
		<span class="text-xs text-zinc-500"
			>(this will override your current data)</span
		>
	</button>
	<button onclick={save}>
		<Download size="32" />
		<span>Export</span>
	</button>
</div>
<p class="mt-2 text-zinc-500">
	All data is stored locally, in your browser. However, you can also make a
	backup copy in case of loss of data from the browser, or for easy transfer to
	another device.
</p>

<Toaster theme={mode.current} />

<style lang="postcss">
	@reference "../../app.css";

	#backup-buttons {
		@apply flex h-32 gap-2;

		button {
			@apply flex w-full flex-col items-center justify-center gap-1 rounded-md border-2 border-zinc-300 dark:border-zinc-800;
		}
	}
</style>
