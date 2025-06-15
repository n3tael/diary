<script lang="ts">
	let { children } = $props();
</script>

<div class="my-12 text-center">
	{@render children?.()}
</div>
