import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export interface Subject {
	id: number;
	name: string;
}

function importFromLocalStorage() {
	return JSON.parse((browser && localStorage.getItem('subjects')) || '[]');
}

export function updateIfPossible(array: any) {
	if (array[0] && typeof array[0] === 'string') {
		let new_array: Subject[] = [];
		for (let item of array) {
			new_array.push({ id: array.indexOf(item) + 1, name: item });
		}

		array = new_array;
	}

	return array;
}

export const subjects = writable<Subject[]>(
	updateIfPossible(importFromLocalStorage())
);

subjects.subscribe((value) => {
	if (browser) localStorage.subjects = JSON.stringify(value);
});
