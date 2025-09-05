<script>
	import { page } from '$app/state';
	import GitHub from '$lib/icons/GitHub.svelte';
	import { subjects } from '../../stores/subjects.svelte';
	import { tasklist } from '../../stores/tasklist.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';
	
	const links = [
		{
			href: '/',
			name: 'Tasks',
			count: $tasklist.length
		},
		{
			href: '/subjects',
			name: 'Subjects',
			count: $subjects.length
		},
		{
			href: '/settings',
			name: 'Settings'
		}
	]
</script>

<header>
	<h3>Diary</h3>
	<div class="pages">
		{#each links as link}
		{@const isOnThisPage = page.url.pathname === link.href}
		<a class={isOnThisPage ? 'active' : null} href={link.href}>
			<span>{link.name}</span>
			{#if link.count && isOnThisPage}
			<span class="count">{link.count}</span>
			{/if}
		</a>
		{/each}
	</div>
	<div>
		<a href="https://github.com/n3tael/diary">
			<button class="primary">
				<GitHub size={16} />
			</button>
		</a>
		<ThemeSwitch />
	</div>
</header>

<style lang="postcss">
	@reference "../../app.css";

	header {
		@apply flex items-center justify-between;

		a {
			@apply no-underline hover:text-inherit p-0 transition-all font-medium;

			span.count {
				@apply text-sm font-normal;
			}

			&.active {
				background-color: oklch(from var(--color-accent) l c h / 25%);
				@apply px-2 py-0 rounded-xl;
			}
		}

		.pages {
			@apply flex gap-4;
		}

		h3 {
			@apply text-2xl font-black;
		}
	}
</style>
