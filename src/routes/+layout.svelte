<script lang="ts">
	import '$styles';

	import { ModeWatcher, theme } from 'mode-watcher';
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
{@render children()}
