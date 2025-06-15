<script>
	import GitHub from '$lib/icons/GitHub.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<header>
	<h3>Diary</h3>
	<div class="pages">
		<a href="/">Task list</a>
		<a href="/subjects">Subjects</a>
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
		@apply mt-2 mb-4 flex items-center justify-between;

		a {
			@apply no-underline;
		}

		.pages {
			@apply flex gap-4;
		}

		h3 {
			@apply text-2xl font-bold;
		}
	}
</style>
