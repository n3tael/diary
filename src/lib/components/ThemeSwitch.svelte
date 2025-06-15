<script lang="ts">
	import { Moon, Sun } from '@lucide/svelte';
	import { toggleMode, mode } from 'mode-watcher';
</script>

<button class="primary" onclick={toggleMode}>
	{#if $mode === 'light'}
		<Sun size="16" />
	{:else}
		<Moon size="16" />
	{/if}
</button>
