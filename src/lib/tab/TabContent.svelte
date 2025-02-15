<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';

	let {
		value,
		class: className = '',
		children
	}: {
		value: string;
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<Tabs.Content
	{value}
	class={cn(
		'rounded-lg p-4 ',
		'transition-all duration-200 ease-in-out',
		'data-[state=active]:translate-y-0 data-[state=inactive]:translate-y-2',
		'data-[state=active]:opacity-100 data-[state=inactive]:opacity-0',
		className
	)}
>
	{@render children?.()}
</Tabs.Content>
