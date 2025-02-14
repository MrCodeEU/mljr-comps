<script lang="ts">
    import { ContextMenu } from "bits-ui";
    import type { WithoutChild } from "bits-ui";
    import { fly } from "svelte/transition";
    import type { Snippet } from "svelte";
    import { cn } from '$lib/utility.js';

    let { 
        class: className = "",
        variant = "default",
        children,
        ...props
    }: WithoutChild<ContextMenu.ContentProps> & {
        class?: string;
        variant?: "default" | "accent" | "muted" | "error" | "success" | "warning" | "info";
        children?: Snippet;
    } = $props();

    const variantClasses = {
        default: "bg-primary text-primary-foreground",
        accent: "bg-accent text-accent-foreground",
        muted: "bg-muted text-muted-foreground",
        error: "bg-error text-error-foreground",
        success: "bg-success text-success-foreground",
        warning: "bg-warning text-warning-foreground",
        info: "bg-info text-info-foreground"
    };
</script>

<ContextMenu.Content
    {...props}
    class={cn(
        "z-50 min-w-[8rem] overflow-hidden p-4",
        "clay transition-all",
        variantClasses[variant],
        className
    )}
    forceMount
>
    {#snippet child({ wrapperProps, props: contentProps, open })}
        {#if open}
            <div {...wrapperProps}>
                <div {...contentProps} transition:fly={{ duration: 150, y: 5 }}>
                    {@render children?.()}
                </div>
            </div>
        {/if}
    {/snippet}
</ContextMenu.Content>
