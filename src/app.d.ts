// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare type Item = import('svelte-dnd-action').Item;
declare type DndEvent<ItemType = Item> =
	import('svelte-dnd-action').DndEvent<ItemType>;
declare namespace svelteHTML {
	interface HTMLAttributes<T> {
		onconsider?: (
			event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T }
		) => void;
		onfinalize?: (
			event: CustomEvent<DndEvent<ItemType>> & { target: EventTarget & T }
		) => void;
	}
}
