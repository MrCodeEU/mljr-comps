<script lang="ts">
    import { DatePicker as BitsDatePicker } from "bits-ui";
    import type { DateValue } from "@internationalized/date";
    import Icon from '@iconify/svelte';
    import { cn } from '$lib/utility.js';
    import type { Snippet } from "svelte";

    type CalendarProps = {
        months: Array<{
            value: DateValue;
            weeks: DateValue[][];
        }>;
        weekdays: string[];
    };

    let {
        value = $bindable(),
        open = $bindable(false),
        class: className = "",
        variant = "primary",
        disabled = false,
        minValue,
        maxValue,
        labelSnippet,
        calendarSnippet,
        ...props
    } = $props<{
        value?: DateValue;
        open?: boolean;
        minValue?: DateValue;
        maxValue?: DateValue;
        class?: string;
        variant?: "primary" | "secondary" | "tertiary" | "accent" | "muted" | "error" | "success" | "warning" | "info";
        disabled?: boolean;
        labelSnippet?: Snippet;
        calendarSnippet?: Snippet<[CalendarProps]>;
    }>();

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

<BitsDatePicker.Root
    bind:value
    bind:open
    {...props}
    class={cn("relative inline-block", className)}
    locale="en-GB"
    weekStartsOn={0}
    weekdayFormat="short"
>
    <div class="flex flex-col gap-2">
        <BitsDatePicker.Label class="text font-medium">
            {@render labelSnippet?.()}
        </BitsDatePicker.Label>
        
        <div class="flex items-center">
            <BitsDatePicker.Input
                class={cn(
                    "clay p-2 transition-all",
                    "focus-within:clay-inset hover:not-focus-within:shadow-none",
                    variantClasses[variant as keyof typeof variantClasses]
                )}
            >
                {#snippet children({ segments })}
                    {#each segments as { part, value }}
                        <div class="inline-block">
                            <BitsDatePicker.Segment
                                {part}
                                class={cn(
                                    "p-1 rounded transition-all",
                                    "hover:clay-inset focus:clay-inset",
                                    "aria-[valuetext=Empty]:text-muted-foreground"
                                )}
                            >
                                {value}
                            </BitsDatePicker.Segment>
                        </div>
                    {/each}
                {/snippet}
            </BitsDatePicker.Input>

            <BitsDatePicker.Trigger
                class={cn(
                    "clay ml-2 p-2 transition-all",
                    "hover:clay-inset active:clay-inset",
                    disabled ? "opacity-50" : "cursor-pointer",
                    variantClasses[variant as keyof typeof variantClasses]
                )}
            >
                <Icon icon="mdi:calendar" class="size-5" />
            </BitsDatePicker.Trigger>
        </div>
    </div>

    <BitsDatePicker.Content 
        class="z-50"
        align="center"
        strategy="fixed"
        avoidCollisions={true}
    >
        <BitsDatePicker.Calendar
            class={cn(
                "clay p-4 overflow-auto", 
                variantClasses[variant as keyof typeof variantClasses]
            )}
        >
            {#snippet children({ months, weekdays })}
                {@render calendarSnippet?.({ months, weekdays })}
            {/snippet}
        </BitsDatePicker.Calendar>
    </BitsDatePicker.Content>
</BitsDatePicker.Root>
