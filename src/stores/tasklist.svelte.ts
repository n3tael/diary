import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export interface Task {
	subjectId: number;
	text: string;
	done: boolean;
	date: Date;
	deadline?: Date;
}

export const tasklist = writable<Task[]>(
	JSON.parse((browser && localStorage.getItem('tasklist')) || '[]')
);

tasklist.subscribe((value) => {
	if (browser) localStorage.tasklist = JSON.stringify(value);
});
