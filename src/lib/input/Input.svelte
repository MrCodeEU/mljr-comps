<script lang="ts">
	import { cn } from '$lib/utility.js';
	import Icon from '@iconify/svelte';

	let {
		type = 'text',
		value = $bindable(''),
		oninput = () => {},
		placeholder = '',
		variant = 'primary',
		size = 'md',
		icon = '',
		iconPosition = 'left',
		disabled = false,
		required = false,
		readonly = false,
		error = false,
		label = '',
		class: className = '',
		pattern = '',
		onIconClick = undefined,
		validateOn = 'input', // Add this new prop
	}: {
		type?: 'text' | 'number' | 'email' | 'password' | 'tel';
		value?: string | number;
		oninput?: (event: Event) => void;
		placeholder?: string;
		variant?: Variant;
		size?: 'sm' | 'md' | 'lg';
		icon?: string;
		iconPosition?: 'left' | 'right';
		disabled?: boolean;
		required?: boolean;
		readonly?: boolean;
		error?: boolean | string;
		label?: string;
		class?: string;
		pattern?: string;
		onIconClick?: (event: MouseEvent) => void;
		validateOn?: 'input' | 'blur';  // Add this new type
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

	const sizeClasses = {
		sm: 'h-8 text-sm',
		md: 'h-10 text-base',
		lg: 'h-12 text-lg'
	};

	const paddingClasses = {
		left: icon ? 'pl-10 pr-4' : 'px-4',
		right: icon ? 'pr-10 pl-4' : 'px-4'
	};

	let showPassword = $state(false);
	let validationError = $state<string | false>(false);
	let isDirty = $state(false);

	function validateInput(value: string | number) {
		if (value === '' || value === undefined) return required ? 'This field is required' : false;

		switch (type) {
			case 'email':
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				return !emailRegex.test(String(value)) ? 'Please enter a valid email address' : false;
			case 'number':
				return isNaN(Number(value)) ? 'Please enter a valid number' : false;
			case 'text':
				if (pattern) {
					const regex = new RegExp(pattern);
					return !regex.test(String(value)) ? 'Input does not match the required pattern' : false;
				}
				return false;
			default:
				return false;
		}
	}

	function handleInput(event: Event) {
		oninput(event);
		isDirty = true;
		if (validateOn === 'input') {
			validationError = validateInput(value);
			error = validationError;
		}
	}

	function handleBlur() {
		if (validateOn === 'blur' && isDirty) {
			validationError = validateInput(value);
			error = validationError;
		}
	}

	function handleIconClick(event: MouseEvent) {
		if (type === 'password' && !onIconClick) {
			showPassword = !showPassword;
			icon = showPassword ? 'mdi:eye-off' : 'mdi:eye';
		} else if (onIconClick) {
			onIconClick(event);
		}
	}

	$effect(() => {
		if (type === 'password' && !icon) {
			icon = 'mdi:eye';
			iconPosition = 'right';
		}
	});
</script>

<div class="relative w-full">
	{#if label}
		<label class="mb-2 block text-sm font-medium" for={label}>
			{label}
			{#if required}
				<span class="text-error">*</span>
			{/if}
		</label>
	{/if}

	<div class="relative">
		{#if icon && iconPosition === 'left'}
			<Icon
				{icon}
				class={cn(
					"absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/50",
					onIconClick || type === 'password' ? "cursor-pointer hover:text-foreground" : ""
				)}
				onclick={handleIconClick}
			/>
		{/if}

		<input
			type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
			bind:value
			oninput={handleInput}
			onblur={handleBlur}
			{placeholder}
			{disabled}
			{required}
			{readonly}
			id={label}
			class={cn(
				'w-full clay-inset transition-all duration-200',
				'placeholder:text-foreground/50',
				'focus:outline-none focus:ring-2 focus:ring-offset-2',
				(error || validationError) && 'ring-2 ring-error ring-offset-2',
				disabled && 'cursor-not-allowed opacity-50',
				sizeClasses[size],
				paddingClasses[iconPosition],
				variantClasses[(error || validationError) ? 'error' : (variant as keyof typeof variantClasses)],
				className
			)}
		/>

		{#if icon && iconPosition === 'right'}
			<Icon
				{icon}
				class={cn(
					"absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/50",
					onIconClick || type === 'password' ? "cursor-pointer hover:text-foreground" : ""
				)}
				onclick={handleIconClick}
			/>
		{/if}
	</div>

	{#if validationError || (error && typeof error === 'string')}
		<p class="mt-1 text-sm text-error">{validationError || error}</p>
	{/if}
</div>
