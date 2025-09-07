<script lang="ts">
	import { fade } from 'svelte/transition';

	let { children } = $props();
</script>

<div class="my-12 text-center" in:fade>
	{@render children?.()}
</div>
