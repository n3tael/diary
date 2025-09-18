import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const initialValue = browser
	? (localStorage.getItem('custom-accent') ?? '#999')
	: '#999';

export const customAccentColor = writable<string>(initialValue);

customAccentColor.subscribe((value) => {
	if (browser) localStorage.setItem('custom-accent', value);
});
