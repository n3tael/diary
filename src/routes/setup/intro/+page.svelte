<script lang="ts">
	import LanguageSelect from "$lib/components/ui/LanguageSelect.svelte";
	import { m } from "$lib/paraglide/messages";
</script>

<svelte:head>
	<title>{m.diary_name()}</title>
</svelte:head>

<h1>{m.setup_intro_head()}</h1>
<p>{m.setup_intro_desc()}</p>
<LanguageSelect />