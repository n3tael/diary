<script lang="ts">
	let { children } = $props();
</script>

<svelte:element this={'h3'} class="mb-2 text-3xl font-bold">
	{@render children?.()}
</svelte:element>
