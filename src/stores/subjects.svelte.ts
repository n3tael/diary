import { browser } from '$app/environment';
import { get, writable } from 'svelte/store';
import { isSubjectsOldVersion, update } from '../utils/stores-migrate';
import { tasklist } from './tasklist.svelte';

export interface Subject {
	id: number;
	name: string;
}

function importFromLocalStorage() {
	return JSON.parse((browser && localStorage.getItem('subjects')) || '[]');
}

export const subjects = writable<Subject[]>(
	(() => {
		let raw = importFromLocalStorage();

		if (isSubjectsOldVersion(raw)) {
			let updated = update(raw, get(tasklist));

			tasklist.set(updated.tasklist);

			return updated.subjects;
		}

		return raw;
	})()
);

subjects.subscribe((value) => {
	if (browser) localStorage.subjects = JSON.stringify(value);
});
