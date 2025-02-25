// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	type Variant =
		| 'default'
		| 'primary'
		| 'secondary'
		| 'tertiary'
		| 'success'
		| 'accent'
		| 'muted'
		| 'error'
		| 'danger'
		| 'warning'
		| 'info'
		| 'light'
		| 'dark';

	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
