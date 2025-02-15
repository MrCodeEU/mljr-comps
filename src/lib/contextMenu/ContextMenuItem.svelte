<script lang="ts">
	import { ContextMenu } from 'bits-ui';
	import type { WithoutChild } from 'bits-ui';
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';
	import type { IconifyIcon } from '@iconify/svelte';
	import Icon from '@iconify/svelte';

	let {
		class: className = '',
		children,
		icon,
		shortcut,
		disabled = false,
		...props
	}: WithoutChild<ContextMenu.ItemProps> & {
		class?: string;
		icon?: string | IconifyIcon;
		shortcut?: string;
		children?: Snippet;
	} = $props();
</script>

<ContextMenu.Item
	{...props}
	{disabled}
	class={cn(
		'relative flex items-center gap-2 px-2 py-1.5 text-sm outline-none select-none',
		'transition-all duration-200',
		'hover:clay-inset focus:clay-inset active:clay-inset',
		'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
		'text-current',
		className
	)}
>
	{#if icon}
		<Icon {icon} class="size-4" />
	{/if}
	<span class="flex-grow">
		{@render children?.()}
	</span>
	{#if shortcut}
		<span class="ml-auto text-xs tracking-widest opacity-60">{shortcut}</span>
	{/if}
</ContextMenu.Item>
