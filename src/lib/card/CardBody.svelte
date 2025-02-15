<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';

	let {
		children,
		class: className
	}: {
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<div class={cn('flex flex-col gap-4 py-4', className)}>
	{@render children?.()}
</div>
