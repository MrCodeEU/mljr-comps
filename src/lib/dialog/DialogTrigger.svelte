<script lang="ts">
    import { Dialog } from "bits-ui";
    import { cn } from "$lib/utility.js";
    import type { Snippet } from "svelte";

    let { variant = "primary", class: className = "", children } : {
        variant?: "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info";
        class?: string;
        children?: Snippet;
    } = $props();

    const variantClasses = {
        primary: "bg-primary text-black",
        secondary: "bg-secondary text-black",
        tertiary: "bg-tertiary text-black",
        accent: "bg-accent text-black",
        muted: "bg-neutral text-black",
        error: "bg-error text-black",
        success: "bg-success text-black",
        warning: "bg-warning text-black",
        info: "bg-info text-black"
    };
</script>

<Dialog.Trigger
    class={cn(
        "clay hover:shadow-none transition-all active:clay-inset",
        "px-4 py-2",
        variantClasses[variant],
        className
    )}
>
    {@render children?.()}
</Dialog.Trigger>
