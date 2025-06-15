<script lang="ts">
	let { children } = $props();
</script>

<svelte:element this={'p'} class="text-zinc-400">
	{@render children?.()}
</svelte:element>
