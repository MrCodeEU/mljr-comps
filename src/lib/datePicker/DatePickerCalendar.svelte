<script lang="ts">
    import { DatePicker } from "bits-ui";
    import Icon from '@iconify/svelte';
    import { cn } from '$lib/utility.js';

    export let months: any[];
    export let weekdays: string[];
</script>

<div class="p-2">
    <DatePicker.Header class="flex items-center justify-between mb-4">
        <DatePicker.PrevButton
            class="clay p-2 hover:clay-inset active:clay-inset"
        >
            <Icon icon="mdi:chevron-left" />
        </DatePicker.PrevButton>
        
        <DatePicker.Heading 
            class="text-lg font-semibold min-w-32 text-center"
        />
        
        <DatePicker.NextButton
            class="clay p-2 hover:clay-inset active:clay-inset"
        >
            <Icon icon="mdi:chevron-right" />
        </DatePicker.NextButton>
    </DatePicker.Header>

    <div class="relative">
        {#each months as month}
            <DatePicker.Grid class="w-full border-collapse">
                <DatePicker.GridHead>
                    <DatePicker.GridRow>
                        {#each weekdays as day}
                            <DatePicker.HeadCell class="text-center p-1 text">
                                {day}
                            </DatePicker.HeadCell>
                        {/each}
                    </DatePicker.GridRow>
                </DatePicker.GridHead>

                <DatePicker.GridBody>
                    {#each month.weeks as weekDates}
                        <DatePicker.GridRow>
                            {#each weekDates as date}
                                <DatePicker.Cell 
                                    {date}
                                    month={month.value}
                                    class="text-center p-0"
                                >
                                    <DatePicker.Day
                                        class={cn(
                                            "py-1.5 px-2 rounded-full transition-all",
                                            "hover:bg-text/20 focus:clay-inset",
                                            "data-[selected]:clay-inset",
                                            "data-[today]:font-bold",
                                            "data-[outside-month]:opacity-50",
                                            "data-[disabled]:opacity-25"
                                        )}
                                    />
                                </DatePicker.Cell>
                            {/each}
                        </DatePicker.GridRow>
                    {/each}
                </DatePicker.GridBody>
            </DatePicker.Grid>
        {/each}
    </div>
</div>
