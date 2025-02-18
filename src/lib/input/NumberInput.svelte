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
		label = '',
		class: className = ''
	} = $props();

	// Internal string value for the input
	let inputValue = $state(value.toString());

	// Update input value when external value changes
	$effect(() => {
		inputValue = value.toString();
	});

	// Handle input changes
	function handleInput(event: Event) {
		const input = event.target as HTMLInputElement;
		const newValue = input.value === '' ? '' : parseFloat(input.value);
		
		if (newValue === '') {
			value = 0;
			return;
		}

		if (!isNaN(newValue)) {
			value = clampValue(newValue);
		}
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
		sm: 'h-4 w-4',
		md: 'h-5 w-5',
		lg: 'h-6 w-6'
	};
</script>

<div class="flex w-full gap-2">
	<Input
		type="text"
		value={inputValue}
		oninput={handleInput}
		variant={variant as Variant}
		size = {size as "md" | "sm" | "lg" | undefined}
		{disabled}
		{required}
		{readonly}
		{error}
		{label}
		class={className}
	/>

	{#if controls}
		<div class="flex flex-col gap-1">
			<Button
				variant={variant as Variant}
				onclick={increment}
				active={!disabled || value < max}
				class={buttonSizeClasses[size as keyof typeof buttonSizeClasses]}
			>
				<Icon icon="mdi:chevron-up" class="h-full w-full" />
			</Button>
			<Button
				variant={variant as Variant}
				onclick={decrement}
				active={!disabled || value > min}
				class={buttonSizeClasses[size as keyof typeof buttonSizeClasses]}
			>
				<Icon icon="mdi:chevron-down" class="h-full w-full" />
			</Button>
		</div>
	{/if}
</div>
