<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { ModeWatcher, mode, theme } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import '../app.css';
	import { customAccentColor } from '$stores/custom-accent';

	let { children } = $props();

	$effect(() => {
		customAccentColor.subscribe((v) => {
			if (theme.current === 'custom')
				document.body.style = `--color-accent: ${v}`;
			else document.body.style = '';
		});
	});
</script>

<svelte:head>
	<title>Diary</title>
</svelte:head>

<ModeWatcher defaultTheme="blue" disableTransitions={false} />
<Header />
{@render children()}
<Toaster theme={mode.current} position="top-center" closeButton={true} />
