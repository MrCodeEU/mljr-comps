<script lang="ts">
	import { Dialog } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';

	let {
		variant = 'secondary',
		class: className = '',
		children
	} = $props<{
		variant?: Variant;
		class?: string;
		children?: Snippet;
	}>();

	const variantClasses = {
		primary: 'bg-primary text-black',
		secondary: 'bg-secondary text-black',
		tertiary: 'bg-tertiary text-black',
		accent: 'bg-accent text-black',
		muted: 'bg-neutral text-black',
		error: 'bg-error text-black',
		success: 'bg-success text-black',
		warning: 'bg-warning text-black',
		info: 'bg-info text-black'
	};
</script>

<Dialog.Close
	class={cn(
		'clay rounded-xl px-4 py-2 transition-all',
		'active:clay-inset hover:translate-y-0.5 hover:shadow-none',
		variantClasses[variant as keyof typeof variantClasses],
		className
	)}
>
	{@render children?.()}
</Dialog.Close>
