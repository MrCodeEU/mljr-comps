<script lang="ts">
	import Input from './Input.svelte';
	import Button from '$lib/Button.svelte';
	import Icon from '@iconify/svelte';

	let {
		value = $bindable(0),
		min = -Infinity,
		max = Infinity,
		step = 1,
		controls = true,
		variant = 'primary',
		size = 'md',
		disabled = false,
		required = false,
		readonly = false,
		error = false,
		errorMessage = 'Please enter a valid number',
		label = '',
		class: className = ''
	} = $props();

	// Internal string value for the input
	let inputValue = $state(value.toString());
	let currentErrorMessage = $state(errorMessage);

	// Update input value when external value changes
	$effect(() => {
		inputValue = value.toString();
	});

	// Handle input changes
	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const rawValue = input.value;
		
		if (rawValue === '' || rawValue === '-' || rawValue === '.' || rawValue === ',') {
			inputValue = rawValue;
			error = true;
			currentErrorMessage = 'Please enter a complete number';
			return;
		}

		// Allow either dot or comma as decimal separator
		const sanitizedValue = rawValue.replace(/,/g, '.');
		const hasValidChars = /^-?\d*\.?\d*$/.test(sanitizedValue);

		if (hasValidChars) {
			const newValue = parseFloat(sanitizedValue);
			if (!isNaN(newValue)) {
				value = clampValue(newValue);
				inputValue = rawValue; // Keep original input format
				error = false;
				currentErrorMessage = errorMessage;
				return;
			}
		}
		
		error = true;
		currentErrorMessage = 'Please enter a valid number';
		inputValue = rawValue;
	}

	function clampValue(val: number): number {
		return Math.min(Math.max(val, min), max);
	}

	function increment() {
		value = clampValue(value + step);
	}

	function decrement() {
		value = clampValue(value - step);
	}

	const buttonSizeClasses = {
		sm: 'h-6 w-6',
		md: 'h-8 w-8',
		lg: 'h-10 w-10'
	};
</script>

<div class="flex w-full items-end gap-2">
	<Input
		type="text"
		bind:value={inputValue}
		oninput={handleInput}
		variant={variant as Variant}
		size = {size as "md" | "sm" | "lg" | undefined}
		{disabled}
		{required}
		{readonly}
		{error}
		errorMessage={currentErrorMessage}
		{label}
		class={className}
	/>

	{#if controls}
		<div class="flex flex-col gap-1">
			<Button
				variant={variant as Variant}
				onclick={increment}
				active={!disabled && value < max}
				class={buttonSizeClasses[size as keyof typeof buttonSizeClasses]}
			>
				<Icon icon="mdi:chevron-up" class="size-6 -m-3"/>
			</Button>
			<Button
				variant={variant as Variant}
				onclick={decrement}
				active={!disabled && value > min}
				class={buttonSizeClasses[size as keyof typeof buttonSizeClasses]}
			>
				<Icon icon="mdi:chevron-down" class="size-6 -m-3"  />
			</Button>
		</div>
	{/if}
</div>
