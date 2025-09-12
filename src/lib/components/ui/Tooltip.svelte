<script lang="ts">
	import { Tooltip } from 'bits-ui';

	let { children, tip, ...restProps }: Tooltip.TriggerProps & { tip: string } =
		$props();
</script>

<Tooltip.Provider>
	<Tooltip.Root delayDuration={0} disableHoverableContent={true}>
		<Tooltip.Trigger {...restProps}>
			{@render children?.()}
		</Tooltip.Trigger>
		<Tooltip.Content
			class="rounded-md border-1 border-zinc-200 bg-white px-2 py-1 text-xs font-medium shadow-md dark:border-zinc-900 dark:bg-zinc-950"
			sideOffset={4}
		>
			{tip}
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
