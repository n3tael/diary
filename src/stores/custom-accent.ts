import { browser } from '$app/environment';
import { writable } from 'svelte/store';

function importFromLocalStorage() {
	if (browser) return localStorage.getItem('custom-accent') || '#999';
}

export const customAccentColor = writable<string | null>(
	importFromLocalStorage()
);

customAccentColor.subscribe((value) => {
	if (browser) localStorage.setItem('custom-accent', value || '#999');
});
