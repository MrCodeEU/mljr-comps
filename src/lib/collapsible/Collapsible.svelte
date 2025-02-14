<script lang="ts">
    import { Collapsible } from "bits-ui";
    import { cn } from "$lib/utility.js";
    import type { WithoutChildrenOrChild } from "bits-ui";
    import type { Snippet } from "svelte";

    let { 
        open = $bindable(false),
        variant = "primary",
        class: className = "",
        trigger,
        content
    }: WithoutChildrenOrChild<Collapsible.RootProps> & {
        variant?: "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info";
        class?: string;
        trigger?: Snippet;
        content?: Snippet;
    } = $props();
</script>

<Collapsible.Root
    bind:open
    class={cn("w-full clay p-3", className)}
    data-variant={variant}
>
    {@render trigger?.()}
    {@render content?.()}
</Collapsible.Root>
