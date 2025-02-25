<script lang="ts">
	import { Accordion } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { WithoutChildrenOrChild } from 'bits-ui';
	import type { Snippet } from 'svelte';

	let {
		type = 'single',
		value = $bindable<string | string[]>(),
		class: className = '',
		triggers,
		content
	}: WithoutChildrenOrChild<Accordion.RootProps> & {
		type?: 'single' | 'multiple';
		class?: string;
		triggers?: Snippet;
		content?: Snippet;
	} = $props();
</script>

<Accordion.Root {type} bind:value class={cn('clay w-full p-3', className)}>
	{@render triggers?.()}
	{@render content?.()}
</Accordion.Root>
