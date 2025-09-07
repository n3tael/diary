<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { ModeWatcher, mode } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Diary</title>
</svelte:head>

<ModeWatcher defaultTheme="blue" />
<Header />
{@render children()}
<Toaster theme={mode.current} />
