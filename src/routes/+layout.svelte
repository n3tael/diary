<script lang="ts">
	import '$styles';

	import { ModeWatcher, theme } from 'mode-watcher';
	import { customAccentColor } from '$stores/custom-accent';
	import { m } from '$lib/paraglide/messages';
	import { getLocale } from '$lib/paraglide/runtime';
	import { onMount } from 'svelte';

	let { children } = $props();

	$effect(() => {
		customAccentColor.subscribe((v) => {
			if (theme.current === 'custom')
				document.body.style = `--color-accent: ${v}`;
			else document.body.style = '';
		});
	});

	onMount(() => {
		document.documentElement.setAttribute("lang", getLocale());
	});
</script>

<svelte:head>
	<title>{m.diary_name()}</title>
</svelte:head>

<ModeWatcher defaultTheme="blue" disableTransitions={false} />
{@render children()}
