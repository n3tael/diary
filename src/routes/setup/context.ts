import { getContext, setContext } from 'svelte';

const key = {};

export function setButtonContext(button: { disable: boolean }) {
	setContext(key, button);
}

export function getButtonContext() {
	return getContext(key) as { disable: boolean };
}
