<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';
	import Icon from '@iconify/svelte';

	let {
		variant = 'primary',
		checked = $bindable(false),
		disabled = false,
		leftLabel,
		rightLabel,
		leftIcon = '',
		rightIcon = '',
		children
	}: {
		variant?:
			| 'primary'
			| 'secondary'
			| 'tertiary'
			| 'accent'
			| 'muted'
			| 'error'
			| 'success'
			| 'warning'
			| 'info';
		checked: boolean;
		disabled?: boolean;
		leftLabel?: Snippet;
		rightLabel?: Snippet;
		leftIcon?: string;
		rightIcon?: string;
		children?: Snippet;
	} = $props();

	const variantClasses = {
		primary: {
			checked: 'bg-primary text-primary',
			unchecked: 'bg-primary/30 text-primary'
		},
		secondary: {
			checked: 'bg-secondary text-secondary',
			unchecked: 'bg-secondary/30 text-secondary'
		},
		tertiary: {
			checked: 'bg-tertiary text-tertiary',
			unchecked: 'bg-tertiary/30 text-tertiary'
		},
		text: {
			checked: 'bg-base-200 text-base-content',
			unchecked: 'bg-base-200/30 text-base-content'
		},
		accent: {
			checked: 'bg-accent text-accent',
			unchecked: 'bg-accent/30 text-accent'
		},
		muted: {
			checked: 'bg-neutral text-neutral',
			unchecked: 'bg-neutral/30 text-neutral'
		},
		error: {
			checked: 'bg-error text-error',
			unchecked: 'bg-error/30 text-error'
		},
		success: {
			checked: 'bg-success text-success',
			unchecked: 'bg-success/30 text-success'
		},
		warning: {
			checked: 'bg-warning text-warning',
			unchecked: 'bg-warning/30 text-warning'
		},
		info: {
			checked: 'bg-info text-info',
			unchecked: 'bg-info/30 text-info'
		}
	};
</script>

<div class="flex items-center gap-2">
	{#if leftLabel}
		{@render leftLabel()}
	{/if}
	<label class="relative inline-block h-8 w-16">
		<input type="checkbox" bind:checked {disabled} class="peer sr-only" />
		<div
			class={cn(
				'clay absolute inset-0 cursor-pointer rounded-full transition-all duration-300',
				checked
					? variantClasses[variant as keyof typeof variantClasses].checked
					: variantClasses[variant as keyof typeof variantClasses].unchecked,
				disabled ? 'cursor-not-allowed opacity-50' : ''
			)}
		>
			{#if leftIcon}
				<Icon
					icon={leftIcon}
					class=" absolute top-1/2 left-2 h-5 w-5 -translate-y-1/2 text-black transition-all duration-300 {checked
						? 'opacity-100'
						: 'opacity-0'}"
				/>
			{/if}
			{#if rightIcon}
				<Icon
					icon={rightIcon}
					class="absolute top-1/2 right-2 h-5 w-5 -translate-y-1/2 text-black transition-all duration-300 {checked
						? 'opacity-0'
						: 'opacity-100'}"
				/>
			{/if}
			<div
				class={cn(
					'clay-inset absolute top-1 h-6 w-6 rounded-full bg-white transition-all duration-300',
					checked ? 'translate-x-9' : 'translate-x-1'
				)}
			></div>
		</div>
	</label>
	{#if children}
		{@render children()}
	{/if}
	{#if rightLabel}
		{@render rightLabel()}
	{/if}
</div>
