<script lang="ts">
	import { page } from '$app/state';
	import GitHub from '$lib/icons/GitHub.svelte';
	import { subjects } from '$stores/subjects.svelte';
	import { tasklist } from '$stores/tasklist.svelte';
	import ThemeSwitch from '$lib/components/ui/ThemeSwitch.svelte';
	import { Spring } from 'svelte/motion';
	import { goto } from '$app/navigation';

	let tasksCount = new Spring(0);
	let subjectsCount = new Spring(0);

	const links = [
		{
			href: '/',
			name: 'Tasks',
			count: tasksCount
		},
		{
			href: '/subjects',
			name: 'Subjects',
			count: subjectsCount
		},
		{
			href: '/settings',
			name: 'Settings'
		}
	];

	tasklist.subscribe((t) => tasksCount.set(t.length));
	subjects.subscribe((n) => subjectsCount.set(n.length));

	function modulo(n: number, m: number) {
		// handle negative numbers
		return ((n % m) + m) % m;
	}

	function handleNavigationByArrows(e: KeyboardEvent) {
		if ((<HTMLInputElement>e.target).tagName === 'INPUT') return;
		if (!e.ctrlKey || (e.code !== 'ArrowLeft' && e.code !== 'ArrowRight'))
			return;

		const linkIndex = links.findIndex((l) => l.href === page.url.pathname);
		switch (e.code) {
			case 'ArrowLeft':
				goto(links[linkIndex !== 0 ? linkIndex - 1 : links.length - 1].href);
				break;
			case 'ArrowRight':
				goto(links[linkIndex !== links.length - 1 ? linkIndex + 1 : 0].href);
				break;
		}
	}
</script>

<svelte:window onkeydown={handleNavigationByArrows} />

<header>
	<h3>Diary</h3>
	<div class="pages">
		{#each links as link}
			{@const isOnThisPage = page.url.pathname === link.href}
			<a
				class:active={isOnThisPage}
				href={link.href}
				data-sveltekit-preload-code="eager"
			>
				<span>{link.name}</span>
				{#if link.count && isOnThisPage}
					<div class="count-view">
						<div
							class="count"
							style="transform: translate(0, -{100 *
								modulo(link.count.current, 1)}%)"
						>
							<span>{Math.floor(link.count.current)}</span>
							<span class="-bottom-full"
								>{Math.floor(link.count.current + 1)}</span
							>
						</div>
					</div>
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
	@reference "$styles";

	header {
		@apply flex items-center justify-between;

		.pages {
			@apply flex gap-4;

			a {
				@apply flex items-center gap-1 p-0 font-medium no-underline transition-all hover:text-inherit;

				.count-view {
					@apply h-5 overflow-hidden text-center;

					.count {
						@apply h-full w-full;
					}

					span {
						@apply flex items-center justify-center text-sm font-normal;
					}
				}

				&.active {
					background-color: oklch(from var(--color-accent) l c h / 25%);
					@apply rounded-xl px-2 py-0;
				}
			}
		}

		h3 {
			@apply text-2xl font-black;
		}
	}
</style>
