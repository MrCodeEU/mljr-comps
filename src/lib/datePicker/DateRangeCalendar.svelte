<script lang="ts">
    import { RangeCalendar } from "bits-ui";
    import type { DateRange } from "bits-ui";
    import Icon from '@iconify/svelte';
    import { cn } from '$lib/utility.js';

    export let value: DateRange | undefined;
    export let onValueChange: ((value: DateRange) => void) | undefined = undefined;
</script>

<RangeCalendar.Root
    {value}
    onValueChange={onValueChange}
    weekdayFormat="short"
    weekStartsOn={1}
    fixedWeeks={true}
    numberOfMonths={2}
    class="p-2"
>
    {#snippet children({ months, weekdays })}
        <RangeCalendar.Header class="flex items-center justify-between mb-4">
            <RangeCalendar.PrevButton
                class="clay p-2 hover:clay-inset active:clay-inset"
            >
                <Icon icon="mdi:chevron-left" />
            </RangeCalendar.PrevButton>
            
            <RangeCalendar.Heading 
                class="text-lg font-semibold min-w-32 text-center"
            />
            
            <RangeCalendar.NextButton
                class="clay p-2 hover:clay-inset active:clay-inset"
            >
                <Icon icon="mdi:chevron-right" />
            </RangeCalendar.NextButton>
        </RangeCalendar.Header>

        <div class="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            {#each months as month}
                <RangeCalendar.Grid class="w-full border-collapse select-none space-y-1">
                    <RangeCalendar.GridHead>
                        <RangeCalendar.GridRow class="mb-1 flex w-full justify-between">
                            {#each weekdays as day}
                                <RangeCalendar.HeadCell class="w-10 text-center p-2 text text-muted-foreground">
                                    {day}
                                </RangeCalendar.HeadCell>
                            {/each}
                        </RangeCalendar.GridRow>
                    </RangeCalendar.GridHead>

                    <RangeCalendar.GridBody>
                        {#each month.weeks as weekDates}
                            <RangeCalendar.GridRow class="flex w-full">
                                {#each weekDates as date}
                                    <RangeCalendar.Cell 
                                        {date}
                                        month={month.value}
                                        class="relative m-0 size-10 !p-0 text-center text focus-within:z-20"
                                    >
                                        <RangeCalendar.Day
                                            class={cn(
                                                "group relative inline-flex size-10 items-center justify-center",
                                                "rounded-full transition-all",
                                                "hover:clay-inset focus:clay-inset",
                                                "data-[selected]:clay-inset data-[selection-start]:clay-inset data-[selection-end]:clay-inset",
                                                "data-[highlighted]:bg-muted/50",
                                                "data-[today]:font-bold",
                                                "data-[outside-month]:opacity-50",
                                                "data-[disabled]:opacity-25",
                                                "data-[selected]:font-medium",
                                                "data-[selection-start]:font-medium",
                                                "data-[selection-end]:font-medium"
                                            )}
                                        />
                                    </RangeCalendar.Cell>
                                {/each}
                            </RangeCalendar.GridRow>
                        {/each}
                    </RangeCalendar.GridBody>
                </RangeCalendar.Grid>
            {/each}
        </div>
    {/snippet}
</RangeCalendar.Root>
