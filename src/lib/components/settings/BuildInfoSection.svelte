<script lang="ts">
	const name = __APP_VERSION__.name;
	const version = __APP_VERSION__.version;
	const commit = __APP_VERSION__.commit.slice(0, 6);
	const branch = __APP_VERSION__.branch;
</script>

<p class=" text-sm text-zinc-400 dark:text-zinc-700">
	{name} • v{version}-{commit} @ {branch}
</p>
