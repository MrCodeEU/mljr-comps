<script lang="ts">
    import { cn } from '$lib/utility.js';
    import Icon from '@iconify/svelte';
    import { format } from 'date-fns';
    import { Input } from '$lib/input/index.js';
    import { TimePicker } from '../timePicker/index.js';
    import type { DateTimePickerMode } from './types';

    let {
        value = $bindable(new Date()),
        mode = $bindable<DateTimePickerMode>('date'),
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
        onDateSelect = (date: Date) => {},
        onTimeSelect = (timeStr: string) => {},
        class: className = ''
    } = $props();

    // State tracking
    let isOpen = $state(false);
    let dateSelected = $state(false);
    let timeSelected = $state(false);
    let selectedDate = $state(new Date());
    let selectedTime = $state(format(value, 'HH:mm:ss'));
    let calendar = $state<HTMLElement | null>(null);

    // Calendar state
    let currentMonth = $state(new Date().getMonth());
    let currentYear = $state(new Date().getFullYear());

    // Arrays for rendering
    const weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Determine what components should be visible
    let showDatePicker = $derived(isOpen && mode !== 'time');
    let showTimePicker = $derived(isOpen && (mode === 'time' || mode === 'datetime-side'));

    // Calendar functions
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

    // Reset state when opening the picker
    function openPicker() {
        if (disabled) return;
        
        dateSelected = false;
        timeSelected = false;
        
        // Initialize the date/time from the current value
        selectedDate = new Date(value);
        selectedTime = format(value, 'HH:mm:ss');
        
        // Update calendar view to show the month of the selected date
        currentMonth = selectedDate.getMonth();
        currentYear = selectedDate.getFullYear();
        
        isOpen = true;
        
        // Add click outside listener with delay
        setTimeout(() => {
            document.addEventListener('click', handleClickOutside);
        }, 0);
    }

    function closePicker() {
        isOpen = false;
        document.removeEventListener('click', handleClickOutside);
    }

    function handleDateSelect(date: Date) {
        selectedDate = date;
        dateSelected = true;
        
        if (mode === 'date') {
            applyChanges();
            closePicker();
        } else if (mode === 'datetime-side' && timeSelected) {
            applyChanges();
            closePicker();
        }
    }

    function handleTimeSelect(timeStr: string) {
        selectedTime = timeStr;
        timeSelected = true;
        
        if (mode === 'time') {
            applyChanges();
            closePicker();
        } else if (mode === 'datetime-side' && dateSelected) {
            applyChanges();
            closePicker();
        }
    }

    function applyChanges() {
        // Create a new date with the selected components
        const newDate = new Date(selectedDate);
        
        if (mode !== 'date') {
            const [hours, minutes, seconds] = selectedTime.split(':').map(Number);
            newDate.setHours(hours, minutes, seconds);
        }
        
        value = newDate;
        
        // Trigger callbacks
        if (mode === 'time') {
            onTimeSelect(selectedTime);
        } else {
            onDateSelect(newDate);
        }
    }

    function handleClickOutside(event: MouseEvent) {
        // Don't close if clicking on the trigger elements
        if ((event.target as HTMLElement)?.closest('.datepicker-trigger')) {
            return;
        }
        
        // Close if clicking outside the calendar
        if (calendar && !calendar.contains(event.target as Node)) {
            closePicker();
        }
    }

    function formatDisplayDate(date: Date | null): string {
        if (!date) return '';
        
        if (mode === 'time') {
            // For time-only mode, just show the time portion
            const timeStr = format(date, showSeconds ? 'HH:mm:ss' : 'HH:mm');
            return timeStr;
        } else if (mode === 'date') {
            // For date-only mode, just show the date portion
            return format(date, dateFormat);
        } else {
            // For datetime modes, show both
            const dateStr = format(date, dateFormat);
            const timeStr = format(date, showSeconds ? 'HH:mm:ss' : 'HH:mm');
            return `${dateStr} ${timeStr}`;
        }
    }

    // Clean up event listeners when component is destroyed
    $effect(() => {
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    });

    // State for year/month selector
    let showYearSelector = $state(false);
    let showMonthSelector = $state(false);
    
    // Generate last 100 years for year selector
    let years = $derived(() => {
        const currentYearNum = new Date().getFullYear();
        return Array.from({length: 100}, (_, i) => currentYearNum - i);
    });
    
    function clearSelection() {
        // Reset the value
        if (mode === 'time') {
            const now = new Date();
            now.setHours(0, 0, 0);
            value = now;
            selectedTime = '00:00:00';
        } else {
            value = new Date(0); // Use epoch date as "empty"
            selectedDate = new Date(0);
        }
        
        onDateSelect(value);
        closePicker();
    }
    
    function setToday() {
        const now = new Date();
        value = now;
        selectedDate = now;
        selectedTime = format(now, 'HH:mm:ss');
        
        // Update calendar view
        currentMonth = now.getMonth();
        currentYear = now.getFullYear();
        
        onDateSelect(now);
        
        if (mode === 'date') {
            closePicker();
        }
    }
    
    function setYear(year: number) {
        currentYear = year;
        showYearSelector = false;
    }
    
    function setMonth(month: number) {
        currentMonth = month;
        showMonthSelector = false;
    }
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
        onIconClick={() => openPicker()}
        class={cn('datepicker-trigger', className)}
    />

    {#if isOpen}
        <div
            bind:this={calendar}
            class={cn(
                'clay absolute left-0 top-full z-50 mt-2 overflow-hidden rounded-[var(--clay-border-radius)] bg-white',
                mode === 'datetime-side' && 'flex items-start'
            )}
        >
            {#if showDatePicker}
                <div class="calendar-container w-[320px] p-4">
                    <!-- Calendar header with improved year/month selector -->
                    <div class="mb-4 flex items-center justify-between">
                        <button
                            class="clay flex h-8 w-8 items-center justify-center hover:bg-primary/20 duration-200 transition-all"
                            onclick={() => navigateMonth('prev')}
                        >
                            <Icon icon="mdi:chevron-left" />
                        </button>
                        
                        <div class="flex gap-1">
                            <button 
                                class="text-lg font-medium text-foreground hover:bg-primary/10 py-1 px-2 rounded"
                                onclick={() => showMonthSelector = !showMonthSelector}
                            >
                                {months[currentMonth]}
                            </button>
                            <button 
                                class="text-lg font-medium text-foreground hover:bg-primary/10 py-1 px-2 rounded"
                                onclick={() => showYearSelector = !showYearSelector}
                            >
                                {currentYear}
                            </button>
                        </div>
                        
                        <button
                            class="clay flex h-8 w-8 items-center justify-center hover:bg-primary/20 duration-200 transition-all"
                            onclick={() => navigateMonth('next')}
                        >
                            <Icon icon="mdi:chevron-right" />
                        </button>
                    </div>
                    
                    <!-- Year selector (shown when showYearSelector is true) -->
                    {#if showYearSelector}
                        <div class="max-h-[180px] overflow-y-auto mb-4 grid grid-cols-4 gap-1">
                            {#each years as year}
                                <button
                                    class={cn(
                                        'clay text-sm p-1 hover:bg-primary/20',
                                        year === currentYear && 'bg-primary text-white'
                                    )}
                                    onclick={() => setYear(year)}
                                >
                                    {year}
                                </button>
                            {/each}
                        </div>
                    {/if}
                    
                    <!-- Month selector (shown when showMonthSelector is true) -->
                    {#if showMonthSelector}
                        <div class="mb-4 grid grid-cols-3 gap-1">
                            {#each months as month, i}
                                <button
                                    class={cn(
                                        'clay text-sm p-2 hover:bg-primary/20',
                                        i === currentMonth && 'bg-primary text-white'
                                    )}
                                    onclick={() => setMonth(i)}
                                >
                                    {month.substring(0, 3)}
                                </button>
                            {/each}
                        </div>
                    {/if}

                    <!-- Weekday Headers (only show when not in year/month selector) -->
                    {#if !showYearSelector && !showMonthSelector}
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
                                        'clay flex h-8 w-full items-center justify-center text-sm transition-all hover:bg-primary/20',
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
                        
                        <!-- Action buttons -->
                        <div class="mt-4 flex justify-between">
                            <button
                                class="clay-button px-3 py-1 text-sm hover:bg-primary/10 transition-all"
                                onclick={clearSelection}
                            >
                                Clear
                            </button>
                            
                            <button
                                class="clay-button px-3 py-1 text-sm hover:bg-primary/10 transition-all"
                                onclick={setToday}
                            >
                                Today
                            </button>
                        </div>
                    {/if}
                </div>
            {/if}

            {#if showTimePicker}
                <div class="time-picker-container">
                    <TimePicker
                        bind:value
                        {variant}
                        format={hourFormat}
                        {showSeconds}
                        {disabled}
                        onTimeSelect={handleTimeSelect}
                    />
                </div>
            {/if}
        </div>
    {/if}
</div>

<style>
    /* Add any additional component-specific styles here */
    .e-slide-down {
        animation: slideDown 0.2s ease-out forwards;
    }

    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    :global(.datepicker-calendar button) {
        border-radius: var(--clay-border-radius);
    }
    
    :global(.datepicker-calendar button:hover) {
        background-color: var(--color-primary);
        color: white;
    }

    .clay {
        box-shadow: var(--clay-shadow-outset),
                    inset var(--clay-shadow-inset-primary),
                    inset var(--clay-shadow-inset-secondary);
    }

    .time-picker-container {
        /* Add any specific styles for the time picker container */
    }

    .time-picker-only .time-picker-container {
        /* Ensure time picker is properly positioned when it's the only visible component */
        display: block;
        width: 100%;
    }
    
    .calendar-container, .time-picker-container {
        /* Add transitions for smoother switching */
        transition: all 0.2s ease-in-out;
    }

    .clay-button {
        border-radius: var(--clay-border-radius);
        box-shadow: 2px 2px 4px rgba(0,0,0,0.1),
                   -2px -2px 4px rgba(255,255,255,0.7);
        background: rgba(255,255,255,0.4);
    }
    
    .clay-button:hover {
        box-shadow: 1px 1px 2px rgba(0,0,0,0.1),
                   -1px -1px 2px rgba(255,255,255,0.7);
    }
</style>