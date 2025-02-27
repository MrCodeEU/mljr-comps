<script lang="ts">
    import { cn } from '$lib/utility.js';
    import TimePickerFace from './TimePickerFace.svelte';
    import TimePickerHand from './TimePickerHand.svelte';
    
    let {
        value = $bindable(new Date()),
        variant = 'primary',
        format = '24',
        showSeconds = false,
        disabled = false,
        class: className = '',
        onTimeSelect = (time: string) => {}
    } = $props();

    let currentMode = $state(0); // 0: hours, 1: minutes, 2: seconds
    let hover = $state<number | null>(null);
    let clockRef = $state<HTMLDivElement | null>(null);
    let time = $state([value.getHours(), value.getMinutes(), value.getSeconds()]);
    let handleMoveMove = $state(false);

    const CLOCK_SIZE = 280;
    const CONTAINER_HEIGHT = 400;

    function calculateValue(e: MouseEvent) {
        if (!clockRef) return null;
        
        const rect = clockRef.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const x = e.clientX - centerX;
        const y = e.clientY - centerY;
        
        // Calculate angle in radians - Fix mirroring by changing -x to x
        let angle = Math.atan2(x, -y);
        if (angle < 0) angle += 2 * Math.PI;
        
        // Convert to degrees
        const degrees = angle * (180 / Math.PI);
        
        // Calculate distance from center (for inner/outer detection)
        const distance = Math.sqrt(x * x + y * y);
        const isInner = distance < (rect.width / 3); // Adjusted threshold
        
        if (currentMode === 0) { // Hours
            let hour = Math.round(degrees / 30) % 12;
            if (format === '24') {
                // For 24-hour format, handle inner ring (1-12) and outer ring (13-24)
                if (isInner) {
                    return hour === 0 ? 12 : hour;  // Inner ring: 1-12
                } else {
                    return hour === 0 ? 0 : hour + 12;  // Outer ring: 13-24 (and 00)
                }
            } else {
                return hour === 0 ? 12 : hour; // 12-hour format
            }
        } else { // Minutes or seconds
            const value = Math.round(degrees * 60 / 360);
            return value >= 60 ? 0 : value;
        }
    }
    // Fix derived state calculation
    let mainHandStyle = $derived({
        length: getHandLength(currentMode, time[currentMode]),
        radius: getHandRadius(currentMode, time[currentMode])
    });

    let hoverHandStyle = $derived(hover !== null ? {
        length: getHandLength(currentMode, hover, true),
        radius: getHandRadius(currentMode, hover, true)
    } : null);

    // Split the hand style functions for better control
    function getHandLength(mode: number, value: number, isHover = false): number {
        if (mode === 0 && format === '24') {
            return value > 0 && value <= 12 ? 28 : 40;
        }
        return 40;
    }

    function getHandRadius(mode: number, value: number, isHover = false): number {
        if (mode === 0 && format === '24') {
            return value > 0 && value <= 12 ? 6 : 9;
        }
        return 9;
    }

    function handleMouseDown(e: MouseEvent) {
        if (disabled) return;
        handleMoveMove = true;
        updateFromEvent(e);
    }

    function handleMouseMove(e: MouseEvent) {
        if (disabled) return;
        updateFromEvent(e, !handleMoveMove);
    }

    function handleMouseUp(e: MouseEvent) {
        if (disabled) return;
        handleMoveMove = false;
        updateFromEvent(e);
        if (currentMode === 0) {
            // After selecting hour, switch to minutes
            currentMode = 1;
        } else {
            updateValue();
        }
    }

    function updateFromEvent(e: MouseEvent, isHover = false) {
        const newValue = calculateValue(e);
        if (newValue === null) return;
        
        if (isHover) {
            hover = newValue;
        } else {
            time = time.map((t, i) => i === currentMode ? newValue : t);
        }
    }

    function updateValue() {
        const [hours, minutes, seconds] = time;
        const newDate = new Date(value);
        newDate.setHours(hours, minutes, seconds);
        value = newDate;
        
        const timeString = `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
        onTimeSelect(timeString);
        hover = null;
    }

    // Make formatNumber more robust
    function formatNumber(num: number): string {
        if (num === undefined || num === null) return '00';
        return num.toString().padStart(2, '0');
    }

    $effect(() => {
        time = [value.getHours(), value.getMinutes(), value.getSeconds()];
    });

    // Fix display value calculation to ensure it always returns a valid string
    let displayTime = $derived.by(() => {
        try {
            if (hover !== null && currentMode < 3) {
                // Create a copy of the current time array with hover value at current mode
                const timeWithHover = [...time];
                timeWithHover[currentMode] = hover;
                return timeWithHover.map(t => formatNumber(t)).join(':');
            }
            return time.map(t => formatNumber(t)).join(':');
        } catch (error) {
            console.error('Error formatting time display:', error);
            return '00:00:00'; // Fallback default
        }
    });
</script>

<div class={cn('clay overflow-hidden rounded-[var(--clay-border-radius)] bg-white', className)}
     style="min-height: {CONTAINER_HEIGHT}px">
    <div class="flex items-center justify-center space-x-2 bg-white/90 p-4 text-center text-3xl">
        <!-- Time display buttons - updated with safeguards -->
        <button
            class={cn(
                'clay-button cursor-pointer px-4 py-2 rounded-md transition-all duration-200',
                currentMode === 0 && 'clay-active text-primary',
                disabled && 'cursor-not-allowed opacity-50'
            )}
            onclick={() => !disabled && (currentMode = 0)}
        >
            {(displayTime?.split(':') || ['00'])[0]}
        </button>
        <span>:</span>
        <button
            class={cn(
                'clay-button cursor-pointer px-4 py-2 rounded-md transition-all duration-200',
                currentMode === 1 && 'clay-active text-primary',
                disabled && 'cursor-not-allowed opacity-50'
            )}
            onclick={() => !disabled && (currentMode = 1)}
        >
            {(displayTime?.split(':') || ['00', '00'])[1]}
        </button>
        {#if showSeconds}
            <span>:</span>
            <button
                class={cn(
                    'clay-button cursor-pointer px-4 py-2 rounded-md transition-all duration-200',
                    currentMode === 2 && 'clay-active text-primary',
                    disabled && 'cursor-not-allowed opacity-50'
                )}
                onclick={() => !disabled && (currentMode = 2)}
            >
                {(displayTime?.split(':') || ['00', '00', '00'])[2]}
            </button>
        {/if}
    </div>

    <div class="clay-inset relative bg-white/80 p-4"
         style="height: {CLOCK_SIZE}px">
        <div bind:this={clockRef}
             class="relative h-full w-full"
             onmousedown={handleMouseDown}
             onmousemove={handleMouseMove}
             onmouseup={handleMouseUp}
             onmouseleave={() => { handleMoveMove = false; hover = null; }}>
            <svg viewBox="-50 -50 100 100" class="h-full w-full">
                <circle class="fill-white" cx={0} cy={0} r={45} />
                                <TimePickerHand
                    i={time[currentMode]}
                    div={currentMode === 0 ? 12 : 60}
                    length={mainHandStyle.length}
                    r={mainHandStyle.radius}
                />
                
                {#if hover !== null && hoverHandStyle}
                    <TimePickerHand
                        i={hover}
                        div={currentMode === 0 ? 12 : 60}
                        length={hoverHandStyle.length}
                        r={hoverHandStyle.radius}
                        className="opacity-50"
                    />
                {/if}

                <TimePickerFace
                    r={40}
                    markers={currentMode === 0 
                        ? (format === '24' 
                            ? [24, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]
                            : [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
                        : [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
                    }
                />
                {#if currentMode === 0 && format === '24'}
                    <TimePickerFace
                        r={28}
                        class="inner"
                        markers={[12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
                    />
                {/if}
                
                <circle class="clay fill-primary" cx={0} cy={0} r={1} />
            </svg>
        </div>
    </div>
</div>

<style>
    .clay-inset {
        box-shadow: inset 4px 4px 8px rgba(0,0,0,0.2),
                    inset -4px -4px 8px rgba(255,255,255,0.8);
    }

    /* Enhanced claymorphism styling */
    .clay-button {
        box-shadow: 3px 3px 6px rgba(0,0,0,0.15),
                   -3px -3px 6px rgba(255,255,255,0.8);
        background: rgba(255,255,255,0.4);
    }
    
    .clay-button:hover {
        box-shadow: 2px 2px 4px rgba(0,0,0,0.1),
                   -2px -2px 4px rgba(255,255,255,0.7);
    }
    
    .clay-active {
        box-shadow: inset 2px 2px 4px rgba(0,0,0,0.1),
                   inset -2px -2px 4px rgba(255,255,255,0.7);
    }
</style>
