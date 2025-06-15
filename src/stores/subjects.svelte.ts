import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export const subjects = writable<string[]>(
	JSON.parse((browser && localStorage.getItem('subjects')) || '[]')
);

subjects.subscribe((value) => {
	if (browser) localStorage.subjects = JSON.stringify(value);
});
