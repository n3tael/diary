import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { readFile } from 'node:fs/promises';
import pkg from './package.json';

const getCommit = async () => {
	return (await readFile('.git/logs/HEAD', 'utf8'))
		?.split('\n')
		?.filter(String)
		?.pop()
		?.split(' ')[1];
};

const getBranch = async () => {
	if (process.env.CF_PAGES_BRANCH) return process.env.CF_PAGES_BRANCH;
	
	return (await readFile('.git/HEAD', 'utf-8'))?.split('/')[2]?.trim();
};

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	define: {
		__APP_VERSION__: {
			name: pkg.name,
			version: pkg.version,
			commit: await getCommit(),
			branch: await getBranch()
		}
	}
});
