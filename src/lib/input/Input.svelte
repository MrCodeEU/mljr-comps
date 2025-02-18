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
		class: className = ''
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
		error?: boolean;
		label?: string;
		class?: string;
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
				class="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/50"
			/>
		{/if}

		<input
			{type}
			bind:value
			oninput={oninput}
			{placeholder}
			{disabled}
			{required}
			{readonly}
			id={label}
			class={cn(
				'w-full clay-inset transition-all duration-200',
				'placeholder:text-foreground/50',
				'focus:outline-none focus:ring-2 focus:ring-offset-2',
				error && 'ring-2 ring-error ring-offset-2',
				disabled && 'cursor-not-allowed opacity-50',
				sizeClasses[size],
				paddingClasses[iconPosition],
				variantClasses[error ? 'error' : (variant as keyof typeof variantClasses)],
				className
			)}
		/>

		{#if icon && iconPosition === 'right'}
			<Icon
				{icon}
				class="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-foreground/50"
			/>
		{/if}
	</div>

	{#if error && typeof error === 'string'}
		<p class="mt-1 text-sm text-error">{error}</p>
	{/if}
</div>
