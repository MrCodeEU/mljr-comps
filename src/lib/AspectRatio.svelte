<script lang="ts">
	import { AspectRatio } from 'bits-ui';
	import { cn } from '$lib/utility.js';
	import type { Snippet } from 'svelte';

	let {
		ratio = 1,
		ref = $bindable(null),
		children,
		class: className = ''
	}: {
		ratio?: number;
		ref?: HTMLDivElement | null;
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<AspectRatio.Root {ratio} bind:ref class={cn('relative w-full', className)}>
	{@render children?.()}
</AspectRatio.Root>
