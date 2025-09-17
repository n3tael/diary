<script lang="ts">
	import AccentColors from '$lib/components/ui/AccentColors.svelte';
	import { m } from '$lib/paraglide/messages';
	import { Check } from '@lucide/svelte';
	import { mode, setMode, systemPrefersMode } from 'mode-watcher';
</script>

<h1>{m.setup_appearance_head()}</h1>
<div class="flex flex-col gap-1">
	<div
		id="theme"
		class="flex gap-4 rounded-xl bg-zinc-100 p-4 dark:bg-zinc-900"
	>
		<div class="flex flex-col gap-y-4 text-center font-medium">
			<div id="light-theme-preview" class="theme-preview">
				<svg
					width="96"
					height="78"
					viewBox="0 0 96 78"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_45_134)">
						<rect x="8" y="10" width="8" height="2" rx="1" fill="black" />
						<rect x="31" y="10" width="8" height="2" rx="1" fill="black" />
						<rect
							x="30"
							y="9"
							width="10"
							height="4"
							rx="2"
							stroke="var(--color-accent)"
							stroke-opacity="0.5"
							stroke-width="2"
						/>
						<rect x="43" y="10" width="8" height="2" rx="1" fill="black" />
						<rect x="55" y="10" width="8" height="2" rx="1" fill="black" />
						<rect x="80" y="10" width="2" height="2" rx="1" fill="#D4D4D8" />
						<rect x="84" y="10" width="2" height="2" rx="1" fill="#D4D4D8" />
					</g>
					<rect
						x="8.5"
						y="18.5"
						width="79"
						height="23"
						rx="3.5"
						stroke="#E4E4E7"
					/>
					<rect x="12" y="22" width="8" height="2" rx="1" fill="black" />
					<rect x="12" y="28" width="8" height="1" rx="0.5" fill="black" />
					<rect x="22" y="28" width="6" height="1" rx="0.5" fill="black" />
					<rect x="30" y="28" width="2" height="1" rx="0.5" fill="black" />
					<rect x="34" y="28" width="8" height="1" rx="0.5" fill="black" />
					<rect x="44" y="28" width="10" height="1" rx="0.5" fill="black" />
					<rect x="56" y="28" width="4" height="1" rx="0.5" fill="black" />
					<rect x="62" y="28" width="8" height="1" rx="0.5" fill="black" />
					<rect x="72" y="28" width="6" height="1" rx="0.5" fill="black" />
					<rect x="12" y="31" width="12" height="1" rx="0.5" fill="black" />
					<rect x="26" y="31" width="16" height="1" rx="0.5" fill="black" />
					<rect x="44" y="31" width="8" height="1" rx="0.5" fill="black" />
					<rect x="12" y="36" width="16" height="2" rx="1" fill="#D4D4D8" />
					<rect
						x="8.5"
						y="46.5"
						width="79"
						height="23"
						rx="3.5"
						stroke="#E4E4E7"
					/>
					<rect x="12" y="50" width="8" height="2" rx="1" fill="black" />
					<rect x="12" y="56" width="8" height="1" rx="0.5" fill="black" />
					<rect x="22" y="56" width="6" height="1" rx="0.5" fill="black" />
					<rect x="30" y="56" width="2" height="1" rx="0.5" fill="black" />
					<rect x="34" y="56" width="8" height="1" rx="0.5" fill="black" />
					<rect x="44" y="56" width="10" height="1" rx="0.5" fill="black" />
					<rect x="56" y="56" width="4" height="1" rx="0.5" fill="black" />
					<rect x="62" y="56" width="8" height="1" rx="0.5" fill="black" />
					<rect x="72" y="56" width="6" height="1" rx="0.5" fill="black" />
					<rect x="12" y="59" width="12" height="1" rx="0.5" fill="black" />
					<rect x="26" y="59" width="16" height="1" rx="0.5" fill="black" />
					<rect x="44" y="59" width="8" height="1" rx="0.5" fill="black" />
					<rect x="12" y="64" width="16" height="2" rx="1" fill="#D4D4D8" />
					<defs>
						<clipPath id="clip0_45_134">
							<rect
								width="80"
								height="6"
								fill="white"
								transform="translate(8 8)"
							/>
						</clipPath>
					</defs>
				</svg>
				<button class="apply-button" onclick={() => setMode('light')}>
					{#if mode.current === 'light' || (!mode.current && systemPrefersMode.current === 'light')}
						<Check size="16" />
					{/if}
				</button>
			</div>
			<span>{m.setup_appearance_theme_light()}</span>
		</div>
		<div class="flex flex-col gap-y-4 text-center font-medium">
			<div id="dark-theme-preview" class="theme-preview">
				<svg
					width="96"
					height="78"
					viewBox="0 0 96 78"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<g clip-path="url(#clip0_44_88)">
						<rect x="8" y="10" width="8" height="2" rx="1" fill="#F4F4F5" />
						<rect x="31" y="10" width="8" height="2" rx="1" fill="#F4F4F5" />
						<rect
							x="30"
							y="9"
							width="10"
							height="4"
							rx="2"
							stroke="var(--color-accent)"
							stroke-opacity="0.5"
							stroke-width="2"
						/>
						<rect x="43" y="10" width="8" height="2" rx="1" fill="#F4F4F5" />
						<rect x="55" y="10" width="8" height="2" rx="1" fill="#F4F4F5" />
						<rect x="80" y="10" width="2" height="2" rx="1" fill="#52525C" />
						<rect x="84" y="10" width="2" height="2" rx="1" fill="#52525C" />
					</g>
					<rect
						x="8.5"
						y="18.5"
						width="79"
						height="23"
						rx="3.5"
						stroke="#18181B"
					/>
					<rect x="12" y="22" width="8" height="2" rx="1" fill="#F4F4F5" />
					<rect x="12" y="28" width="8" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="22" y="28" width="6" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="30" y="28" width="2" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="34" y="28" width="8" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="44" y="28" width="10" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="56" y="28" width="4" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="62" y="28" width="8" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="72" y="28" width="6" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="12" y="31" width="12" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="26" y="31" width="16" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="44" y="31" width="8" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="12" y="36" width="16" height="2" rx="1" fill="#52525C" />
					<rect
						x="8.5"
						y="46.5"
						width="79"
						height="23"
						rx="3.5"
						stroke="#18181B"
					/>
					<rect x="12" y="50" width="8" height="2" rx="1" fill="#F4F4F5" />
					<rect x="12" y="56" width="8" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="22" y="56" width="6" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="30" y="56" width="2" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="34" y="56" width="8" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="44" y="56" width="10" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="56" y="56" width="4" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="62" y="56" width="8" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="72" y="56" width="6" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="12" y="59" width="12" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="26" y="59" width="16" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="44" y="59" width="8" height="1" rx="0.5" fill="#F4F4F5" />
					<rect x="12" y="64" width="16" height="2" rx="1" fill="#52525C" />
					<defs>
						<clipPath id="clip0_44_88">
							<rect
								width="80"
								height="6"
								fill="white"
								transform="translate(8 8)"
							/>
						</clipPath>
					</defs>
				</svg>
				<button class="apply-button" onclick={() => setMode('dark')}>
					{#if mode.current === 'dark' || (!mode.current && systemPrefersMode.current === 'dark')}
						<Check size="16" />
					{/if}
				</button>
			</div>
			<span>{m.setup_appearance_theme_dark()}</span>
		</div>
	</div>
	<div
		id="accent"
		class="flex justify-center rounded-xl bg-zinc-100 p-4 dark:bg-zinc-900"
	>
		<AccentColors />
	</div>
</div>

<style lang="postcss">
	@reference '$styles';

	#theme {
		.theme-preview {
			@apply flex flex-col gap-y-2 rounded-xl;

			.apply-button {
				@apply mx-auto my-2 flex h-6 w-6 items-center justify-center rounded-full border-1;
			}

			&#light-theme-preview {
				@apply bg-white text-black;

				.apply-button {
					@apply border-zinc-300 text-black;
				}
			}

			&#dark-theme-preview {
				@apply bg-dark text-zinc-100;

				.apply-button {
					@apply border-zinc-800 text-white;
				}
			}
		}
	}
</style>
