<script lang="ts">
    import { Checkbox } from "bits-ui";
    import { cn } from "$lib/utility.js";
    import type { Snippet } from "svelte";
    import Icon from '@iconify/svelte';

    let { 
        checked = $bindable(false),
        indeterminate = false,
        disabled = false,
        required = false,
        name,
        value,
        variant = "primary",
        class: className = "",
        children
    } : {
        checked?: boolean;
        indeterminate?: boolean;
        disabled?: boolean;
        required?: boolean;
        name?: string;
        value?: string;
        variant?: "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info";
        class?: string;
        children?: Snippet;
    } = $props();

    const variantClasses = {
        primary: "bg-primary text-black",
        secondary: "bg-secondary text-black",
        tertiary: "bg-tertiary text-black",
        accent: "bg-accent text-black",
        muted: "bg-neutral text-black dark:text-white",
        error: "bg-error text-black",
        success: "bg-success text-black",
        warning: "bg-warning text-black",
        info: "bg-info text-black"
    };
</script>

<Checkbox.Root
    {checked}
    {indeterminate}
    {disabled}
    {required}
    {name}
    {value}
    class={cn(
        "clay rounded-xl inline-flex h-8 w-8 items-center justify-center",
        "transition-all duration-200 data-[state=checked]:clay-inset data-[state=checked]:translate-y-0.5 data-[state=checked]:rounded-xl",
        "hover:translate-y-0.5",
        disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer",
        !disabled && "active:clay-inset hover:shadow-none",
        variantClasses[variant],
        className
    )}
>
    {#snippet children({ checked, indeterminate })}
        <div class="text-current">
            {#if indeterminate}
                <Icon icon="ic:baseline-minus" class="h-5 w-5" />
            {:else if checked}
                <Icon icon="material-symbols:check" class="h-5 w-5" />
            {/if}
        </div>
    {/snippet}
</Checkbox.Root>
