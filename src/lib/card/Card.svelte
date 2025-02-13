<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';

	let {
		children,
		class: className = '',
		variant = 'default'
	}: {
		children: Snippet;
		class?: string;
		variant?: "default" | "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info"
	} = $props();

	const variantClasses = {
        primary: "bg-primary text-black",
        secondary: "bg-secondary text-black",
        tertiary: "bg-tertiary text-black",
        text: "bg-transparent text-black",
        accent: "bg-accent text-black",
        muted: "bg-neutral text-black",
        error: "bg-error text-black",
        success: "bg-success text-black",
        warning: "bg-warning text-black",
        info: "bg-info text-black",
		default: "bg-white text-black"
    };
</script>

<div class={cn('clay p-5 flex flex-col', variantClasses[variant], className)}>
	{@render children()}
</div>
