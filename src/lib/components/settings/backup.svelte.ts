import { toast } from 'svelte-sonner';
import { tasklist } from '$stores/tasklist.svelte';
import { subjects } from '$stores/subjects.svelte';
import * as z from 'zod/v4';
import { get } from 'svelte/store';
import { isSubjectsOldVersion, update } from '../../../utils/stores-migrate';
import { m } from '$lib/paraglide/messages';

export function load() {
	const i = document.createElement('input');
	i.type = 'file';
	i.accept = 'application/json';
	i.click();

	i.addEventListener('change', () => {
		if (!i.files || !i.files[0]) {
			return;
		}

		if (i.files[0].type !== 'application/json') {
			toast.error(m.settings_backup_err_invalid());
			return;
		}

		const reader = new FileReader();

		reader.onload = () => {
			if (typeof reader.result !== 'string') return;

			const scheme = z.object({
				tasklist: z.array(
					z.object({
						id: z.number(),
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

			let raw_backup = JSON.parse(reader.result);
			let backup;

			if (isSubjectsOldVersion(raw_backup?.subjects)) {
				raw_backup = update(raw_backup.subjects, raw_backup.tasklist);
			}

			try {
				backup = scheme.parse(raw_backup);
			} catch (error) {
				if (error instanceof z.ZodError) {
					toast.error(m.settings_backup_err_validation());
					console.error(error);
				}
				return;
			}

			tasklist.set(backup.tasklist);
			subjects.set(backup.subjects);

			toast.success(m.settings_backup_imported());
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
	a.href = blobURL;
	a.download = 'diary-backup.json';
	a.click();

	URL.revokeObjectURL(blobURL);
}
