<script lang="ts">
    import { Button } from 'bits-ui';
    import type { Snippet } from 'svelte';
    import { cn } from '$lib/utility.js';

    let { variant = "primary", active = true, class: className = "", onclick, children } : { 
        variant?: "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info",
        active?: boolean,
        class?: string,
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
<Button.Root
    class={cn(
        "clay flex p-3 transition-all hover:translate-y-0.5 active:translate-y-0.5",
        "flex flex-row items-center justify-center",
        active ? "cursor-pointer" : "cursor-not-allowed",
        active ? "active:clay-inset hover:shadow-none" : "active:clay",
        variantClasses[variant],
        className
    )}
    onclick={onclick}
    disabled={!active}
>
    {@render children?.()}
</Button.Root>