import type { Subject } from '$stores/subjects.svelte';
import { type Task } from '$stores/tasklist.svelte';

export const isSubjectsOldVersion = (array: any) =>
	array[0] && typeof array[0] === 'string';

export function update(subjects: any, tasklist: any) {
	let new_array: Subject[] = [];

	for (let item of subjects) {
		new_array.push({ id: subjects.indexOf(item) + 1, name: item });
	}

	tasklist = updateTasks(tasklist);

	return { subjects: new_array, tasklist };
}

// Must be called only if updating subjects
function updateTasks(tasklist: Task[]) {
	return tasklist.map((t) => ({ ...t, subjectId: t.subjectId + 1 }));
}
