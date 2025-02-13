<script lang="ts">
    import { AlertDialog } from "bits-ui";
    import { cn } from "$lib/utility.js";
    import { fade, scale } from "svelte/transition";
    import type { Snippet } from "svelte";

    let { class: className = "", children } : {
        class?: string;
        children?: Snippet;
    } = $props();
</script>

<AlertDialog.Portal>
    <AlertDialog.Overlay 
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" 
    />
    <AlertDialog.Content
        class={cn(
            "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
            "clay p-6",
            "focus:outline-none",
            className
        )}
        interactOutsideBehavior="close"
    >
        {@render children?.()}
    </AlertDialog.Content>
</AlertDialog.Portal>
