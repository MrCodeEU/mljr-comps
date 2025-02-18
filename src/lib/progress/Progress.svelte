<script lang="ts">
	import { Progress } from 'bits-ui';
	import { cn } from '$lib/utility.js';

	let {
		value = $bindable(0),
		max = 100,
		variant = 'primary',
		showLabel = false,
		labelPosition = 'center',
		size = 'md',
		orientation = 'horizontal',
		formatLabel = (v: number) => `${Math.round((v / max) * 100)}%`,
		class: className = ''
	}: {
		value?: number;
		max?: number;
		variant?: Variant;
		showLabel?: boolean;
		labelPosition?: 'left' | 'right' | 'center';
		size?: 'sm' | 'md' | 'lg' | 'xl';
		orientation?: 'horizontal' | 'vertical';
		formatLabel?: (value: number) => string;
		class?: string;
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

	$effect(() => {
		// Ensure value stays within bounds
		value = Math.max(0, Math.min(value, max));
	});

	// Update container styles to be taller for vertical
	const containerStyles = $derived({
		horizontal: 'w-full',
		vertical: 'flex-col h-[300px] items-center'
	}[orientation]);
</script>

<div class={cn('flex', containerStyles, className)}>
	{#if showLabel && !['center'].includes(labelPosition)}
		<span class={cn('text-sm font-medium', labelClasses[labelPosition])}>
			{formatLabel(value)}
		</span>
	{/if}

	<Progress.Root
		{value}
		{max}
		class={cn(
			'relative overflow-hidden clay-inset bg-black/5',
			sizeClasses[size],
			orientation === 'vertical' ? 'h-full' : 'w-full'
		)}
	>
		{#if showLabel && labelPosition === 'center'}
			<span
				class={cn(
					'text-sm font-medium transition-all duration-300',
					labelClasses[labelPosition],
					value / max < 0.5 ? 'text-foreground' : 'text-background'
				)}
			>
				{formatLabel(value)}
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
					? `transform: translateY(${100 - (100 * (value ?? 0)) / max}%)`
					: `transform: translateX(-${100 - (100 * (value ?? 0)) / max}%)`
			}
		></div>
	</Progress.Root>
</div>
