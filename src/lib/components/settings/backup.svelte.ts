import { toast } from 'svelte-sonner';
import { tasklist } from '$stores/tasklist.svelte';
import { subjects, updateIfPossible } from '$stores/subjects.svelte';
import * as z from 'zod/v4';
import { get } from 'svelte/store';

export function load() {
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
				subjects: z.array(
					z.object({
						id: z.number(),
						name: z.string()
					})
				)
			});

			let backup;

			try {
				backup = scheme.parse(updateIfPossible(JSON.parse(reader.result)));
			} catch (error) {
				if (error instanceof z.ZodError) {
					toast.error('Invalid backup file');
					console.error(error);
				}
				return;
			}

			tasklist.set(backup.tasklist);
			subjects.set(backup.subjects);

			toast.success('Backup imported success');
		};

		reader.readAsText(i.files[0]);
	});
}

export function save() {
	const settings = {
		tasklist: get(tasklist),
		subjects: get(subjects)
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
