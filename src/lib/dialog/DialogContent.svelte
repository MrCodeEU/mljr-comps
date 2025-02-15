<script lang="ts">
    import { Dialog } from "bits-ui";
    import { cn } from "$lib/utility.js";
    import { fly, fade } from "svelte/transition";
    import type { Snippet } from "svelte";
    import Button from "$lib/Button.svelte";
    import Icon from "@iconify/svelte";

    let { 
        class: className = "", 
        showClose = true,
        closeIcon = "mdi:close",
        variant = "default",
        children 
    } : {
        class?: string;
        showClose?: boolean;
        closeIcon?: string;
        variant?: "default" | "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info";
        children?: Snippet;
    } = $props();

    const variantClasses = {
        default: "bg-background text-black dark:text-white",
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

<Dialog.Portal>
    <Dialog.Overlay 
        class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
    />
    <Dialog.Content
        class={cn(
            "fixed left-[50%] top-[50%] z-50 w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
            "clay p-6",
            "focus:outline-none",
            variantClasses[variant],
            className
        )}
    >
        {@render children?.()}

        {#if showClose}
            <Dialog.Close class="absolute right-4 top-4">
                <Button variant="error" class="h-8 w-8 p-0">
                    <Icon icon={closeIcon} class="h-4 w-4" />
                    <span class="sr-only">Close</span>
                </Button>
            </Dialog.Close>
        {/if}
    </Dialog.Content>
</Dialog.Portal>
