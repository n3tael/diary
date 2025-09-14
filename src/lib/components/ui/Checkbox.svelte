<script lang="ts">
	import { Check } from '@lucide/svelte';
	import { Checkbox, type WithoutChildrenOrChild } from 'bits-ui';

	let {
		checked = $bindable(),
		...restProps
	}: WithoutChildrenOrChild<Checkbox.RootProps> = $props();
</script>

<Checkbox.Root
	class="inline-flex size-5 items-center justify-center rounded-md border-1 border-zinc-300 hover:bg-transparent! not-disabled:hover:border-zinc-400 disabled:cursor-default! dark:border-zinc-700"
	bind:checked
	{...restProps}
>
	{#snippet children({ checked })}
		{#if checked}
			<Check size="16" viewBox="0 0 24 22" />
		{/if}
	{/snippet}
</Checkbox.Root>
