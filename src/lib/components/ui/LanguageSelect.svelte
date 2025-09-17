<script lang="ts">
	import { m } from '$lib/paraglide/messages';
	import { getLocale, locales, setLocale } from '$lib/paraglide/runtime';
</script>

<select bind:value={() => getLocale(), (l) => setLocale(l)}>
    {#each locales as locale}
	    <option value={locale}>{m.self_name({}, { locale: locale })}</option>
    {/each}
</select>
