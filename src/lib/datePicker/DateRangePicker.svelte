<script lang="ts">
    import { DateRangePicker as BitsDateRangePicker } from "bits-ui";
    import type { DateRange } from "bits-ui";
    import type { DateValue } from "@internationalized/date";
    import Icon from '@iconify/svelte';
    import { cn } from '$lib/utility.js';
    import type { Snippet } from "svelte";
    import DateRangeCalendar from "./DateRangeCalendar.svelte";

    type CalendarProps = {
        months: Array<{
            value: DateValue;
            weeks: DateValue[][];
        }>;
        weekdays: string[];
    };

    let {
        value,
        onValueChange = $bindable(),
        open: propOpen = false,
        onOpenChange = $bindable(),
        class: className = "",
        variant = "primary",
        minValue,
        maxValue,
        disabled = false,
        labelSnippet,
        ...props
    } = $props<{
        value?: DateRange;
        onValueChange?: (value: DateRange) => void;
        open?: boolean;
        onOpenChange?: (open: boolean) => void;
        class?: string;
        variant?: "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info";
        disabled?: boolean;
        minValue?: DateValue;
        maxValue?: DateValue;
        labelSnippet?: Snippet;
    }>();

    // Local state
    let localValue = $state(value);
    let isOpen = $state(propOpen);

    // Effect to sync prop changes
    $effect(() => {
        if (value !== undefined) localValue = value;
        if (propOpen !== undefined) isOpen = propOpen;
    });

    // Effect to notify parent of changes
    $effect(() => {
        onValueChange?.(localValue);
        onOpenChange?.(isOpen);
    });

    function handleOpenChange(o: boolean) {
        isOpen = o;
        if (o) {
            // Capture current scroll position
            const currentScroll = window.scrollY;
            // Wait for the calendar to render and any automatic scrolling to occur
            setTimeout(() => {
                window.scrollTo({
                    top: currentScroll,
                    behavior: 'instant' // Use instant instead of auto
                });
            }, 100); // Increased delay to 100ms
        }
        onOpenChange?.(o);
    }

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

<BitsDateRangePicker.Root
    value={localValue}
    onValueChange={(v) => localValue = v}
    open={isOpen}
    onOpenChange={handleOpenChange}
    {minValue}
    {maxValue}
    {disabled}
    {...props}
    class={cn("relative inline-block", className)}
    locale="en-GB"
    weekStartsOn={1}
>
    <div class="flex flex-col gap-2">
        <BitsDateRangePicker.Label class="text font-medium">
            {@render labelSnippet?.()}
        </BitsDateRangePicker.Label>
        
        <div class="flex items-center gap-2">
            {#each ['start', 'end'] as type, i (type)}
                <BitsDateRangePicker.Input
                    type={type as "start" | "end"}
                    class={cn(
                        "clay w-full p-3 outline-none transition-all",
                        "focus-within:clay-inset hover:not-focus-within:shadow-none",
                        variantClasses[variant as keyof typeof variantClasses]
                    )}
                >
                    {#snippet children({ segments })}
                        {#each segments as { part, value }}
                            <div class="inline-block">
                                <BitsDateRangePicker.Segment
                                    {part}
                                    class={cn(
                                        "p-1 rounded transition-all",
                                        "hover:clay-inset focus:clay-inset",
                                        "aria-[valuetext=Empty]:text-muted-foreground"
                                    )}
                                >
                                    {value}
                                </BitsDateRangePicker.Segment>
                            </div>
                        {/each}
                    {/snippet}
                </BitsDateRangePicker.Input>
                {#if i === 0}
                    <span class="text-muted-foreground">to</span>
                {/if}
            {/each}

            <BitsDateRangePicker.Trigger
                class={cn(
                    "clay p-2 transition-all",
                    "hover:clay-inset active:clay-inset",
                    disabled ? "opacity-50" : "cursor-pointer",
                    variantClasses[variant as keyof typeof variantClasses]
                )}
            >
                <Icon icon="mdi:calendar" class="size-5" />
            </BitsDateRangePicker.Trigger>
        </div>
    </div>

    <BitsDateRangePicker.Content 
        class="z-50"
        align="center"
        avoidCollisions={true}
        strategy="fixed"
        sideOffset={5}
        side="bottom"
    >
        <div class={cn(
            "clay p-4 overflow-auto",
            variantClasses[variant as keyof typeof variantClasses]
        )}>
            <DateRangeCalendar 
                value={localValue}
                onValueChange={(v) => {
                    localValue = v;
                    if (v?.end) {
                        isOpen = false;
                    }
                }}
            />
        </div>
    </BitsDateRangePicker.Content>
</BitsDateRangePicker.Root>
