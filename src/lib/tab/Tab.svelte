<script lang="ts">
	import { Tabs } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';

	let {
		value,
		class: className = '',
		triggers,
		content
	}: {
		value?: string;
		class?: string;
		triggers?: Snippet;
		content?: Snippet;
	} = $props();
</script>

<Tabs.Root {value} class={cn('clay w-full p-4 ', className)}>
	<Tabs.List class="mb-4 flex gap-2">
		{@render triggers?.()}
	</Tabs.List>
	{@render content?.()}
</Tabs.Root>
