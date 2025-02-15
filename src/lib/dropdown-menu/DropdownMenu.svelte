<script lang="ts">
	import { DropdownMenu } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import { fade } from 'svelte/transition';
	import Icon from '@iconify/svelte';
	import DropdownMenuContent from './DropdownMenuContent.svelte';
	import type { Snippet } from 'svelte';

	let {
		open = $bindable(false),
		variant = 'primary',
		icon,
		label,
		class: className = '',
		children,
		trigger,
		triggerClass = ''
	} = $props<{
		open?: boolean;
		variant?: Variant;
		icon?: string;
		label?: string;
		class?: string;
		children?: Snippet;
		trigger?: Snippet;
		triggerClass?: string;
	}>();

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
</script>

<DropdownMenu.Root bind:open>
	<DropdownMenu.Trigger
		class={cn(
			'clay inline-flex items-center gap-2 p-3 transition-all',
			'active:clay-inset hover:translate-y-0.5 hover:shadow-none',
			variantClasses[variant as keyof typeof variantClasses],
			triggerClass
		)}
	>
		{#if icon}
			<Icon {icon} class="size-5" />
		{/if}
		{#if label}
			<span>{label}</span>
		{/if}
		{@render trigger?.()}
	</DropdownMenu.Trigger>

	<DropdownMenu.Portal>
		{@render children?.()}
	</DropdownMenu.Portal>
</DropdownMenu.Root>
