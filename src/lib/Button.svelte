<script lang="ts">
    import type { Snippet } from 'svelte';
    import { cn } from '$lib/utility.js';

    let { variant = "primary", onclick, children } : { 
        variant?: "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info",
        onclick?: (event: MouseEvent) => void,
        children?: Snippet 
    } = $props();

    // Map variants to Tailwind classes
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
        info: "bg-info text-black"
    };
</script>

<button class={cn(
    "clay flex p-3 active:clay-inset hover:shadow-none transition-shadow hover:translate-y-0.5 active:translate-x-0.5",
    variantClasses[variant]
)}
onclick={onclick}
>
    {@render children?.()}
</button>