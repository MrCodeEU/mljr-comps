<script lang="ts">
	import { Progress } from 'bits-ui';
	import { cn } from '$lib/utility.js';

	let {
		value = $bindable(0),
		min = 0,
		max = 100,
		variant = 'primary',
		showLabel = false,
		showValue = false, // New prop to toggle between value/percentage
		labelPosition = 'center',
		size = 'md',
		orientation = 'horizontal',
		formatLabel = undefined, // Remove default implementation here
		class: className = ''
	} = $props();

	const variantClasses = {
		primary: 'bg-primary text-black',
		secondary: 'bg-secondary text-black',
		tertiary: 'bg-tertiary text-black',
		accent: 'bg-accent text-black',
		muted: 'bg-neutral text-black dark:text-white',
		error: 'bg-error text-black',
		success: 'bg-success text-black',
		warning: 'bg-warning text-black',
		info: 'bg-info text-black'
	};

	const sizeClasses = {
		sm: orientation === 'vertical' ? 'w-4' : 'h-4',
		md: orientation === 'vertical' ? 'w-8' : 'h-8',
		lg: orientation === 'vertical' ? 'w-12' : 'h-12',
		xl: orientation === 'vertical' ? 'w-16' : 'h-16'
	};

	const labelClasses = {
		left: 'order-first mr-4',
		right: 'order-last ml-4',
		center: 'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10'
	};

	// Convert any value within min-max range to 0-100 percentage
	const normalizeToPercentage = (value: number, min: number, max: number) => {
		// First clamp the value between min and max
		const clampedValue = Math.max(min, Math.min(value, max));
		// Then convert to percentage
		return ((clampedValue - min) / (max - min)) * 100;
	};

	$effect(() => {
		// Ensure value stays within bounds
		value = Math.max(min, Math.min(value, max));
	});

	// Get the normalized percentage for the current value
	let normalizedValue = $derived.by(() => normalizeToPercentage(value, min, max));

	// Default format functions
	const formatPercentage = (v: number, min: number, max: number) => 
		`${Math.round(normalizeToPercentage(v, min, max))}%`;
	
	const formatActualValue = (v: number) => `${Math.round(v)}`;

	// Use custom formatLabel or default based on showValue
	const getLabel = (v: number, min: number, max: number) => {
		if (formatLabel) return formatLabel(v, min, max);
		return showValue ? formatActualValue(v) : formatPercentage(v, min, max);
	};

	const containerStyles = $derived({
		horizontal: 'w-full',
		vertical: 'flex-col h-[300px] items-center'
	}[orientation]);
</script>

<div class={cn('flex', containerStyles, className)}>
	{#if showLabel && !['center'].includes(labelPosition)}
		<span class={cn('text-sm font-medium', labelClasses[labelPosition as keyof typeof labelClasses])}>
			{getLabel(value, min, max)}
		</span>
	{/if}

	<Progress.Root
		value={normalizedValue}
		max={100}
		class={cn(
			'relative overflow-hidden clay-inset bg-black/5',
			sizeClasses[size as keyof typeof sizeClasses],
			orientation === 'vertical' ? 'h-full' : 'w-full'
		)}
	>
		{#if showLabel && labelPosition === 'center'}
			<span
				class={cn(
					'text-sm font-medium transition-all duration-300',
					labelClasses[labelPosition],
					normalizedValue < 50 ? 'text-foreground' : 'text-background'
				)}
			>
				{getLabel(value, min, max)}
			</span>
		{/if}

		<div
			class={cn(
				'clay transition-all duration-300 ease-out',
				variantClasses[variant as keyof typeof variantClasses],
				'absolute inset-0'
			)}
			style={
				orientation === 'vertical'
					? `transform: translateY(${100 - normalizedValue}%)`
					: `transform: translateX(-${100 - normalizedValue}%)`
			}
		></div>
	</Progress.Root>
</div>
