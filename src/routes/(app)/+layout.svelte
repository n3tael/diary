<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Header from '$lib/components/Header.svelte';
	import { subjects } from '$stores/subjects.svelte';
	import { tasklist } from '$stores/tasklist.svelte';
	import { mode } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';

	if (
		browser &&
		!localStorage.getItem('setupComplete') &&
		$subjects.length === 0 &&
		$tasklist.length === 0
	) {
		goto('/setup/intro');
	}

	let { children } = $props();
</script>

<svelte:head>
	<title>Diary</title>
</svelte:head>

<Header />
{@render children()}
<Toaster theme={mode.current} position="top-center" closeButton={true} />
