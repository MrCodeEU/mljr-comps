<script lang="ts">
    import { Dialog } from "bits-ui";
    import { cn } from "$lib/utility.js";
    import type { Snippet } from "svelte";
    import Button from "$lib/Button.svelte";

    let {
        open = $bindable(false),
        title,
        description,
        triggerText = "Open",
        variant = "primary",
        cardVariant = "default",
        showClose = true,
        closeText = "Close",
        closeVariant = "muted",
        onAction,
        closeOnOutsideClick = false,
        class: className = ""
    }: {
        open?: boolean;
        title: Snippet;
        description: Snippet;
        triggerText?: string;
        variant?: "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info";
        cardVariant?: "default" | "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info";
        showClose?: boolean;
        closeText?: string;
        closeVariant?: "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info";
        onAction?: () => void | Promise<void>;
        closeOnOutsideClick?: boolean;
        class?: string;
    } = $props();

    const cardVariantStyles = {
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

    const triggerVariantStyles = {
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

<Dialog.Root bind:open>
    <Dialog.Trigger 
        class={cn(
            "clay hover:shadow-none transition-all active:clay-inset",
            "px-4 py-2",
            triggerVariantStyles[variant]
        )}
    >
        {triggerText}
    </Dialog.Trigger>

    <Dialog.Portal>
        <Dialog.Overlay 
            class="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" 
        />
        <Dialog.Content
            class={cn(
                "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%]",
                "clay p-6",
                "focus:outline-none",
                cardVariantStyles[cardVariant],
                className
            )}
        >
            <div class="grid gap-4">
                <Dialog.Title class="text-lg font-bold">
                    {@render title()}
                </Dialog.Title>
                <Dialog.Description class="text-inherit opacity-80">
                    {@render description()}
                </Dialog.Description>
            </div>
            {#if showClose}
                <div class="mt-4 flex justify-end gap-2">
                    <Dialog.Close>
                        <Button variant={closeVariant}>
                            {closeText}
                        </Button>
                    </Dialog.Close>
                </div>
            {/if}
        </Dialog.Content>
    </Dialog.Portal>
</Dialog.Root>
