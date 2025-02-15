<script lang="ts">
	import { DatePicker } from 'bits-ui';
	import Icon from '@iconify/svelte';
	import { cn } from '$lib/utility.js';

	export let months: any[];
	export let weekdays: string[];
</script>

<div class="p-2">
	<DatePicker.Header class="mb-4 flex items-center justify-between">
		<DatePicker.PrevButton class="clay hover:clay-inset active:clay-inset p-2">
			<Icon icon="mdi:chevron-left" />
		</DatePicker.PrevButton>

		<DatePicker.Heading class="min-w-32 text-center text-lg font-semibold" />

		<DatePicker.NextButton class="clay hover:clay-inset active:clay-inset p-2">
			<Icon icon="mdi:chevron-right" />
		</DatePicker.NextButton>
	</DatePicker.Header>

	<div class="relative">
		{#each months as month}
			<DatePicker.Grid class="w-full border-collapse">
				<DatePicker.GridHead>
					<DatePicker.GridRow>
						{#each weekdays as day}
							<DatePicker.HeadCell class="text p-1 text-center">
								{day}
							</DatePicker.HeadCell>
						{/each}
					</DatePicker.GridRow>
				</DatePicker.GridHead>

				<DatePicker.GridBody>
					{#each month.weeks as weekDates}
						<DatePicker.GridRow>
							{#each weekDates as date}
								<DatePicker.Cell {date} month={month.value} class="p-0 text-center">
									<DatePicker.Day
										class={cn(
											'rounded-full px-2 py-1.5 transition-all',
											'hover:bg-text/20 focus:clay-inset',
											'data-[selected]:clay-inset',
											'data-[today]:font-bold',
											'data-[outside-month]:opacity-50',
											'data-[disabled]:opacity-25'
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
