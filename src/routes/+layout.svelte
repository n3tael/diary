<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import { ModeWatcher } from 'mode-watcher';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Diary</title>
</svelte:head>

<ModeWatcher />
<Header />
{@render children()}
