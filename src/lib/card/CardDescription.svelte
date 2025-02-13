<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '$lib/utility.js';

	let {
		children,
		class: className = ''
	}: {
		children?: Snippet;
		class?: string;
	} = $props();
</script>

<div class={cn('flex flex-row text-sm text-gray-600 dark:text-gray-400', className)}>
	{@render children?.()}
</div>
