<script lang="ts">
    import { Accordion } from "bits-ui";
    import { cn } from "$lib/utility.js";
    import type { WithoutChildrenOrChild } from "bits-ui";
    import type { Snippet } from "svelte";

    let { 
        type = "single",
        value = $bindable<string | string[]>(),
        class: className = "",
        triggers,
        content
    }: WithoutChildrenOrChild<Accordion.RootProps> & {
        class?: string;
        triggers?: Snippet;
        content?: Snippet;
    } = $props();
</script>

<Accordion.Root
    type={type as Accordion.RootProps['type']}
    bind:value
    class={cn("w-full clay p-3", className)}
>
    {@render triggers?.()}
    {@render content?.()}
</Accordion.Root>
