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
        primary: "bg-primary text-primary-content",
        secondary: "bg-secondary text-secondary-content",
        tertiary: "bg-tertiary text-base-content",
        text: "bg-transparent text-base-content hover:bg-base-200",
        accent: "bg-accent text-accent-content",
        muted: "bg-neutral text-neutral-content",
        error: "bg-error text-error-content",
        success: "bg-success text-success-content",
        warning: "bg-warning text-warning-content",
        info: "bg-info text-info-content"
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