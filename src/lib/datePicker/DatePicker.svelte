<script lang="ts">
	import { cn } from '$lib/utility.js';
	import Icon from '@iconify/svelte';
	import { format } from 'date-fns';
	import { Input } from '$lib/input/index.js';
	import TimePicker from '../timePicker/TimePicker.svelte';

	let {
		value = $bindable(new Date()),
		mode = 'date', // 'date' | 'time' | 'datetime'
		variant = 'primary',
		label = '',
		error = false,
		required = false,
		disabled = false,
		format: dateFormat = 'yyyy-MM-dd',
		hourFormat = '24', // '12' | '24'
		showSeconds = false,
		minDate = null,
		maxDate = null,
		placeholder = 'Select date',
		validateOn = 'input',
		onDateSelect = () => {},
		class: className = ''
	} = $props();

	const variantClasses = {
		primary: 'bg-primary/10 focus:bg-primary/20',
		secondary: 'bg-secondary/10 focus:bg-secondary/20',
		tertiary: 'bg-tertiary/10 focus:bg-tertiary/20',
		accent: 'bg-accent/10 focus:bg-accent/20',
		muted: 'bg-neutral/10 focus:bg-neutral/20',
		error: 'bg-error/10 focus:bg-error/20',
		success: 'bg-success/10 focus:bg-success/20',
		warning: 'bg-warning/10 focus:bg-warning/20',
		info: 'bg-info/10 focus:bg-info/20'
	};

	let isOpen = $state(false);
	let validationError = $state<string | false>(false);
	let calendar = $state<HTMLElement | null>(null);

	// Calendar state
	let currentMonth = $state(new Date().getMonth());
	let currentYear = $state(new Date().getFullYear());
	let selectedDate = $state(value || new Date());
	let selectedTime = $state(format(value || new Date(), 'HH:mm:ss'));

	// Arrays for rendering
	const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December'
	];

	function toggleCalendar() {
		if (!disabled) {
			isOpen = !isOpen;
		}
	}

	function generateCalendarDays() {
		const days = [];
		const firstDay = new Date(currentYear, currentMonth, 1);
		const lastDay = new Date(currentYear, currentMonth + 1, 0);
		const startOffset = firstDay.getDay();
		const daysInMonth = lastDay.getDate();

		// Previous month days
		for (let i = 0; i < startOffset; i++) {
			const prevDate = new Date(currentYear, currentMonth, -startOffset + i + 1);
			days.push({ date: prevDate, isCurrentMonth: false });
		}

		// Current month days
		for (let i = 1; i <= daysInMonth; i++) {
			const date = new Date(currentYear, currentMonth, i);
			days.push({ date, isCurrentMonth: true });
		}

		// Next month days
		const remainingDays = 42 - days.length; // 6 rows * 7 days = 42
		for (let i = 1; i <= remainingDays; i++) {
			const nextDate = new Date(currentYear, currentMonth + 1, i);
			days.push({ date: nextDate, isCurrentMonth: false });
		}

		return days;
	}

	function handleDateSelect(date: Date) {
		selectedDate = date;
		if (mode === 'date') {
			handleDateChange();
		}
	}

	function handleTimeChange(timeStr: string) {
		selectedTime = timeStr;
		if (mode === 'time') {
			handleDateChange();
		}
	}

	function handleDateChange() {
		const newDate = new Date(selectedDate);
		if (mode !== 'date') {
			const [hours, minutes, seconds] = selectedTime.split(':').map(Number);
			newDate.setHours(hours, minutes, seconds);
		}
		value = newDate;
		onDateSelect(newDate);
		isOpen = false;
	}

	function navigateMonth(direction: 'prev' | 'next') {
		if (direction === 'prev') {
			if (currentMonth === 0) {
				currentMonth = 11;
				currentYear--;
			} else {
				currentMonth--;
			}
		} else {
			if (currentMonth === 11) {
				currentMonth = 0;
				currentYear++;
			} else {
				currentMonth++;
			}
		}
	}

	function isDateDisabled(date: Date) {
		if (minDate && date < minDate) return true;
		if (maxDate && date > maxDate) return true;
		return false;
	}

	function formatDisplayDate(date: Date | null): string {
		if (!date) return '';
		let displayStr = format(date, dateFormat);
		if (mode !== 'date') {
			displayStr += ' ' + selectedTime;
		}
		return displayStr;
	}

	// Click outside handler
	function handleClickOutside(event: MouseEvent) {
		// Stop if clicking the icon or input
		if (event.target?.closest('.datepicker-trigger')) {
			return;
		}
		
		if (calendar && !calendar.contains(event.target as Node)) {
			isOpen = false;
		}
	}

	function handleIconClick(event: MouseEvent) {
		// Prevent event from bubbling up
		event.stopPropagation();
		
		if (!disabled) {
			toggleCalendar();
		}
	}

	$effect(() => {
		if (isOpen) {
			// Wait for next tick to add listener
			setTimeout(() => {
				document.addEventListener('click', handleClickOutside);
			}, 0);
		} else {
			document.removeEventListener('click', handleClickOutside);
		}

		// Cleanup on component destroy
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="relative w-full">
	<Input
		type="text"
		{placeholder}
		{label}
		{required}
		{error}
		{disabled}
		variant={variant as Variant}
		readonly
		value={formatDisplayDate(value)}
		icon={mode === 'time' ? 'mdi:clock' : 'mdi:calendar'}
		iconPosition="right"
		onIconClick={handleIconClick}
		class={cn('datepicker-trigger', className)}
	/>

	{#if isOpen}
		<div
			bind:this={calendar}
			class="clay absolute left-0 top-full z-50 mt-2 bg-background"
		>
			{#if mode === 'time'}
				<!-- Time Only Mode -->
				<TimePicker
					bind:value
					{variant}
					format={hourFormat}
					{showSeconds}
					{disabled}
				/>
			{:else if mode === 'datetime'}
				<!-- Date and Time Mode -->
				<div class="flex flex-col md:flex-row">
					<div class="w-[320px] p-4">
						<!-- Calendar Content -->
						<!-- Calendar Header -->
						<div class="mb-4 flex items-center justify-between">
							<button
								class="clay flex h-8 w-8 items-center justify-center"
								onclick={() => navigateMonth('prev')}
							>
								<Icon icon="mdi:chevron-left" />
							</button>
							<span class="text-lg font-medium">
								{months[currentMonth]} {currentYear}
							</span>
							<button
								class="clay flex h-8 w-8 items-center justify-center"
								onclick={() => navigateMonth('next')}
							>
								<Icon icon="mdi:chevron-right" />
							</button>
						</div>

						<!-- Weekday Headers -->
						<div class="mb-2 grid grid-cols-7 gap-1">
							{#each weekDays as day}
								<div class="text-center text-sm font-medium text-foreground/70">
									{day}
								</div>
							{/each}
						</div>

						<!-- Calendar Days -->
						<div class="grid grid-cols-7 gap-1">
							{#each generateCalendarDays() as { date, isCurrentMonth }}
								<button
									class={cn(
										'clay flex h-8 w-full items-center justify-center text-sm transition-all',
										!isCurrentMonth && 'opacity-30',
										date.toDateString() === selectedDate?.toDateString() && 'bg-primary text-black',
										isDateDisabled(date) && 'cursor-not-allowed opacity-30'
									)}
									disabled={isDateDisabled(date)}
									onclick={() => handleDateSelect(date)}
								>
									{date.getDate()}
								</button>
							{/each}
						</div>
					</div>
					<div class="border-t border-muted p-4 md:border-l md:border-t-0">
						<TimePicker
							bind:value
							{variant}
							format={hourFormat}
							{showSeconds}
							{disabled}
						/>
					</div>
				</div>
			{:else}
				<!-- Date Only Mode -->
				<div class="w-[320px] p-4">
					<!-- Calendar Header -->
					<div class="mb-4 flex items-center justify-between">
						<button
							class="clay flex h-8 w-8 items-center justify-center"
							onclick={() => navigateMonth('prev')}
						>
							<Icon icon="mdi:chevron-left" />
						</button>
						<span class="text-lg font-medium">
							{months[currentMonth]} {currentYear}
						</span>
						<button
							class="clay flex h-8 w-8 items-center justify-center"
							onclick={() => navigateMonth('next')}
						>
							<Icon icon="mdi:chevron-right" />
						</button>
					</div>

					<!-- Weekday Headers -->
					<div class="mb-2 grid grid-cols-7 gap-1">
						{#each weekDays as day}
							<div class="text-center text-sm font-medium text-foreground/70">
								{day}
							</div>
						{/each}
					</div>

					<!-- Calendar Days -->
					<div class="grid grid-cols-7 gap-1">
						{#each generateCalendarDays() as { date, isCurrentMonth }}
							<button
								class={cn(
									'clay flex h-8 w-full items-center justify-center text-sm transition-all',
									!isCurrentMonth && 'opacity-30',
									date.toDateString() === selectedDate?.toDateString() && 'bg-primary text-black',
									isDateDisabled(date) && 'cursor-not-allowed opacity-30'
								)}
								disabled={isDateDisabled(date)}
								onclick={() => handleDateSelect(date)}
							>
								{date.getDate()}
							</button>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	{/if}
</div>

<style>
	/* Add any additional component-specific styles here */
</style>
