<script lang="ts">
	import { cn } from '$lib/utility.js';
	import Icon from '@iconify/svelte';

	let {
		value = $bindable(0),
		max = 5,
		precision = 1, // 1 for whole stars, 0.5 for half stars, 0.1 for more granular
		icon = 'mdi:star',
		emptyIcon = 'mdi:star-outline',
		halfIcon = '', // Default empty, will be auto-detected if not provided
		interactive = true,
		variant = 'primary',
		size = 'md',
		disabled = false,
		label = '',
		showValue = false,
		class: className = '',
		onChange = (val: number) => {}
	}: {
		value?: number;
		max?: number;
		precision?: number;
		icon?: string;
		emptyIcon?: string;
		halfIcon?: string;
		interactive?: boolean;
		variant?: Variant;
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		label?: string;
		showValue?: boolean;
		class?: string;
		onChange?: (value: number) => void;
	} = $props();

	const variantClasses = {
		primary: 'text-primary',
		secondary: 'text-secondary',
		tertiary: 'text-tertiary',
		accent: 'text-accent',
		muted: 'text-neutral',
		error: 'text-error',
		success: 'text-success',
		warning: 'text-warning',
		info: 'text-info'
	};

	const sizeClasses = {
		sm: 'text-base gap-1',
		md: 'text-xl gap-1.5',
		lg: 'text-3xl gap-2'
	};

	// Auto-detect halfIcon if not provided
	$effect(() => {
		if (!halfIcon) {
			// Common half icon patterns
			if (icon === 'mdi:star') {
				halfIcon = 'mdi:star-half-full';
			} else if (icon === 'material-symbols:star') {
				halfIcon = 'material-symbols:star-half';
			} else if (icon === 'ph:star-fill') {
				halfIcon = 'ph:star-half-fill';
			} else {
				// Default fallback - try to construct a half icon name
				const iconParts = icon.split(':');
				if (iconParts.length === 2) {
					const prefix = iconParts[0];
					const name = iconParts[1];
					
					// Try common patterns for half icons
					const halfOptions = [
						`${prefix}:${name.replace(/(fill|filled)$/, '')}-half${name.includes('fill') ? '-fill' : ''}`,
						`${prefix}:${name}-half`,
						`${prefix}:${name}-half-full`,
						`${prefix}:half-${name}`
					];
					
					// Just use the first option as a guess - user should provide specific icon if needed
					halfIcon = halfOptions[0];
				}
			}
		}
	});

	let hoverValue = $state(0);
	let isHovering = $state(false);
	const ratingItems = $derived(Array.from({ length: max }, (_, i) => i + 1));

	function handleMouseMove(event: MouseEvent, itemValue: number) {
		if (!interactive || disabled) return;
		
		const target = event.currentTarget as HTMLElement;
		const rect = target.getBoundingClientRect();
		const position = (event.clientX - rect.left) / rect.width;
		
		// For half-star precision, split the star in half
		if (precision === 0.5) {
			hoverValue = position <= 0.5 ? itemValue - 0.5 : itemValue;
		} else if (precision < 1) {
			// For more granular precision
			const step = Math.floor(position / precision) * precision;
			hoverValue = Math.max(itemValue - 1 + step, itemValue - 1 + precision);
		} else {
			// Full star precision
			hoverValue = itemValue;
		}
		
		isHovering = true;
	}

	function handleMouseLeave() {
		if (!interactive || disabled) return;
		isHovering = false;
		hoverValue = 0;
	}

	function handleClick() {
		if (!interactive || disabled) return;
		value = hoverValue;
		onChange(value);
	}

	function getIconForValue(itemValue: number, currentValue: number) {
		if (currentValue >= itemValue) {
			return icon; // Full icon
		} else if (precision === 0.5 && currentValue === itemValue - 0.5) {
			return halfIcon; // Half icon
		} else if (precision < 1) {
			// More granular display for non-interactive mode
			const fraction = currentValue - Math.floor(currentValue);
			if (Math.floor(currentValue) === itemValue - 1 && fraction > 0) {
				return halfIcon; // Use half icon as approximation
			}
		}
		return emptyIcon; // Empty icon
	}

	// Format display value to desired precision
	const displayValue = $derived(
		showValue ? value.toFixed(precision < 1 ? 1 : 0) : ''
	);
</script>

<div class="flex flex-col items-start">
	{#if label}
		<label class="mb-1 text-sm font-medium">{label}</label>
	{/if}

	<div
		class={cn(
			'flex items-center',
			interactive && !disabled && 'cursor-pointer',
			disabled && 'opacity-60',
			sizeClasses[size],
			className
		)}
		on:mouseleave={handleMouseLeave}
	>
		<div class="flex">
			{#each ratingItems as itemValue}
				<span
					class={cn(
						'transition-all relative',
						variantClasses[variant as keyof typeof variantClasses],
						interactive && !disabled && 'hover:scale-110',
						'clay-sm hover:clay-inset-sm'
					)}
					on:mousemove={(e) => handleMouseMove(e, itemValue)}
					on:click={handleClick}
					role={interactive && !disabled ? 'button' : undefined}
					tabindex={interactive && !disabled ? 0 : undefined}
					on:keydown={(e) => {
						if (interactive && !disabled && e.key === 'Enter') {
							value = itemValue;
							onChange(value);
						}
					}}
					aria-label={interactive ? `Rate ${itemValue} out of ${max}` : `Rating is ${value} out of ${max}`}
				>
					<Icon
						icon={getIconForValue(itemValue, isHovering ? hoverValue : value)}
						class={cn(
							'transition-transform px-0.5 py-0.5',
							interactive && !disabled && 'hover:scale-110'
						)}
					/>
				</span>
			{/each}
		</div>

		{#if showValue}
			<span class="ml-2 text-foreground/80 font-medium">{displayValue}</span>
		{/if}
	</div>
</div>
