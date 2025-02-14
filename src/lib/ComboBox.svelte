<script lang="ts">
    import { Combobox, type WithoutChild } from "bits-ui";
    import { cn } from "$lib/utility.js";
    import type { Snippet } from "svelte";
    import Icon  from "@iconify/svelte";

    type Variant = "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info";
    type Item = { value: string; label: string; icon?: string };
    
    type Props = WithoutChild<Combobox.RootProps> & {
        items: Item[];
        variant?: Variant;
        icon?: string;
        placeholder?: string;
        viewportClass?: string;
        inputClass?: string;
        contentClass?: string;
        class?: string;
    };

    let { 
        items,
        variant = "primary",
        icon,
        placeholder = "Select an item...",
        viewportClass = "",
        inputClass = "",
        contentClass = "",
        class: className = "",
        ...restProps 
    }: Props = $props();

    let searchValue = $state("");

    const filteredItems: Item[] = $derived(
        searchValue === ""
            ? items
            : items.filter((item: Item) =>
                item.label.toLowerCase().includes(searchValue.toLowerCase())
            )
    );

    const variantClasses = {
        primary: "bg-primary/40 text-primary",
        secondary: "bg-secondary/40 text-secondary",
        tertiary: "bg-tertiary/40 text-tertiary",
        accent: "bg-accent/40 text-accent",
        muted: "bg-neutral/40 text-neutral",
        error: "bg-error/40 text-error",
        success: "bg-success/40 text-success",
        warning: "bg-warning/40 text-warning",
        info: "bg-info/40 text-info"
    };

    const variantContent = {
        default: "clay bg-white",
        primary: "clay bg-primary",
        secondary: "clay bg-secondary",
        tertiary: "clay bg-tertiary",
        accent: "clay bg-accent",
        muted: "clay bg-white",
        error: "clay bg-error",
        success: "clay bg-success",
        warning: "clay bg-warning",
        info: "clay bg-info"
    };

    let open = $state(false);

</script>

<Combobox.Root
    {...restProps}
    onOpenChange={(o) => {
        if (!o) searchValue = "";
    }}
    bind:open
>
    <div class={cn("relative", className)}>
        {#if icon}
            <Icon 
                icon={icon}
                class="absolute start-3 top-1/2 size-5 -translate-y-1/2"
            />
        {/if}
        <Combobox.Input
            oninput={(e) => (searchValue = e.currentTarget.value)}
            onclick={() => open = !open}    
            class={cn(
                "inline-flex h-10 w-full truncate rounded-xl transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-offset-2",
                icon ? "pl-10 pr-10" : "px-4",
                variantClasses[variant],
                "clay-inset",
                inputClass
            )}
            {placeholder}
        />
        <Combobox.Trigger 
            class="absolute end-3 top-1/2 size-5 -translate-y-1/2"
        >
            <Icon icon="mdi:chevron-down" class="size-5" />
        </Combobox.Trigger>
    </div>

    <Combobox.Portal>
        <Combobox.Content
            class={cn(
                "z-50 min-w-[var(--bits-combobox-anchor-width)] overflow-hidden p-1 rounded-t-none",
                variantContent[variant],
                contentClass
            )}
        >
            <Combobox.Viewport class={cn("p-1", viewportClass)}>
                {#each filteredItems as item (item.value)}
                    <Combobox.Item
                        value={item.value}
                        label={item.label}
                        class={cn(
                            "flex items-center gap-2 rounded-lg px-3 py-2",
                            "data-[highlighted]:bg-neutral/10",
                            "hover:bg-gray/50 hover:clay-inset",
                        )}
                    >
                        {#snippet children({ selected })}
                            {#if item.icon}
                                <Icon icon={item.icon} class="size-5" />
                            {/if}
                            <span>{item.label}</span>
                            {#if selected}
                                <Icon icon="mdi:check" class="ml-auto size-5" />
                            {/if}
                        {/snippet}
                    </Combobox.Item>
                {:else}
                    <span class="block p-2 text-sm text-neutral">
                        No results found
                    </span>
                {/each}
            </Combobox.Viewport>
        </Combobox.Content>
    </Combobox.Portal>
</Combobox.Root>
