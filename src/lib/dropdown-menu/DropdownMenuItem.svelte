<script lang="ts">
    import { DropdownMenu } from "bits-ui";
    import { cn } from "$lib/utility.js";
    import Icon from "@iconify/svelte";
    import type { Snippet } from "svelte";

    let {
        label,
        icon,
        shortcut,
        disabled = false,
        variant = "primary",
        class: className = "",
        children
    } = $props<{
        label: string;
        icon?: string;
        shortcut?: string;
        disabled?: boolean;
        variant?: "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info";
        class?: string;
        children?: Snippet;
    }>();

    const variantClasses = {
        primary: "hover:bg-primary/20",
        secondary: "hover:bg-secondary/20",
        tertiary: "hover:bg-tertiary/20",
        accent: "hover:bg-accent/20",
        muted: "hover:bg-neutral/20",
        error: "hover:bg-error/20",
        success: "hover:bg-success/20",
        warning: "hover:bg-warning/20",
        info: "hover:bg-info/20"
    };
</script>

<DropdownMenu.Item
    {disabled}
    class={cn(
        "flex cursor-pointer select-none items-center rounded-lg px-3 py-2 text-sm outline-none transition-colors",
        variantClasses[variant as keyof typeof variantClasses],
        disabled && "opacity-50 pointer-events-none",
        className
    )}
>
    <div class="flex flex-1 items-center gap-2">
        {#if icon}
            <Icon {icon} class="size-5" />
        {/if}
        {label}
    </div>
    {#if shortcut}
        <span class="ml-4 text-xs tracking-widest opacity-60">{shortcut}</span>
    {/if}
    {@render children?.()}
</DropdownMenu.Item>
