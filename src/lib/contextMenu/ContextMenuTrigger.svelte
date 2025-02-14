<script lang="ts">
    import { ContextMenu } from "bits-ui";
    import type { WithoutChildrenOrChild } from "bits-ui";
    import type { Snippet } from "svelte";

    let { 
        class: className = "",
        children,
        ...props
    }: WithoutChildrenOrChild<ContextMenu.TriggerProps> & {
        class?: string;
        children?: Snippet;
    } = $props();
</script>

<ContextMenu.Trigger {...props} class={className}>
    {@render children?.()}
</ContextMenu.Trigger>
